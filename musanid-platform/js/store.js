/**
 * ========================================================
 * منصة مُسانِد v2.5 - النسخة الأساسية المعيارية
 * إدارة الحالة والمزامنة والتخزين المحلي (State & Store)
 * ========================================================
 */

const LOGO_SRC = 'assets/logo.png';

const AppState = {
  currentUser: null,
  activeTab: 'home',
  selectedStudentId: 'std-101',
  bodyAttachmentFilter: 'all',
  archiveFilter: 'all',
  studentSidebarOpen: true, // القائمة الجانبية للطلبة مفتوحة افتراضياً
  studentSearchTerm: '',    // البحث السريع في أسماء الطلبة
  listeners: [],

  subscribe(fn) {
    this.listeners.push(fn);
  },

  notify() {
    this.listeners.forEach(fn => fn());
  },

  setActiveTab(tab) {
    this.activeTab = tab;
    this.notify();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  setSelectedStudent(studentId) {
    this.selectedStudentId = studentId;
    this.notify();
  },

  toggleStudentSidebar() {
    this.studentSidebarOpen = !this.studentSidebarOpen;
    this.notify();
  },

  setStudentSearchTerm(term) {
    this.studentSearchTerm = term || '';
    this.notify();
  },

  login(teacherName, className) {
    this.currentUser = {
      teacherName: teacherName || 'معلم التربية الخاصة',
      className: className || 'ورشة التأهيل المهني (أ)',
      isLoggedIn: true
    };
    saveAllToStorage();
    this.notify();
    showToast('مرحباً بك يا ' + this.currentUser.teacherName + ' في منصة مُسانِد');
  },

  logout() {
    this.currentUser = null;
    saveAllToStorage();
    this.notify();
  }
};

// Helper: Arabic Day Name
function getArabicDayName(dateStr) {
  if (!dateStr) return 'اليوم';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      if (dateStr.includes('الأحد') || dateStr.includes('الإثنين') || dateStr.includes('الثلاثاء') || 
          dateStr.includes('الأربعاء') || dateStr.includes('الخميس') || dateStr.includes('الجمعة') || dateStr.includes('السبت')) {
        return dateStr;
      }
      return 'اليوم';
    }
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    return days[d.getDay()];
  } catch (e) {
    return 'اليوم';
  }
}

// Helper: Student Sessions Count
function getStudentCompletedSessionsCount(studentId) {
  if (!AppState.sessionAttendance) return 0;
  return AppState.sessionAttendance.filter(s => s.studentId === studentId && s.status === 'مكتملة').length;
}

function getStudentOngoingSessionsCount(studentId) {
  if (!AppState.sessionAttendance) return 0;
  return AppState.sessionAttendance.filter(s => s.studentId === studentId && s.status === 'جارية').length;
}

// Helper: Calculate 360 Student Metrics
function getStudent360Metrics(studentId) {
  const student = (AppState.students || []).find(s => s.id === studentId);
  if (!student) return {};

  const appointments = (AppState.serviceAppointments || []).filter(a => a.studentId === studentId);
  const activeServices = (AppState.services || []).filter(s => (student.activeServices || []).includes(s.id));
  const completedSessions = getStudentCompletedSessionsCount(studentId);
  const behaviors = (AppState.behaviorLogs || []).filter(b => b.studentId === studentId);
  const injuries = (AppState.bodyInjuries || []).filter(i => i.studentId === studentId);
  const attachments = (AppState.bodyAttachments || []).filter(a => a.studentId === studentId);
  const toilet = (AppState.toiletLogs || []).filter(t => t.studentId === studentId);
  const toiletSuccess = toilet.filter(t => t.isSuccess).length;
  const toiletRate = toilet.length > 0 ? Math.round((toiletSuccess / toilet.length) * 100) : 100;

  return {
    student,
    appointments,
    activeServices,
    completedSessions,
    behaviors,
    injuries,
    attachments,
    toilet,
    toiletSuccessRate: toiletRate,
    totalBehaviors: behaviors.length,
    totalInjuries: injuries.length,
    totalAttachments: attachments.length
  };
}

// Global Floating Toast Notification
function showToast(message, icon = 'fa-check') {
  const toast = document.getElementById('toast-notification');
  const msg = document.getElementById('toast-message');
  const iconEl = document.getElementById('toast-icon');
  if (toast && msg) {
    msg.textContent = message;
    if (iconEl) iconEl.innerHTML = `<i class="fa-solid ${icon}"></i>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3400);
  }
}

// Initialize Platform Database and Storage with Backward Compatibility
async function initLocalStorageData() {
  try {
    const seed = typeof MusanidDefaultData !== 'undefined' ? MusanidDefaultData : {};

    if (typeof MusanidDB !== 'undefined') {
      await MusanidDB.hydrateState(AppState, seed);
      MusanidDB.startBackgroundWorkers();
    } else {
      // Fallback if MusanidDB is not loaded
      const storedUser = localStorage.getItem('musanid_user') || localStorage.getItem('mukhles_user');
      AppState.currentUser = storedUser ? JSON.parse(storedUser) : (seed.currentUser || {
        teacherName: 'معلم التربية الخاصة والتأهيل',
        className: 'ورشة التأهيل المهني (أ)',
        isLoggedIn: true
      });

      AppState.students = JSON.parse(localStorage.getItem('musanid_students') || '[]') || seed.students || [];
      AppState.services = seed.services || [];
      AppState.serviceAppointments = JSON.parse(localStorage.getItem('musanid_appointments') || '[]') || seed.serviceAppointments || [];
      AppState.sessionAttendance = JSON.parse(localStorage.getItem('musanid_session_attendance') || '[]') || seed.sessionAttendance || [];
      AppState.behaviorLogs = JSON.parse(localStorage.getItem('musanid_behavior_logs') || '[]') || seed.behaviorLogs || [];
      AppState.bodyInjuries = JSON.parse(localStorage.getItem('musanid_injuries') || '[]') || seed.bodyInjuries || [];
      AppState.bodyAttachments = JSON.parse(localStorage.getItem('musanid_body_attachments') || '[]') || seed.bodyAttachments || [];
      AppState.toiletLogs = JSON.parse(localStorage.getItem('musanid_toilet_logs') || '[]') || seed.toiletLogs || [];
      AppState.tasks = JSON.parse(localStorage.getItem('musanid_tasks') || '[]') || seed.tasks || [];
      AppState.archiveFiles = JSON.parse(localStorage.getItem('musanid_archive_files') || '[]') || seed.archiveFiles || [];
    }

    // Default services if empty
    if (!AppState.services || AppState.services.length === 0) {
      AppState.services = seed.services || [
        { id: 'speech', name: 'جلسات النطق والتخاطب', icon: 'fa-comments', category: 'علاجي', color: 'blue' },
        { id: 'occupational', name: 'العلاج الوظيفي وتنمية المهارات', icon: 'fa-hand-sparkles', category: 'تأهيلي', color: 'orange' },
        { id: 'physio', name: 'العلاج الطبيعي والتأهيل الحركي', icon: 'fa-person-walking', category: 'بدني', color: 'emerald' },
        { id: 'behavior', name: 'برنامج تعديل السلوك والدعم النفسي', icon: 'fa-brain', category: 'سلوكي', color: 'purple' },
        { id: 'vocational', name: 'التدريب والإنتاجية المهنية', icon: 'fa-hammer', category: 'مهني', color: 'orange' },
        { id: 'toilet_training', name: 'برنامج التدريب على الحمام والاستقلالية', icon: 'fa-restroom', category: 'استقلالي', color: 'emerald' },
        { id: 'transport', name: 'خدمة النقل والمرافقة الخاصة', icon: 'fa-bus', category: 'لوجستي', color: 'blue' },
        { id: 'feeding', name: 'المتابعة الغذائية والحمية', icon: 'fa-utensils', category: 'صحي', color: 'orange' }
      ];
    }
  } catch (err) {
    console.error('Error initializing data in Musanid Platform', err);
  }
}

// Persist All State with Dual Storage (LocalStorage + IndexedDB)
function saveAllToStorage() {
  try {
    if (AppState.currentUser) localStorage.setItem('musanid_user', JSON.stringify(AppState.currentUser));
    else localStorage.removeItem('musanid_user');
    
    localStorage.setItem('musanid_students', JSON.stringify(AppState.students || []));
    localStorage.setItem('musanid_appointments', JSON.stringify(AppState.serviceAppointments || []));
    localStorage.setItem('musanid_session_attendance', JSON.stringify(AppState.sessionAttendance || []));
    localStorage.setItem('musanid_behavior_logs', JSON.stringify(AppState.behaviorLogs || []));
    localStorage.setItem('musanid_injuries', JSON.stringify(AppState.bodyInjuries || []));
    localStorage.setItem('musanid_body_attachments', JSON.stringify(AppState.bodyAttachments || []));
    localStorage.setItem('musanid_toilet_logs', JSON.stringify(AppState.toiletLogs || []));
    localStorage.setItem('musanid_tasks', JSON.stringify(AppState.tasks || []));
    localStorage.setItem('musanid_archive_files', JSON.stringify(AppState.archiveFiles || []));

    // حفظ في قاعدة البيانات الذكية دون تأخير
    if (typeof MusanidDB !== 'undefined' && typeof MusanidDB.saveState === 'function') {
      MusanidDB.saveState(AppState);
    }
  } catch (e) {
    console.error('Failed saving to storage in Musanid Platform', e);
  }
}
