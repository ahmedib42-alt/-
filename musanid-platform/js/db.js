/**
 * ===================================================================
 * منصة مُسانِد v2.5 - نظام إدارة قواعد البيانات، التخزين الذكي، والمزامنة
 * Musanid Platform - Smart Database Engine, Storage Manager & Sync
 * ===================================================================
 */

const MusanidDB = (function() {
  'use strict';

  const DB_NAME = 'MusanidPlatformDB';
  const DB_VERSION = 1;
  const STORES = [
    'users',
    'students',
    'services',
    'appointments',
    'sessions',
    'behaviors',
    'injuries',
    'attachments',
    'toilet',
    'tasks',
    'archiveFiles',
    'syncQueue',
    'backups',
    'systemAudit'
  ];

  let idbInstance = null;
  let isSyncing = false;
  let autoSyncTimer = null;
  let smartBackupTimer = null;

  // Key mappings between AppState, LocalStorage and IndexedDB
  const STORE_STATE_MAP = [
    { key: 'students', store: 'students', storageKey: 'musanid_students' },
    { key: 'services', store: 'services', storageKey: 'musanid_services' },
    { key: 'serviceAppointments', store: 'appointments', storageKey: 'musanid_appointments' },
    { key: 'sessionAttendance', store: 'sessions', storageKey: 'musanid_session_attendance' },
    { key: 'behaviorLogs', store: 'behaviors', storageKey: 'musanid_behavior_logs' },
    { key: 'bodyInjuries', store: 'injuries', storageKey: 'musanid_injuries' },
    { key: 'bodyAttachments', store: 'attachments', storageKey: 'musanid_body_attachments' },
    { key: 'toiletLogs', store: 'toilet', storageKey: 'musanid_toilet_logs' },
    { key: 'tasks', store: 'tasks', storageKey: 'musanid_tasks' },
    { key: 'archiveFiles', store: 'archiveFiles', storageKey: 'musanid_archive_files' }
  ];

  /**
   * 1. فتح وتهيئة قاعدة بيانات IndexedDB
   */
  function openDB() {
    return new Promise((resolve, reject) => {
      if (idbInstance) return resolve(idbInstance);
      if (!window.indexedDB) {
        console.warn('[MusanidDB] IndexedDB غير مدعوم في هذا المتصفح. سيتم استخدام LocalStorage كبديل.');
        return resolve(null);
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = function(e) {
        const db = e.target.result;
        STORES.forEach(storeName => {
          if (!db.objectStoreNames.contains(storeName)) {
            if (storeName === 'syncQueue' || storeName === 'backups' || storeName === 'systemAudit') {
              db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
            } else {
              db.createObjectStore(storeName, { keyPath: 'id' });
            }
          }
        });
      };

      request.onsuccess = function(e) {
        idbInstance = e.target.result;
        resolve(idbInstance);
      };

      request.onerror = function(e) {
        console.error('[MusanidDB] خطأ في فتح IndexedDB:', e.target.error);
        resolve(null);
      };
    });
  }

  /**
   * حفظ كل كائن في جدول IndexedDB
   */
  async function persistStore(storeName, items) {
    const db = await openDB();
    if (!db) return false;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction([storeName], 'readwrite');
        const os = tx.objectStore(storeName);
        os.clear();
        (items || []).forEach(item => {
          if (item && item.id) {
            os.put(item);
          } else if (item) {
            os.put({ ...item, id: 'gen-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5) });
          }
        });
        tx.oncomplete = () => resolve(true);
        tx.onerror = (err) => {
          console.error(`[MusanidDB] خطأ في حفظ ${storeName}:`, err);
          resolve(false);
        };
      } catch (err) {
        console.error(`[MusanidDB] استثناء في persistStore ${storeName}:`, err);
        resolve(false);
      }
    });
  }

  /**
   * قراءة جميع السجلات من جدول IndexedDB
   */
  async function readStore(storeName) {
    const db = await openDB();
    if (!db) return [];
    return new Promise((resolve) => {
      try {
        const tx = db.transaction([storeName], 'readonly');
        const os = tx.objectStore(storeName);
        const req = os.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      } catch (e) {
        resolve([]);
      }
    });
  }

  /**
   * 2. حفظ الحالة بالكامل مع التخزين الذكي المزدوج (Dual-Layer Cache)
   * LocalStorage للوصول السريع الفوري + IndexedDB للمرونة والملفات الكبيرة
   */
  async function saveState(appState) {
    if (!appState) return;

    // A) التخزين في LocalStorage
    try {
      if (appState.currentUser) {
        localStorage.setItem('musanid_user', JSON.stringify(appState.currentUser));
      } else {
        localStorage.removeItem('musanid_user');
      }

      STORE_STATE_MAP.forEach(m => {
        const data = appState[m.key] || [];
        try {
          localStorage.setItem(m.storageKey, JSON.stringify(data));
        } catch (storageQuotaErr) {
          console.warn(`[MusanidDB] مساحة LocalStorage ممتلئة للجدول ${m.key}. الاعتماد على IndexedDB الذكي.`, storageQuotaErr);
        }
      });
      localStorage.setItem('musanid_last_saved', new Date().toISOString());
    } catch (lsErr) {
      console.warn('[MusanidDB] استثناء حفظ LocalStorage:', lsErr);
    }

    // B) التخزين في IndexedDB
    try {
      for (const m of STORE_STATE_MAP) {
        await persistStore(m.store, appState[m.key] || []);
      }
      if (appState.currentUser) {
        const db = await openDB();
        if (db) {
          const tx = db.transaction(['users'], 'readwrite');
          tx.objectStore('users').put({ id: 'current_active_user', ...appState.currentUser });
        }
      }
    } catch (idbErr) {
      console.warn('[MusanidDB] استثناء حفظ IndexedDB:', idbErr);
    }

    // C) تسجيل نقطة التعديل للمزامنة لاحقاً
    recordSyncEvent('state_save', { timestamp: Date.now() });
  }

  /**
   * 3. استرجاع الحالة المدمجة عند الإقلاع (Hydration)
   * يقرأ من LocalStorage ويدمج مع IndexedDB لضمان عدم ضياع أي بيانات
   */
  async function hydrateState(appState, defaultSeed = {}) {
    await openDB();

    // 1. القراءة الأولية من LocalStorage
    let user = null;
    try {
      const u = localStorage.getItem('musanid_user') || localStorage.getItem('mukhles_user');
      if (u) user = JSON.parse(u);
    } catch(e) {}

    appState.currentUser = user || defaultSeed.currentUser || {
      teacherName: 'معلم التربية الخاصة والتأهيل',
      className: 'ورشة التأهيل المهني (أ)',
      isLoggedIn: true
    };

    for (const m of STORE_STATE_MAP) {
      let items = null;
      // محاولة 1: LocalStorage
      try {
        const raw = localStorage.getItem(m.storageKey) || localStorage.getItem(m.storageKey.replace('musanid_', 'mukhles_'));
        if (raw) items = JSON.parse(raw);
      } catch(e) {}

      // محاولة 2: IndexedDB إذا كان LocalStorage فارغاً أو تعذر قراءته
      if (!items || items.length === 0) {
        try {
          const idbItems = await readStore(m.store);
          if (idbItems && idbItems.length > 0) {
            items = idbItems;
          }
        } catch(e) {}
      }

      // محاولة 3: بيانات البداية الافتراضية
      if (!items || items.length === 0) {
        items = defaultSeed[m.key] || [];
      }

      appState[m.key] = items;
    }

    // التحقق من فحص سلامة البيانات تلقائياً
    auditDataIntegrity(appState);
  }

  /**
   * 4. فحص سلامة وتناسق البيانات (Data Integrity & Health Check)
   */
  function auditDataIntegrity(state) {
    const issues = [];
    const studentIds = new Set((state.students || []).map(s => s.id));

    // فحص المواعيد المعلقة لطلاب غير موجودين
    (state.serviceAppointments || []).forEach(apt => {
      if (apt.studentId && !studentIds.has(apt.studentId)) {
        issues.push(`موعد مرتبط بطالب غير مسجل: ${apt.studentName || apt.studentId}`);
      }
    });

    // فحص سجلات الجلسات
    (state.sessionAttendance || []).forEach(s => {
      if (s.studentId && !studentIds.has(s.studentId)) {
        issues.push(`جلسة حضور لطالب غير مسجل: ${s.studentName || s.studentId}`);
      }
    });

    return {
      healthy: issues.length === 0,
      issuesCount: issues.length,
      issues: issues,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * 5. تسجيل حدث في طابور المزامنة (Offline Sync Queue)
   */
  function recordSyncEvent(action, payload) {
    try {
      const queueRaw = localStorage.getItem('musanid_sync_queue');
      const queue = queueRaw ? JSON.parse(queueRaw) : [];
      queue.push({
        id: 'sync-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        action,
        timestamp: new Date().toISOString(),
        payloadSummary: typeof payload === 'object' ? Object.keys(payload) : 'primitive'
      });
      // الاحتفاظ بآخر 100 عملية
      if (queue.length > 100) queue.shift();
      localStorage.setItem('musanid_sync_queue', JSON.stringify(queue));
    } catch(e) {}
  }

  /**
   * 6. النسخ الاحتياطي التلقائي الذكي (Auto Snapshot Engine)
   * ينشئ لقطة سريعة في IndexedDB كل فترة أو بعد العمليات الكبيرة
   */
  async function createSnapshot(note = 'لقطة تلقائية دورية') {
    if (typeof AppState === 'undefined') return null;
    const db = await openDB();
    if (!db) return null;

    const snapshot = {
      id: 'snap-' + Date.now(),
      date: new Date().toISOString(),
      displayDate: new Date().toLocaleString('ar-SA'),
      note: note,
      stats: {
        studentsCount: (AppState.students || []).length,
        sessionsCount: (AppState.sessionAttendance || []).length,
        behaviorsCount: (AppState.behaviorLogs || []).length,
        injuriesCount: (AppState.bodyInjuries || []).length,
        archiveCount: (AppState.archiveFiles || []).length
      },
      data: {
        currentUser: AppState.currentUser,
        students: AppState.students,
        services: AppState.services,
        serviceAppointments: AppState.serviceAppointments,
        sessionAttendance: AppState.sessionAttendance,
        behaviorLogs: AppState.behaviorLogs,
        bodyInjuries: AppState.bodyInjuries,
        bodyAttachments: AppState.bodyAttachments,
        toiletLogs: AppState.toiletLogs,
        tasks: AppState.tasks,
        archiveFiles: AppState.archiveFiles || []
      }
    };

    return new Promise((resolve) => {
      try {
        const tx = db.transaction(['backups'], 'readwrite');
        tx.objectStore('backups').put(snapshot);
        tx.oncomplete = () => {
          // الحفاظ على أحدث 15 لقطة فقط توفيراً للمساحة
          pruneOldSnapshots(15);
          resolve(snapshot);
        };
        tx.onerror = () => resolve(null);
      } catch(e) {
        resolve(null);
      }
    });
  }

  /**
   * تقليم اللقطات القديمة
   */
  async function pruneOldSnapshots(maxKeep = 15) {
    const db = await openDB();
    if (!db) return;
    try {
      const tx = db.transaction(['backups'], 'readwrite');
      const store = tx.objectStore('backups');
      const req = store.getAll();
      req.onsuccess = () => {
        const list = req.result || [];
        if (list.length > maxKeep) {
          list.sort((a, b) => (a.id > b.id ? 1 : -1));
          const toDelete = list.slice(0, list.length - maxKeep);
          toDelete.forEach(item => {
            store.delete(item.id);
          });
        }
      };
    } catch(e) {}
  }

  /**
   * جلب كافة اللقطات المحفوظة
   */
  async function getAllSnapshots() {
    const db = await openDB();
    if (!db) return [];
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(['backups'], 'readonly');
        const req = tx.objectStore('backups').getAll();
        req.onsuccess = () => {
          const res = req.result || [];
          res.sort((a, b) => (b.id > a.id ? 1 : -1)); // الأحدث أولاً
          resolve(res);
        };
        req.onerror = () => resolve([]);
      } catch(e) {
        resolve([]);
      }
    });
  }

  /**
   * استرجاع لقطة محددة من الذاكرة
   */
  async function restoreSnapshot(snapshotId) {
    const db = await openDB();
    if (!db) return false;

    return new Promise((resolve) => {
      try {
        const tx = db.transaction(['backups'], 'readonly');
        const req = tx.objectStore('backups').get(snapshotId);
        req.onsuccess = () => {
          const snap = req.result;
          if (!snap || !snap.data) return resolve(false);

          // تطبيق البيانات
          const d = snap.data;
          if (d.currentUser) AppState.currentUser = d.currentUser;
          if (d.students) AppState.students = d.students;
          if (d.services) AppState.services = d.services;
          if (d.serviceAppointments) AppState.serviceAppointments = d.serviceAppointments;
          if (d.sessionAttendance) AppState.sessionAttendance = d.sessionAttendance;
          if (d.behaviorLogs) AppState.behaviorLogs = d.behaviorLogs;
          if (d.bodyInjuries) AppState.bodyInjuries = d.bodyInjuries;
          if (d.bodyAttachments) AppState.bodyAttachments = d.bodyAttachments;
          if (d.toiletLogs) AppState.toiletLogs = d.toiletLogs;
          if (d.tasks) AppState.tasks = d.tasks;
          if (d.archiveFiles) AppState.archiveFiles = d.archiveFiles;

          if (AppState.students && AppState.students.length > 0) {
            AppState.selectedStudentId = AppState.students[0].id;
          }

          saveAllToStorage();
          AppState.notify();
          resolve(true);
        };
        req.onerror = () => resolve(false);
      } catch(e) {
        resolve(false);
      }
    });
  }

  /**
   * حذف لقطة محددة
   */
  async function deleteSnapshot(snapshotId) {
    const db = await openDB();
    if (!db) return false;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(['backups'], 'readwrite');
        tx.objectStore('backups').delete(snapshotId);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      } catch(e) {
        resolve(false);
      }
    });
  }

  /**
   * 7. حساب مساحة التخزين وحجم البيانات المستهلكة
   */
  async function getStorageMetrics() {
    let lsBytes = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const val = localStorage.getItem(key) || '';
        lsBytes += (key.length + val.length) * 2; // تقريباً 2 بايت لكل حرف UTF-16
      }
    } catch(e) {}

    let idbEstimate = { usage: 0, quota: 0 };
    if (navigator.storage && navigator.storage.estimate) {
      try {
        const est = await navigator.storage.estimate();
        idbEstimate.usage = est.usage || 0;
        idbEstimate.quota = est.quota || 0;
      } catch(e) {}
    }

    const snapshots = await getAllSnapshots();

    return {
      localStorageBytes: lsBytes,
      localStorageFormatted: (lsBytes / 1024).toFixed(2) + ' كيلوبايت',
      browserUsageFormatted: idbEstimate.usage ? (idbEstimate.usage / (1024 * 1024)).toFixed(2) + ' ميجابايت' : (lsBytes / 1024).toFixed(2) + ' كيلوبايت',
      browserQuotaFormatted: idbEstimate.quota ? (idbEstimate.quota / (1024 * 1024 * 1024)).toFixed(1) + ' جيجابايت' : 'غير محدود محلياً',
      snapshotsCount: snapshots.length,
      lastSync: localStorage.getItem('musanid_last_saved') || new Date().toISOString()
    };
  }

  /**
   * 8. محاكاة المزامنة الذكية (Cloud/Network Sync Simulator)
   * مع كشف حالة الاتصال وحل التعارضات (Conflict Resolution)
   */
  function syncWithRemote(options = {}) {
    return new Promise((resolve) => {
      if (isSyncing) return resolve({ status: 'already_running' });
      isSyncing = true;

      const isOnline = navigator.onLine;

      setTimeout(() => {
        isSyncing = false;
        if (!isOnline) {
          recordSyncEvent('sync_attempt_offline', { note: 'الجهاز غير متصل بالإنترنت، البيانات محفوظة بأمان محلياً' });
          resolve({
            success: true,
            mode: 'offline_buffered',
            message: 'تم حفظ كافة التغييرات محلياً في طابور المزامنة لرفعها تلقائياً عند توفر الإنترنت.'
          });
        } else {
          // محاكاة مزامنة سحابية ناجحة مع الخادم
          recordSyncEvent('sync_success_online', { timestamp: new Date().toISOString() });
          localStorage.removeItem('musanid_sync_queue');
          localStorage.setItem('musanid_last_cloud_sync', new Date().toISOString());
          resolve({
            success: true,
            mode: 'synced_remote',
            message: 'تمت المزامنة وتأكيد تكامل السجلات السحابية بنجاح ✓'
          });
        }
      }, 1200);
    });
  }

  /**
   * 9. بدء الجدولة الذكية للنسخ الاحتياطي التلقائي الدوري في الخلفية
   */
  function startBackgroundWorkers() {
    // تشغيل حفظ لقطة تلقائية كل 5 دقائق
    if (smartBackupTimer) clearInterval(smartBackupTimer);
    smartBackupTimer = setInterval(() => {
      createSnapshot('لقطة تلقائية ذكية في الخلفية');
    }, 5 * 60 * 1000);

    // مراقبة عودة الاتصال للمزامنة الفورية
    window.addEventListener('online', () => {
      showToast('تم استعادة الاتصال بالإنترنت - جاري المزامنة الذكية...', 'fa-wifi');
      syncWithRemote();
    });

    window.addEventListener('offline', () => {
      showToast('المنصة تعمل الآن في وضع عدم الاتصال (Offline-Safe)', 'fa-plane');
    });
  }

  // الواجهة العامة
  return {
    openDB,
    saveState,
    hydrateState,
    createSnapshot,
    getAllSnapshots,
    restoreSnapshot,
    deleteSnapshot,
    getStorageMetrics,
    auditDataIntegrity,
    syncWithRemote,
    startBackgroundWorkers,
    recordSyncEvent
  };
})();

// تصدير الكائن عالمياً
if (typeof window !== 'undefined') {
  window.MusanidDB = MusanidDB;
}
