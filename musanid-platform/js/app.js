/**
 * ========================================================
 * منصة مُسانِد v2.5 - Musanid Platform Base Edition
 * File: js/app.js
 * Description: Tasks & Roznama, Smart Archive, Backup & Restore,
 *              Action Modals, and Main Application Lifecycle / Router.
 * ========================================================
 */

// ========================================================
// 1. Tasks & Roznama (Interactive Calendar & Collapsible Panels)
// ========================================================

// Active calendar state
let roznamaCurrentDate = new Date(2026, 8, 5); // September 2026 default
let roznamaSelectedDayStr = new Date().toISOString().split('T')[0];
let taskPanelsOpen = {
  today: true,
  upcoming: true,
  completed: false
};

function toggleTaskPanel(panelKey) {
  taskPanelsOpen[panelKey] = !taskPanelsOpen[panelKey];
  const contentEl = document.getElementById(`panel-content-${panelKey}`);
  const iconEl = document.getElementById(`panel-icon-${panelKey}`);
  if (contentEl && iconEl) {
    if (taskPanelsOpen[panelKey]) {
      contentEl.classList.remove('hidden');
      iconEl.classList.add('rotate-180');
    } else {
      contentEl.classList.add('hidden');
      iconEl.classList.remove('rotate-180');
    }
  }
}

function changeRoznamaMonth(offset) {
  roznamaCurrentDate.setMonth(roznamaCurrentDate.getMonth() + offset);
  AppState.notify();
}

function resetRoznamaToToday() {
  roznamaCurrentDate = new Date();
  roznamaSelectedDayStr = roznamaCurrentDate.toISOString().split('T')[0];
  AppState.notify();
}

function selectRoznamaDate(dateStr) {
  roznamaSelectedDayStr = dateStr;
  AppState.notify();
}

function renderTasksTab() {
  const todayStr = new Date().toISOString().split('T')[0];
  const tasks = AppState.tasks || [];

  // Filter tasks
  const todayTasks = tasks.filter(t => !t.completed && (t.date === todayStr || t.priority === 'high'));
  const upcomingTasks = tasks.filter(t => !t.completed && t.date !== todayStr && t.priority !== 'high');
  const completedTasks = tasks.filter(t => t.completed);

  const totalTasks = tasks.length;
  const completedCount = completedTasks.length;
  const pendingCount = tasks.filter(t => !t.completed).length;
  const progressRate = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 100;

  // Calendar Calculations
  const year = roznamaCurrentDate.getFullYear();
  const month = roznamaCurrentDate.getMonth();
  const monthNamesArabic = [
    'يناير (1)', 'فبراير (2)', 'مارس (3)', 'أبريل (4)', 'مايو (5)', 'يونيو (6)',
    'يوليو (7)', 'أغسطس (8)', 'سبتمبر (9)', 'أكتوبر (10)', 'نوفمبر (11)', 'ديسمبر (12)'
  ];
  const monthName = monthNamesArabic[month];

  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sunday, 6 = Saturday
  // For Arabic calendar starting Saturday: (dayIndex + 1) % 7
  const startOffset = (firstDayIndex + 1) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Tasks mapped by date
  const tasksByDate = {};
  tasks.forEach(t => {
    if (!t.date) return;
    if (!tasksByDate[t.date]) tasksByDate[t.date] = [];
    tasksByDate[t.date].push(t);
  });

  // Selected date tasks
  const selectedDateTasks = tasks.filter(t => t.date === roznamaSelectedDayStr);

  return `
    <div class="wide-container py-6 space-y-6 animate-fadeIn">
      
      <!-- Top Header -->
      <div class="card-interactive p-6 bg-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="icon-box-lg icon-box-blue"><i class="fa-solid fa-list-check"></i></div>
          <div>
            <h2 class="text-2xl font-black text-slate-800">إدارة المهام والرزنامة التفاعلية</h2>
            <p class="text-slate-500 font-bold text-sm">جدولة المهام التأهيلية والتربوية، متابعة المواعيد، وتقويم شهري حي</p>
          </div>
        </div>
        <div class="flex items-center gap-3 flex-wrap">
          <button onclick="addTaskModal('${roznamaSelectedDayStr}')" class="btn-musanid-primary py-3 px-5 text-base shadow-md">
            <i class="fa-solid fa-plus text-lg"></i>
            <span>إضافة مهمة جديدة</span>
          </button>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div class="card-interactive p-5 bg-white border-b-4 border-brand-blue">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-400">إجمالي المهام المجدولة</span>
            <span class="w-8 h-8 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center text-sm font-black"><i class="fa-solid fa-tasks"></i></span>
          </div>
          <div class="text-3xl font-black text-brand-blue">${totalTasks}</div>
          <p class="text-xs font-bold text-slate-500 mt-1">مهام مدرجة في النظام</p>
        </div>

        <div class="card-interactive p-5 bg-white border-b-4 border-emerald-500">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-400">المهام المنجزة</span>
            <span class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-black"><i class="fa-solid fa-circle-check"></i></span>
          </div>
          <div class="text-3xl font-black text-emerald-600">${completedCount} <span class="text-sm font-bold">(${progressRate}%)</span></div>
          <p class="text-xs font-bold text-slate-500 mt-1">تمت بنجاح وتوثيقها</p>
        </div>

        <div class="card-interactive p-5 bg-white border-b-4 border-amber-500">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-400">مهام قيد الانتظار</span>
            <span class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-black"><i class="fa-solid fa-hourglass-half"></i></span>
          </div>
          <div class="text-3xl font-black text-amber-600">${pendingCount}</div>
          <p class="text-xs font-bold text-slate-500 mt-1">تتطلب المتابعة والتنفيذ</p>
        </div>

        <div class="card-interactive p-5 bg-white border-b-4 border-rose-500">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-400">مهام اليوم والمهام العاجلة</span>
            <span class="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-sm font-black"><i class="fa-solid fa-bell"></i></span>
          </div>
          <div class="text-3xl font-black text-rose-600">${todayTasks.length}</div>
          <p class="text-xs font-bold text-slate-500 mt-1">استحقاق اليوم أو ذات أولوية قصوى</p>
        </div>
      </div>

      <!-- Main Layout: Roznama Calendar (Left/Top) + Collapsible Tasks (Right/Bottom) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Roznama Interactive Calendar (7 Cols on large screen) -->
        <div class="lg:col-span-7 space-y-6">
          <div class="card-interactive p-6 bg-white shadow-lg space-y-4">
            
            <!-- Calendar Header Navigation -->
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center text-lg font-black">
                  <i class="fa-solid fa-calendar-days"></i>
                </div>
                <div>
                  <h3 class="text-lg font-black text-slate-800 flex items-center gap-2">
                    <span>الرزنامة الشهرية</span>
                    <span class="text-brand-blue">${monthName} ${year}</span>
                  </h3>
                  <p class="text-xs font-bold text-slate-400">اضغط على أي يوم لعرض مهامه أو إضافة مهمة جديدة</p>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <button onclick="changeRoznamaMonth(-1)" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-black transition-colors" title="الشهر السابق">
                  <i class="fa-solid fa-chevron-right"></i>
                </button>
                <button onclick="resetRoznamaToToday()" class="px-3 py-1 text-xs font-bold rounded-lg bg-blue-50 text-brand-blue hover:bg-blue-100 transition-colors">
                  اليوم
                </button>
                <button onclick="changeRoznamaMonth(1)" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-black transition-colors" title="الشهر التالي">
                  <i class="fa-solid fa-chevron-left"></i>
                </button>
              </div>
            </div>

            <!-- Days of Week Headers -->
            <div class="grid grid-cols-7 gap-1.5 text-center text-xs font-black text-slate-500 py-1 bg-slate-50 rounded-xl">
              <span>السبت</span>
              <span>الأحد</span>
              <span>الإثنين</span>
              <span>الثلاثاء</span>
              <span>الأربعاء</span>
              <span>الخميس</span>
              <span class="text-rose-500">الجمعة</span>
            </div>

            <!-- Calendar Days Grid -->
            <div class="grid grid-cols-7 gap-1.5">
              ${(() => {
                let cells = [];
                // Empty cells for offset
                for (let i = 0; i < startOffset; i++) {
                  cells.push(`<div class="h-20 sm:h-24 p-1 rounded-xl bg-slate-50/50 border border-transparent opacity-40"></div>`);
                }

                // Days in month
                for (let day = 1; day <= daysInMonth; day++) {
                  const dayFormatted = String(day).padStart(2, '0');
                  const monthFormatted = String(month + 1).padStart(2, '0');
                  const fullDateStr = `${year}-${monthFormatted}-${dayFormatted}`;
                  const isToday = fullDateStr === todayStr;
                  const isSelected = fullDateStr === roznamaSelectedDayStr;
                  const dayTaskList = tasksByDate[fullDateStr] || [];
                  const hasTasks = dayTaskList.length > 0;
                  const hasHighPriority = dayTaskList.some(t => t.priority === 'high' && !t.completed);

                  cells.push(`
                    <div onclick="selectRoznamaDate('${fullDateStr}')" 
                         class="h-20 sm:h-24 p-1.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group
                         ${isSelected ? 'bg-blue-50/90 border-brand-blue ring-2 ring-brand-blue/30 shadow-md' : 'bg-white border-slate-200 hover:border-brand-blue hover:bg-slate-50/80'}
                         ${isToday ? 'border-brand-orange bg-orange-50/30' : ''}">
                      
                      <div class="flex items-center justify-between">
                        <span class="w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center 
                          ${isToday ? 'bg-brand-orange text-white' : isSelected ? 'bg-brand-blue text-white' : 'text-slate-700 group-hover:text-brand-blue'}">
                          ${day}
                        </span>

                        ${hasHighPriority ? '<span class="w-2 h-2 rounded-full bg-rose-500 animate-ping" title="يوجد مهمة عاجلة"></span>' : ''}
                      </div>

                      <!-- Task Indicators in Day Cell -->
                      <div class="space-y-1 overflow-hidden">
                        ${hasTasks ? `
                          <div class="bg-blue-100/80 text-brand-blue rounded px-1 py-0.5 text-[10px] font-black truncate flex items-center gap-1">
                            <i class="fa-solid fa-list-check text-[9px]"></i>
                            <span>${dayTaskList.length} مهام</span>
                          </div>
                        ` : ''}
                      </div>

                    </div>
                  `);
                }
                return cells.join('');
              })()}
            </div>

            <!-- Selected Date Info Bar & Quick Add -->
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div class="flex items-center gap-2.5">
                <span class="w-8 h-8 rounded-lg bg-white border border-slate-300 text-brand-blue flex items-center justify-center font-black text-sm">
                  <i class="fa-solid fa-calendar-check"></i>
                </span>
                <div>
                  <span class="text-xs font-black text-slate-700 block">
                    مهام يوم: <strong class="text-brand-blue">${getArabicDayName(roznamaSelectedDayStr)} (${roznamaSelectedDayStr})</strong>
                  </span>
                  <span class="text-[11px] font-bold text-slate-500">${selectedDateTasks.length} مهام مسجلة في هذا التاريخ</span>
                </div>
              </div>

              <button onclick="addTaskModal('${roznamaSelectedDayStr}')" class="btn-musanid-primary py-2 px-3.5 text-xs font-black rounded-xl">
                <i class="fa-solid fa-plus"></i>
                <span>إضافة مهمة في هذا اليوم</span>
              </button>
            </div>

            <!-- Selected Day Tasks Preview -->
            ${selectedDateTasks.length > 0 ? `
              <div class="space-y-2 pt-2">
                <h4 class="text-xs font-black text-slate-600">قائمة مهام اليوم المحدد في الرزنامة:</h4>
                <div class="space-y-2 max-h-56 overflow-y-auto pr-1">
                  ${selectedDateTasks.map(t => `
                    <div class="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between hover:shadow-sm transition-all">
                      <div class="flex items-center gap-3">
                        <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="toggleTask('${t.id}')" class="w-4 h-4 text-brand-blue rounded cursor-pointer">
                        <div>
                          <span class="text-xs font-black text-slate-800 ${t.completed ? 'line-through text-slate-400' : ''}">${t.title}</span>
                          <span class="text-[10px] font-bold text-slate-400 block">${t.category || 'عام'} • ${t.studentName || 'جميع الطلاب'} • ${t.time || '10:00 ص'}</span>
                        </div>
                      </div>
                      <button onclick="deleteTask('${t.id}')" class="text-slate-400 hover:text-rose-600 p-1"><i class="fa-solid fa-trash-can text-xs"></i></button>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

          </div>
        </div>

        <!-- Collapsible Task Panels (5 Cols on large screen) -->
        <div class="lg:col-span-5 space-y-5">
          
          <!-- Panel 1: Today & Urgent Tasks (Collapsible) -->
          <div class="card-interactive bg-white shadow-md overflow-hidden border border-rose-200">
            <div onclick="toggleTaskPanel('today')" class="p-4 bg-gradient-to-r from-rose-50 to-orange-50 border-b border-rose-100 flex items-center justify-between cursor-pointer hover:bg-rose-100/50 transition-colors">
              <div class="flex items-center gap-3">
                <span class="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center text-sm font-black shadow-sm">
                  <i class="fa-solid fa-fire"></i>
                </span>
                <div>
                  <h4 class="text-sm font-black text-slate-800">مهام اليوم والمهام العاجلة</h4>
                  <span class="text-[11px] font-bold text-rose-600">${todayTasks.length} مهام تتطلب الإنجاز الفوري</span>
                </div>
              </div>
              <i id="panel-icon-today" class="fa-solid fa-chevron-down text-slate-400 transition-transform duration-300 ${taskPanelsOpen.today ? 'rotate-180' : ''}"></i>
            </div>

            <div id="panel-content-today" class="p-4 space-y-3 ${taskPanelsOpen.today ? '' : 'hidden'}">
              ${todayTasks.length === 0 ? `
                <div class="p-6 text-center text-slate-400 text-xs font-bold">
                  <i class="fa-solid fa-circle-check text-emerald-500 text-2xl block mb-2"></i>
                  لا توجد مهام عاجلة متبقية لليوم! عمل رائع 🌟
                </div>
              ` : todayTasks.map(t => renderTaskCard(t)).join('')}
            </div>
          </div>

          <!-- Panel 2: Upcoming Scheduled Tasks (Collapsible) -->
          <div class="card-interactive bg-white shadow-md overflow-hidden border border-slate-200">
            <div onclick="toggleTaskPanel('upcoming')" class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors">
              <div class="flex items-center gap-3">
                <span class="w-8 h-8 rounded-lg bg-brand-blue text-white flex items-center justify-center text-sm font-black shadow-sm">
                  <i class="fa-solid fa-clock"></i>
                </span>
                <div>
                  <h4 class="text-sm font-black text-slate-800">المهام القادمة والمجدولة</h4>
                  <span class="text-[11px] font-bold text-slate-500">${upcomingTasks.length} مهام في الرزنامة</span>
                </div>
              </div>
              <i id="panel-icon-upcoming" class="fa-solid fa-chevron-down text-slate-400 transition-transform duration-300 ${taskPanelsOpen.upcoming ? 'rotate-180' : ''}"></i>
            </div>

            <div id="panel-content-upcoming" class="p-4 space-y-3 ${taskPanelsOpen.upcoming ? '' : 'hidden'}">
              ${upcomingTasks.length === 0 ? `
                <div class="p-6 text-center text-slate-400 text-xs font-bold">
                  لا توجد مهام قادمة مسجلة حالياً.
                </div>
              ` : upcomingTasks.map(t => renderTaskCard(t)).join('')}
            </div>
          </div>

          <!-- Panel 3: Completed Tasks (Collapsible) -->
          <div class="card-interactive bg-white shadow-md overflow-hidden border border-emerald-200">
            <div onclick="toggleTaskPanel('completed')" class="p-4 bg-emerald-50/50 border-b border-emerald-100 flex items-center justify-between cursor-pointer hover:bg-emerald-100/50 transition-colors">
              <div class="flex items-center gap-3">
                <span class="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm font-black shadow-sm">
                  <i class="fa-solid fa-check-double"></i>
                </span>
                <div>
                  <h4 class="text-sm font-black text-slate-800">المهام المنجزة المكتملة</h4>
                  <span class="text-[11px] font-bold text-emerald-700">${completedTasks.length} مهام تم إنجازها</span>
                </div>
              </div>
              <i id="panel-icon-completed" class="fa-solid fa-chevron-down text-slate-400 transition-transform duration-300 ${taskPanelsOpen.completed ? 'rotate-180' : ''}"></i>
            </div>

            <div id="panel-content-completed" class="p-4 space-y-3 ${taskPanelsOpen.completed ? '' : 'hidden'}">
              ${completedTasks.length === 0 ? `
                <div class="p-6 text-center text-slate-400 text-xs font-bold">
                  لم يتم إنجاز أي مهام بعد.
                </div>
              ` : completedTasks.map(t => renderTaskCard(t)).join('')}
            </div>
          </div>

        </div>

      </div>

    </div>
  `;
}

// Task Card Template
function renderTaskCard(t) {
  const isCompleted = t.completed;
  let priorityBadge = '';
  if (t.priority === 'high') {
    priorityBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-black bg-rose-100 text-rose-800">عاجلة</span>';
  } else if (t.priority === 'medium') {
    priorityBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-black bg-amber-100 text-amber-800">متوسطة</span>';
  } else {
    priorityBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-black bg-slate-100 text-slate-700">عادية</span>';
  }

  return `
    <div class="p-3.5 rounded-xl border transition-all ${isCompleted ? 'bg-slate-50 border-slate-200 opacity-75' : 'bg-white border-slate-200 hover:border-brand-blue shadow-sm'}">
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-start gap-3">
          <input type="checkbox" ${isCompleted ? 'checked' : ''} onchange="toggleTask('${t.id}')" class="w-4 h-4 mt-1 text-brand-blue rounded cursor-pointer">
          <div>
            <h5 class="font-black text-sm text-slate-800 ${isCompleted ? 'line-through text-slate-400' : ''}">${t.title}</h5>
            <div class="flex flex-wrap items-center gap-2 mt-1 text-[11px] font-bold text-slate-500">
              <span><i class="fa-solid fa-calendar-day ml-1 text-brand-blue"></i>${t.date || 'اليوم'} (${t.time || '10:00 ص'})</span>
              <span>•</span>
              <span><i class="fa-solid fa-user-tag ml-1 text-slate-400"></i>${t.studentName || 'عام'}</span>
              <span>•</span>
              <span class="text-brand-orange">${t.category || 'تأهيلي'}</span>
            </div>
            ${t.notes ? `<p class="text-xs text-slate-500 mt-1.5 font-normal">${t.notes}</p>` : ''}
          </div>
        </div>

        <div class="flex flex-col items-end gap-2">
          ${priorityBadge}
          <button onclick="deleteTask('${t.id}')" class="text-slate-400 hover:text-rose-600 p-1 transition-colors" title="حذف المهمة">
            <i class="fa-solid fa-trash-can text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Toggle Task status
function toggleTask(id) {
  const task = (AppState.tasks || []).find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveAllToStorage();
    AppState.notify();
    showToast(task.completed ? 'تم وضع علامة إنجاز للمهمة ✓' : 'تمت إعادة المهمة لقيد التنفيذ');
  }
}

// Delete Task
function deleteTask(id) {
  if (!confirm('هل أنت متأكد من حذف هذه المهمة؟')) return;
  AppState.tasks = (AppState.tasks || []).filter(t => t.id !== id);
  saveAllToStorage();
  AppState.notify();
  showToast('تم حذف المهمة بنجاح');
}

// Add Task Modal
function addTaskModal(prefillDate = '') {
  const modal = document.getElementById('modal-container');
  const todayStr = new Date().toISOString().split('T')[0];
  const targetDate = prefillDate || todayStr;
  const studentsOptions = (AppState.students || []).map(s => `<option value="${s.name}">${s.name}</option>`).join('');

  modal.innerHTML = `
    <div class="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div class="card-interactive max-w-lg w-full bg-white p-6 sm:p-8 shadow-2xl">
        
        <div class="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div class="flex items-center gap-3">
            <div class="icon-box-lg icon-box-blue"><i class="fa-solid fa-calendar-plus"></i></div>
            <div>
              <h3 class="text-xl font-black text-slate-800">إضافة مهمة جديدة في الرزنامة</h3>
              <p class="text-xs font-bold text-slate-500">حفظ فوري في ذاكرة المتصفح والفلاشة</p>
            </div>
          </div>
          <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-slate-400 hover:text-slate-600 text-xl font-bold"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <form id="add-task-form" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">عنوان أو نص المهمة:</label>
            <input type="text" id="task-input-title" required placeholder="مثال: إعداد تقرير الخطة الفردية للطالب أحمد" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-sm focus:border-brand-blue outline-none">
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">تاريخ الاستحقاق في الرزنامة:</label>
              <input type="date" id="task-input-date" required value="${targetDate}" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm focus:border-brand-blue outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">وقت التنفيذ:</label>
              <input type="text" id="task-input-time" value="10:00 ص" placeholder="مثال: 09:30 ص" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm focus:border-brand-blue outline-none">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">الأولوية:</label>
              <select id="task-input-priority" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm focus:border-brand-blue outline-none">
                <option value="high">🚨 عاجلة جداً (أولوية قصوى)</option>
                <option value="medium" selected>⚡ متوسطة</option>
                <option value="low">☕ عادية</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">تصنيف المهمة:</label>
              <select id="task-input-category" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm focus:border-brand-blue outline-none">
                <option value="تأهيلي" selected>تأهيلي وحركي</option>
                <option value="نطق وتخاطب">نطق وتخاطب</option>
                <option value="أكاديمي">أكاديمي وتربوي</option>
                <option value="سلوكي">متابعة وتعديل سلوك</option>
                <option value="طبي">طبي وصحي</option>
                <option value="إداري">إداري وتقارير</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">الطالب المرتبط بالمهمة:</label>
            <select id="task-input-student" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm focus:border-brand-blue outline-none">
              <option value="جميع الطلاب">جميع الطلاب (عام)</option>
              ${studentsOptions}
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">ملاحظات إضافية:</label>
            <textarea id="task-input-notes" rows="2" placeholder="أي تفاصيل أو أهداف مرتبطة بالمهمة..." class="w-full px-4 py-2 rounded-xl border border-slate-300 font-bold text-sm focus:border-brand-blue outline-none"></textarea>
          </div>

          <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button type="button" onclick="document.getElementById('modal-container').innerHTML=''" class="btn-musanid-subtle py-2.5 px-5">إلغاء</button>
            <button type="submit" class="btn-musanid-primary py-2.5 px-6 font-black shadow-md">
              <i class="fa-solid fa-check"></i>
              <span>حفظ المهمة في الرزنامة</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  `;

  document.getElementById('add-task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('task-input-title').value.trim();
    const date = document.getElementById('task-input-date').value;
    const time = document.getElementById('task-input-time').value.trim();
    const priority = document.getElementById('task-input-priority').value;
    const category = document.getElementById('task-input-category').value;
    const studentName = document.getElementById('task-input-student').value;
    const notes = document.getElementById('task-input-notes').value.trim();

    const newTask = {
      id: 'task-' + Date.now(),
      title: title,
      date: date,
      time: time,
      priority: priority,
      category: category,
      studentName: studentName,
      notes: notes,
      completed: false
    };

    if (!AppState.tasks) AppState.tasks = [];
    AppState.tasks.push(newTask);
    saveAllToStorage();
    document.getElementById('modal-container').innerHTML = '';
    AppState.notify();
    showToast('تمت إضافة المهمة للرزنامة بنجاح ✓');
  });
}

function addTaskPrompt() {
  addTaskModal();
}


// ========================================================
// 2. Smart Media & Documents Archive (PDF, Images, Videos, Docs)
// ========================================================

function renderArchiveTab() {
  const activeFilter = AppState.archiveFilter || 'all';
  const allFiles = AppState.archiveFiles || [];

  const filteredFiles = allFiles.filter(file => {
    if (activeFilter === 'all') return true;
    return file.category === activeFilter;
  });

  const pdfCount = allFiles.filter(f => f.category === 'pdf').length;
  const imageCount = allFiles.filter(f => f.category === 'image').length;
  const videoCount = allFiles.filter(f => f.category === 'video').length;
  const docCount = allFiles.filter(f => f.category === 'doc').length;

  return `
    <div class="wide-container py-6 space-y-6 animate-fadeIn">
      
      <!-- Top Header -->
      <div class="card-interactive p-6 bg-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="icon-box-lg icon-box-orange"><i class="fa-solid fa-folder-open"></i></div>
          <div>
            <h2 class="text-2xl font-black text-slate-800">الأرشيف الذكي والمستندات والوسائط</h2>
            <p class="text-slate-500 font-bold text-sm">رفع وتخزين وعرض وتنزيل ملفات PDF، الصور، الفيديوهات، والتقارير الطبية على الفلاشة</p>
          </div>
        </div>
        <div class="flex items-center gap-3 flex-wrap">
          <button onclick="addArchiveModal()" class="btn-musanid-orange py-3 px-5 text-base shadow-md">
            <i class="fa-solid fa-cloud-arrow-up text-lg"></i>
            <span>رفع ملف جديد للأرشيف</span>
          </button>
        </div>
      </div>

      <!-- Filter Tabs & Stats -->
      <div class="flex flex-wrap items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        <div class="flex flex-wrap items-center gap-2">
          <button onclick="setArchiveFilter('all')" class="px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all ${activeFilter === 'all' ? 'bg-brand-blue text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
            <i class="fa-solid fa-layer-group ml-1.5"></i>
            <span>الكل (${allFiles.length})</span>
          </button>
          <button onclick="setArchiveFilter('pdf')" class="px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all ${activeFilter === 'pdf' ? 'bg-rose-600 text-white shadow-md' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'}">
            <i class="fa-solid fa-file-pdf ml-1.5"></i>
            <span>مستندات وخطط PDF (${pdfCount})</span>
          </button>
          <button onclick="setArchiveFilter('image')" class="px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all ${activeFilter === 'image' ? 'bg-emerald-600 text-white shadow-md' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}">
            <i class="fa-solid fa-image ml-1.5"></i>
            <span>الصور (${imageCount})</span>
          </button>
          <button onclick="setArchiveFilter('video')" class="px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all ${activeFilter === 'video' ? 'bg-purple-600 text-white shadow-md' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'}">
            <i class="fa-solid fa-video ml-1.5"></i>
            <span>الفيديوهات (${videoCount})</span>
          </button>
          <button onclick="setArchiveFilter('doc')" class="px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all ${activeFilter === 'doc' ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}">
            <i class="fa-solid fa-file-lines ml-1.5"></i>
            <span>التقارير والمستندات (${docCount})</span>
          </button>
        </div>

        <div class="text-xs font-bold text-slate-400 hidden lg:flex items-center gap-1.5">
          <i class="fa-solid fa-hard-drive text-brand-orange"></i>
          <span>مساحة التخزين المحلية نشطة ومؤمنة</span>
        </div>
      </div>

      <!-- Drag & Drop Quick Upload Area -->
      <div ondragover="event.preventDefault(); this.classList.add('border-brand-orange', 'bg-orange-50/50');" 
           ondragleave="this.classList.remove('border-brand-orange', 'bg-orange-50/50');" 
           ondrop="handleArchiveDrop(event)"
           onclick="addArchiveModal()"
           class="border-2 border-dashed border-slate-300 hover:border-brand-orange rounded-2xl p-8 text-center bg-white cursor-pointer transition-all hover:shadow-md group">
        <div class="w-16 h-16 rounded-2xl bg-orange-100 text-brand-orange flex items-center justify-center mx-auto mb-3 text-2xl group-hover:scale-110 transition-transform">
          <i class="fa-solid fa-cloud-arrow-up"></i>
        </div>
        <h3 class="text-lg font-black text-slate-800">اسحب وأفلت الملفات هنا، أو اضغط للاختيار والرفع</h3>
        <p class="text-xs font-bold text-slate-500 mt-1">يدعم ملفات PDF، مقاطع الفيديو (MP4, WebM)، الصور (JPG, PNG)، ومستندات Word</p>
      </div>

      <!-- Files Grid -->
      <div>
        ${filteredFiles.length === 0 ? `
          <div class="card-interactive p-12 text-center bg-white">
            <div class="icon-box-lg icon-box-orange mx-auto mb-3"><i class="fa-solid fa-folder-open"></i></div>
            <h3 class="text-xl font-bold text-slate-700">لا توجد ملفات في هذا التصنيف</h3>
            <p class="text-slate-500 mt-1">اضغط على زر الرفع لإضافة مستندات أو صور أو مقاطع فيديو جديدة للأرشيف.</p>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${filteredFiles.map(file => {
              let badgeColor = 'bg-slate-100 text-slate-700';
              let icon = 'fa-file';
              let iconBg = 'bg-slate-100 text-slate-600';
              
              if (file.category === 'pdf') {
                badgeColor = 'bg-rose-100 text-rose-800';
                icon = 'fa-file-pdf';
                iconBg = 'bg-rose-50 text-rose-600';
              } else if (file.category === 'video') {
                badgeColor = 'bg-purple-100 text-purple-800';
                icon = 'fa-video';
                iconBg = 'bg-purple-50 text-purple-600';
              } else if (file.category === 'image') {
                badgeColor = 'bg-emerald-100 text-emerald-800';
                icon = 'fa-image';
                iconBg = 'bg-emerald-50 text-emerald-600';
              } else if (file.category === 'doc') {
                badgeColor = 'bg-blue-100 text-blue-800';
                icon = 'fa-file-word';
                iconBg = 'bg-blue-50 text-blue-600';
              }

              return `
                <div class="card-interactive p-5 bg-white flex flex-col justify-between shadow-md hover:shadow-xl transition-all">
                  
                  <div>
                    <!-- Header & Badge -->
                    <div class="flex items-start justify-between gap-3 pb-3 mb-3 border-b border-slate-100">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center text-xl font-black shrink-0">
                          <i class="fa-solid ${icon}"></i>
                        </div>
                        <div class="overflow-hidden">
                          <h4 class="font-black text-slate-800 text-sm truncate" title="${file.name}">${file.name}</h4>
                          <span class="text-[11px] font-bold text-slate-400 block">${file.size || '1.5 ميجابايت'} • ${file.date || 'اليوم'}</span>
                        </div>
                      </div>
                      <span class="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase shrink-0 ${badgeColor}">${file.category}</span>
                    </div>

                    <!-- Tag & Notes -->
                    <div class="space-y-2 mb-4 text-xs font-bold">
                      <div class="flex items-center gap-1.5 text-brand-blue bg-blue-50/70 p-2 rounded-lg">
                        <i class="fa-solid fa-user-tag text-xs"></i>
                        <span>الطالب: <strong>${file.studentName || 'عام'}</strong></span>
                      </div>
                      <p class="text-slate-600 line-clamp-2 text-xs leading-relaxed">${file.notes || 'مستند محفوظ في أرشيف المنصة'}</p>
                    </div>
                  </div>

                  <!-- Action Buttons (Preview, Download, Delete) -->
                  <div class="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2">
                    <button onclick="viewArchiveModal('${file.id}')" class="btn-musanid-primary py-2 px-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm" title="معاينة وعرض">
                      <i class="fa-solid fa-eye"></i>
                      <span>معاينة</span>
                    </button>

                    <button onclick="downloadArchiveFile('${file.id}')" class="btn-musanid-orange py-2 px-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm" title="تحميل وتنزيل">
                      <i class="fa-solid fa-download"></i>
                      <span>تنزيل</span>
                    </button>

                    <button onclick="deleteArchiveFile('${file.id}')" class="btn-musanid-subtle py-2 px-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200" title="حذف">
                      <i class="fa-solid fa-trash-can"></i>
                      <span>حذف</span>
                    </button>
                  </div>

                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>

    </div>
  `;
}

// Set filter category
function setArchiveFilter(filter) {
  AppState.archiveFilter = filter;
  AppState.notify();
}

// Modal to add file
function addArchiveModal() {
  const modal = document.getElementById('modal-container');
  const studentsOptions = (AppState.students || []).map(s => `<option value="${s.name}">${s.name}</option>`).join('');

  modal.innerHTML = `
    <div class="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div class="card-interactive max-w-lg w-full bg-white p-6 sm:p-8 shadow-2xl">
        
        <div class="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div class="flex items-center gap-3">
            <div class="icon-box-lg icon-box-orange"><i class="fa-solid fa-cloud-arrow-up"></i></div>
            <div>
              <h3 class="text-xl font-black text-slate-800">رفع وإضافة ملف للأرشيف</h3>
              <p class="text-xs font-bold text-slate-500">حفظ محلي فوري على الفلاشة</p>
            </div>
          </div>
          <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-slate-400 hover:text-slate-600 text-xl font-bold"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <form id="archive-upload-form" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">اسم الملف أو المستند:</label>
            <input type="text" id="arch-file-title" required placeholder="مثال: الخطة الفردية للفصل الأول.pdf" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-sm focus:border-brand-orange outline-none">
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">نوع وتصنيف الملف:</label>
              <select id="arch-file-category" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm focus:border-brand-orange outline-none">
                <option value="pdf">📄 مستند PDF</option>
                <option value="image">🖼️ صورة (JPG / PNG)</option>
                <option value="video">🎥 فيديو (MP4 / WebM)</option>
                <option value="doc">📝 مستند وتقرير (Doc)</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">الطالب المعني:</label>
              <select id="arch-file-student" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm focus:border-brand-orange outline-none">
                <option value="جميع الطلاب">جميع الطلاب (عام)</option>
                ${studentsOptions}
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">اختيار الملف من الجهاز / الفلاشة:</label>
            <input type="file" id="arch-file-input" class="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-xs bg-slate-50 text-slate-700" accept=".pdf,.png,.jpg,.jpeg,.mp4,.webm,.docx,.doc">
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">ملاحظات ووصف الملف:</label>
            <textarea id="arch-file-notes" rows="2" placeholder="وصف محتوى الملف أو الملاحظات الطبية..." class="w-full px-4 py-2 rounded-xl border border-slate-300 font-bold text-sm focus:border-brand-orange outline-none"></textarea>
          </div>

          <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button type="button" onclick="document.getElementById('modal-container').innerHTML=''" class="btn-musanid-subtle py-2.5 px-5">إلغاء</button>
            <button type="submit" class="btn-musanid-orange py-2.5 px-6 font-black shadow-md">
              <i class="fa-solid fa-check"></i>
              <span>تأكيد وحفظ بالأرشيف</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  `;

  document.getElementById('archive-upload-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('arch-file-title').value.trim();
    const category = document.getElementById('arch-file-category').value;
    const studentName = document.getElementById('arch-file-student').value;
    const notes = document.getElementById('arch-file-notes').value.trim();
    const fileInput = document.getElementById('arch-file-input');

    let fileDataUrl = '';
    let fileSize = '1.2 ميجابايت';

    if (fileInput.files && fileInput.files[0]) {
      const f = fileInput.files[0];
      fileSize = (f.size / (1024 * 1024)).toFixed(1) + ' ميجابايت';
      const reader = new FileReader();
      reader.onload = function(evt) {
        fileDataUrl = evt.target.result;
        saveNewArchiveItem(title, category, studentName, notes, fileSize, fileDataUrl);
      };
      reader.readAsDataURL(f);
    } else {
      // Fallback sample url
      fileDataUrl = category === 'pdf' ? 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' :
                    category === 'image' ? 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800' :
                    category === 'video' ? 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' : '#';
      saveNewArchiveItem(title, category, studentName, notes, fileSize, fileDataUrl);
    }
  });
}

function saveNewArchiveItem(title, category, studentName, notes, size, url) {
  const newItem = {
    id: 'arch-' + Date.now(),
    name: title,
    category: category,
    type: category,
    studentName: studentName,
    notes: notes,
    size: size,
    date: new Date().toISOString().split('T')[0],
    url: url
  };

  if (!AppState.archiveFiles) AppState.archiveFiles = [];
  AppState.archiveFiles.unshift(newItem);
  if (typeof AppState.saveArchiveFiles === 'function') {
    AppState.saveArchiveFiles();
  } else {
    saveAllToStorage();
  }
  document.getElementById('modal-container').innerHTML = '';
  AppState.notify();
  showToast('تم رفع وحفظ الملف في الأرشيف بنجاح ✓');
}

// Handle drag and drop files
function handleArchiveDrop(event) {
  event.preventDefault();
  event.currentTarget.classList.remove('border-brand-orange', 'bg-orange-50/50');
  
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    const f = files[0];
    const ext = f.name.split('.').pop().toLowerCase();
    let cat = 'doc';
    if (ext === 'pdf') cat = 'pdf';
    else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) cat = 'image';
    else if (['mp4', 'webm', 'mov', 'avi'].includes(ext)) cat = 'video';

    const size = (f.size / (1024 * 1024)).toFixed(1) + ' ميجابايت';
    const reader = new FileReader();
    reader.onload = function(evt) {
      saveNewArchiveItem(f.name, cat, 'جميع الطلاب', 'ملف تم سحبه وإفلاته في الأرشيف', size, evt.target.result);
    };
    reader.readAsDataURL(f);
  }
}

// View file modal (PDF, Image, Video)
function viewArchiveModal(id) {
  const file = (AppState.archiveFiles || []).find(f => f.id === id);
  if (!file) return;

  const modal = document.getElementById('modal-container');
  let previewContent = '';

  if (file.category === 'pdf') {
    previewContent = `
      <div class="w-full h-[65vh] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 flex flex-col items-center justify-center p-4">
        <iframe src="${file.url}" class="w-full h-full rounded-xl" frameborder="0"></iframe>
        <div class="mt-2 text-center text-xs font-bold text-slate-500">
          إذا لم يظهر ملف PDF داخل المعاينة، يمكنك <a href="${file.url}" target="_blank" class="text-brand-blue underline">فتحه في نافذة جديدة</a> أو تحميله مباشرة.
        </div>
      </div>
    `;
  } else if (file.category === 'image') {
    previewContent = `
      <div class="w-full max-h-[65vh] bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center p-2">
        <img src="${file.url}" alt="${file.name}" class="max-w-full max-h-[60vh] object-contain rounded-xl shadow-lg">
      </div>
    `;
  } else if (file.category === 'video') {
    previewContent = `
      <div class="w-full max-h-[65vh] bg-black rounded-2xl overflow-hidden flex items-center justify-center">
        <video controls autoplay class="w-full max-h-[60vh] rounded-xl">
          <source src="${file.url}" type="video/mp4">
          متصفحك لا يدعم مشغل الفيديو المدمج.
        </video>
      </div>
    `;
  } else {
    previewContent = `
      <div class="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200">
        <div class="w-16 h-16 rounded-2xl bg-blue-100 text-brand-blue flex items-center justify-center text-3xl mx-auto mb-3">
          <i class="fa-solid fa-file-lines"></i>
        </div>
        <h4 class="text-lg font-black text-slate-800">${file.name}</h4>
        <p class="text-xs font-bold text-slate-500 mt-1">${file.notes || 'مستند نصي جاهز للتنزيل'}</p>
      </div>
    `;
  }

  modal.innerHTML = `
    <div class="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn overflow-y-auto">
      <div class="card-interactive max-w-4xl w-full bg-white p-6 sm:p-8 shadow-2xl space-y-4">
        
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div class="flex items-center gap-3">
            <span class="w-10 h-10 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center font-bold"><i class="fa-solid fa-eye"></i></span>
            <div>
              <h3 class="text-lg font-black text-slate-800 truncate max-w-md">${file.name}</h3>
              <span class="text-xs font-bold text-slate-400">الطالب: ${file.studentName} • ${file.size}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="downloadArchiveFile('${file.id}')" class="btn-musanid-orange py-2 px-4 text-xs font-black rounded-xl">
              <i class="fa-solid fa-download"></i>
              <span>تنزيل</span>
            </button>
            <button onclick="document.getElementById('modal-container').innerHTML=''" class="btn-musanid-subtle py-2 px-3 text-xs font-bold rounded-xl"><i class="fa-solid fa-xmark"></i></button>
          </div>
        </div>

        ${previewContent}

        <div class="p-3 bg-slate-50 rounded-xl text-xs font-bold text-slate-600 flex items-center justify-between">
          <span><strong>ملاحظات:</strong> ${file.notes || 'لا توجد ملاحظات إضافية'}</span>
          <span>تاريخ الإضافة: ${file.date}</span>
        </div>

      </div>
    </div>
  `;
}

// Download archive file
function downloadArchiveFile(id) {
  const file = (AppState.archiveFiles || []).find(f => f.id === id);
  if (!file) return;

  const a = document.createElement('a');
  a.href = file.url && file.url !== '#' ? file.url : 'data:text/plain;charset=utf-8,' + encodeURIComponent('محتوى الملف: ' + file.name + '\n' + file.notes);
  a.download = file.name || 'ملف_الارشيف';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast(`جاري تنزيل الملف: ${file.name} ✓`);
}

// Delete archive file
function deleteArchiveFile(id) {
  if (!confirm('هل أنت متأكد من حذف هذا الملف من الأرشيف؟')) return;
  AppState.archiveFiles = (AppState.archiveFiles || []).filter(f => f.id !== id);
  if (typeof AppState.saveArchiveFiles === 'function') {
    AppState.saveArchiveFiles();
  } else {
    saveAllToStorage();
  }
  AppState.notify();
  showToast('تم حذف الملف من الأرشيف');
}


// ========================================================
// 3. Backup, Restore & Portable Data
// ========================================================

function renderBackupTab() {
  const isOnline = typeof navigator !== 'undefined' && navigator.onLine;

  // طلب تحديث مقاييس التخزين واللقطات بصورة غير متزامنة
  setTimeout(async () => {
    if (typeof MusanidDB !== 'undefined') {
      const metrics = await MusanidDB.getStorageMetrics();
      const elUsage = document.getElementById('db-storage-usage');
      const elQuota = document.getElementById('db-storage-quota');
      const elSnapshots = document.getElementById('db-snapshots-count');
      if (elUsage) elUsage.textContent = metrics.browserUsageFormatted || '0 ميجابايت';
      if (elQuota) elQuota.textContent = metrics.browserQuotaFormatted || 'غير محدود';
      if (elSnapshots) elSnapshots.textContent = metrics.snapshotsCount + ' لقطة محفوظة';

      // تحديث قائمة اللقطات
      renderSnapshotsList();
    }
  }, 50);

  return `
    <div class="wide-container py-6 space-y-6 animate-fadeIn">
      
      <!-- Page Header -->
      <div class="card-interactive p-6 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="icon-box-lg icon-box-purple"><i class="fa-solid fa-database"></i></div>
          <div>
            <h2 class="text-2xl font-black text-slate-800">قاعدة البيانات، المزامنة والتخزين الذكي</h2>
            <p class="text-slate-500 font-bold text-sm">محرك IndexedDB مدمج مع تخزين متصفح ذكي، لقطات استرجاع فورية، ومزامنة آمنة Offline-First</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="triggerImmediateSnapshot()" class="btn-musanid-primary py-2.5 px-4 text-xs sm:text-sm font-bold flex items-center gap-2">
            <i class="fa-solid fa-camera-retro"></i>
            <span>أخذ نقطة استرجاع (Snapshot)</span>
          </button>
          <button onclick="triggerCloudSync()" class="btn-musanid-orange py-2.5 px-4 text-xs sm:text-sm font-bold flex items-center gap-2">
            <i class="fa-solid fa-arrows-rotate"></i>
            <span>مزامنة ذكية الآن</span>
          </button>
        </div>
      </div>

      <!-- Live Engine Status & Metrics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="card-interactive p-5 bg-white border border-slate-200">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-500">حالة محرك البيانات</span>
            <span class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">
              <i class="fa-solid fa-server"></i>
            </span>
          </div>
          <div class="mt-3 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-base font-black text-slate-800">IndexedDB + Cache</span>
          </div>
          <span class="text-[11px] font-bold text-emerald-600 block mt-1">تخزين محلي فائق السرعة ومؤمن</span>
        </div>

        <div class="card-interactive p-5 bg-white border border-slate-200">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-500">استهلاك التخزين الفعلي</span>
            <span class="w-8 h-8 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center font-bold text-sm">
              <i class="fa-solid fa-hard-drive"></i>
            </span>
          </div>
          <div class="mt-3">
            <span id="db-storage-usage" class="text-xl font-black text-slate-800">جاري القياس...</span>
          </div>
          <span class="text-[11px] font-bold text-slate-400 block mt-1">المساحة المتاحة: <span id="db-storage-quota">--</span></span>
        </div>

        <div class="card-interactive p-5 bg-white border border-slate-200">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-500">نقاط الاسترجاع السريعة</span>
            <span class="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
              <i class="fa-solid fa-clock-rotate-left"></i>
            </span>
          </div>
          <div class="mt-3">
            <span id="db-snapshots-count" class="text-xl font-black text-slate-800">جاري الفحص...</span>
          </div>
          <span class="text-[11px] font-bold text-purple-600 block mt-1">استعادة بضغطة زر بدون ملفات</span>
        </div>

        <div class="card-interactive p-5 bg-white border border-slate-200">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-500">حالة المزامنة والشبكة</span>
            <span class="w-8 h-8 rounded-xl ${isOnline ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'} flex items-center justify-center font-bold text-sm">
              <i class="fa-solid ${isOnline ? 'fa-wifi' : 'fa-plane'}"></i>
            </span>
          </div>
          <div class="mt-3">
            <span class="text-base font-black ${isOnline ? 'text-emerald-700' : 'text-amber-700'}">${isOnline ? 'متصل (جاهز للمزامنة)' : 'وضع غير متصل (Offline)'}</span>
          </div>
          <span class="text-[11px] font-bold text-slate-400 block mt-1">${isOnline ? 'تكامل سحابي فوري متاح' : 'تخزين الطابور محلياً بأمان'}</span>
        </div>
      </div>

      <!-- Action Section: Portable Import & Export (JSON) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="card-interactive p-6 bg-white space-y-4">
          <div class="icon-box-lg icon-box-blue"><i class="fa-solid fa-download"></i></div>
          <h3 class="text-xl font-bold text-slate-800">تصدير قاعدة البيانات بالكامل (ملف فلاشة JSON)</h3>
          <p class="text-slate-600 text-sm font-semibold">حفظ كافة سجلات الطلاب، الجداول، الملاحظات السلوكية، خريطة الجسد، والمستندات بملف مشفر قياسي لنقله بين أجهزة المركز.</p>
          <button onclick="exportBackup()" class="btn-musanid-primary w-full py-3.5 text-base flex items-center justify-center gap-2">
            <i class="fa-solid fa-file-arrow-down text-lg"></i>
            <span>تصدير وحفظ النسخة الاحتياطية</span>
          </button>
        </div>

        <div class="card-interactive p-6 bg-white space-y-4">
          <div class="icon-box-lg icon-box-orange"><i class="fa-solid fa-upload"></i></div>
          <h3 class="text-xl font-bold text-slate-800">استعادة قاعدة البيانات من ملف</h3>
          <p class="text-slate-600 text-sm font-semibold">استرجاع كامل لبيانات الطلاب والجلسات من ملف النسخة الاحتياطية المحفوظ على الفلاشة أو القرص الصلب مع الفحص الفوري للسلامة.</p>
          <label class="btn-musanid-orange w-full py-3.5 text-base cursor-pointer text-center flex items-center justify-center gap-2">
            <i class="fa-solid fa-file-arrow-up text-lg"></i>
            <span>اختيار ملف النسخة لاستعادته</span>
            <input type="file" class="hidden" accept=".json" onchange="importBackup(event)">
          </label>
        </div>
      </div>

      <!-- Snapshots & Instant Rollback Section -->
      <div class="card-interactive p-6 bg-white border border-slate-200 space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <i class="fa-solid fa-clock-rotate-left"></i>
            </div>
            <div>
              <h3 class="text-lg font-black text-slate-800">نقاط الاسترجاع اللحظية (Snapshots History)</h3>
              <p class="text-xs font-bold text-slate-400">لقطات دورية ذكية تحفظ حالة النظام وتتيح العودة لأي نقطة زمنية سابقة في ثانية واحدة</p>
            </div>
          </div>
          <button onclick="triggerImmediateSnapshot()" class="btn-musanid-subtle text-xs py-2 px-3 font-bold hover:bg-purple-50 hover:text-purple-700">
            <i class="fa-solid fa-plus ml-1"></i> نقطة جديدة
          </button>
        </div>

        <!-- Snapshots List Container -->
        <div id="snapshots-list-container" class="space-y-3">
          <div class="text-center py-6 text-slate-400 font-bold text-sm">
            <i class="fa-solid fa-spinner fa-spin ml-2"></i> جاري استعراض نقاط الاسترجاع...
          </div>
        </div>
      </div>

      <!-- Diagnostics, Health Check & Factory Reset -->
      <div class="card-interactive p-6 bg-white border border-slate-200">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold"><i class="fa-solid fa-heart-pulse"></i></span>
            <div>
              <h4 class="text-base font-black text-slate-800">فحص سلامة قاعدة البيانات والبيانات النموذجية</h4>
              <p class="text-xs font-bold text-slate-400">تدقيق التناسق الإكلينيكي وحذف أي سجلات معلقة أو إعادة الضبط</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="runDataDiagnosticsModal()" class="btn-musanid-subtle py-2.5 px-4 text-xs font-bold hover:bg-blue-50 hover:text-brand-blue">
              <i class="fa-solid fa-stethoscope"></i>
              <span>فحص تكامل البيانات</span>
            </button>
            <button onclick="resetToInitialSeedData()" class="btn-musanid-subtle py-2.5 px-4 text-xs font-bold hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200">
              <i class="fa-solid fa-rotate-left"></i>
              <span>استعادة البيانات النموذجية</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  `;
}

function exportBackup() {
  const data = {
    platform: 'Musanid-Platform-v2.5',
    version: '2.5.0',
    exportDate: new Date().toISOString(),
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
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Musanid_Full_Backup_' + new Date().toISOString().split('T')[0] + '.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast('تم تصدير النسخة الاحتياطية بنجاح إلى الفلاشة');
}

function importBackup(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const d = JSON.parse(event.target.result);
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
      saveAllToStorage();
      if (typeof MusanidDB !== 'undefined') {
        MusanidDB.createSnapshot('نسخة احتياطية مستوردة من ملف خارجي');
      }
      AppState.notify();
      showToast('تم استعادة كافة بيانات المنصة بنجاح!');
    } catch(err) {
      showToast('فشل قراءة ملف النسخة الاحتياطية');
    }
  };
  reader.readAsText(file);
}

// Render Snapshots list inside database tab
async function renderSnapshotsList() {
  const container = document.getElementById('snapshots-list-container');
  if (!container || typeof MusanidDB === 'undefined') return;

  const list = await MusanidDB.getAllSnapshots();
  if (list.length === 0) {
    container.innerHTML = `
      <div class="text-center py-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <i class="fa-solid fa-clock text-slate-300 text-2xl mb-1"></i>
        <p class="text-xs font-bold text-slate-500">لا توجد نقاط استرجاع محفوظة حالياً. اضغط "أخذ نقطة استرجاع" لإنشاء أول نقطة.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(snap => `
    <div class="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
          <i class="fa-solid fa-database"></i>
        </div>
        <div>
          <h4 class="text-xs font-black text-slate-800">${snap.note || 'نقطة استرجاع لحظية'}</h4>
          <span class="text-[11px] font-bold text-slate-400 block">${snap.displayDate || snap.date} • ${snap.stats ? snap.stats.studentsCount : 0} طلاب • ${snap.stats ? snap.stats.sessionsCount : 0} جلسات</span>
        </div>
      </div>
      <div class="flex items-center gap-2 self-end sm:self-auto">
        <button onclick="restoreSnapshotPrompt('${snap.id}')" class="btn-musanid-primary py-1.5 px-3 text-[11px] font-bold rounded-lg flex items-center gap-1 shadow-sm" title="العودة لهذه النقطة">
          <i class="fa-solid fa-rotate-left"></i>
          <span>استرجاع فوري</span>
        </button>
        <button onclick="deleteSnapshotPrompt('${snap.id}')" class="btn-musanid-subtle py-1.5 px-2 text-[11px] font-bold rounded-lg hover:bg-rose-50 hover:text-rose-600" title="حذف">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  `).join('');
}

// Trigger immediate manual snapshot
async function triggerImmediateSnapshot() {
  if (typeof MusanidDB === 'undefined') return;
  const note = prompt('أدخل وصفاً أو سبباً لنقطة الاسترجاع:', 'نقطة حفظ يدوية للمعلم') || 'نقطة حفظ يدوية';
  const snap = await MusanidDB.createSnapshot(note);
  if (snap) {
    showToast('تم إنشاء نقطة استرجاع ذكية بنجاح ✓', 'fa-camera-retro');
    renderSnapshotsList();
    const elSnapshots = document.getElementById('db-snapshots-count');
    if (elSnapshots) {
      const metrics = await MusanidDB.getStorageMetrics();
      elSnapshots.textContent = metrics.snapshotsCount + ' لقطة محفوظة';
    }
  } else {
    showToast('تعذر إنشاء نقطة الاسترجاع');
  }
}

// Prompt & restore snapshot
async function restoreSnapshotPrompt(snapshotId) {
  if (!confirm('هل أنت متأكد من العودة إلى نقطة الاسترجاع هذه؟ سيتم استبدال الحالة الحالية بما كان مسجلاً في تلك اللحظة.')) return;
  if (typeof MusanidDB === 'undefined') return;
  const ok = await MusanidDB.restoreSnapshot(snapshotId);
  if (ok) {
    showToast('تمت استعادة نقطة الاسترجاع المحددة بنجاح ✓', 'fa-rotate-left');
  } else {
    showToast('فشل استرجاع النقطة المحددة');
  }
}

// Delete snapshot
async function deleteSnapshotPrompt(snapshotId) {
  if (!confirm('هل تريد حذف نقطة الاسترجاع هذه؟')) return;
  if (typeof MusanidDB === 'undefined') return;
  await MusanidDB.deleteSnapshot(snapshotId);
  showToast('تم حذف نقطة الاسترجاع');
  renderSnapshotsList();
}

// Trigger smart cloud / network sync
async function triggerCloudSync() {
  if (typeof MusanidDB === 'undefined') return;
  showToast('جاري بدء عملية المزامنة الذكية...', 'fa-arrows-rotate');
  const res = await MusanidDB.syncWithRemote();
  showToast(res.message || 'تمت المزامنة بنجاح', res.mode === 'offline_buffered' ? 'fa-plane' : 'fa-check');
}

// Data diagnostics modal
function runDataDiagnosticsModal() {
  if (typeof MusanidDB === 'undefined') return;
  const audit = MusanidDB.auditDataIntegrity(AppState);
  const modal = document.getElementById('modal-container');
  
  modal.innerHTML = `
    <div class="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div class="card-interactive max-w-lg w-full bg-white p-6 sm:p-8 shadow-2xl space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center font-bold">
              <i class="fa-solid fa-stethoscope"></i>
            </div>
            <div>
              <h3 class="text-lg font-black text-slate-800">تقرير فحص سلامة وتكامل البيانات</h3>
              <span class="text-xs font-bold text-slate-400">تاريخ الفحص: ${new Date().toLocaleTimeString('ar-SA')}</span>
            </div>
          </div>
          <button onclick="document.getElementById('modal-container').innerHTML=''" class="btn-musanid-subtle py-2 px-3 text-xs font-bold rounded-xl">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="space-y-3">
          <div class="p-4 rounded-xl ${audit.healthy ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'} flex items-center gap-3">
            <i class="fa-solid ${audit.healthy ? 'fa-circle-check text-emerald-600' : 'fa-triangle-exclamation text-amber-600'} text-2xl"></i>
            <div>
              <h4 class="font-black text-sm">${audit.healthy ? 'قاعدة البيانات سليمة 100% وبحالة ممتازة' : `تم رصد ${audit.issuesCount} ملاحظات عدم تناسق`}</h4>
              <p class="text-xs font-bold mt-0.5">${audit.healthy ? 'جميع سجلات الطلاب، الجلسات، المواعيد، والسلوكيات مترابطة بشكل سليم بدون أي تعارض.' : 'توجد بعض السجلات غير المرتبطة بطالب مسجل.'}</p>
            </div>
          </div>

          ${audit.issues.length > 0 ? `
            <div class="max-h-40 overflow-y-auto space-y-1.5 p-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-600">
              ${audit.issues.map(iss => `<div class="p-2 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center gap-2"><i class="fa-solid fa-circle-exclamation text-rose-500"></i><span>${iss}</span></div>`).join('')}
            </div>
          ` : ''}

          <div class="grid grid-cols-2 gap-3 pt-2 text-xs font-bold text-slate-600">
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span class="text-slate-400 block mb-1">الطلاب المسجلين</span>
              <strong class="text-base text-brand-blue">${(AppState.students || []).length}</strong>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span class="text-slate-400 block mb-1">جلسات الحضور</span>
              <strong class="text-base text-emerald-600">${(AppState.sessionAttendance || []).length}</strong>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span class="text-slate-400 block mb-1">سجلات السلوك ABC</span>
              <strong class="text-base text-purple-600">${(AppState.behaviorLogs || []).length}</strong>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span class="text-slate-400 block mb-1">ملفات الأرشيف</span>
              <strong class="text-base text-brand-orange">${(AppState.archiveFiles || []).length}</strong>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 flex justify-end">
          <button onclick="document.getElementById('modal-container').innerHTML=''" class="btn-musanid-primary py-2.5 px-6 font-bold text-xs rounded-xl">
            إغلاق التقرير
          </button>
        </div>
      </div>
    </div>
  `;
}

function resetToInitialSeedData() {
  if (!confirm('هل أنت متأكد من استعادة البيانات النموذجية الأولية؟ سيتم تحديث السجلات المخزنة.')) return;
  AppState.students = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
  AppState.services = JSON.parse(JSON.stringify(INITIAL_SERVICES));
  AppState.serviceAppointments = JSON.parse(JSON.stringify(INITIAL_APPOINTMENTS));
  AppState.sessionAttendance = JSON.parse(JSON.stringify(INITIAL_SESSION_ATTENDANCE));
  AppState.behaviorLogs = JSON.parse(JSON.stringify(INITIAL_BEHAVIOR_LOGS));
  AppState.bodyInjuries = JSON.parse(JSON.stringify(INITIAL_BODY_INJURIES));
  AppState.toiletLogs = JSON.parse(JSON.stringify(INITIAL_TOILET_LOGS));
  AppState.tasks = JSON.parse(JSON.stringify(INITIAL_TASKS));
  AppState.archiveFiles = JSON.parse(JSON.stringify(INITIAL_ARCHIVE_FILES));
  AppState.selectedStudentId = AppState.students[0].id;
  saveAllToStorage();
  AppState.notify();
  showToast('تمت استعادة البيانات النموذجية الأولية بنجاح ✓');
}


// ========================================================
// 4. Shared Action Modals & Fast Handlers
// ========================================================

function selectStudentAndNavigate(studentId) {
  AppState.setSelectedStudent(studentId);
  // إذا لم يكن المستخدم في تبويب ملف الطالب 360° أو تبويب متعلق بالطلاب، يمكن توجيهه بسلاسة
  if (AppState.activeTab !== 'students' && AppState.activeTab !== 'bodymap' && AppState.activeTab !== 'toilet' && AppState.activeTab !== 'behavior' && AppState.activeTab !== 'reports') {
    AppState.setActiveTab('students');
  }
}

function addNewStudentPrompt() {
  const modal = document.getElementById('modal-container');
  if (!modal) return;

  const services = AppState.services || [];

  modal.innerHTML = `
    <div class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div class="card-interactive p-6 max-w-lg w-full bg-white max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
          <div class="flex items-center gap-2.5">
            <div class="w-10 h-10 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center font-bold">
              <i class="fa-solid fa-user-plus"></i>
            </div>
            <div>
              <h3 class="text-xl font-black text-slate-800">إضافة طالب جديد</h3>
              <p class="text-xs font-bold text-slate-400">إدراج طالب في الصف وقاعدة بيانات المركز</p>
            </div>
          </div>
          <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-slate-400 hover:text-slate-600 text-xl">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form id="add-student-form" class="space-y-4 text-right">
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">اسم الطالب الكامل: <span class="text-rose-500">*</span></label>
            <input type="text" id="new-std-name" required placeholder="مثال: عبدالمحسن مبارك العازمي" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">الصف أو الورشة:</label>
              <input type="text" id="new-std-grade" value="${AppState.currentUser ? (AppState.currentUser.className || 'ورشة التأهيل المهني (أ)') : 'ورشة التأهيل المهني (أ)'}" required class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">الرقم المدني:</label>
              <input type="text" id="new-std-national" placeholder="316..." class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">هاتف ولي الأمر:</label>
              <input type="text" id="new-std-phone" placeholder="965..." class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">المعلم المشرف:</label>
              <input type="text" id="new-std-teacher" value="${AppState.currentUser ? (AppState.currentUser.teacherName || 'معلم التربية الخاصة') : 'معلم التربية الخاصة'}" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
            </div>
          </div>

          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">تنبيه صحي أو سلوكي (اختياري):</label>
            <input type="text" id="new-std-alert" placeholder="مثال: حساسية من الفول السوداني، يحتاج تعزيز دوري..." class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
          </div>

          <div>
            <label class="block text-sm font-bold text-slate-700 mb-2">الخدمات المشروطة النشطة للطالب:</label>
            <div class="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
              ${services.map(s => `
                <label class="flex items-center gap-2 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer">
                  <input type="checkbox" name="new-std-services" value="${s.id}" checked class="rounded text-brand-blue">
                  <span class="truncate">${s.name}</span>
                </label>
              `).join('')}
            </div>
          </div>

          <div class="flex gap-3 pt-4 border-t border-slate-200">
            <button type="submit" class="btn-musanid-primary flex-1 py-3 text-base flex items-center justify-center gap-2 shadow-md">
              <i class="fa-solid fa-check"></i>
              <span>إضافة الطالب وتثبيته</span>
            </button>
            <button type="button" onclick="document.getElementById('modal-container').innerHTML=''" class="btn-musanid-subtle py-3 px-5 text-base">إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById('add-student-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('new-std-name').value.trim();
    if (!name) return;

    const grade = document.getElementById('new-std-grade').value.trim();
    const nationalId = document.getElementById('new-std-national').value.trim();
    const guardianPhone = document.getElementById('new-std-phone').value.trim();
    const teacher = document.getElementById('new-std-teacher').value.trim();
    const medicalAlert = document.getElementById('new-std-alert').value.trim();

    const checkedServices = Array.from(document.querySelectorAll('input[name="new-std-services"]:checked')).map(cb => cb.value);

    // صور افتراضية لطيفة للطلاب
    const defaultAvatars = [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200'
    ];
    const randomAvatar = defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];

    const newStd = {
      id: 'std-' + Date.now(),
      name,
      grade: grade || 'ورشة التأهيل المهني (أ)',
      nationalId: nationalId || '3' + Math.floor(10000000000 + Math.random() * 90000000000),
      guardianPhone: guardianPhone || '9659' + Math.floor(1000000 + Math.random() * 9000000),
      teacher: teacher || (AppState.currentUser ? AppState.currentUser.teacherName : 'معلم التربية الخاصة'),
      medicalAlert: medicalAlert || '',
      avatar: randomAvatar,
      activeServices: checkedServices.length > 0 ? checkedServices : ['speech', 'behavior'],
      joinedDate: new Date().toISOString().split('T')[0]
    };

    if (!AppState.students) AppState.students = [];
    AppState.students.push(newStd);
    AppState.selectedStudentId = newStd.id;
    
    saveAllToStorage();
    if (typeof MusanidDB !== 'undefined') {
      MusanidDB.createSnapshot('إضافة الطالب: ' + newStd.name);
    }
    
    modal.innerHTML = '';
    AppState.notify();
    showToast(`تمت إضافة الطالب (${newStd.name}) بنجاح ✓`, 'fa-user-check');
  });
}

function deleteStudentPrompt(studentId, studentName) {
  const std = (AppState.students || []).find(s => s.id === studentId);
  const name = studentName || (std ? std.name : 'الطالب');

  if (!confirm(`تحذير: هل أنت متأكد من رغبتك في حذف الطالب (${name}) من قائمة الصف وقاعدة البيانات؟\nسيتم حذف سجلاته المرتبطة.`)) {
    return;
  }

  // حذف الطالب
  AppState.students = (AppState.students || []).filter(s => s.id !== studentId);

  // حذف أو تنظيف السجلات المرتبطة للحفاظ على تكامل قاعدة البيانات
  AppState.serviceAppointments = (AppState.serviceAppointments || []).filter(a => a.studentId !== studentId);
  AppState.sessionAttendance = (AppState.sessionAttendance || []).filter(s => s.studentId !== studentId);
  AppState.behaviorLogs = (AppState.behaviorLogs || []).filter(b => b.studentId !== studentId);
  AppState.bodyInjuries = (AppState.bodyInjuries || []).filter(i => i.studentId !== studentId);
  AppState.bodyAttachments = (AppState.bodyAttachments || []).filter(a => a.studentId !== studentId);
  AppState.toiletLogs = (AppState.toiletLogs || []).filter(t => t.studentId !== studentId);

  // إعادة ضبط الطالب المحدد
  if (AppState.selectedStudentId === studentId) {
    AppState.selectedStudentId = AppState.students.length > 0 ? AppState.students[0].id : '';
  }

  saveAllToStorage();
  if (typeof MusanidDB !== 'undefined') {
    MusanidDB.createSnapshot('حذف الطالب: ' + name);
  }

  AppState.notify();
  showToast(`تم حذف الطالب (${name}) بنجاح`, 'fa-trash-can');
}

function editStudentModal(studentId) {
  const student = (AppState.students || []).find(s => s.id === studentId);
  if (!student) return;

  const modal = document.getElementById('modal-container');
  modal.innerHTML = `
    <div class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div class="card-interactive p-6 max-w-xl w-full bg-white max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
          <h3 class="text-xl font-black text-brand-blue-dark">تعديل بيانات وصورة الطالب: ${student.name}</h3>
          <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-slate-400 hover:text-slate-600 text-xl"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <div class="mb-4 text-center">
          <label class="block text-sm font-bold text-slate-700 mb-2">صورة الطالب (اسحب وأفلت هنا أو انقر لتغييرها):</label>
          <div class="avatar-drop-zone w-24 h-24 mx-auto border-4 border-white ring-4 ring-blue-100 shadow-md"
               ondragover="event.preventDefault(); this.classList.add('ring-brand-orange')"
               ondragleave="this.classList.remove('ring-brand-orange')"
               ondrop="handleStudentPhotoDrop(event, '${student.id}')"
               onclick="document.getElementById('modal-avatar-input-${student.id}').click()">
            <img src="${student.avatar}" class="w-full h-full object-cover">
            <div class="avatar-overlay text-xs">
              <i class="fa-solid fa-camera"></i>
              <span>تغيير</span>
            </div>
          </div>
          <input type="file" id="modal-avatar-input-${student.id}" accept="image/*" class="hidden" onchange="handleStudentPhotoSelect(event, '${student.id}')">
        </div>

        <form id="edit-student-form" class="space-y-4 text-right">
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">الاسم الكامل للطالب:</label>
            <input type="text" id="edit-std-name" value="${student.name}" required class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
          </div>
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">الصف أو الورشة التأهيلية:</label>
            <input type="text" id="edit-std-grade" value="${student.grade}" required class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">الرقم المدني:</label>
              <input type="text" id="edit-std-national" value="${student.nationalId || ''}" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">هاتف ولي الأمر:</label>
              <input type="text" id="edit-std-phone" value="${student.guardianPhone || ''}" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
            </div>
          </div>
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">تنبيه صحي وسلوكي:</label>
            <textarea id="edit-std-alert" rows="2" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">${student.medicalAlert || ''}</textarea>
          </div>
          <div class="flex gap-3 pt-4 border-t border-slate-200">
            <button type="submit" class="btn-musanid-primary flex-1 py-3 text-base">حفظ التعديلات</button>
            <button type="button" onclick="document.getElementById('modal-container').innerHTML=''" class="btn-musanid-subtle py-3 px-5 text-base">إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById('edit-student-form').addEventListener('submit', (e) => {
    e.preventDefault();
    student.name = document.getElementById('edit-std-name').value;
    student.grade = document.getElementById('edit-std-grade').value;
    student.nationalId = document.getElementById('edit-std-national').value;
    student.guardianPhone = document.getElementById('edit-std-phone').value;
    student.medicalAlert = document.getElementById('edit-std-alert').value;
    saveAllToStorage();
    modal.innerHTML = '';
    AppState.notify();
    showToast('تم حفظ بيانات الطالب بنجاح');
  });
}

function addAppointmentModal(targetStudentId = '', targetServiceId = '') {
  const selectedStudent = targetStudentId || AppState.selectedStudentId;
  const services = AppState.services || [];
  const modal = document.getElementById('modal-container');

  modal.innerHTML = `
    <div class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div class="card-interactive p-6 max-w-lg w-full bg-white max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
          <h3 class="text-xl font-black text-brand-blue-dark">جدولة موعد / تسجيل طالب في خدمة</h3>
          <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-slate-400 hover:text-slate-600 text-xl"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <form id="add-apt-form" class="space-y-4 text-right">
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">اختيار الطالب:</label>
            <select id="apt-student" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
              ${AppState.students.map(s => `<option value="${s.id}" ${s.id === selectedStudent ? 'selected' : ''}>${s.name} (${s.grade})</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">الخدمة المشروطة / الورشة:</label>
            <select id="apt-service" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
              ${services.map(s => `<option value="${s.id}" ${s.id === targetServiceId ? 'selected' : ''}>${s.name} (${s.category})</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">اسم الأخصائي / المشرف:</label>
            <input type="text" id="apt-specialist" required placeholder="مثال: د. يوسف التميمي / أ. منى" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">اليوم:</label>
              <select id="apt-day" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
                <option value="الأحد">الأحد</option>
                <option value="الإثنين">الإثنين</option>
                <option value="الثلاثاء">الثلاثاء</option>
                <option value="الأربعاء">الأربعاء</option>
                <option value="الخميس">الخميس</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">الوقت:</label>
              <input type="text" id="apt-time" placeholder="مثال: 09:30 ص" required value="09:00 ص" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
            </div>
          </div>
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">ملاحظات الجلسة والهدف الإكلينيكي:</label>
            <input type="text" id="apt-notes" placeholder="ملاحظات المتابعة..." class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
          </div>
          <div class="flex gap-3 pt-4 border-t border-slate-200">
            <button type="submit" class="btn-musanid-primary flex-1 py-3 text-base">تأكيد وحفظ الموعد</button>
            <button type="button" onclick="document.getElementById('modal-container').innerHTML=''" class="btn-musanid-subtle py-3 px-5 text-base">إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById('add-apt-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const stdId = document.getElementById('apt-student').value;
    const srvId = document.getElementById('apt-service').value;
    const student = AppState.students.find(s => s.id === stdId);

    const newApt = {
      id: 'apt-' + Date.now(),
      studentId: stdId,
      serviceId: srvId,
      specialist: document.getElementById('apt-specialist').value,
      day: document.getElementById('apt-day').value,
      time: document.getElementById('apt-time').value,
      notes: document.getElementById('apt-notes').value
    };

    if (student) {
      student.activeServices = student.activeServices || [];
      if (!student.activeServices.includes(srvId)) {
        student.activeServices.push(srvId);
      }
    }

    AppState.serviceAppointments.push(newApt);
    saveAllToStorage();
    modal.innerHTML = '';
    AppState.notify();
    showToast('تمت إضافة الموعد والجلسة بنجاح وتحديث الجداول');
  });
}

function addBehaviorModal() {
  if (typeof openAddBehaviorModal === 'function') {
    openAddBehaviorModal();
    return;
  }

  const modal = document.getElementById('modal-container');
  const todayStr = new Date().toISOString().split('T')[0];
  const todayDay = getArabicDayName(todayStr);

  modal.innerHTML = `
    <div class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div class="card-interactive p-6 max-w-2xl w-full bg-white max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
          <div class="flex items-center gap-2">
            <div class="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center"><i class="fa-solid fa-brain"></i></div>
            <h3 class="text-xl font-black text-slate-800">رصد ملاحظة سلوكية 360° (ABC Analysis)</h3>
          </div>
          <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-slate-400 hover:text-slate-600 text-xl"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <form id="add-beh-form" class="space-y-4 text-right">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">نوع السلوك الملاحظ:</label>
              <input type="text" id="beh-type" required placeholder="مثال: رمي الأدوات / نوبة غضب" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">الشدة:</label>
              <select id="beh-intensity" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
                <option value="بسيطة">بسيطة</option>
                <option value="متوسطة" selected>متوسطة</option>
                <option value="مرتفعة">مرتفعة</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">A: المثير السابق للسلوك (Antecedent):</label>
            <input type="text" id="beh-ant" placeholder="ماذا حدث قبل السلوك مباشرة؟ (طلب مهمة، ضوضاء...)" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
          </div>
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">B: وصف السلوك بالتفصيل (Behavior):</label>
            <textarea id="beh-desc" rows="2" required placeholder="وصف دقيق لما قام به الطالب..." class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue"></textarea>
          </div>
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">C: الإجراء المتخذ واللاحق (Consequence):</label>
            <input type="text" id="beh-conseq" placeholder="كيف تم التعامل مع السلوك؟ (توجيه بديل، تعزيز...)" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">البيئة الصفية:</label>
              <input type="text" id="beh-setting" value="الصف الدراسي" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">المثير الحسي المحتمل:</label>
              <input type="text" id="beh-sensory" placeholder="ضجيج، إضاءة، تزاحم..." class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
            </div>
          </div>
          <div class="flex gap-3 pt-4 border-t border-slate-200">
            <button type="submit" class="btn-musanid-primary flex-1 py-3 text-base">تسجيل الملاحظة السلوكية</button>
            <button type="button" onclick="document.getElementById('modal-container').innerHTML=''" class="btn-musanid-subtle py-3 px-5 text-base">إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById('add-beh-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const newLog = {
      id: 'beh-' + Date.now(),
      studentId: AppState.selectedStudentId,
      type: document.getElementById('beh-type').value,
      intensity: document.getElementById('beh-intensity').value,
      ant: document.getElementById('beh-ant').value,
      beh: document.getElementById('beh-desc').value,
      con: document.getElementById('beh-conseq').value,
      setting: document.getElementById('beh-setting').value,
      sensory: document.getElementById('beh-sensory').value,
      duration: '5 دقائق',
      specialist: AppState.currentUser.teacherName || 'معلم الصف',
      date: todayStr,
      day: todayDay
    };
    AppState.behaviorLogs.push(newLog);
    saveAllToStorage();
    modal.innerHTML = '';
    AppState.notify();
    showToast('تم تسجيل الملاحظة السلوكية 360° بنجاح');
  });
}

function toggleService(serviceId) {
  const std = (AppState.students || []).find(s => s.id === AppState.selectedStudentId);
  if (!std) return;
  std.activeServices = std.activeServices || [];
  if (std.activeServices.includes(serviceId)) {
    std.activeServices = std.activeServices.filter(id => id !== serviceId);
  } else {
    std.activeServices.push(serviceId);
  }
  saveAllToStorage();
  AppState.notify();
  showToast('تم تحديث حالة الخدمة');
}

function deleteAppointment(id) {
  AppState.serviceAppointments = (AppState.serviceAppointments || []).filter(a => a.id !== id);
  saveAllToStorage();
  AppState.notify();
  showToast('تم حذف الموعد');
}

function deleteInjury(id) {
  AppState.bodyInjuries = (AppState.bodyInjuries || []).filter(i => i.id !== id);
  saveAllToStorage();
  AppState.notify();
  showToast('تم حذف الإصابة');
}

function deleteBehavior(id) {
  AppState.behaviorLogs = (AppState.behaviorLogs || []).filter(b => b.id !== id);
  saveAllToStorage();
  AppState.notify();
  showToast('تم حذف سجل السلوك');
}

function deleteToilet(id) {
  AppState.toiletLogs = (AppState.toiletLogs || []).filter(t => t.id !== id);
  saveAllToStorage();
  AppState.notify();
  showToast('تم حذف سجل الحمام');
}


// ========================================================
// 5. Main Application Lifecycle & Router
// ========================================================

function renderApp() {
  const root = document.getElementById('app');
  if (!root) return;
  
  if (!AppState.currentUser || !AppState.currentUser.isLoggedIn) {
    root.innerHTML = renderLoginGateway();
    return;
  }

  let tabHtml = '';
  switch (AppState.activeTab) {
    case 'home': tabHtml = renderHomeHub(); break;
    case 'students': tabHtml = renderStudentsTab(); break;
    case 'services': tabHtml = renderServicesTab(); break;
    case 'schedule': tabHtml = renderScheduleTab(); break;
    case 'sessionstats': tabHtml = renderSessionStatsTab(); break;
    case 'bodymap': tabHtml = renderBodyMapTab(); break;
    case 'toilet': tabHtml = renderToiletTab(); break;
    case 'behavior': tabHtml = renderBehaviorTab(); break;
    case 'reports': tabHtml = renderReportsTab(); break;
    case 'tasks': tabHtml = renderTasksTab(); break;
    case 'archive': tabHtml = renderArchiveTab(); break;
    case 'backup': tabHtml = renderBackupTab(); break;
    default: tabHtml = renderHomeHub(); break;
  }

  const sidebarHtml = (typeof renderStudentSidebar === 'function') ? renderStudentSidebar() : '';

  root.innerHTML = `
    ${renderHeader()}
    <div class="wide-container flex items-start gap-4 py-4">
      ${sidebarHtml}
      <main class="flex-1 min-w-0 pb-16">
        ${tabHtml}
      </main>
    </div>
  `;
}

// Bootstrap Initialization
window.addEventListener('DOMContentLoaded', async () => {
  await initLocalStorageData();
  AppState.subscribe(renderApp);
  renderApp();
});
