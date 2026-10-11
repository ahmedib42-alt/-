/**
 * ========================================================
 * منصة مُسانِد v2.5 - النسخة الأساسية المعيارية
 * المكونات الأساسية (Components: Gateway, Header, Home, Students, Services, Schedule)
 * ========================================================
 */

// ========================================================
// 0. Login Gateway Component
// ========================================================
function renderLoginGateway() {
  return `
    <div class="min-h-screen w-full flex flex-col lg:flex-row bg-slate-900 text-white relative overflow-hidden font-tajawal antialiased">
      
      <!-- Visual Background Gradients & Glows -->
      <div class="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand-blue/30 rounded-full blur-[140px] pointer-events-none"></div>
      <div class="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-brand-orange/20 rounded-full blur-[140px] pointer-events-none"></div>
      <div class="absolute inset-0 bg-[radial-gradient(#1e40af_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>

      <!-- Left Column: Branding Showcase & Features (Full Screen on LG) -->
      <div class="lg:w-7/12 flex flex-col justify-between p-8 sm:p-12 lg:p-16 relative z-10 border-b lg:border-b-0 lg:border-l border-slate-800 bg-gradient-to-br from-blue-950/80 via-slate-900/90 to-slate-950/95 backdrop-blur-md">
        
        <!-- Header Branding -->
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 p-2 bg-white rounded-2xl shadow-xl border-2 border-brand-blue/40 flex items-center justify-center">
            <img src="${LOGO_SRC}" alt="شعار منصة مُسانِد" class="w-full h-full object-contain">
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-3xl lg:text-4xl font-black text-white tracking-tight">مُسانِد</h1>
              <span class="bg-brand-orange text-white text-xs font-black px-2.5 py-0.5 rounded-full shadow-sm">v2.5</span>
            </div>
            <p class="text-xs sm:text-sm font-bold text-blue-200 mt-0.5">المنصة الشاملة والمساعد الذكي لمعلمي وأخصائيي التربية الخاصة والتأهيل</p>
          </div>
        </div>

        <!-- Hero Content & Highlights -->
        <div class="my-10 lg:my-0 space-y-6 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-black">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <i class="fa-solid fa-sparkles text-brand-orange"></i>
            <span>نظام إكلينيكي وتربوي متكامل 360° • يعمل دون إنترنت (Offline-Ready)</span>
          </div>

          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            رعاية تأهيلية دقيقة، <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-orange-400">وتوثيق مهني معتمد لكل خطوة</span>
          </h2>

          <p class="text-slate-300 text-sm sm:text-base leading-relaxed font-semibold">
            صُممت منصة <strong>مُسانِد</strong> خصيصاً لمراكز الرعاية النهارية ومدارس التربية الخاصة، لتسهيل رصد الجلسات العلاجية، وتوثيق السلوك ABC، وخريطة الجسد التشريحية، وجداول الحمام، والأرشفة الذكية.
          </p>

          <!-- Feature Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div class="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-blue/50 transition-all flex items-start gap-3.5">
              <div class="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-lg shrink-0">
                <i class="fa-solid fa-id-card"></i>
              </div>
              <div>
                <h4 class="font-black text-sm text-white">ملف الطالب 360°</h4>
                <p class="text-xs text-slate-400 font-bold mt-0.5">بطاقة تفاعلية متكاملة لكل طالب وقائمة جانبية سريعة مع البحث الفوري.</p>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-orange/50 transition-all flex items-start gap-3.5">
              <div class="w-10 h-10 rounded-xl bg-orange-500/20 text-brand-orange flex items-center justify-center font-bold text-lg shrink-0">
                <i class="fa-solid fa-person-dots-from-line"></i>
              </div>
              <div>
                <h4 class="font-black text-sm text-white">خريطة الجسد 2D</h4>
                <p class="text-xs text-slate-400 font-bold mt-0.5">توثيق دقيق للكدمات والإصابات مع طباعة تقارير لغة الجسد المعتمدة.</p>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all flex items-start gap-3.5">
              <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg shrink-0">
                <i class="fa-solid fa-restroom"></i>
              </div>
              <div>
                <h4 class="font-black text-sm text-white">جدول الحمام وتوازن السوائل</h4>
                <p class="text-xs text-slate-400 font-bold mt-0.5">رصد الوقت بدقة وتحديد اليوم تلقائياً مع مؤشرات نسبة الاستجابة.</p>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all flex items-start gap-3.5">
              <div class="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg shrink-0">
                <i class="fa-solid fa-database"></i>
              </div>
              <div>
                <h4 class="font-black text-sm text-white">قاعدة بيانات ذكية ومزامنة</h4>
                <p class="text-xs text-slate-400 font-bold mt-0.5">محرك IndexedDB فائق السعة مع نقاط استرجاع سريعة ونقل بالفلاشة.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Notice -->
        <div class="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-400">
          <span>دولة الكويت • قطاع التعليم النوعي والتأهيل</span>
          <span>منصة مُسانِد v2.5 • نسخة معيارية فائقة الأمان</span>
        </div>

      </div>

      <!-- Right Column: Login Card & Form (Full Height Centered on LG) -->
      <div class="lg:w-5/12 flex items-center justify-center p-6 sm:p-12 lg:p-16 relative z-10 bg-slate-900/60 backdrop-blur-xl">
        <div class="w-full max-w-md bg-white text-slate-900 rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 animate-fadeIn space-y-6">
          
          <!-- Card Header with Logo -->
          <div class="text-center">
            <div class="w-20 h-20 mx-auto mb-3 p-2 bg-gradient-to-tr from-blue-50 to-orange-50 rounded-2xl shadow-inner border border-slate-200 flex items-center justify-center">
              <img src="${LOGO_SRC}" alt="لوجو مساند" class="w-full h-full object-contain">
            </div>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">تسجيل الدخول إلى مُسانِد</h2>
            <p class="text-xs font-bold text-slate-500 mt-1">أدخل بيانات المعلم والفصل للبدء في إدارة وتوثيق الجلسات</p>
          </div>

          <!-- Login Form -->
          <form id="gateway-login-form" class="space-y-4 text-right">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
                <i class="fa-solid fa-chalkboard-user text-brand-blue"></i>
                <span>اسم المعلم / الأخصائي المشرف:</span>
              </label>
              <input type="text" id="login-teacher-name" required placeholder="مثال: معلم التربية الخاصة" 
                     value="معلم التربية الخاصة والتأهيل" 
                     class="w-full px-4 py-3 font-bold rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:ring-4 focus:ring-blue-100 outline-none transition-all text-slate-800 text-sm">
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
                <i class="fa-solid fa-school text-brand-orange"></i>
                <span>اسم الصف أو الورشة التأهيلية:</span>
              </label>
              <input type="text" id="login-class-name" required placeholder="مثال: ورشة التأهيل المهني (أ)" 
                     value="ورشة التأهيل المهني (أ)" 
                     class="w-full px-4 py-3 font-bold rounded-xl border-2 border-slate-200 focus:border-brand-orange focus:ring-4 focus:ring-orange-100 outline-none transition-all text-slate-800 text-sm">
            </div>

            <div class="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs font-bold text-brand-blue flex items-center gap-2">
              <i class="fa-solid fa-shield-check text-base"></i>
              <span>يتم حفظ الجلسة محلياً دون الحاجة لاتصال بالإنترنت.</span>
            </div>

            <button type="submit" class="w-full btn-musanid-primary py-3.5 text-base sm:text-lg font-black shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95">
              <i class="fa-solid fa-arrow-right-to-bracket text-lg"></i>
              <span>دخول منصة مُسانِد</span>
            </button>
          </form>

          <!-- Security and Version Notice -->
          <div class="pt-4 border-t border-slate-100 text-center text-xs font-semibold text-slate-400 flex items-center justify-between">
            <span class="flex items-center gap-1"><i class="fa-solid fa-bolt text-brand-orange"></i> نظام محلي آمن 100%</span>
            <span>Musanid Platform v2.5</span>
          </div>

        </div>
      </div>

    </div>
  `;
}

document.addEventListener('submit', (e) => {
  if (e.target && e.target.id === 'gateway-login-form') {
    e.preventDefault();
    const teacher = document.getElementById('login-teacher-name').value;
    const className = document.getElementById('login-class-name').value;
    AppState.login(teacher, className);
  }
});

// ========================================================
// Header & Navigation Bar Component
// ========================================================
function renderHeader() {
  const user = AppState.currentUser || {};
  const completedTotal = (AppState.sessionAttendance || []).filter(s => s.status === 'مكتملة').length;

  const navTabs = [
    { id: 'home', label: 'الرئيسية', icon: 'fa-house' },
    { id: 'students', label: 'ملف الطالب 360°', icon: 'fa-id-card' },
    { id: 'services', label: 'الخدمات المشروطة', icon: 'fa-hand-holding-medical' },
    { id: 'schedule', label: 'الجداول والمواعيد', icon: 'fa-calendar-days' },
    { id: 'sessionstats', label: 'إحصائيات وحضور الجلسات', icon: 'fa-chart-pie', badge: completedTotal },
    { id: 'bodymap', label: 'خريطة ولغة الجسد', icon: 'fa-person' },
    { id: 'toilet', label: 'جدول الحمام والسوائل', icon: 'fa-restroom' },
    { id: 'behavior', label: 'رصد السلوك 360°', icon: 'fa-brain' },
    { id: 'reports', label: 'الاستمارة الشاملة', icon: 'fa-file-invoice' },
    { id: 'tasks', label: 'المهام', icon: 'fa-list-check' },
    { id: 'archive', label: 'الأرشيف', icon: 'fa-folder-open' },
    { id: 'backup', label: 'قاعدة البيانات والمزامنة', icon: 'fa-database' }
  ];

  return `
    <header class="glass-header sticky top-0 z-40">
      <div class="wide-container py-3">
        <div class="flex items-center justify-between gap-4">
          
          <div class="flex items-center gap-3 cursor-pointer" onclick="AppState.setActiveTab('home')">
            <div class="w-12 h-12 p-1.5 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center">
              <img src="${LOGO_SRC}" alt="شعار منصة مُسانِد" class="w-full h-full object-contain">
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xl font-black text-brand-blue tracking-tight">منصة مُسانِد</span>
                <span class="bg-blue-100 text-brand-blue text-[11px] font-black px-2 py-0.5 rounded-full">v2.5</span>
              </div>
              <p class="text-xs font-bold text-slate-500 hidden sm:block">المساعد الذكي لمعلم التربية الخاصة والتأهيل</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-right">
              <div class="w-8 h-8 rounded-lg bg-blue-100 text-brand-blue flex items-center justify-center font-bold text-sm">
                <i class="fa-solid fa-chalkboard-user"></i>
              </div>
              <div>
                <span class="text-xs font-bold text-slate-800 block">${user.teacherName || 'معلم التربية الخاصة'}</span>
                <span class="text-[10px] font-semibold text-brand-orange">${user.className || 'ورشة التأهيل'}</span>
              </div>
            </div>

            <div class="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 text-brand-blue border border-blue-200 text-xs font-bold" title="إجمالي الجلسات المكتملة في المركز">
              <i class="fa-solid fa-award text-brand-orange"></i>
              <span>${completedTotal} جلسات منجزة</span>
            </div>

            <!-- Toggle Student Sidebar Button -->
            <button onclick="AppState.toggleStudentSidebar()" class="flex items-center gap-2 px-3 py-1.5 rounded-xl ${AppState.studentSidebarOpen ? 'bg-brand-blue text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'} border border-slate-200 text-xs font-bold transition-all" title="إظهار / إخفاء القائمة الجانبية للطلبة">
              <i class="fa-solid fa-users text-xs"></i>
              <span class="hidden sm:inline">قائمة الطلبة</span>
              <span class="px-1.5 py-0.2 rounded-full ${AppState.studentSidebarOpen ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'} text-[10px]">${(AppState.students || []).length}</span>
            </button>

            <!-- Quick Sync & DB Status Pill -->
            <button onclick="AppState.setActiveTab('backup')" class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-colors" title="إدارة قاعدة البيانات والمزامنة واللقطات">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <i class="fa-solid fa-database text-[11px]"></i>
              <span class="hidden md:inline">قاعدة البيانات</span>
            </button>

            <button onclick="AppState.logout()" class="btn-musanid-subtle px-3 py-2 text-xs" title="تسجيل الخروج أو تبديل الحساب">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
              <span class="hidden sm:inline">خروج</span>
            </button>
          </div>

        </div>

        <nav class="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-200 overflow-x-auto no-scrollbar pb-1">
          ${navTabs.map(tab => `
            <button onclick="AppState.setActiveTab('${tab.id}')" class="nav-tab-btn ${AppState.activeTab === tab.id ? 'active' : ''}">
              <i class="fa-solid ${tab.icon}"></i>
              <span>${tab.label}</span>
              ${tab.badge !== undefined ? `
                <span class="ml-1 px-1.5 py-0.2 bg-orange-500 text-white text-[10px] font-black rounded-full">${tab.badge}</span>
              ` : ''}
            </button>
          `).join('')}
        </nav>

      </div>
    </header>
  `;
}

// ========================================================
// 1. Home Hub Component
// ========================================================
function renderHomeHub() {
  const user = AppState.currentUser || {};
  const students = AppState.students || [];
  const totalSessions = (AppState.sessionAttendance || []).filter(s => s.status === 'مكتملة').length;
  const totalBehaviors = (AppState.behaviorLogs || []).length;
  const totalToilet = (AppState.toiletLogs || []).length;

  return `
    <div class="wide-container py-6 space-y-6 animate-fadeIn">
      
      <div class="card-interactive p-6 sm:p-8 bg-gradient-to-r from-blue-900 via-brand-blue to-blue-800 text-white relative overflow-hidden">
        <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="space-y-2 text-center md:text-right">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-200 text-xs font-black backdrop-blur-sm">
              <i class="fa-solid fa-sparkles text-brand-orange"></i>
              <span>نظام إدارة التأهيل الشامل 360°</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-black">أهلاً بك يا ${user.teacherName || 'معلمنا العزيز'} 👋</h2>
            <p class="text-blue-100 text-sm font-semibold max-w-xl">
              لوحة التحكم الذكية لمتابعة طلاب <strong>${user.className || 'الورشة التأهيلية'}</strong>، رصد الجلسات العلاجية ومواعيد الذهاب والإياب، استمارة لغة الجسد، وجداول الحمام والسلوك.
            </p>
          </div>

          <div class="flex items-center gap-3 flex-wrap justify-center">
            <button onclick="AppState.setActiveTab('sessionstats')" class="btn-musanid-orange py-3 px-5 text-base shadow-lg">
              <i class="fa-solid fa-clock-rotate-left text-lg"></i>
              <span>إحصائيات وجلسات الطلاب</span>
            </button>
            <button onclick="AppState.setActiveTab('bodymap')" class="btn-musanid-subtle bg-white/10 hover:bg-white/20 text-white border-white/20 py-3 px-5 text-base">
              <i class="fa-solid fa-person-dots-from-line text-lg"></i>
              <span>خريطة الجسد</span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-blue-100 text-brand-blue flex items-center justify-center font-bold">
              <i class="fa-solid fa-users"></i>
            </div>
            <h3 class="text-xl font-black text-slate-800">قائمة طلاب الصف / الورشة ومتابعة الجلسات</h3>
          </div>
          <button onclick="addNewStudentPrompt()" class="text-sm font-bold text-brand-blue hover:underline">
            <i class="fa-solid fa-user-plus ml-1"></i>إضافة طالب جديد
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          ${students.map(std => {
            const completedSessions = getStudentCompletedSessionsCount(std.id);
            const ongoingSessions = getStudentOngoingSessionsCount(std.id);
            const activeSrvs = (AppState.services || []).filter(s => (std.activeServices || []).includes(s.id));

            return `
              <div class="card-interactive p-5 bg-white flex flex-col justify-between group">
                <div>
                  <div class="flex items-start gap-3.5 pb-4 border-b border-slate-100">
                    <div class="relative w-16 h-16 rounded-2xl overflow-hidden shadow-md flex-shrink-0 border-2 border-brand-blue/20">
                      <img src="${std.avatar}" alt="${std.name}" class="w-full h-full object-cover">
                      ${ongoingSessions > 0 ? `
                        <span class="absolute bottom-0 right-0 left-0 bg-amber-500 text-white text-[9px] font-black text-center py-0.2 animate-pulse">في جلسة الآن</span>
                      ` : ''}
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between gap-1">
                        <h4 class="font-black text-slate-900 text-base truncate" title="${std.name}">${std.name}</h4>
                      </div>
                      <p class="text-xs font-bold text-slate-500 mt-0.5 truncate">${std.grade}</p>
                      
                      <div class="mt-2 flex items-center gap-1.5 flex-wrap">
                        <span class="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 text-brand-blue text-xs font-black px-2.5 py-0.5 rounded-lg shadow-sm">
                          <i class="fa-solid fa-award text-brand-orange"></i>
                          <span>⭐ ${completedSessions} جلسات منجزة</span>
                        </span>
                        ${ongoingSessions > 0 ? `
                          <span class="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-lg">1 جارية</span>
                        ` : ''}
                      </div>
                    </div>
                  </div>

                  <div class="mt-3 flex items-center gap-1.5 flex-wrap">
                    ${activeSrvs.map(srv => `
                      <span class="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 flex items-center gap-1">
                        <i class="fa-solid ${srv.icon} text-brand-blue"></i>
                        <span>${srv.name.split(' ')[0]}</span>
                      </span>
                    `).join('')}
                  </div>
                </div>

                <div class="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5">
                  <button onclick="AppState.setSelectedStudent('${std.id}'); AppState.setActiveTab('students');" class="btn-musanid-primary flex-1 py-2 text-xs font-bold">
                    <i class="fa-solid fa-id-card"></i>
                    <span>الملف 360°</span>
                  </button>
                  <button onclick="addSessionAttendanceModal('${std.id}')" class="btn-musanid-orange py-2 px-2.5 text-xs font-bold" title="تسجيل ذهاب / إياب جلسة">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                  <button onclick="editStudentModal('${std.id}')" class="btn-musanid-subtle py-2 px-2 text-xs font-bold" title="تعديل بيانات الطالب">
                    <i class="fa-solid fa-pen"></i>
                  </button>
                  <button onclick="deleteStudentPrompt('${std.id}', '${std.name}')" class="btn-musanid-subtle py-2 px-2 text-xs font-bold text-rose-600 hover:bg-rose-50 hover:border-rose-200" title="حذف الطالب">
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div class="card-interactive p-5 bg-white">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-400">إجمالي طلاب الصف</span>
            <div class="w-10 h-10 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center"><i class="fa-solid fa-users"></i></div>
          </div>
          <div class="text-3xl font-black text-slate-900">${students.length}</div>
          <p class="text-xs font-bold text-slate-500 mt-1">طلاب نشطون بالورشة</p>
        </div>

        <div class="card-interactive p-5 bg-white">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-400">الجلسات المنجزة بالمركز</span>
            <div class="w-10 h-10 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center"><i class="fa-solid fa-award"></i></div>
          </div>
          <div class="text-3xl font-black text-brand-orange">${totalSessions}</div>
          <p class="text-xs font-bold text-slate-500 mt-1">حضور وتأهيل فعلي</p>
        </div>

        <div class="card-interactive p-5 bg-white">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-400">سجلات رصد السلوك 360°</span>
            <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center"><i class="fa-solid fa-brain"></i></div>
          </div>
          <div class="text-3xl font-black text-purple-700">${totalBehaviors}</div>
          <p class="text-xs font-bold text-slate-500 mt-1">ملاحظات سلوكية مرصودة</p>
        </div>

        <div class="card-interactive p-5 bg-white">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-400">سجلات دورة المياه</span>
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center"><i class="fa-solid fa-restroom"></i></div>
          </div>
          <div class="text-3xl font-black text-emerald-600">${totalToilet}</div>
          <p class="text-xs font-bold text-slate-500 mt-1">متابعة السوائل والإخراج</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        <div onclick="AppState.setActiveTab('sessionstats')" class="card-interactive p-6 bg-white cursor-pointer group">
          <div class="flex items-start gap-4">
            <div class="icon-box-lg icon-box-blue"><i class="fa-solid fa-chart-pie"></i></div>
            <div>
              <h4 class="text-lg font-black text-slate-900 group-hover:text-brand-blue transition-colors">إحصائيات وحضور الجلسات</h4>
              <p class="text-xs font-bold text-slate-500 mt-1">رسوم بيانية، رصد ذهاب وإياب الطلاب للجلسات، واحتساب عدد الجلسات المنجزة.</p>
            </div>
          </div>
        </div>

        <div onclick="AppState.setActiveTab('toilet')" class="card-interactive p-6 bg-white cursor-pointer group">
          <div class="flex items-start gap-4">
            <div class="icon-box-lg icon-box-emerald"><i class="fa-solid fa-restroom"></i></div>
            <div>
              <h4 class="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors">جدول الحمام والسوائل</h4>
              <p class="text-xs font-bold text-slate-500 mt-1">تحديد اليوم تلقائياً، حساب كمية السوائل، ونموذج طباعة استمارة الحمام المعتمدة.</p>
            </div>
          </div>
        </div>

        <div onclick="AppState.setActiveTab('behavior')" class="card-interactive p-6 bg-white cursor-pointer group">
          <div class="flex items-start gap-4">
            <div class="icon-box-lg icon-box-purple"><i class="fa-solid fa-brain"></i></div>
            <div>
              <h4 class="text-lg font-black text-slate-900 group-hover:text-purple-700 transition-colors">رصد السلوك 360° (ABC)</h4>
              <p class="text-xs font-bold text-slate-500 mt-1">توثيق السوابق والسلوك واللواحق، المثيرات الحسية، وطباعة تقرير الرصد السلوكي.</p>
            </div>
          </div>
        </div>

        <div onclick="AppState.setActiveTab('bodymap')" class="card-interactive p-6 bg-white cursor-pointer group">
          <div class="flex items-start gap-4">
            <div class="icon-box-lg icon-box-orange"><i class="fa-solid fa-person-dots-from-line"></i></div>
            <div>
              <h4 class="text-lg font-black text-slate-900 group-hover:text-brand-orange transition-colors">خريطة الجسد والمرفقات</h4>
              <p class="text-xs font-bold text-slate-500 mt-1">مخطط تفاعلي ثنائي الأبعاد، رفع صور وفيديوهات ومستندات، وطباعة التقرير الطبي.</p>
            </div>
          </div>
        </div>

        <div onclick="AppState.setActiveTab('schedule')" class="card-interactive p-6 bg-white cursor-pointer group">
          <div class="flex items-start gap-4">
            <div class="icon-box-lg icon-box-blue"><i class="fa-solid fa-calendar-days"></i></div>
            <div>
              <h4 class="text-lg font-black text-slate-900 group-hover:text-brand-blue transition-colors">الجداول والمواعيد</h4>
              <p class="text-xs font-bold text-slate-500 mt-1">عرض الخدمات وأسماء الطلاب داخل كل خدمة، تنظيم المواعيد الأسبوعية وسحب الطلاب.</p>
            </div>
          </div>
        </div>

        <div onclick="AppState.setActiveTab('reports')" class="card-interactive p-6 bg-white cursor-pointer group">
          <div class="flex items-start gap-4">
            <div class="icon-box-lg icon-box-orange"><i class="fa-solid fa-print"></i></div>
            <div>
              <h4 class="text-lg font-black text-slate-900 group-hover:text-brand-orange transition-colors">استمارة التقرير الشامل 360°</h4>
              <p class="text-xs font-bold text-slate-500 mt-1">استخراج وطباعة الملف التأهيلي الشامل للطالب بختم دولة الكويت والتواقيع.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  `;
}

// ========================================================
// 2. Student Profile 360° Tab
// ========================================================
function renderStudentsTab() {
  const student = (AppState.students || []).find(s => s.id === AppState.selectedStudentId) || (AppState.students || [])[0];
  if (!student) return '<div class="wide-container py-8">لا يوجد طلاب مسجلين.</div>';

  const metrics = getStudent360Metrics(student.id);
  const activeServices = metrics.activeServices || [];
  const appointments = metrics.appointments || [];
  const completedSessions = metrics.completedSessions || 0;
  const totalBehaviors = metrics.totalBehaviors || 0;
  const toiletSuccessRate = metrics.toiletSuccessRate || 100;

  return `
    <div class="wide-container py-6 space-y-6 animate-fadeIn">
      
      <div class="card-interactive p-4 bg-white flex items-center justify-between gap-4 overflow-x-auto">
        <div class="flex items-center gap-2">
          <span class="text-xs font-black text-slate-400 whitespace-nowrap ml-2">اختيار الطالب:</span>
          <div class="flex items-center gap-2">
            ${AppState.students.map(s => `
              <button onclick="AppState.setSelectedStudent('${s.id}')" class="px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${s.id === student.id ? 'bg-brand-blue text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                <img src="${s.avatar}" class="w-5 h-5 rounded-full object-cover">
                <span>${s.name}</span>
                <span class="bg-white/20 px-1.5 py-0.2 rounded-full text-[10px]">⭐ ${getStudentCompletedSessionsCount(s.id)}</span>
              </button>
            `).join('')}
          </div>
        </div>
        <button onclick="addNewStudentPrompt()" class="btn-musanid-primary py-1.5 px-3 text-xs font-bold whitespace-nowrap">
          <i class="fa-solid fa-user-plus"></i>
          <span>طالب جديد</span>
        </button>
      </div>

      <div class="card-interactive p-6 lg:p-8 bg-white">
        <div class="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6">
          
          <div class="flex flex-col items-center gap-2 flex-shrink-0">
            <div class="avatar-drop-zone w-36 h-36 border-4 border-white ring-4 ring-blue-100 shadow-xl"
                 ondragover="event.preventDefault(); this.classList.add('ring-brand-orange')"
                 ondragleave="this.classList.remove('ring-brand-orange')"
                 ondrop="handleStudentPhotoDrop(event, '${student.id}')"
                 onclick="document.getElementById('student-photo-input-${student.id}').click()">
              <img src="${student.avatar}" alt="${student.name}" class="w-full h-full object-cover">
              <div class="avatar-overlay text-center p-2">
                <i class="fa-solid fa-cloud-arrow-up text-2xl mb-1 text-brand-orange"></i>
                <span class="text-xs font-bold">اسحب صورتك هنا<br>أو انقر للتغيير</span>
              </div>
            </div>
            <input type="file" id="student-photo-input-${student.id}" accept="image/*" class="hidden" onchange="handleStudentPhotoSelect(event, '${student.id}')">
            <span class="text-[11px] font-bold text-slate-400">سحب وإفلات الصورة</span>
          </div>

          <div class="flex-1 text-center lg:text-right space-y-3">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
              <div>
                <h2 class="text-2xl lg:text-3xl font-black text-slate-900">${student.name}</h2>
                <p class="text-sm font-bold text-brand-blue mt-0.5">${student.grade} • ${student.workshop || 'ورشة التأهيل'}</p>
              </div>
              
              <div class="flex items-center gap-2 justify-center lg:justify-end">
                <div class="px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-50 to-orange-50 border-2 border-brand-blue/20 text-slate-900 text-center shadow-sm">
                  <span class="text-[10px] font-black text-slate-500 block">إجمالي الجلسات المنجزة</span>
                  <span class="text-xl font-black text-brand-blue flex items-center justify-center gap-1">
                    <i class="fa-solid fa-award text-brand-orange"></i>
                    <span>⭐ ${completedSessions} جلسات</span>
                  </span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-600">
              <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span class="text-slate-400 block text-[10px]">الرقم المدني:</span>
                <span class="text-slate-800">${student.nationalId || '316041200981'}</span>
              </div>
              <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span class="text-slate-400 block text-[10px]">هاتف ولي الأمر:</span>
                <span class="text-slate-800">${student.guardianPhone || '96599887766'}</span>
              </div>
              <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                <span class="text-slate-400 block text-[10px]">المعلم المشرف:</span>
                <span class="text-slate-800">${student.teacher || 'معلم التربية الخاصة'}</span>
              </div>
            </div>
          </div>

          <div class="flex flex-row lg:flex-col gap-2.5 w-full lg:w-48">
            <button onclick="addSessionAttendanceModal('${student.id}')" class="btn-musanid-primary flex-1 lg:flex-initial py-3 px-4 text-sm">
              <i class="fa-solid fa-clock-rotate-left text-lg"></i>
              <span>تسجيل حضور جلسة</span>
            </button>
            <button onclick="editStudentModal('${student.id}')" class="btn-musanid-subtle flex-1 lg:flex-initial py-3 px-4 text-sm">
              <i class="fa-solid fa-user-pen text-lg"></i>
              <span>تعديل البيانات</span>
            </button>
            <button onclick="AppState.setActiveTab('reports')" class="btn-musanid-orange flex-1 lg:flex-initial py-3 px-4 text-sm">
              <i class="fa-solid fa-print text-lg"></i>
              <span>طباعة التقرير 360°</span>
            </button>
            <button onclick="deleteStudentPrompt('${student.id}', '${student.name}')" class="btn-musanid-subtle flex-1 lg:flex-initial py-2.5 px-4 text-xs text-rose-600 hover:bg-rose-50 hover:border-rose-200" title="حذف الطالب من النظام">
              <i class="fa-solid fa-trash-can ml-1"></i>
              <span>حذف الطالب</span>
            </button>
          </div>

        </div>

        ${student.medicalAlert ? `
          <div class="mt-6 p-4 rounded-xl bg-amber-50 border-r-4 border-amber-500 flex items-center gap-3 text-amber-900 font-bold text-sm">
            <i class="fa-solid fa-triangle-exclamation text-amber-600 text-2xl flex-shrink-0"></i>
            <span><strong>تنبيه صحي وسلوكي:</strong> ${student.medicalAlert}</span>
          </div>
        ` : ''}

      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div class="card-interactive p-5 bg-white">
          <div class="flex items-center justify-between mb-3">
            <div class="icon-box-lg icon-box-blue"><i class="fa-solid fa-award"></i></div>
            <span class="text-3xl font-black text-brand-blue">${completedSessions}</span>
          </div>
          <h3 class="text-lg font-bold text-slate-800">الجلسات المنجزة</h3>
          <p class="text-xs font-semibold text-slate-500 mt-1">حضور وتأهيل فعلي بالمركز</p>
          <div class="w-full bg-slate-100 h-2.5 rounded-full mt-3 overflow-hidden">
            <div class="bg-brand-blue h-full rounded-full" style="width: ${Math.min(100, completedSessions * 15)}%"></div>
          </div>
        </div>

        <div class="card-interactive p-5 bg-white">
          <div class="flex items-center justify-between mb-3">
            <div class="icon-box-lg icon-box-orange"><i class="fa-solid fa-hand-holding-medical"></i></div>
            <span class="text-3xl font-black text-brand-orange">${activeServices.length}</span>
          </div>
          <h3 class="text-lg font-bold text-slate-800">الخدمات المشروطة</h3>
          <p class="text-xs font-semibold text-slate-500 mt-1">${appointments.length} مواعيد مجدولة أسبوعياً</p>
          <div class="w-full bg-slate-100 h-2.5 rounded-full mt-3 overflow-hidden">
            <div class="bg-brand-orange h-full rounded-full" style="width: ${Math.min(100, activeServices.length * 20)}%"></div>
          </div>
        </div>

        <div class="card-interactive p-5 bg-white">
          <div class="flex items-center justify-between mb-3">
            <div class="icon-box-lg icon-box-purple"><i class="fa-solid fa-brain"></i></div>
            <span class="text-3xl font-black text-purple-700">${totalBehaviors}</span>
          </div>
          <h3 class="text-lg font-bold text-slate-800">رصد السلوك 360°</h3>
          <p class="text-xs font-semibold text-slate-500 mt-1">ملاحظات التحليل والضبط</p>
          <div class="w-full bg-slate-100 h-2.5 rounded-full mt-3 overflow-hidden">
            <div class="bg-purple-600 h-full rounded-full" style="width: ${Math.min(100, totalBehaviors * 25)}%"></div>
          </div>
        </div>

        <div class="card-interactive p-5 bg-white">
          <div class="flex items-center justify-between mb-3">
            <div class="icon-box-lg icon-box-emerald"><i class="fa-solid fa-restroom"></i></div>
            <span class="text-3xl font-black text-emerald-600">${toiletSuccessRate}%</span>
          </div>
          <h3 class="text-lg font-bold text-slate-800">نجاح تدريب الحمام</h3>
          <p class="text-xs font-semibold text-slate-500 mt-1">نسبة الاستجابة الإيجابية</p>
          <div class="w-full bg-slate-100 h-2.5 rounded-full mt-3 overflow-hidden">
            <div class="bg-emerald-500 h-full rounded-full" style="width: ${toiletSuccessRate}%"></div>
          </div>
        </div>

      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div class="card-interactive p-6 bg-white">
          <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
              <div class="icon-box-lg icon-box-blue"><i class="fa-solid fa-stethoscope"></i></div>
              <div>
                <h3 class="text-xl font-black text-slate-800">الخدمات والمواعيد المقررة</h3>
                <p class="text-xs font-bold text-slate-400">الخدمات المفعلة وجلسات الأخصائيين</p>
              </div>
            </div>
            <button onclick="AppState.setActiveTab('schedule')" class="text-sm font-bold text-brand-blue hover:underline">عرض في الجداول</button>
          </div>

          <div class="space-y-3">
            ${activeServices.length === 0 ? '<p class="text-slate-400 font-bold text-center py-4">لا توجد خدمات مفعلة حالياً لهذا الطالب.</p>' : ''}
            ${activeServices.map(srv => {
              const srvApt = appointments.find(a => a.serviceId === srv.id);
              return `
                <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:bg-blue-50/50 transition-colors">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brand-blue text-lg">
                      <i class="fa-solid ${srv.icon}"></i>
                    </div>
                    <div>
                      <h4 class="font-bold text-slate-800 text-base">${srv.name}</h4>
                      <p class="text-xs font-semibold text-slate-500">${srvApt ? `الأخصائي: ${srvApt.specialist} | يوم ${srvApt.day} الساعة ${srvApt.time}` : 'لم يحدد موعد بعد'}</p>
                    </div>
                  </div>
                  <span class="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-1 rounded-lg">نشط</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="card-interactive p-6 bg-white">
          <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
              <div class="icon-box-lg icon-box-purple"><i class="fa-solid fa-clock-rotate-left"></i></div>
              <div>
                <h3 class="text-xl font-black text-slate-800">سجل الجلسات والحضور الأخير</h3>
                <p class="text-xs font-bold text-slate-400">مواعيد الذهاب والإياب المسجلة</p>
              </div>
            </div>
            <button onclick="AppState.setActiveTab('sessionstats')" class="text-sm font-bold text-purple-700 hover:underline">فتح الإحصائيات</button>
          </div>

          <div class="space-y-3">
            ${AppState.sessionAttendance.filter(s => s.studentId === student.id).length === 0 ? '<p class="text-slate-400 font-bold text-center py-4">لم يتم تسجيل جلسات بعد.</p>' : ''}
            ${AppState.sessionAttendance.filter(s => s.studentId === student.id).slice(0, 3).map(sess => `
              <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span class="font-bold text-sm text-slate-800 block">${sess.serviceName}</span>
                  <span class="text-xs font-semibold text-slate-500">الذهاب: ${sess.departureTime} | الإياب: ${sess.returnTime || 'جارية حالياً'} (${sess.date})</span>
                </div>
                <span class="text-xs font-black px-2.5 py-1 rounded-lg ${sess.status === 'مكتملة' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">${sess.status}</span>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

    </div>
  `;
}

function handleStudentPhotoDrop(e, studentId) {
  e.preventDefault();
  e.currentTarget.classList.remove('ring-brand-orange');
  const files = e.dataTransfer.files;
  if (!files || files.length === 0) return;
  processStudentPhotoFile(files[0], studentId);
}

function handleStudentPhotoSelect(e, studentId) {
  const files = e.target.files;
  if (!files || files.length === 0) return;
  processStudentPhotoFile(files[0], studentId);
}

function processStudentPhotoFile(file, studentId) {
  if (!file.type.startsWith('image/')) {
    alert('يرجى اختيار ملف صورة صالح (JPG, PNG, WebP)');
    return;
  }
  const reader = new FileReader();
  reader.onload = (event) => {
    const student = AppState.students.find(s => s.id === studentId);
    if (student) {
      student.avatar = event.target.result;
      saveAllToStorage();
      AppState.notify();
      showToast('تم تحديث صورة الطالب ' + student.name + ' بنجاح!');
    }
  };
  reader.readAsDataURL(file);
}

// ========================================================
// 3. Conditional Services Tab
// ========================================================
function renderServicesTab() {
  const student = (AppState.students || []).find(s => s.id === AppState.selectedStudentId);
  const services = AppState.services || [];
  const appointments = (AppState.serviceAppointments || []).filter(a => a.studentId === AppState.selectedStudentId);

  return `
    <div class="wide-container py-6 space-y-6 animate-fadeIn">
      
      <div class="card-interactive p-6 bg-gradient-to-r from-blue-900 to-brand-blue text-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4 text-center md:text-right">
          <div class="icon-box-lg bg-white/10 text-white border-white/20"><i class="fa-solid fa-hand-holding-medical"></i></div>
          <div>
            <h2 class="text-2xl font-black">الخدمات المشروطة وبرامج التأهيل</h2>
            <p class="text-blue-100 text-sm font-semibold mt-0.5">تفعيل وإلغاء الخدمات المجدولة للطالب: <strong class="text-brand-orange underline">${student ? student.name : ''}</strong></p>
          </div>
        </div>
        <button onclick="addAppointmentModal('${student ? student.id : ''}')" class="btn-musanid-orange py-3 px-5 text-base">
          <i class="fa-solid fa-calendar-plus text-lg"></i>
          <span>جدولة موعد خدمة جديدة</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        ${services.map(srv => {
          const isEnrolled = (student && student.activeServices && student.activeServices.includes(srv.id));
          const srvApt = appointments.find(a => a.serviceId === srv.id);
          const enrolledStudentsCount = AppState.students.filter(s => (s.activeServices || []).includes(srv.id)).length;

          return `
            <div class="card-interactive p-6 bg-white flex flex-col justify-between group ${isEnrolled ? 'border-brand-blue ring-2 ring-blue-50' : 'opacity-85'}">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div class="icon-box-lg ${srv.color === 'orange' ? 'icon-box-orange' : srv.color === 'emerald' ? 'icon-box-emerald' : srv.color === 'purple' ? 'icon-box-purple' : 'icon-box-blue'}">
                    <i class="fa-solid ${srv.icon}"></i>
                  </div>
                  <span class="px-2.5 py-1 rounded-lg text-xs font-black ${isEnrolled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}">
                    ${isEnrolled ? 'مفعلة للطالب' : 'غير مفعلة'}
                  </span>
                </div>

                <h3 class="text-lg font-black text-slate-900 mb-1">${srv.name}</h3>
                <p class="text-xs font-bold text-slate-500 mb-3">تصنيف: ${srv.category} • مسجل بها: ${enrolledStudentsCount} طلاب</p>

                ${srvApt ? `
                  <div class="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-xs font-bold text-slate-800 mb-3">
                    <div class="text-brand-blue mb-0.5"><i class="fa-solid fa-user-doctor ml-1"></i>${srvApt.specialist}</div>
                    <div class="text-slate-600"><i class="fa-regular fa-clock ml-1"></i>يوم ${srvApt.day} الساعة ${srvApt.time}</div>
                  </div>
                ` : ''}
              </div>

              <div class="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button onclick="toggleService('${srv.id}')" class="btn-musanid-subtle flex-1 py-2 text-xs font-bold">
                  <i class="fa-solid ${isEnrolled ? 'fa-toggle-on text-emerald-600' : 'fa-toggle-off text-slate-400'} text-base"></i>
                  <span>${isEnrolled ? 'إلغاء التفعيل' : 'تفعيل الخدمة'}</span>
                </button>
                ${isEnrolled ? `
                  <button onclick="addAppointmentModal('${student ? student.id : ''}', '${srv.id}')" class="p-2 rounded-xl bg-blue-50 text-brand-blue hover:bg-blue-100" title="تعديل الموعد">
                    <i class="fa-solid fa-clock"></i>
                  </button>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>

    </div>
  `;
}

// ========================================================
// 4. Schedule by Service Tab (الجداول المنظمة داخل الخدمات)
// ========================================================
function renderScheduleTab() {
  const services = AppState.services || [];
  const appointments = AppState.serviceAppointments || [];

  return `
    <div class="wide-container py-6 space-y-6 animate-fadeIn">
      
      <div class="card-interactive p-6 bg-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="icon-box-lg icon-box-blue"><i class="fa-solid fa-calendar-days"></i></div>
          <div>
            <h2 class="text-2xl font-black text-slate-800">جداول الخدمات المشروطة ومواعيد الطلبة</h2>
            <p class="text-slate-500 font-bold text-sm">عرض الجلسات مقسمة بالخدمات مع جميع الطلبة المسجلين ومواعيدهم الأسبوعية</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="addAppointmentModal()" class="btn-musanid-primary py-3 px-5 text-base">
            <i class="fa-solid fa-plus text-lg"></i>
            <span>إضافة موعد طالب جديد</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        ${services.map(srv => {
          const srvAppointments = appointments.filter(a => a.serviceId === srv.id);
          
          return `
            <div class="card-interactive bg-white border border-slate-200 overflow-hidden flex flex-col justify-between shadow-sm">
              
              <div class="p-5 bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brand-blue text-xl shadow-sm">
                    <i class="fa-solid ${srv.icon}"></i>
                  </div>
                  <div>
                    <h3 class="text-lg font-black text-slate-900">${srv.name}</h3>
                    <p class="text-xs font-bold text-slate-500">التصنيف: ${srv.category} • الطلبة المسجلين: ${srvAppointments.length}</p>
                  </div>
                </div>
                <button onclick="addAppointmentModal('', '${srv.id}')" class="px-3 py-1.5 rounded-xl bg-white border border-blue-200 text-brand-blue font-bold text-xs hover:bg-blue-50 shadow-sm">
                  <i class="fa-solid fa-user-plus ml-1"></i>إضافة طالب
                </button>
              </div>

              <div class="p-5 space-y-3 flex-1">
                ${srvAppointments.length === 0 ? `
                  <div class="p-6 text-center text-slate-400 font-bold text-xs bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    لا يوجد طلبة مجدولين في هذه الخدمة حالياً.
                  </div>
                ` : ''}

                ${srvAppointments.map(apt => {
                  const student = (AppState.students || []).find(s => s.id === apt.studentId);
                  const studentName = student ? student.name : 'طالب غير مسجل';
                  const studentAvatar = student ? student.avatar : 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200';
                  const studentGrade = student ? student.grade : '';

                  return `
                    <div class="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/40 border border-slate-200 flex items-center justify-between gap-3 transition-colors">
                      <div class="flex items-center gap-3 min-w-0">
                        <img src="${studentAvatar}" class="w-11 h-11 rounded-xl object-cover border border-slate-200 shadow-sm flex-shrink-0">
                        <div class="min-w-0">
                          <h4 class="font-black text-sm text-slate-900 truncate">${studentName}</h4>
                          <p class="text-xs font-semibold text-slate-500 truncate">${studentGrade}</p>
                          <div class="flex items-center gap-2 mt-1 text-xs font-bold text-brand-blue">
                            <span><i class="fa-solid fa-user-doctor ml-1 text-slate-400"></i>${apt.specialist}</span>
                            <span class="text-slate-300">•</span>
                            <span>${apt.notes || 'جلسة تدريبية'}</span>
                          </div>
                        </div>
                      </div>

                      <div class="flex items-center gap-2 flex-shrink-0">
                        <div class="text-right px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                          <span class="text-xs font-black text-brand-orange block"><i class="fa-regular fa-clock ml-1"></i>${apt.time}</span>
                          <span class="text-[10px] font-bold text-slate-500">${apt.day}</span>
                        </div>
                        <button onclick="deleteAppointment('${apt.id}')" class="p-2 text-slate-400 hover:text-rose-600 rounded-lg" title="حذف الموعد">
                          <i class="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>

            </div>
          `;
        }).join('')}
      </div>

    </div>
  `;
}

// ========================================================
// Student Quick Sidebar Component
// ========================================================
function renderStudentSidebar() {
  if (!AppState.studentSidebarOpen) return '';

  const students = AppState.students || [];
  const searchTerm = (AppState.studentSearchTerm || '').trim().toLowerCase();
  const filteredStudents = searchTerm
    ? students.filter(s => (s.name && s.name.toLowerCase().includes(searchTerm)) || (s.grade && s.grade.toLowerCase().includes(searchTerm)))
    : students;

  return `
    <aside class="w-80 shrink-0 bg-white border-l border-slate-200 shadow-sm flex flex-col h-[calc(100vh-130px)] sticky top-28 rounded-2xl overflow-hidden animate-fadeIn mr-4">
      
      <!-- Sidebar Header -->
      <div class="p-4 border-b border-slate-100 bg-slate-50/70 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center font-bold text-sm">
              <i class="fa-solid fa-users"></i>
            </div>
            <div>
              <h3 class="font-black text-slate-800 text-sm">قائمة الطلبة</h3>
              <span class="text-[11px] font-bold text-slate-400">إجمالي (${students.length}) طالب</span>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <button onclick="addNewStudentPrompt()" class="btn-musanid-primary py-1.5 px-2.5 text-xs font-bold rounded-lg shadow-sm" title="إضافة طالب جديد">
              <i class="fa-solid fa-user-plus ml-1"></i>
              <span>إضافة</span>
            </button>
            <button onclick="AppState.toggleStudentSidebar()" class="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors" title="إغلاق القائمة">
              <i class="fa-solid fa-xmark text-xs"></i>
            </button>
          </div>
        </div>

        <!-- Quick Search -->
        <div class="relative">
          <i class="fa-solid fa-magnifying-glass absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
          <input type="text" 
                 value="${AppState.studentSearchTerm || ''}" 
                 oninput="AppState.setStudentSearchTerm(this.value)" 
                 placeholder="بحث سريع باسم الطالب أو الصف..." 
                 class="w-full pr-8 pl-3 py-1.5 text-xs font-bold rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none bg-white">
          ${searchTerm ? `
            <button onclick="AppState.setStudentSearchTerm('')" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 text-xs">
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Student List Items -->
      <div class="flex-1 overflow-y-auto p-2.5 space-y-1.5">
        ${filteredStudents.length === 0 ? `
          <div class="text-center py-8 text-slate-400">
            <i class="fa-solid fa-user-slash text-2xl mb-2"></i>
            <p class="text-xs font-bold">لا يوجد طلاب يطابقون البحث</p>
          </div>
        ` : filteredStudents.map(std => {
          const isSelected = std.id === AppState.selectedStudentId;
          const completedCount = getStudentCompletedSessionsCount(std.id);

          return `
            <div class="group relative p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2.5
                 ${isSelected ? 'bg-blue-50/90 border-brand-blue ring-1 ring-brand-blue/30 shadow-sm' : 'bg-white hover:bg-slate-50 border-slate-100 hover:border-slate-200'}"
                 onclick="selectStudentAndNavigate('${std.id}')">
              
              <div class="flex items-center gap-2.5 min-w-0 flex-1">
                <div class="relative w-10 h-10 rounded-xl overflow-hidden border ${isSelected ? 'border-brand-blue' : 'border-slate-200'} shadow-sm shrink-0">
                  <img src="${std.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200'}" alt="${std.name}" class="w-full h-full object-cover">
                </div>
                <div class="min-w-0 flex-1">
                  <h4 class="text-xs font-black ${isSelected ? 'text-brand-blue' : 'text-slate-800'} truncate" title="${std.name}">${std.name}</h4>
                  <div class="flex items-center gap-2 mt-0.5 text-[10px] font-bold text-slate-400">
                    <span class="truncate">${std.grade || 'التأهيل المهني'}</span>
                    <span class="text-brand-orange shrink-0">⭐ ${completedCount}</span>
                  </div>
                </div>
              </div>

              <!-- Student Actions in Sidebar -->
              <div class="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100" onclick="event.stopPropagation()">
                <button onclick="editStudentModal('${std.id}')" class="w-7 h-7 rounded-lg text-slate-400 hover:text-brand-blue hover:bg-blue-50 flex items-center justify-center transition-colors" title="تعديل بيانات الطالب">
                  <i class="fa-solid fa-pen text-[10px]"></i>
                </button>
                <button onclick="deleteStudentPrompt('${std.id}', '${std.name}')" class="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors" title="حذف الطالب">
                  <i class="fa-solid fa-trash-can text-[10px]"></i>
                </button>
              </div>

            </div>
          `;
        }).join('')}
      </div>

      <!-- Sidebar Footer -->
      <div class="p-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs font-bold text-slate-500">
        <button onclick="addNewStudentPrompt()" class="w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-brand-blue font-bold flex items-center justify-center gap-1.5 transition-colors">
          <i class="fa-solid fa-plus text-xs"></i>
          <span>إضافة طالب جديد للقائمة</span>
        </button>
      </div>

    </aside>
  `;
}

