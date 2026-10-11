/**
 * ========================================================
 * منصة مُسانِد v2.5 - النسخة الأساسية المعيارية
 * ملف التتبع الإكلينيكي والسلوكي (Tracking: Body Map, Toilet, Behavior, Sessions, Reports)
 * ========================================================
 */

// ========================================================
// 5. Body Map & Attachments Tab (خريطة الجسد والمرفقات)
// ========================================================
function renderBodyMapTab() {
  const student = (AppState.students || []).find(s => s.id === AppState.selectedStudentId);
  const injuries = (AppState.bodyInjuries || []).filter(i => i.studentId === AppState.selectedStudentId);
  const allAttachments = (AppState.bodyAttachments || []).filter(a => a.studentId === AppState.selectedStudentId);
  
  const filter = AppState.bodyAttachmentFilter || 'all';
  const filteredAttachments = filter === 'all' ? allAttachments : allAttachments.filter(a => a.type === filter);

  const photoCount = allAttachments.filter(a => a.type === 'photo').length;
  const videoCount = allAttachments.filter(a => a.type === 'video').length;
  const docCount = allAttachments.filter(a => a.type === 'doc').length;

  return `
    <div class="wide-container py-6 space-y-6 animate-fadeIn">
      
      <div class="card-interactive p-6 bg-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="icon-box-lg icon-box-orange"><i class="fa-solid fa-person-dots-from-line"></i></div>
          <div>
            <h2 class="text-2xl font-black text-slate-800">خريطة الجسد، لغة الجسد ومركز المرفقات</h2>
            <p class="text-slate-500 font-bold text-sm">الرصد السريري، توثيق الكدمات والإصابات للطالب: <strong class="text-brand-blue">${student ? student.name : ''}</strong></p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="printBodyLanguageReport('${student ? student.id : ''}')" class="btn-musanid-primary py-3 px-5 text-base">
            <i class="fa-solid fa-print text-lg"></i>
            <span>طباعة تقرير لغة الجسد</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div class="lg:col-span-7 card-interactive p-6 bg-white space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-brand-orange animate-ping"></span>
              <h3 class="font-black text-lg text-slate-800">المخطط التشريحي للجسد (انقر لتثبيت كدمة)</h3>
            </div>
            <div class="flex items-center gap-2 text-xs font-bold">
              <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-rose-500"></span> شديدة</span>
              <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-amber-500"></span> بسيطة</span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
            
            <div class="text-center p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-xs font-black text-brand-blue block mb-2">المنظر الأمامي (انقر للتثبيت)</span>
              <div class="relative w-48 h-96 mx-auto cursor-crosshair bg-white rounded-xl shadow-inner border border-slate-200 overflow-hidden" onclick="handleBodyMapClick(event, 'front')">
                
                <svg class="w-full h-full p-2" viewBox="0 0 200 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="40" r="28" fill="#dbeafe" stroke="#3b82f6" stroke-width="2.5"/>
                  <rect x="93" y="68" width="14" height="14" fill="#bfdbfe"/>
                  <path d="M58 82 C58 82 82 80 100 80 C118 80 142 82 142 82 C150 85 154 96 152 116 L145 190 C145 205 135 220 124 220 L76 220 C65 220 55 205 55 190 L48 116 C46 96 50 85 58 82 Z" fill="#bfdbfe" stroke="#2563eb" stroke-width="2.5"/>
                  <path d="M48 95 L22 180 C20 186 25 192 31 190 L44 150 L52 120" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2.5"/>
                  <path d="M152 95 L178 180 C180 186 175 192 169 190 L156 150 L148 120" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2.5"/>
                  <circle cx="25" cy="195" r="9" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
                  <circle cx="175" cy="195" r="9" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
                  <path d="M76 220 L70 340 L65 420 C64 426 72 430 78 428 L88 340 L95 220" fill="#93c5fd" stroke="#1d4ed8" stroke-width="2.5"/>
                  <path d="M124 220 L130 340 L135 420 C136 426 128 430 122 428 L112 340 L105 220" fill="#93c5fd" stroke="#1d4ed8" stroke-width="2.5"/>
                  <ellipse cx="68" cy="432" rx="14" ry="7" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
                  <ellipse cx="132" cy="432" rx="14" ry="7" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
                </svg>

                ${injuries.filter(i => i.view !== 'back').map(inj => `
                  <div class="body-pin ${getPinColorClass(inj.severity)}" 
                       style="left: ${inj.x}%; top: ${inj.y}%;" 
                       title="${inj.type} (${inj.severity}) - ${inj.notes}">
                  </div>
                `).join('')}

              </div>
            </div>

            <div class="text-center p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-xs font-black text-brand-orange block mb-2">المنظر الخلفي (انقر للتثبيت)</span>
              <div class="relative w-48 h-96 mx-auto cursor-crosshair bg-white rounded-xl shadow-inner border border-slate-200 overflow-hidden" onclick="handleBodyMapClick(event, 'back')">
                
                <svg class="w-full h-full p-2" viewBox="0 0 200 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="40" r="28" fill="#fed7aa" stroke="#ea580c" stroke-width="2.5"/>
                  <rect x="93" y="68" width="14" height="14" fill="#fdba74"/>
                  <path d="M58 82 C58 82 82 80 100 80 C118 80 142 82 142 82 C150 85 154 96 152 116 L145 190 C145 205 135 220 124 220 L76 220 C65 220 55 205 55 190 L48 116 C46 96 50 85 58 82 Z" fill="#fdba74" stroke="#c2410c" stroke-width="2.5"/>
                  <line x1="100" y1="85" x2="100" y2="215" stroke="#ea580c" stroke-dasharray="4 4" stroke-width="2"/>
                  <path d="M48 95 L22 180 C20 186 25 192 31 190 L44 150 L52 120" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2.5"/>
                  <path d="M152 95 L178 180 C180 186 175 192 169 190 L156 150 L148 120" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2.5"/>
                  <circle cx="25" cy="195" r="9" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
                  <circle cx="175" cy="195" r="9" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
                  <path d="M76 220 L70 340 L65 420 C64 426 72 430 78 428 L88 340 L95 220" fill="#fb923c" stroke="#c2410c" stroke-width="2.5"/>
                  <path d="M124 220 L130 340 L135 420 C136 426 128 430 122 428 L112 340 L105 220" fill="#fb923c" stroke="#c2410c" stroke-width="2.5"/>
                  <ellipse cx="68" cy="432" rx="14" ry="7" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
                  <ellipse cx="132" cy="432" rx="14" ry="7" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
                </svg>

                ${injuries.filter(i => i.view === 'back').map(inj => `
                  <div class="body-pin ${getPinColorClass(inj.severity)}" 
                       style="left: ${inj.x}%; top: ${inj.y}%;" 
                       title="${inj.type} (${inj.severity}) - ${inj.notes}">
                  </div>
                `).join('')}

              </div>
            </div>

          </div>
        </div>

        <div class="lg:col-span-5 card-interactive p-6 bg-white flex flex-col justify-between space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 class="font-black text-lg text-slate-800">سجل الكدمات والإصابات المرصودة</h3>
            <span class="text-xs font-bold text-brand-blue bg-blue-50 px-2.5 py-1 rounded-lg">${injuries.length} علامات</span>
          </div>

          <div class="space-y-3 overflow-y-auto max-h-[380px] flex-1">
            ${injuries.length === 0 ? `
              <div class="p-8 text-center text-slate-400 font-bold text-xs bg-slate-50 rounded-xl">
                لا توجد إصابات أو علامات مرصودة حالياً للطالب 🌟
              </div>
            ` : ''}

            ${injuries.map(inj => `
              <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-white flex items-start justify-between gap-3 shadow-xs">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs font-black ${inj.severity === 'شديدة' ? 'text-rose-700 bg-rose-100' : 'text-amber-800 bg-amber-100'} px-2 py-0.5 rounded">
                      ${inj.type}
                    </span>
                    <span class="text-[11px] font-bold text-slate-400">المنظر: ${inj.view === 'back' ? 'خلفي' : 'أمامي'} • ${inj.date}</span>
                  </div>
                  <p class="text-xs font-semibold text-slate-600">${inj.notes}</p>
                </div>
                <button onclick="deleteInjury('${inj.id}')" class="text-slate-400 hover:text-rose-600 p-1" title="حذف الإصابة">
                  <i class="fa-solid fa-trash-can text-sm"></i>
                </button>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

      <div class="card-interactive p-6 bg-white space-y-6">
        
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center text-lg font-black">
              <i class="fa-solid fa-photo-film"></i>
            </div>
            <div>
              <h3 class="text-xl font-black text-slate-800">مركز المرفقات والوسائط التوثيقية (صور - فيديوهات - مستندات)</h3>
              <p class="text-slate-500 font-bold text-xs">توثيق مرئي ومستندي للغة الجسد، الاستجابات الحركية والتقارير الطبية</p>
            </div>
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <button onclick="setBodyAttachmentFilter('all')" class="px-3.5 py-1.5 rounded-xl font-black text-xs transition-all ${filter === 'all' ? 'bg-brand-blue text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
              الكل (${allAttachments.length})
            </button>
            <button onclick="setBodyAttachmentFilter('photo')" class="px-3.5 py-1.5 rounded-xl font-black text-xs transition-all ${filter === 'photo' ? 'bg-brand-blue text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
              <i class="fa-solid fa-image ml-1"></i> الصور (${photoCount})
            </button>
            <button onclick="setBodyAttachmentFilter('video')" class="px-3.5 py-1.5 rounded-xl font-black text-xs transition-all ${filter === 'video' ? 'bg-brand-blue text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
              <i class="fa-solid fa-video ml-1"></i> الفيديوهات (${videoCount})
            </button>
            <button onclick="setBodyAttachmentFilter('doc')" class="px-3.5 py-1.5 rounded-xl font-black text-xs transition-all ${filter === 'doc' ? 'bg-brand-blue text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
              <i class="fa-solid fa-file-pdf ml-1"></i> المستندات (${docCount})
            </button>
          </div>
        </div>

        <div class="border-2 border-dashed border-slate-300 hover:border-brand-orange rounded-3xl p-8 text-center bg-slate-50/70 hover:bg-orange-50/30 transition-all cursor-pointer group"
             ondragover="event.preventDefault(); this.classList.add('border-brand-orange', 'bg-orange-50/50')"
             ondragleave="this.classList.remove('border-brand-orange', 'bg-orange-50/50')"
             ondrop="handleAttachmentDrop(event, '${student ? student.id : ''}')"
             onclick="document.getElementById('body-attachment-input-main').click()">
          <input type="file" id="body-attachment-input-main" multiple accept="image/*,video/*,.pdf,.doc,.docx,.xlsx,.txt" class="hidden" onchange="handleBodyAttachmentUpload(event, '${student ? student.id : ''}')">
          
          <div class="w-16 h-16 rounded-2xl bg-orange-100 text-brand-orange mx-auto mb-3 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-cloud-arrow-up"></i>
          </div>
          <h4 class="text-base font-black text-slate-800 mb-1">اسحب وأفلت الصور، الفيديوهات أو الملفات هنا</h4>
          <p class="text-xs font-bold text-slate-500">أو انقر هنا لتحديد الملفات من جهازك أو الفلاشة (يدعم JPEG, PNG, MP4, PDF, DOCX)</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${filteredAttachments.length === 0 ? `
            <div class="col-span-full p-10 text-center bg-slate-50 rounded-2xl border border-slate-200">
              <i class="fa-regular fa-folder-open text-3xl text-slate-400 mb-2"></i>
              <p class="text-slate-600 font-bold text-sm">لا توجد مرفقات مطابقة لهذا التصنيف.</p>
            </div>
          ` : ''}

          ${filteredAttachments.map(att => `
            <div class="card-interactive bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-md transition-all">
              
              ${att.type === 'photo' ? `
                <div class="relative h-44 bg-slate-100 overflow-hidden cursor-pointer" onclick="viewAttachmentModal('${att.id}')">
                  <img src="${att.url}" alt="${att.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                  <div class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-black text-sm">
                    <i class="fa-solid fa-magnifying-glass-plus text-xl"></i>
                    <span>تكبير ومعاينة</span>
                  </div>
                  <span class="absolute top-2 right-2 bg-blue-900/80 backdrop-blur-sm text-white text-[11px] font-black px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                    <i class="fa-solid fa-image"></i> صورة
                  </span>
                </div>
              ` : att.type === 'video' ? `
                <div class="relative h-44 bg-slate-900 flex items-center justify-center cursor-pointer group" onclick="viewAttachmentModal('${att.id}')">
                  <video src="${att.url}" class="w-full h-full object-cover opacity-70" preload="metadata"></video>
                  <div class="absolute w-14 h-14 rounded-full bg-brand-orange text-white flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform">
                    <i class="fa-solid fa-play ml-1"></i>
                  </div>
                  <span class="absolute top-2 right-2 bg-orange-900/80 backdrop-blur-sm text-white text-[11px] font-black px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                    <i class="fa-solid fa-video"></i> فيديو
                  </span>
                </div>
              ` : `
                <div class="relative h-44 bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center p-4 cursor-pointer" onclick="viewAttachmentModal('${att.id}')">
                  <div class="w-16 h-16 rounded-2xl bg-white text-brand-blue shadow-md flex items-center justify-center text-3xl mb-2">
                    <i class="fa-solid ${att.name.endsWith('.pdf') ? 'fa-file-pdf text-rose-600' : 'fa-file-lines text-brand-blue'}"></i>
                  </div>
                  <span class="text-xs font-bold text-slate-500">${att.size || 'مستند'}</span>
                  <span class="absolute top-2 right-2 bg-slate-800/80 backdrop-blur-sm text-white text-[11px] font-black px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                    <i class="fa-solid fa-file"></i> ملف
                  </span>
                </div>
              `}

              <div class="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 class="font-black text-sm text-slate-900 truncate mb-1" title="${att.name}">${att.name}</h4>
                  <p class="text-xs font-semibold text-slate-500 mb-2">${att.notes || 'مرفق توثيقي'}</p>
                  <div class="flex items-center justify-between text-[11px] font-bold text-slate-400">
                    <span><i class="fa-regular fa-clock ml-1"></i>${att.date || 'اليوم'}</span>
                    <span><i class="fa-solid fa-hard-drive ml-1"></i>${att.size || '—'}</span>
                  </div>
                </div>

                <div class="flex items-center gap-2 pt-3 mt-3 border-t border-slate-100">
                  <button onclick="viewAttachmentModal('${att.id}')" class="flex-1 py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors">
                    <i class="fa-solid fa-eye"></i>
                    <span>عرض</span>
                  </button>

                  <button onclick="downloadAttachment('${att.id}')" class="flex-1 py-1.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-brand-blue font-bold text-xs flex items-center justify-center gap-1.5 transition-colors" title="تحميل الملف إلى جهازك">
                    <i class="fa-solid fa-download"></i>
                    <span>تحميل</span>
                  </button>

                  <button onclick="deleteBodyAttachment('${att.id}')" class="p-1.5 px-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs transition-colors" title="حذف المرفق">
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>

            </div>
          `).join('')}
        </div>

      </div>

    </div>
  `;
}

function getPinColorClass(severity) {
  if (severity === 'شديدة') return 'pin-purple';
  if (severity === 'بسيطة') return 'pin-amber';
  return 'pin-red';
}

function handleBodyMapClick(e, view) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
  const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

  const modal = document.getElementById('modal-container');
  modal.innerHTML = `
    <div class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div class="card-interactive p-6 max-w-md w-full bg-white max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
          <h3 class="text-xl font-black text-brand-blue-dark">توثيق كدمة / إصابة (${view === 'back' ? 'المنظر الخلفي' : 'المنظر الأمامي'})</h3>
          <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-slate-400 hover:text-slate-600 text-xl"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <form id="body-inj-form" class="space-y-4 text-right">
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">نوع الإصابة:</label>
            <select id="inj-type" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
              <option value="كدمة زرقاء / رضّ">كدمة زرقاء / رضّ</option>
              <option value="خدش / جرح سطحي">خدش / جرح سطحي</option>
              <option value="احمرار / تحسس جلدي">احمرار / تحسس جلدي</option>
              <option value="انتفاخ / تورم">انتفاخ / تورم</option>
              <option value="علامة ضغط واحتكاك">علامة ضغط واحتكاك</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">درجة الشدة:</label>
            <select id="inj-severity" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
              <option value="بسيطة">بسيطة</option>
              <option value="متوسطة" selected>متوسطة</option>
              <option value="شديدة">شديدة (تتطلب مراجعة التمريض)</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">ملاحظات الفحص والسبب المحتمل:</label>
            <textarea id="inj-notes" rows="2" placeholder="تم الرصد أثناء الاستقبال الصباحي..." class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue"></textarea>
          </div>
          <div class="flex gap-3 pt-4 border-t border-slate-200">
            <button type="submit" class="btn-musanid-primary flex-1 py-3 text-base">تثبيت الإصابة على الخريطة</button>
            <button type="button" onclick="document.getElementById('modal-container').innerHTML=''" class="btn-musanid-subtle py-3 px-5 text-base">إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById('body-inj-form').addEventListener('submit', (ev) => {
    ev.preventDefault();
    const newInj = {
      id: 'inj-' + Date.now(),
      studentId: AppState.selectedStudentId,
      view: view || 'front',
      x, y,
      type: document.getElementById('inj-type').value,
      severity: document.getElementById('inj-severity').value,
      notes: document.getElementById('inj-notes').value || 'تم الرصد أثناء المتابعة',
      date: new Date().toISOString().split('T')[0]
    };
    AppState.bodyInjuries.push(newInj);
    saveAllToStorage();
    modal.innerHTML = '';
    AppState.notify();
    showToast('تم تثبيت دبوس الإصابة على خريطة الجسد بنجاح');
  });
}

function setBodyAttachmentFilter(filter) {
  AppState.bodyAttachmentFilter = filter;
  AppState.notify();
}

function handleBodyAttachmentUpload(event, studentId) {
  const files = event.target.files;
  if (!files || files.length === 0) return;
  processAttachmentFiles(files, studentId);
  event.target.value = '';
}

function handleAttachmentDrop(event, studentId) {
  event.preventDefault();
  const files = event.dataTransfer.files;
  if (!files || files.length === 0) return;
  processAttachmentFiles(files, studentId);
}

function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function processAttachmentFiles(files, studentId) {
  const targetStudentId = studentId || AppState.selectedStudentId;
  let processed = 0;

  Array.from(files).forEach(file => {
    let detectedType = 'doc';
    if (file.type.startsWith('image/')) detectedType = 'photo';
    else if (file.type.startsWith('video/')) detectedType = 'video';

    const reader = new FileReader();
    reader.onload = (e) => {
      const newAtt = {
        id: 'att-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        studentId: targetStudentId,
        name: file.name,
        type: detectedType,
        mimeType: file.type || 'application/octet-stream',
        url: e.target.result,
        size: formatFileSize(file.size),
        date: new Date().toLocaleDateString('ar-KW') + ' ' + new Date().toLocaleTimeString('ar-KW', { hour: '2-digit', minute: '2-digit' }),
        notes: detectedType === 'photo' ? 'صورة توثيقية' : detectedType === 'video' ? 'مقطع فيديو للغة الجسد والحركة' : 'مستند وفحص طبي'
      };

      AppState.bodyAttachments.unshift(newAtt);
      processed++;
      if (processed === files.length) {
        saveAllToStorage();
        AppState.notify();
        showToast('تم رفع ' + files.length + ' من المرفقات بنجاح');
      }
    };
    reader.readAsDataURL(file);
  });
}

function deleteBodyAttachment(id) {
  AppState.bodyAttachments = AppState.bodyAttachments.filter(a => a.id !== id);
  saveAllToStorage();
  AppState.notify();
  showToast('تم حذف المرفق');
}

function downloadAttachment(id) {
  const att = (AppState.bodyAttachments || []).find(a => a.id === id);
  if (!att) return;
  const a = document.createElement('a');
  a.href = att.url;
  a.download = att.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('بدأ تحميل: ' + att.name);
}

function viewAttachmentModal(id) {
  const att = (AppState.bodyAttachments || []).find(a => a.id === id);
  if (!att) return;

  const modal = document.getElementById('modal-container');
  modal.innerHTML = `
    <div class="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div class="card-interactive max-w-3xl w-full bg-white max-h-[90vh] overflow-y-auto p-6 space-y-4">
        
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl ${att.type === 'photo' ? 'bg-blue-100 text-brand-blue' : att.type === 'video' ? 'bg-orange-100 text-brand-orange' : 'bg-purple-100 text-purple-700'} flex items-center justify-center text-sm font-bold">
              <i class="fa-solid ${att.type === 'photo' ? 'fa-image' : att.type === 'video' ? 'fa-video' : 'fa-file'}"></i>
            </span>
            <h3 class="text-lg font-black text-slate-800 truncate max-w-md">${att.name}</h3>
          </div>
          <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-slate-400 hover:text-slate-600 text-xl"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <div class="rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center min-h-[300px]">
          ${att.type === 'photo' ? `
            <img src="${att.url}" alt="${att.name}" class="max-h-[60vh] max-w-full object-contain">
          ` : att.type === 'video' ? `
            <video src="${att.url}" controls autoplay class="max-h-[60vh] w-full rounded-xl"></video>
          ` : `
            <div class="p-12 text-center text-white space-y-4">
              <i class="fa-solid fa-file-lines text-6xl text-brand-blue"></i>
              <h4 class="text-xl font-bold">${att.name}</h4>
              <p class="text-slate-400 text-sm">الحجم: ${att.size || '—'} | التاريخ: ${att.date || '—'}</p>
            </div>
          `}
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div class="text-xs font-bold text-slate-500">
            <span><i class="fa-regular fa-clock ml-1"></i>${att.date}</span>
            <span class="mx-2">•</span>
            <span><i class="fa-solid fa-hard-drive ml-1"></i>${att.size}</span>
            <span class="mx-2">•</span>
            <span>${att.notes || 'مرفق توثيقي'}</span>
          </div>

          <div class="flex items-center gap-3 w-full sm:w-auto">
            <button onclick="downloadAttachment('${att.id}')" class="btn-musanid-primary py-2.5 px-5 text-sm flex-1 sm:flex-none flex items-center justify-center gap-2">
              <i class="fa-solid fa-download"></i>
              <span>تحميل الملف</span>
            </button>
            <button onclick="deleteBodyAttachment('${att.id}'); document.getElementById('modal-container').innerHTML='';" class="bg-rose-50 hover:bg-rose-100 text-rose-600 py-2.5 px-4 rounded-xl text-sm font-bold flex-1 sm:flex-none transition-colors">
              <i class="fa-solid fa-trash-can ml-1"></i>
              <span>حذف</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  `;
}

function printBodyLanguageReport(studentId) {
  const student = (AppState.students || []).find(s => s.id === (studentId || AppState.selectedStudentId));
  const injuries = (AppState.bodyInjuries || []).filter(i => i.studentId === (studentId || AppState.selectedStudentId));
  const frontInjuries = injuries.filter(i => i.view !== 'back');
  const backInjuries = injuries.filter(i => i.view === 'back');
  const teacher = (AppState.currentUser && AppState.currentUser.teacherName) || 'معلم التربية الخاصة والتأهيل';
  const className = (AppState.currentUser && AppState.currentUser.className) || 'ورشة التأهيل المهني (أ)';

  const modal = document.getElementById('modal-container');
  modal.innerHTML = `
    <div class="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn overflow-y-auto">
      <div class="card-interactive max-w-4xl w-full bg-white max-h-[96vh] overflow-y-auto p-6 sm:p-10 shadow-2xl border-2 border-slate-200">
        
        <div class="no-print flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center text-lg font-black"><i class="fa-solid fa-print"></i></div>
            <div>
              <h3 class="text-xl font-black text-slate-800">معاينة استمارة تقرير لغة الجسد والإصابات</h3>
              <p class="text-xs font-bold text-slate-500">جاهزة للطباعة الرسمية والتوقيع المباشر</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="window.print()" class="btn-musanid-primary py-2.5 px-5 text-base flex items-center gap-2">
              <i class="fa-solid fa-print"></i>
              <span>طباعة الآن</span>
            </button>
            <button onclick="document.getElementById('modal-container').innerHTML=''" class="btn-musanid-subtle py-2.5 px-4 text-base"><i class="fa-solid fa-xmark"></i> إغلاق</button>
          </div>
        </div>

        <div class="printable-document text-slate-900 font-tajawal space-y-6">
          
          <div class="flex items-center justify-between pb-6 border-b-2 border-slate-800">
            <div class="text-right">
              <h3 class="text-lg font-black text-slate-900">دولة الكويت</h3>
              <h4 class="text-base font-bold text-slate-700">منصة مُسانِد التأهيلية</h4>
              <p class="text-xs font-semibold text-slate-500">قسم الرعاية الصحية، التأهيل السريري ولغة الجسد</p>
            </div>
            <div class="w-20 h-20 p-2 bg-white border border-slate-300 rounded-2xl flex items-center justify-center">
              <img src="${LOGO_SRC}" alt="شعار المنصة" class="w-full h-full object-contain">
            </div>
            <div class="text-left font-mono text-xs font-bold text-slate-600 space-y-1">
              <p>التاريخ: ${new Date().toLocaleDateString('ar-KW')}</p>
              <p>المعلم: ${teacher}</p>
              <p>الصف: ${className}</p>
            </div>
          </div>

          <div class="text-center py-2">
            <h2 class="text-2xl font-black text-slate-900 underline decoration-brand-orange underline-offset-8">تقرير خريطة الجسد، الملاحظات البدنية ولغة الجسد</h2>
            <p class="text-xs font-bold text-slate-500 mt-2">استمارة الفحص الدوري والتوثيق السريري والحركي</p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-300 text-sm font-bold">
            <div><span class="text-slate-500 block text-xs">اسم الطالب:</span> ${student ? student.name : '—'}</div>
            <div><span class="text-slate-500 block text-xs">الرقم المدني:</span> ${student ? student.nationalId : '—'}</div>
            <div><span class="text-slate-500 block text-xs">الصف / الورشة:</span> ${student ? student.grade : '—'}</div>
            <div><span class="text-slate-500 block text-xs">هاتف الطوارئ:</span> ${student ? student.guardianPhone : '—'}</div>
          </div>

          <div class="p-4 rounded-2xl bg-white border border-slate-300">
            <h4 class="font-black text-sm text-slate-900 mb-3 border-b border-slate-200 pb-1 flex items-center justify-between">
              <span>1. المخطط التشريحي لمواقع العلامات والإصابات:</span>
              <span class="text-xs font-normal text-slate-500">إجمالي النقاط: ${injuries.length} دبابيس</span>
            </h4>
            
            <div class="grid grid-cols-2 gap-6 max-w-lg mx-auto py-2">
              <div class="text-center">
                <span class="text-xs font-black text-brand-blue block mb-2">المنظر الأمامي</span>
                <div class="relative w-44 mx-auto border border-slate-200 rounded-xl p-2 bg-slate-50/50">
                  <svg class="w-full h-auto" viewBox="0 0 200 450" fill="none">
                    <circle cx="100" cy="40" r="28" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2.5"/>
                    <rect x="93" y="68" width="14" height="14" fill="#cbd5e1"/>
                    <path d="M58 82 C58 82 82 80 100 80 C118 80 142 82 142 82 C150 85 154 96 152 116 L145 190 C145 205 135 220 124 220 L76 220 C65 220 55 205 55 190 L48 116 C46 96 50 85 58 82 Z" fill="#93c5fd" stroke="#3b82f6" stroke-width="2.5"/>
                    <circle cx="25" cy="195" r="9" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
                    <circle cx="175" cy="195" r="9" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
                    <path d="M76 220 L70 340 L65 420 C64 426 72 430 78 428 L88 340 L95 220" fill="#60a5fa" stroke="#2563eb" stroke-width="2.5"/>
                    <path d="M124 220 L130 340 L135 420 C136 426 128 430 122 428 L112 340 L105 220" fill="#60a5fa" stroke="#2563eb" stroke-width="2.5"/>
                  </svg>
                  ${frontInjuries.map((inj, idx) => `
                    <div class="absolute w-5 h-5 rounded-full ${getPinColorClass(inj.severity)} text-white font-black text-[10px] flex items-center justify-center shadow" style="left: ${inj.x}%; top: ${inj.y}%; transform: translate(-50%, -50%);">
                      ${idx + 1}
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="text-center">
                <span class="text-xs font-black text-brand-orange block mb-2">المنظر الخلفي</span>
                <div class="relative w-44 mx-auto border border-slate-200 rounded-xl p-2 bg-slate-50/50">
                  <svg class="w-full h-auto" viewBox="0 0 200 450" fill="none">
                    <circle cx="100" cy="40" r="28" fill="#94a3b8" stroke="#64748b" stroke-width="2.5"/>
                    <rect x="93" y="68" width="14" height="14" fill="#cbd5e1"/>
                    <path d="M58 82 C58 82 82 80 100 80 C118 80 142 82 142 82 C150 85 154 96 152 116 L145 190 C145 205 135 220 124 220 L76 220 C65 220 55 205 55 190 L48 116 C46 96 50 85 58 82 Z" fill="#fdba74" stroke="#ea580c" stroke-width="2.5"/>
                    <path d="M76 220 L70 340 L65 420 C64 426 72 430 78 428 L88 340 L95 220" fill="#fb923c" stroke="#c2410c" stroke-width="2.5"/>
                    <path d="M124 220 L130 340 L135 420 C136 426 128 430 122 428 L112 340 L105 220" fill="#fb923c" stroke="#c2410c" stroke-width="2.5"/>
                  </svg>
                  ${backInjuries.map((inj, idx) => `
                    <div class="absolute w-5 h-5 rounded-full ${getPinColorClass(inj.severity)} text-white font-black text-[10px] flex items-center justify-center shadow" style="left: ${inj.x}%; top: ${inj.y}%; transform: translate(-50%, -50%);">
                      ${idx + 1}
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 class="font-black text-sm text-slate-900 mb-2 pb-1 border-b border-slate-300">2. جدول تفاصيل الرصد السريري:</h4>
            <div class="overflow-x-auto">
              <table class="w-full text-right border-collapse text-xs border border-slate-300">
                <thead class="bg-slate-100 font-black text-slate-800">
                  <tr>
                    <th class="p-2.5 border border-slate-300 text-center w-12">#</th>
                    <th class="p-2.5 border border-slate-300">المنظر والنوع</th>
                    <th class="p-2.5 border border-slate-300">الشدة</th>
                    <th class="p-2.5 border border-slate-300">التاريخ</th>
                    <th class="p-2.5 border border-slate-300">الملاحظات وسياق الرصد</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 font-bold">
                  ${injuries.length === 0 ? '<tr><td colspan="5" class="p-4 text-center text-slate-400">لا توجد إصابات أو علامات مرصودة للطالب.</td></tr>' : ''}
                  ${injuries.map((inj, idx) => `
                    <tr>
                      <td class="p-2.5 border border-slate-300 text-center font-black">${idx + 1}</td>
                      <td class="p-2.5 border border-slate-300">${inj.type} (${inj.view === 'back' ? 'خلفي' : 'أمامي'})</td>
                      <td class="p-2.5 border border-slate-300">${inj.severity}</td>
                      <td class="p-2.5 border border-slate-300">${inj.date}</td>
                      <td class="p-2.5 border border-slate-300">${inj.notes}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div class="pt-8 mt-8 border-t-2 border-slate-800 grid grid-cols-3 text-center text-xs font-bold gap-4">
            <div>
              <p class="mb-8 font-black text-slate-800">معلم الصف / الورشة: <span class="text-brand-blue">${teacher}</span></p>
              <p class="text-slate-600">التوقيع: ________________________</p>
            </div>
            <div>
              <p class="mb-8 font-black text-slate-800">أخصائي التأهيل / التمريض</p>
              <p class="text-slate-600">التوقيع: ________________________</p>
            </div>
            <div>
              <p class="mb-8 font-black text-slate-800">اعتماد مدير البرامج التأهيلية</p>
              <p class="text-slate-600">الختم والتوقيع: ________________________</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  `;
}

// ========================================================
// 6. Toilet & Fluid Training Tab
// ========================================================
function renderToiletTab() {
  const student = (AppState.students || []).find(s => s.id === AppState.selectedStudentId);
  const logs = (AppState.toiletLogs || []).filter(t => t.studentId === AppState.selectedStudentId);

  const successful = logs.filter(l => l.isSuccess).length;
  const accidents = logs.filter(l => !l.isSuccess).length;
  const totalLogs = logs.length;
  const rate = totalLogs > 0 ? Math.round((successful / totalLogs) * 100) : 100;

  const morningLogs = logs.filter(l => (l.time || '').includes('08:') || (l.time || '').includes('09:') || (l.time || '').includes('8:') || (l.time || '').includes('9:'));
  const middayLogs = logs.filter(l => (l.time || '').includes('10:') || (l.time || '').includes('11:'));
  const afternoonLogs = logs.filter(l => (l.time || '').includes('12:') || (l.time || '').includes('01:') || (l.time || '').includes('1:'));

  const morningCount = morningLogs.length || 1;
  const middayCount = middayLogs.length || (totalLogs > 2 ? 2 : 1);
  const afternoonCount = afternoonLogs.length || (totalLogs > 1 ? 1 : 0);
  const maxTimeCount = Math.max(morningCount, middayCount, afternoonCount, 1);

  const dayCounts = { 'الأحد': 0, 'الإثنين': 0, 'الثلاثاء': 0, 'الأربعاء': 0, 'الخميس': 0 };
  logs.forEach(l => {
    const d = l.day || getArabicDayName(l.date);
    if (dayCounts[d] !== undefined) dayCounts[d]++;
  });
  const maxDay = Math.max(...Object.values(dayCounts), 1);

  return `
    <div class="wide-container py-6 space-y-6 animate-fadeIn">
      
      <div class="card-interactive p-6 bg-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="icon-box-lg icon-box-emerald"><i class="fa-solid fa-restroom"></i></div>
          <div>
            <h2 class="text-2xl font-black text-slate-800">متابعة التدريب على الحمام وتوازن السوائل</h2>
            <p class="text-slate-500 font-bold text-sm">سجل الإخراج والسوائل اليومية والرسوم البيانية للطالب: <strong class="text-brand-blue">${student ? student.name : ''}</strong></p>
          </div>
        </div>
        <div class="flex items-center gap-3 flex-wrap">
          <button onclick="addToiletModal()" class="btn-musanid-primary py-3 px-5 text-base shadow-md">
            <i class="fa-solid fa-plus text-lg"></i>
            <span>تسجيل دخول حمام / سوائل</span>
          </button>
          <button onclick="printToiletReport('${student ? student.id : ''}')" class="btn-musanid-orange py-3 px-5 text-base shadow-md">
            <i class="fa-solid fa-print text-lg"></i>
            <span>طباعة جدول الحمام والسوائل</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div class="card-interactive p-5 bg-white border-b-4 border-emerald-500">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-400">نسبة النجاح والاستجابة</span>
            <span class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-black"><i class="fa-solid fa-check"></i></span>
          </div>
          <div class="text-3xl font-black text-emerald-600">${rate}%</div>
          <p class="text-xs font-bold text-slate-500 mt-1">${successful} مرات استجابة إيجابية</p>
        </div>

        <div class="card-interactive p-5 bg-white border-b-4 border-brand-blue">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-400">إجمالي المرات المسجلة</span>
            <span class="w-8 h-8 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center text-sm font-black"><i class="fa-solid fa-list-ol"></i></span>
          </div>
          <div class="text-3xl font-black text-brand-blue">${totalLogs}</div>
          <p class="text-xs font-bold text-slate-500 mt-1">سجلات دورة المياه</p>
        </div>

        <div class="card-interactive p-5 bg-white border-b-4 border-rose-500">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-400">الحوادث / البلل اللاإرادي</span>
            <span class="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-sm font-black"><i class="fa-solid fa-triangle-exclamation"></i></span>
          </div>
          <div class="text-3xl font-black text-rose-600">${accidents}</div>
          <p class="text-xs font-bold text-slate-500 mt-1">مرات عدم التحكم</p>
        </div>

        <div class="card-interactive p-5 bg-white border-b-4 border-amber-500">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-400">تحديد اليوم تلقائياً</span>
            <span class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-black"><i class="fa-solid fa-calendar-day"></i></span>
          </div>
          <div class="text-2xl font-black text-slate-800">${getArabicDayName(new Date())}</div>
          <p class="text-xs font-bold text-slate-500 mt-1">مربوط بالتقويم مباشرة</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div class="card-interactive p-6 bg-white space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="text-base font-black text-slate-800 flex items-center gap-2">
              <i class="fa-solid fa-chart-pie text-emerald-500"></i>
              <span>مؤشر الاستجابة والتحكم</span>
            </h3>
            <span class="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">${rate}% إنجاز</span>
          </div>
          
          <div class="flex items-center justify-center py-4">
            <div class="relative w-36 h-36 flex items-center justify-center">
              <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path class="text-slate-100" stroke-width="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path class="text-emerald-500 transition-all duration-1000 ease-out" stroke-dasharray="${rate}, 100" stroke-width="3.8" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div class="absolute flex flex-col items-center">
                <span class="text-2xl font-black text-slate-800">${rate}%</span>
                <span class="text-[10px] font-bold text-slate-400">نجاح إخراج</span>
              </div>
            </div>
          </div>

          <div class="space-y-2 pt-2 border-t border-slate-100">
            <div class="flex items-center justify-between text-xs font-bold">
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> استجابة ناجحة بالحمام</span>
              <span class="text-slate-700 font-black">${successful} مرات</span>
            </div>
            <div class="flex items-center justify-between text-xs font-bold">
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span> حوادث بلل لاإرادي</span>
              <span class="text-slate-700 font-black">${accidents} مرات</span>
            </div>
          </div>
        </div>

        <div class="card-interactive p-6 bg-white space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="text-base font-black text-slate-800 flex items-center gap-2">
              <i class="fa-solid fa-chart-column text-brand-blue"></i>
              <span>توزيع المرات على أيام الأسبوع</span>
            </h3>
            <span class="text-xs font-bold text-slate-400">أيام الدوام</span>
          </div>

          <div class="h-44 flex items-end justify-between gap-3 pt-4 px-2">
            ${Object.entries(dayCounts).map(([day, count]) => {
              const heightPercent = Math.max(Math.round((count / maxDay) * 100), 12);
              return `
                <div class="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span class="text-[11px] font-black text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity">${count}</span>
                  <div class="w-full bg-blue-100 rounded-t-lg relative overflow-hidden transition-all duration-500 group-hover:bg-blue-200" style="height: ${heightPercent}%">
                    <div class="absolute inset-0 bg-gradient-to-t from-brand-blue to-blue-400 rounded-t-lg"></div>
                  </div>
                  <span class="text-xs font-bold text-slate-600 truncate w-full text-center">${day}</span>
                </div>
              `;
            }).join('')}
          </div>

          <div class="pt-2 border-t border-slate-100 text-center text-xs font-bold text-slate-500">
            <span>أعلى أيام النشاط: <strong class="text-brand-blue">${Object.entries(dayCounts).sort((a,b)=>b[1]-a[1])[0][0]}</strong></span>
          </div>
        </div>

        <div class="card-interactive p-6 bg-white space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="text-base font-black text-slate-800 flex items-center gap-2">
              <i class="fa-solid fa-glass-water text-cyan-600"></i>
              <span>الفترات الزمنية وتوازن السوائل</span>
            </h3>
            <span class="text-xs font-bold bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-full">خلال اليوم</span>
          </div>

          <div class="space-y-3.5 pt-2">
            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span class="text-slate-700">الفترة الصباحية (8:00 - 10:00 ص)</span>
                <span class="text-cyan-700 font-black">${morningCount} مرات</span>
              </div>
              <div class="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div class="bg-cyan-500 h-full rounded-full transition-all duration-500" style="width: ${(morningCount/maxTimeCount)*100}%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span class="text-slate-700">فترة الظهيرة الأولى (10:00 - 12:00 م)</span>
                <span class="text-blue-700 font-black">${middayCount} مرات</span>
              </div>
              <div class="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div class="bg-brand-blue h-full rounded-full transition-all duration-500" style="width: ${(middayCount/maxTimeCount)*100}%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1">
                <span class="text-slate-700">فترة الانصراف (12:00 - 02:00 م)</span>
                <span class="text-amber-700 font-black">${afternoonCount} مرات</span>
              </div>
              <div class="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div class="bg-amber-500 h-full rounded-full transition-all duration-500" style="width: ${(afternoonCount/maxTimeCount)*100}%"></div>
              </div>
            </div>
          </div>

          <div class="p-3 bg-cyan-50/70 border border-cyan-200 rounded-xl text-xs font-bold text-cyan-900 flex items-center gap-2">
            <i class="fa-solid fa-circle-info text-cyan-600 text-sm"></i>
            <span>معدل شرب السوائل منتظم (150-200 مل) قبل كل جلسة بساعة.</span>
          </div>
        </div>

      </div>

      <div class="card-interactive bg-white overflow-hidden shadow-lg">
        <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 class="text-base font-black text-slate-800 flex items-center gap-2">
            <i class="fa-solid fa-table-list text-brand-blue"></i>
            <span>سجل الملاحظات التفصيلي</span>
          </h3>
          <span class="text-xs font-bold text-slate-500">${logs.length} سجل مسجل</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-right min-w-[700px]">
            <thead class="bg-slate-100 text-slate-700 font-black text-sm">
              <tr>
                <th class="p-4">اليوم والتاريخ</th>
                <th class="p-4">الوقت</th>
                <th class="p-4">النوع</th>
                <th class="p-4">الحالة والنتيجة</th>
                <th class="p-4">كمية السوائل المشروبة</th>
                <th class="p-4">الملاحظات</th>
                <th class="p-4 text-center">إجراء</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 font-bold text-sm">
              ${logs.length === 0 ? '<tr><td colspan="7" class="p-8 text-center text-slate-400">لا توجد سجلات حمام مسجلة حتى الآن. اضغط على تسجيل جديد للبدء.</td></tr>' : ''}
              ${logs.map(l => {
                const dayBadge = l.day || getArabicDayName(l.date);
                return `
                  <tr class="hover:bg-slate-50 transition-colors">
                    <td class="p-4">
                      <span class="bg-blue-100 text-brand-blue px-2.5 py-1 rounded-lg text-xs font-black ml-1.5">${dayBadge}</span>
                      <span class="text-slate-600 text-xs">${l.date || '—'}</span>
                    </td>
                    <td class="p-4 text-slate-800 font-black">${l.time || '10:00 ص'}</td>
                    <td class="p-4"><span class="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg text-xs font-black">${l.type || 'تبول'}</span></td>
                    <td class="p-4">
                      <span class="px-3 py-1 rounded-lg text-xs font-black inline-flex items-center gap-1.5 ${l.isSuccess ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                        <i class="fa-solid ${l.isSuccess ? 'fa-circle-check text-emerald-600' : 'fa-circle-xmark text-rose-600'}"></i>
                        ${l.isSuccess ? 'نجاح وإخراج بالحمام' : 'حادث بلل لاإرادي'}
                      </span>
                    </td>
                    <td class="p-4 text-slate-600">${l.fluids || 'كوب ماء (150 مل)'}</td>
                    <td class="p-4 text-slate-500 text-xs max-w-xs">${l.notes || 'طبيعي مع تعزيز لفظي'}</td>
                    <td class="p-4 text-center">
                      <button onclick="deleteToilet('${l.id}')" class="text-slate-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50" title="حذف السجل">
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

function addToiletModal() {
  const modal = document.getElementById('modal-container');
  const todayStr = new Date().toISOString().split('T')[0];
  const todayDay = getArabicDayName(todayStr);

  modal.innerHTML = `
    <div class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div class="card-interactive p-6 max-w-lg w-full bg-white max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
          <h3 class="text-xl font-black text-brand-blue-dark">تسجيل متابعة الحمام والسوائل</h3>
          <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-slate-400 hover:text-slate-600 text-xl"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <form id="add-toi-form" class="space-y-4 text-right">
          
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">التاريخ:</label>
              <input type="date" id="toi-date" value="${todayStr}" required onchange="document.getElementById('toi-day-badge').textContent = getArabicDayName(this.value)" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">اليوم:</label>
              <div id="toi-day-badge" class="w-full px-4 py-2.5 font-black bg-blue-50 text-brand-blue rounded-xl border border-blue-200 text-center text-sm">${todayDay}</div>
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-1">
                <i class="fa-regular fa-clock text-brand-orange"></i>
                <span>الوقت:</span>
              </label>
              <input type="time" id="toi-time" value="${new Date().toTimeString().slice(0, 5)}" required class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">النوع:</label>
              <select id="toi-type" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
                <option value="تبول">تبول</option>
                <option value="إخراج">إخراج</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">النتيجة:</label>
              <select id="toi-success" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
                <option value="true">نجاح وإخراج بالحمام</option>
                <option value="false">حادث بلل لاإرادي</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">كمية السوائل المشروبة:</label>
            <input type="text" id="toi-fluids" placeholder="مثال: كوب ماء (150 مل) أو عصير" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
          </div>
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">الملاحظات وسياق النداء:</label>
            <input type="text" id="toi-notes" placeholder="ملاحظات الاستجابة أو الإشارة..." class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
          </div>
          <div class="flex gap-3 pt-4 border-t border-slate-200">
            <button type="submit" class="btn-musanid-primary flex-1 py-3 text-base">تسجيل الملاحظة</button>
            <button type="button" onclick="document.getElementById('modal-container').innerHTML=''" class="btn-musanid-subtle py-3 px-5 text-base">إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById('add-toi-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const dateVal = document.getElementById('toi-date').value || todayStr;
    const timeInputVal = document.getElementById('toi-time') ? document.getElementById('toi-time').value : '';
    let timeStr = timeInputVal;
    if (!timeStr) {
      const now = new Date();
      timeStr = now.toLocaleTimeString('ar-KW', { hour: '2-digit', minute: '2-digit' });
    }

    const newLog = {
      id: 'toi-' + Date.now(),
      studentId: AppState.selectedStudentId,
      date: dateVal,
      day: dayVal,
      time: timeStr,
      type: document.getElementById('toi-type').value,
      isSuccess: document.getElementById('toi-success').value === 'true',
      fluids: document.getElementById('toi-fluids').value || 'كوب ماء (150 مل)',
      notes: document.getElementById('toi-notes').value || 'استجابة طبيعية'
    };
    AppState.toiletLogs.push(newLog);
    saveAllToStorage();
    modal.innerHTML = '';
    AppState.notify();
    showToast('تم تسجيل ملاحظة دورة المياه وتحديد اليوم تلقائياً بنجاح');
  });
}

function printToiletReport(studentId) {
  const student = (AppState.students || []).find(s => s.id === (studentId || AppState.selectedStudentId));
  const logs = (AppState.toiletLogs || []).filter(t => t.studentId === (studentId || AppState.selectedStudentId));
  const successful = logs.filter(l => l.isSuccess).length;
  const rate = logs.length > 0 ? Math.round((successful / logs.length) * 100) : 100;
  const teacher = (AppState.currentUser && AppState.currentUser.teacherName) || 'معلم التربية الخاصة والتأهيل';
  const className = (AppState.currentUser && AppState.currentUser.className) || 'ورشة التأهيل المهني (أ)';

  const modal = document.getElementById('modal-container');
  modal.innerHTML = `
    <div class="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn overflow-y-auto">
      <div class="card-interactive max-w-4xl w-full bg-white max-h-[96vh] overflow-y-auto p-6 sm:p-10 shadow-2xl border-2 border-slate-200">
        
        <div class="no-print flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg font-black"><i class="fa-solid fa-print"></i></div>
            <div>
              <h3 class="text-xl font-black text-slate-800">معاينة استمارة جدول الحمام والسوائل</h3>
              <p class="text-xs font-bold text-slate-500">جاهزة للطباعة الرسمية والتوقيع</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="window.print()" class="btn-musanid-primary py-2.5 px-5 text-base flex items-center gap-2">
              <i class="fa-solid fa-print"></i>
              <span>طباعة الآن</span>
            </button>
            <button onclick="document.getElementById('modal-container').innerHTML=''" class="btn-musanid-subtle py-2.5 px-4 text-base"><i class="fa-solid fa-xmark"></i> إغلاق</button>
          </div>
        </div>

        <div class="printable-document text-slate-900 font-tajawal space-y-6">
          
          <div class="flex items-center justify-between pb-6 border-b-2 border-slate-800">
            <div class="text-right">
              <h3 class="text-lg font-black text-slate-900">دولة الكويت</h3>
              <h4 class="text-base font-bold text-slate-700">منصة مُسانِد التأهيلية</h4>
              <p class="text-xs font-semibold text-slate-500">برنامج التدريب على الاستقلالية وتوازن السوائل</p>
            </div>
            <div class="w-20 h-20 p-2 bg-white border border-slate-300 rounded-2xl flex items-center justify-center">
              <img src="${LOGO_SRC}" alt="شعار المنصة" class="w-full h-full object-contain">
            </div>
            <div class="text-left font-mono text-xs font-bold text-slate-600 space-y-1">
              <p>التاريخ: ${new Date().toLocaleDateString('ar-KW')}</p>
              <p>المعلم: ${teacher}</p>
              <p>الصف: ${className}</p>
            </div>
          </div>

          <div class="text-center py-2">
            <h2 class="text-2xl font-black text-slate-900 underline decoration-brand-emerald underline-offset-8">استمارة متابعة جدول الحمام وتوازن السوائل</h2>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-300 text-sm font-bold">
            <div><span class="text-slate-500 block text-xs">اسم الطالب:</span> ${student ? student.name : '—'}</div>
            <div><span class="text-slate-500 block text-xs">الصف / الورشة:</span> ${student ? student.grade : '—'}</div>
            <div><span class="text-slate-500 block text-xs">نسبة الاستجابة:</span> <span class="text-emerald-700">${rate}% (${successful} نجاح)</span></div>
            <div><span class="text-slate-500 block text-xs">مرات البلل اللاإرادي:</span> <span class="text-rose-700">${logs.filter(l => !l.isSuccess).length}</span></div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-right border-collapse text-xs border border-slate-300">
              <thead class="bg-slate-100 font-black text-slate-800">
                <tr>
                  <th class="p-2.5 border border-slate-300 text-center w-10">#</th>
                  <th class="p-2.5 border border-slate-300 text-center">اليوم</th>
                  <th class="p-2.5 border border-slate-300 text-center">التاريخ</th>
                  <th class="p-2.5 border border-slate-300 text-center">الوقت</th>
                  <th class="p-2.5 border border-slate-300 text-center">النوع</th>
                  <th class="p-2.5 border border-slate-300 text-center">النتيجة</th>
                  <th class="p-2.5 border border-slate-300">كمية السوائل</th>
                  <th class="p-2.5 border border-slate-300">الملاحظات</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 font-bold">
                ${logs.length === 0 ? '<tr><td colspan="8" class="p-4 text-center text-slate-400">لا توجد سجلات حمام للطالب.</td></tr>' : ''}
                ${logs.map((l, idx) => `
                  <tr>
                    <td class="p-2.5 border border-slate-300 text-center font-black">${idx + 1}</td>
                    <td class="p-2.5 border border-slate-300 text-center font-black text-brand-blue">${l.day || getArabicDayName(l.date)}</td>
                    <td class="p-2.5 border border-slate-300 text-center">${l.date || '—'}</td>
                    <td class="p-2.5 border border-slate-300 text-center font-black text-slate-900">${l.time || '—'}</td>
                    <td class="p-2.5 border border-slate-300">${l.type}</td>
                    <td class="p-2.5 border border-slate-300 ${l.isSuccess ? 'text-emerald-700' : 'text-rose-700'}">${l.isSuccess ? 'نجاح بالحمام' : 'حادث بلل لاإرادي'}</td>
                    <td class="p-2.5 border border-slate-300">${l.fluids || '—'}</td>
                    <td class="p-2.5 border border-slate-300">${l.notes || '—'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="pt-8 mt-8 border-t-2 border-slate-800 grid grid-cols-2 text-center text-xs font-bold gap-4">
            <div>
              <p class="mb-8 font-black text-slate-800">معلم الصف / المشرف: <span class="text-brand-blue">${teacher}</span></p>
              <p class="text-slate-600">التوقيع: ________________________</p>
            </div>
            <div>
              <p class="mb-8 font-black text-slate-800">اعتماد إدارة التأهيل</p>
              <p class="text-slate-600">الختم والتوقيع: ________________________</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  `;
}

// ========================================================
// 7. 360° ABC Behavior Tracking Tab
// ========================================================
function renderBehaviorTab() {
  const student = (AppState.students || []).find(s => s.id === AppState.selectedStudentId);
  const logs = (AppState.behaviorLogs || []).filter(b => b.studentId === AppState.selectedStudentId);

  const typeCounts = {
    'سلوك حركي / انفعالي': 0,
    'رفض وتحدي المهام': 0,
    'سلوك لفظي / صراخ': 0,
    'سلوك تكراري نمطي': 0,
    'إيذاء الذات أو الآخرين': 0
  };

  let highIntensity = 0;
  let medIntensity = 0;
  let lowIntensity = 0;

  const triggerCounts = {
    'ضوضاء وصوت عالي': 0,
    'طلب مهمة صعبة': 0,
    'مقاطعة وتغيير روتين': 0,
    'مثير حسي لمسي / بصري': 0,
    'التعب أو الجوع': 0
  };

  logs.forEach(l => {
    const t = l.type || 'سلوك حركي / انفعالي';
    if (typeCounts[t] !== undefined) typeCounts[t]++;
    else typeCounts['سلوك حركي / انفعالي']++;

    if (l.intensity === 'مرتفعة') highIntensity++;
    else if (l.intensity === 'منخفضة') lowIntensity++;
    else medIntensity++;

    const ant = (l.ant || '') + ' ' + (l.sensory || '');
    if (ant.includes('صوت') || ant.includes('ضوضاء')) triggerCounts['ضوضاء وصوت عالي']++;
    else if (ant.includes('مهمة') || ant.includes('طلب')) triggerCounts['طلب مهمة صعبة']++;
    else if (ant.includes('روتين') || ant.includes('تغيير')) triggerCounts['مقاطعة وتغيير روتين']++;
    else if (ant.includes('حسي') || ant.includes('لمس') || ant.includes('ضوء')) triggerCounts['مثير حسي لمسي / بصري']++;
    else triggerCounts['التعب أو الجوع']++;
  });

  const totalLogs = logs.length;
  const maxType = Math.max(...Object.values(typeCounts), 1);
  const maxTrigger = Math.max(...Object.values(triggerCounts), 1);

  return `
    <div class="wide-container py-6 space-y-6 animate-fadeIn">
      
      <div class="card-interactive p-6 bg-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="icon-box-lg icon-box-purple"><i class="fa-solid fa-brain"></i></div>
          <div>
            <h2 class="text-2xl font-black text-slate-800">رصد وتحليل السلوك 360° (ABC Analysis)</h2>
            <p class="text-slate-500 font-bold text-sm">توثيق شامل للسوابق، السلوك، اللواحق، والمثيرات الحسية للطالب: <strong class="text-brand-blue">${student ? student.name : ''}</strong></p>
          </div>
        </div>
        <div class="flex items-center gap-3 flex-wrap">
          <button onclick="addBehaviorModal()" class="btn-musanid-primary py-3 px-5 text-base shadow-md">
            <i class="fa-solid fa-plus text-lg"></i>
            <span>رصد ملاحظة سلوكية 360°</span>
          </button>
          <button onclick="printBehaviorReport('${student ? student.id : ''}')" class="btn-musanid-orange py-3 px-5 text-base shadow-md">
            <i class="fa-solid fa-print text-lg"></i>
            <span>طباعة جدول رصد السلوك 360°</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div class="card-interactive p-5 bg-white border-b-4 border-purple-600">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-400">إجمالي الملاحظات المرصودة</span>
            <span class="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-black"><i class="fa-solid fa-clipboard-check"></i></span>
          </div>
          <div class="text-3xl font-black text-purple-700">${totalLogs}</div>
          <p class="text-xs font-bold text-slate-500 mt-1">حالات رصد ABC موثقة</p>
        </div>

        <div class="card-interactive p-5 bg-white border-b-4 border-rose-500">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-400">سلوكيات شديدة التأثير</span>
            <span class="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-sm font-black"><i class="fa-solid fa-bolt"></i></span>
          </div>
          <div class="text-3xl font-black text-rose-600">${highIntensity}</div>
          <p class="text-xs font-bold text-slate-500 mt-1">تتطلب خطة تعديل وتدخل فوري</p>
        </div>

        <div class="card-interactive p-5 bg-white border-b-4 border-amber-500">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-400">سلوكيات متوسطة الشدة</span>
            <span class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-black"><i class="fa-solid fa-gauge"></i></span>
          </div>
          <div class="text-3xl font-black text-amber-600">${medIntensity}</div>
          <p class="text-xs font-bold text-slate-500 mt-1">تتم معالجتها بالتعزيز البديل</p>
        </div>

        <div class="card-interactive p-5 bg-white border-b-4 border-emerald-500">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-400">سلوكيات منخفضة ومستقرة</span>
            <span class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-black"><i class="fa-solid fa-circle-check"></i></span>
          </div>
          <div class="text-3xl font-black text-emerald-600">${lowIntensity}</div>
          <p class="text-xs font-bold text-slate-500 mt-1">استجابة سريعة للتوجيه</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div class="card-interactive p-6 bg-white space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="text-base font-black text-slate-800 flex items-center gap-2">
              <i class="fa-solid fa-chart-bar text-purple-600"></i>
              <span>تكرار السلوكيات حسب النوع</span>
            </h3>
            <span class="text-xs font-bold text-slate-400">تصنيف ABC</span>
          </div>

          <div class="space-y-3 pt-2">
            ${Object.entries(typeCounts).map(([type, count]) => {
              const pct = totalLogs > 0 ? Math.round((count / totalLogs) * 100) : (count > 0 ? 50 : 0);
              const barWidth = maxType > 0 ? Math.max(Math.round((count / maxType) * 100), count > 0 ? 10 : 0) : 0;
              return `
                <div>
                  <div class="flex justify-between text-xs font-bold mb-1">
                    <span class="text-slate-700 truncate">${type}</span>
                    <span class="text-purple-700 font-black">${count} (${pct}%)</span>
                  </div>
                  <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div class="bg-gradient-to-l from-purple-600 to-indigo-400 h-full rounded-full transition-all duration-500" style="width: ${barWidth}%"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="pt-2 border-t border-slate-100 text-center text-xs font-bold text-slate-500">
            <span>النوع الأكثر تكراراً: <strong class="text-purple-700">${Object.entries(typeCounts).sort((a,b)=>b[1]-a[1])[0][0]}</strong></span>
          </div>
        </div>

        <div class="card-interactive p-6 bg-white space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="text-base font-black text-slate-800 flex items-center gap-2">
              <i class="fa-solid fa-gauge-high text-amber-500"></i>
              <span>توزيع شدة السلوك وحدته</span>
            </h3>
            <span class="text-xs font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">المستوى</span>
          </div>

          <div class="py-4 flex flex-col items-center justify-center">
            <div class="flex items-center justify-center gap-6 w-full mb-4">
              
              <div class="text-center">
                <div class="w-16 h-16 rounded-2xl bg-rose-50 border-2 border-rose-200 flex flex-col items-center justify-center mb-1">
                  <span class="text-xl font-black text-rose-600">${highIntensity}</span>
                  <span class="text-[9px] font-bold text-rose-500">مرتفعة</span>
                </div>
                <span class="text-[11px] font-bold text-slate-500">${totalLogs>0?Math.round((highIntensity/totalLogs)*100):0}%</span>
              </div>

              <div class="text-center">
                <div class="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-200 flex flex-col items-center justify-center mb-1">
                  <span class="text-xl font-black text-amber-600">${medIntensity}</span>
                  <span class="text-[9px] font-bold text-amber-500">متوسطة</span>
                </div>
                <span class="text-[11px] font-bold text-slate-500">${totalLogs>0?Math.round((medIntensity/totalLogs)*100):0}%</span>
              </div>

              <div class="text-center">
                <div class="w-16 h-16 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex flex-col items-center justify-center mb-1">
                  <span class="text-xl font-black text-emerald-600">${lowIntensity}</span>
                  <span class="text-[9px] font-bold text-emerald-500">منخفضة</span>
                </div>
                <span class="text-[11px] font-bold text-slate-500">${totalLogs>0?Math.round((lowIntensity/totalLogs)*100):0}%</span>
              </div>

            </div>

            <div class="w-full bg-slate-100 h-4 rounded-full overflow-hidden flex">
              <div class="bg-rose-500 h-full transition-all duration-500" style="width: ${totalLogs>0?(highIntensity/totalLogs)*100:0}%" title="مرتفعة"></div>
              <div class="bg-amber-400 h-full transition-all duration-500" style="width: ${totalLogs>0?(medIntensity/totalLogs)*100:0}%" title="متوسطة"></div>
              <div class="bg-emerald-500 h-full transition-all duration-500" style="width: ${totalLogs>0?(lowIntensity/totalLogs)*100:100}%" title="منخفضة"></div>
            </div>
          </div>

          <div class="p-3 bg-purple-50/70 border border-purple-200 rounded-xl text-xs font-bold text-purple-900 flex items-center gap-2">
            <i class="fa-solid fa-lightbulb text-purple-600"></i>
            <span>تطبيق استراتيجية الإطفاء والتوجيه التفاضلي للسلوكيات المتوسطة.</span>
          </div>
        </div>

        <div class="card-interactive p-6 bg-white space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="text-base font-black text-slate-800 flex items-center gap-2">
              <i class="fa-solid fa-shield-virus text-brand-orange"></i>
              <span>المثيرات السابقة والحسية (Antecedents)</span>
            </h3>
            <span class="text-xs font-bold text-brand-orange bg-orange-100 px-2 py-0.5 rounded-full">الأسباب</span>
          </div>

          <div class="space-y-3 pt-2">
            ${Object.entries(triggerCounts).map(([trigger, count]) => {
              const barWidth = maxTrigger > 0 ? Math.max(Math.round((count / maxTrigger) * 100), count > 0 ? 12 : 0) : 0;
              return `
                <div>
                  <div class="flex justify-between text-xs font-bold mb-1">
                    <span class="text-slate-700 truncate">${trigger}</span>
                    <span class="text-brand-orange font-black">${count} مرات</span>
                  </div>
                  <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div class="bg-gradient-to-l from-brand-orange to-amber-400 h-full rounded-full transition-all duration-500" style="width: ${barWidth}%"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="pt-2 border-t border-slate-100 text-center text-xs font-bold text-slate-500">
            <span>المثير الرئيسي: <strong class="text-brand-orange">${Object.entries(triggerCounts).sort((a,b)=>b[1]-a[1])[0][0]}</strong></span>
          </div>
        </div>

      </div>

      <div class="space-y-4">
        <div class="flex items-center justify-between px-1">
          <h3 class="text-base font-black text-slate-800 flex items-center gap-2">
            <i class="fa-solid fa-clipboard-list text-purple-600"></i>
            <span>سجلات الرصد الميداني المفصلة</span>
          </h3>
          <span class="text-xs font-bold text-slate-500">${logs.length} سجل مرصود</span>
        </div>

        ${logs.length === 0 ? `
          <div class="card-interactive p-12 text-center bg-white">
            <div class="icon-box-lg icon-box-purple mx-auto mb-3"><i class="fa-solid fa-face-smile"></i></div>
            <h3 class="text-xl font-bold text-slate-700">لم يتم تسجيل أي سلوك غير مرغوب</h3>
            <p class="text-slate-500 mt-1">السلوك العام للطالب مستقر وهادئ 🌟</p>
          </div>
        ` : ''}

        ${logs.map(log => `
          <div class="card-interactive p-6 bg-white border-r-6 border-purple-600 shadow-md">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-100">
              <div class="flex items-center gap-3 flex-wrap">
                <span class="bg-purple-100 text-purple-800 font-black text-sm px-3 py-1 rounded-xl">${log.type || 'سلوك حركي / انفعالي'}</span>
                <span class="text-xs font-bold text-slate-400">يوم ${log.day || 'الأحد'} (${log.date || 'اليوم'}) - المدة: ${log.duration || '5 دقائق'}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs font-black px-2.5 py-1 rounded-lg ${log.intensity === 'مرتفعة' ? 'bg-rose-100 text-rose-800' : log.intensity === 'متوسطة' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-brand-blue'}">
                  الشدة: ${log.intensity || 'متوسطة'}
                </span>
                <button onclick="deleteBehavior('${log.id}')" class="text-slate-400 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-50" title="حذف السجل">
                  <i class="fa-solid fa-trash-can text-base"></i>
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-bold">
              <div class="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200">
                <span class="text-xs font-black text-brand-blue block mb-1">A: المثير السابق (Antecedent)</span>
                <p class="text-slate-800">${log.ant || 'طلب إتمام مهمة صعبة'}</p>
              </div>
              <div class="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200">
                <span class="text-xs font-black text-purple-700 block mb-1">B: السلوك الملاحظ (Behavior)</span>
                <p class="text-slate-800">${log.beh || 'رفض الجلوس ورمي الأدوات'}</p>
              </div>
              <div class="p-3.5 rounded-xl bg-orange-50/70 border border-orange-200">
                <span class="text-xs font-black text-brand-orange block mb-1">C: الإجراء اللاحق (Consequence)</span>
                <p class="text-slate-800">${log.con || 'توجيه بديل وتعزيز إيجابي'}</p>
              </div>
            </div>

            <div class="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-bold text-slate-500">
              <div><i class="fa-solid fa-location-dot ml-1 text-slate-400"></i>المكان: <span class="text-slate-800">${log.setting || 'الصف'}</span></div>
              <div><i class="fa-solid fa-bolt ml-1 text-amber-500"></i>المثير الحسي: <span class="text-slate-800">${log.sensory || 'غير محدد'}</span></div>
              <div><i class="fa-solid fa-user ml-1 text-brand-blue"></i>الراصد: <span class="text-slate-800">${log.specialist || 'معلم الصف'}</span></div>
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}

function printBehaviorReport(studentId) {
  const student = (AppState.students || []).find(s => s.id === (studentId || AppState.selectedStudentId));
  const logs = (AppState.behaviorLogs || []).filter(b => b.studentId === (studentId || AppState.selectedStudentId));
  const teacher = (AppState.currentUser && AppState.currentUser.teacherName) || 'معلم التربية الخاصة والتأهيل';
  const className = (AppState.currentUser && AppState.currentUser.className) || 'ورشة التأهيل المهني (أ)';

  const modal = document.getElementById('modal-container');
  modal.innerHTML = `
    <div class="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn overflow-y-auto">
      <div class="card-interactive max-w-4xl w-full bg-white max-h-[96vh] overflow-y-auto p-6 sm:p-10 shadow-2xl border-2 border-slate-200">
        
        <div class="no-print flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-lg font-black"><i class="fa-solid fa-print"></i></div>
            <div>
              <h3 class="text-xl font-black text-slate-800">معاينة استمارة رصد وتحليل السلوك 360°</h3>
              <p class="text-xs font-bold text-slate-500">جاهزة للطباعة الرسمية والاعتماد</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="window.print()" class="btn-musanid-primary py-2.5 px-5 text-base flex items-center gap-2">
              <i class="fa-solid fa-print"></i>
              <span>طباعة الآن</span>
            </button>
            <button onclick="document.getElementById('modal-container').innerHTML=''" class="btn-musanid-subtle py-2.5 px-4 text-base"><i class="fa-solid fa-xmark"></i> إغلاق</button>
          </div>
        </div>

        <div class="printable-document text-slate-900 font-tajawal space-y-6">
          
          <div class="flex items-center justify-between pb-6 border-b-2 border-slate-800">
            <div class="text-right">
              <h3 class="text-lg font-black text-slate-900">دولة الكويت</h3>
              <h4 class="text-base font-bold text-slate-700">منصة مُسانِد التأهيلية</h4>
              <p class="text-xs font-semibold text-slate-500">قسم الإرشاد النفسي وتعديل السلوك 360°</p>
            </div>
            <div class="w-20 h-20 p-2 bg-white border border-slate-300 rounded-2xl flex items-center justify-center">
              <img src="${LOGO_SRC}" alt="شعار المنصة" class="w-full h-full object-contain">
            </div>
            <div class="text-left font-mono text-xs font-bold text-slate-600 space-y-1">
              <p>التاريخ: ${new Date().toLocaleDateString('ar-KW')}</p>
              <p>المعلم: ${teacher}</p>
              <p>الصف: ${className}</p>
            </div>
          </div>

          <div class="text-center py-2">
            <h2 class="text-2xl font-black text-slate-900 underline decoration-purple-600 underline-offset-8">استمارة رصد وتحليل السلوك الشامل (ABC Behavior Log)</h2>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-300 text-sm font-bold">
            <div><span class="text-slate-500 block text-xs">اسم الطالب:</span> ${student ? student.name : '—'}</div>
            <div><span class="text-slate-500 block text-xs">الصف / الورشة:</span> ${student ? student.grade : '—'}</div>
            <div><span class="text-slate-500 block text-xs">إجمالي الحالات المرصودة:</span> ${logs.length} ملاحظات</div>
            <div><span class="text-slate-500 block text-xs">الراصد والمشرف:</span> ${teacher}</div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-right border-collapse text-xs border border-slate-300">
              <thead class="bg-slate-100 font-black text-slate-800">
                <tr>
                  <th class="p-2.5 border border-slate-300 text-center w-10">#</th>
                  <th class="p-2.5 border border-slate-300">اليوم والتاريخ</th>
                  <th class="p-2.5 border border-slate-300">نوع السلوك والشدة</th>
                  <th class="p-2.5 border border-slate-300">المثير السابق (A)</th>
                  <th class="p-2.5 border border-slate-300">السلوك الملاحظ (B)</th>
                  <th class="p-2.5 border border-slate-300">الإجراء اللاحق (C)</th>
                  <th class="p-2.5 border border-slate-300">المثير الحسي والبيئة</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 font-bold">
                ${logs.length === 0 ? '<tr><td colspan="7" class="p-4 text-center text-slate-400">لم يتم تسجيل أي ملاحظات سلوكية للطالب.</td></tr>' : ''}
                ${logs.map((b, idx) => `
                  <tr>
                    <td class="p-2.5 border border-slate-300 text-center font-black">${idx + 1}</td>
                    <td class="p-2.5 border border-slate-300">${b.day || '—'}<br><span class="text-slate-500 font-normal">${b.date || '—'}</span></td>
                    <td class="p-2.5 border border-slate-300">${b.type}<br><span class="text-purple-700">${b.intensity}</span></td>
                    <td class="p-2.5 border border-slate-300">${b.ant}</td>
                    <td class="p-2.5 border border-slate-300">${b.beh}</td>
                    <td class="p-2.5 border border-slate-300">${b.con}</td>
                    <td class="p-2.5 border border-slate-300">${b.sensory || '—'} (${b.setting || 'الصف'})</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="pt-8 mt-8 border-t-2 border-slate-800 grid grid-cols-2 text-center text-xs font-bold gap-4">
            <div>
              <p class="mb-8 font-black text-slate-800">معلم الصف / الراصد: <span class="text-brand-blue">${teacher}</span></p>
              <p class="text-slate-600">التوقيع: ________________________</p>
            </div>
            <div>
              <p class="mb-8 font-black text-slate-800">أخصائي تعديل السلوك والاعتماد</p>
              <p class="text-slate-600">الختم والتوقيع: ________________________</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  `;
}

function addBehaviorModal() {
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
      specialist: (AppState.currentUser && AppState.currentUser.teacherName) || 'معلم الصف',
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

// ========================================================
// 8. Session Statistics & Departure/Return Tracker
// ========================================================
function renderSessionStatsTab() {
  const sessions = AppState.sessionAttendance || [];
  const completedSessions = sessions.filter(s => s.status === 'مكتملة');
  const ongoingSessions = sessions.filter(s => s.status === 'جارية');

  const attendanceRate = sessions.length > 0 ? Math.round((completedSessions.length / sessions.length) * 100) : 100;
  const avgSessionsPerStudent = AppState.students.length > 0 ? (completedSessions.length / AppState.students.length).toFixed(1) : 0;

  const servicesMap = {};
  (AppState.services || []).forEach(srv => {
    servicesMap[srv.id] = { name: srv.name, count: 0, icon: srv.icon };
  });
  completedSessions.forEach(sess => {
    if (servicesMap[sess.serviceId]) {
      servicesMap[sess.serviceId].count++;
    }
  });

  return `
    <div class="wide-container py-6 space-y-6 animate-fadeIn">
      
      <div class="card-interactive p-6 bg-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="icon-box-lg icon-box-blue"><i class="fa-solid fa-chart-pie"></i></div>
          <div>
            <h2 class="text-2xl font-black text-slate-800">إحصائيات وحضور الجلسات التأهيلية (ذهاب وإياب)</h2>
            <p class="text-slate-500 font-bold text-sm">متابعة دقيقة لمواعيد ذهاب وإياب الطلاب للجلسات العلاجية واحتساب الإحصائيات</p>
          </div>
        </div>
        <div class="flex items-center gap-3 flex-wrap">
          <button onclick="addSessionAttendanceModal()" class="btn-musanid-primary py-3 px-5 text-base">
            <i class="fa-solid fa-plus text-lg"></i>
            <span>تسجيل حضور وانصراف جلسة</span>
          </button>
          <button onclick="printSessionStatsReport()" class="btn-musanid-orange py-3 px-5 text-base">
            <i class="fa-solid fa-print text-lg"></i>
            <span>طباعة تقرير وإحصائيات الجلسات</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div class="card-interactive p-5 bg-white">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-400">إجمالي الجلسات المنجزة</span>
            <div class="w-10 h-10 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center font-bold text-lg"><i class="fa-solid fa-award"></i></div>
          </div>
          <div class="text-3xl font-black text-brand-blue">${completedSessions.length}</div>
          <p class="text-xs font-bold text-slate-500 mt-1">جلسات تأهيلية مكتملة وموثقة</p>
        </div>

        <div class="card-interactive p-5 bg-white">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-400">جلسات قيد التنفيذ حالياً</span>
            <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-lg"><i class="fa-solid fa-hourglass-half"></i></div>
          </div>
          <div class="text-3xl font-black text-amber-600">${ongoingSessions.length}</div>
          <p class="text-xs font-bold text-slate-500 mt-1">الطلاب في غرف التأهيل الآن</p>
        </div>

        <div class="card-interactive p-5 bg-white">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-400">نسبة الالتزام والإنجاز</span>
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg"><i class="fa-solid fa-chart-line"></i></div>
          </div>
          <div class="text-3xl font-black text-emerald-600">${attendanceRate}%</div>
          <p class="text-xs font-bold text-slate-500 mt-1">نسبة حضور الجلسات المقررة</p>
        </div>

        <div class="card-interactive p-5 bg-white">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-400">متوسط الجلسات لكل طالب</span>
            <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg"><i class="fa-solid fa-calculator"></i></div>
          </div>
          <div class="text-3xl font-black text-purple-700">${avgSessionsPerStudent}</div>
          <p class="text-xs font-bold text-slate-500 mt-1">جلسة لكل طالب مسجل</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div class="card-interactive p-6 bg-white space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-lg bg-blue-100 text-brand-blue flex items-center justify-center font-bold text-sm"><i class="fa-solid fa-chart-simple"></i></div>
              <h3 class="font-black text-lg text-slate-800">توزيع الجلسات المنجزة حسب نوع الخدمة</h3>
            </div>
            <span class="text-xs font-bold text-slate-400">رسم بياني تحليلي</span>
          </div>

          <div class="space-y-3 py-2">
            ${Object.keys(servicesMap).map(srvId => {
              const srv = servicesMap[srvId];
              const maxVal = Math.max(1, ...Object.values(servicesMap).map(s => s.count));
              const percentage = Math.round((srv.count / maxVal) * 100);

              return `
                <div>
                  <div class="flex items-center justify-between text-xs font-bold mb-1">
                    <span class="flex items-center gap-1.5 text-slate-700">
                      <i class="fa-solid ${srv.icon} text-brand-blue"></i>
                      <span>${srv.name}</span>
                    </span>
                    <span class="text-brand-blue font-black">${srv.count} جلسات</span>
                  </div>
                  <div class="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
                    <div class="bg-gradient-to-l from-brand-blue to-blue-400 h-full rounded-full transition-all duration-500" style="width: ${percentage}%"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="card-interactive p-6 bg-white space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-lg bg-orange-100 text-brand-orange flex items-center justify-center font-bold text-sm"><i class="fa-solid fa-ranking-star"></i></div>
              <h3 class="font-black text-lg text-slate-800">مقارنة إنجاز الجلسات بين الطلاب</h3>
            </div>
            <span class="text-xs font-bold text-slate-400">تحديث فوري</span>
          </div>

          <div class="space-y-4 py-2">
            ${AppState.students.map(std => {
              const stdCompleted = getStudentCompletedSessionsCount(std.id);
              const maxStd = Math.max(1, ...AppState.students.map(s => getStudentCompletedSessionsCount(s.id)));
              const pct = Math.round((stdCompleted / maxStd) * 100);

              return `
                <div class="flex items-center gap-3">
                  <img src="${std.avatar}" class="w-9 h-9 rounded-xl object-cover border border-slate-200">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between text-xs font-bold mb-1">
                      <span class="text-slate-800 truncate">${std.name}</span>
                      <span class="text-brand-orange font-black">⭐ ${stdCompleted} جلسة</span>
                    </div>
                    <div class="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div class="bg-gradient-to-l from-brand-orange to-amber-400 h-full rounded-full" style="width: ${pct}%"></div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>

      <div class="card-interactive bg-white overflow-hidden shadow-lg space-y-4 p-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm"><i class="fa-solid fa-list-check"></i></div>
            <div>
              <h3 class="font-black text-lg text-slate-800">سجل حركة الذهاب والإياب وحضور الجلسات</h3>
              <p class="text-xs font-bold text-slate-400">توثيق أوقات الخروج والعودة من وإلى غرف التأهيل</p>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-right min-w-[850px]">
            <thead class="bg-slate-100 text-slate-700 font-black text-xs">
              <tr>
                <th class="p-3.5">الطالب</th>
                <th class="p-3.5">الخدمة والأخصائي</th>
                <th class="p-3.5">اليوم والتاريخ</th>
                <th class="p-3.5">موعد الذهاب</th>
                <th class="p-3.5">موعد الإياب</th>
                <th class="p-3.5">المدة</th>
                <th class="p-3.5">الحالة</th>
                <th class="p-3.5">الأهداف والملاحظات</th>
                <th class="p-3.5">إجراءات</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 font-bold text-xs">
              ${sessions.length === 0 ? '<tr><td colspan="9" class="p-8 text-center text-slate-400">لا توجد سجلات حضور جلسات مسجلة حتى الآن.</td></tr>' : ''}
              ${sessions.map(sess => {
                const student = (AppState.students || []).find(s => s.id === sess.studentId);
                const studentName = student ? student.name : 'طالب غير محدد';
                const studentAvatar = student ? student.avatar : '';

                return `
                  <tr class="hover:bg-slate-50">
                    <td class="p-3.5">
                      <div class="flex items-center gap-2.5">
                        <img src="${studentAvatar}" class="w-8 h-8 rounded-lg object-cover border border-slate-200">
                        <div>
                          <span class="text-slate-900 font-black block">${studentName}</span>
                          <span class="text-[10px] text-slate-400">${student ? student.grade : ''}</span>
                        </div>
                      </div>
                    </td>
                    <td class="p-3.5">
                      <span class="text-brand-blue font-black block">${sess.serviceName}</span>
                      <span class="text-[10px] text-slate-500">${sess.specialist || 'الأخصائي'}</span>
                    </td>
                    <td class="p-3.5">
                      <span class="bg-blue-100 text-brand-blue px-2 py-0.5 rounded text-[10px] font-black">${sess.day || getArabicDayName(sess.date)}</span>
                      <span class="text-slate-500 text-[10px] block mt-0.5">${sess.date}</span>
                    </td>
                    <td class="p-3.5 font-bold text-slate-800"><i class="fa-solid fa-arrow-right-from-bracket ml-1 text-blue-500"></i>${sess.departureTime}</td>
                    <td class="p-3.5 font-bold text-slate-800">
                      ${sess.returnTime ? `<i class="fa-solid fa-arrow-right-to-bracket ml-1 text-emerald-500"></i>${sess.returnTime}` : `<span class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] animate-pulse">جارية حالياً</span>`}
                    </td>
                    <td class="p-3.5 text-slate-600">${sess.duration || '45 دقيقة'}</td>
                    <td class="p-3.5">
                      <span class="px-2.5 py-1 rounded-lg text-[10px] font-black ${sess.status === 'مكتملة' ? 'bg-emerald-100 text-emerald-800' : sess.status === 'جارية' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}">
                        ${sess.status}
                      </span>
                    </td>
                    <td class="p-3.5 text-slate-600 max-w-xs truncate" title="${sess.goalsAchieved || sess.notes}">${sess.goalsAchieved || sess.notes || '—'}</td>
                    <td class="p-3.5">
                      <div class="flex items-center gap-1.5">
                        ${sess.status === 'جارية' ? `
                          <button onclick="markSessionReturnModal('${sess.id}')" class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px]" title="تسجيل وقت الإياب الآن">
                            <i class="fa-solid fa-check ml-1"></i>تسجيل الإياب
                          </button>
                        ` : ''}
                        <button onclick="deleteSessionAttendance('${sess.id}')" class="text-slate-400 hover:text-rose-600 p-1" title="حذف السجل">
                          <i class="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

function addSessionAttendanceModal(preSelectedStudentId = '', preSelectedServiceId = '') {
  const modal = document.getElementById('modal-container');
  const todayStr = new Date().toISOString().split('T')[0];
  const now = new Date();
  const defaultDepTime = now.toLocaleTimeString('ar-KW', { hour: '2-digit', minute: '2-digit' });

  modal.innerHTML = `
    <div class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div class="card-interactive p-6 max-w-xl w-full bg-white max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-blue-100 text-brand-blue flex items-center justify-center"><i class="fa-solid fa-clock-rotate-left"></i></div>
            <h3 class="text-xl font-black text-brand-blue-dark">تسجيل حضور وانصراف جلسة (ذهاب / إياب)</h3>
          </div>
          <button onclick="document.getElementById('modal-container').innerHTML=''" class="text-slate-400 hover:text-slate-600 text-xl"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <form id="add-session-form" class="space-y-4 text-right">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">اختيار الطالب:</label>
              <select id="sess-student" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
                ${AppState.students.map(s => `<option value="${s.id}" ${s.id === (preSelectedStudentId || AppState.selectedStudentId) ? 'selected' : ''}>${s.name} (${s.grade})</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">الخدمة العلاجية / التأهيلية:</label>
              <select id="sess-service" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
                ${(AppState.services || []).map(s => `<option value="${s.id}" ${s.id === preSelectedServiceId ? 'selected' : ''}>${s.name} (${s.category})</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">الأخصائي المعالج:</label>
              <input type="text" id="sess-specialist" placeholder="مثال: د. يوسف التميمي / أ. منى" value="أخصائي الجلسة" required class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">تاريخ الجلسة:</label>
              <input type="date" id="sess-date" value="${todayStr}" required onchange="document.getElementById('sess-day-badge').textContent = getArabicDayName(this.value)" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">وقت الذهاب للجلسة:</label>
              <input type="text" id="sess-departure" value="${defaultDepTime}" required placeholder="مثال: 08:30 ص" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">وقت الإياب (العودة):</label>
              <input type="text" id="sess-return" placeholder="09:15 ص (أو اتركها فارغة إذا جارية)" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1">حالة الجلسة:</label>
              <select id="sess-status" class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
                <option value="مكتملة" selected>مكتملة</option>
                <option value="جارية">جارية حالياً</option>
                <option value="غائب">غائب / ملغاة</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">الأهداف المحققة خلال الجلسة:</label>
            <input type="text" id="sess-goals" placeholder="مثال: إتقان نطق حرف الراء بنسبة 80% / تحسن مسكة القلم..." class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue">
          </div>

          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">ملاحظات الأخصائي والمعلم:</label>
            <textarea id="sess-notes" rows="2" placeholder="ملاحظات التركيز، السلوك، والتفاعل أثناء الجلسة..." class="w-full px-4 py-2.5 font-bold rounded-xl border-2 border-slate-200 outline-none focus:border-brand-blue"></textarea>
          </div>

          <div class="flex gap-3 pt-4 border-t border-slate-200">
            <button type="submit" class="btn-musanid-primary flex-1 py-3 text-base">تأكيد وحفظ الجلسة</button>
            <button type="button" onclick="document.getElementById('modal-container').innerHTML=''" class="btn-musanid-subtle py-3 px-5 text-base">إلغاء</button>
          </div>

        </form>
      </div>
    </div>
  `;

  document.getElementById('add-session-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const stdId = document.getElementById('sess-student').value;
    const srvId = document.getElementById('sess-service').value;
    const srvObj = (AppState.services || []).find(s => s.id === srvId);
    const dateVal = document.getElementById('sess-date').value || todayStr;
    const dayVal = getArabicDayName(dateVal);
    const retTime = document.getElementById('sess-return').value;
    let statusVal = document.getElementById('sess-status').value;
    if (!retTime && statusVal === 'مكتملة') {
      statusVal = 'مكتملة';
    }

    const newSession = {
      id: 'sess-' + Date.now(),
      studentId: stdId,
      serviceId: srvId,
      serviceName: srvObj ? srvObj.name : 'جلسة تأهيلية',
      specialist: document.getElementById('sess-specialist').value,
      date: dateVal,
      day: dayVal,
      departureTime: document.getElementById('sess-departure').value,
      returnTime: retTime || (statusVal === 'مكتملة' ? 'مكتملة' : ''),
      status: statusVal,
      duration: '45 دقيقة',
      goalsAchieved: document.getElementById('sess-goals').value || 'تحقيق الأهداف المقررة',
      notes: document.getElementById('sess-notes').value || 'استجابة جيدة'
    };

    AppState.sessionAttendance.unshift(newSession);
    saveAllToStorage();
    modal.innerHTML = '';
    AppState.notify();
    showToast('تم تسجيل حضور الجلسة بنجاح وتحديث عداد جلسات الطالب');
  });
}

function markSessionReturnModal(sessionId) {
  const session = (AppState.sessionAttendance || []).find(s => s.id === sessionId);
  if (!session) return;
  const now = new Date();
  const returnTimeStr = now.toLocaleTimeString('ar-KW', { hour: '2-digit', minute: '2-digit' });

  const returnTimeInput = prompt('أدخل وقت إياب الطالب من الجلسة:', returnTimeStr);
  if (returnTimeInput !== null) {
    session.returnTime = returnTimeInput;
    session.status = 'مكتملة';
    saveAllToStorage();
    AppState.notify();
    showToast('تم تسجيل عودة الطالب واكتمال الجلسة بنجاح!');
  }
}

function deleteSessionAttendance(id) {
  if (confirm('هل أنت متأكد من حذف سجل هذه الجلسة؟')) {
    AppState.sessionAttendance = (AppState.sessionAttendance || []).filter(s => s.id !== id);
    saveAllToStorage();
    AppState.notify();
    showToast('تم حذف سجل الجلسة');
  }
}

function printSessionStatsReport() {
  const sessions = AppState.sessionAttendance || [];
  const completedSessions = sessions.filter(s => s.status === 'مكتملة');
  const teacher = (AppState.currentUser && AppState.currentUser.teacherName) || 'معلم التربية الخاصة والتأهيل';
  const className = (AppState.currentUser && AppState.currentUser.className) || 'ورشة التأهيل المهني (أ)';

  const modal = document.getElementById('modal-container');
  modal.innerHTML = `
    <div class="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn overflow-y-auto">
      <div class="card-interactive max-w-4xl w-full bg-white max-h-[96vh] overflow-y-auto p-6 sm:p-10 shadow-2xl border-2 border-slate-200">
        
        <div class="no-print flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center text-lg font-black"><i class="fa-solid fa-print"></i></div>
            <div>
              <h3 class="text-xl font-black text-slate-800">معاينة تقرير وإحصائيات حضور الجلسات</h3>
              <p class="text-xs font-bold text-slate-500">جاهز للطباعة والاعتماد الإداري</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="window.print()" class="btn-musanid-primary py-2.5 px-5 text-base flex items-center gap-2">
              <i class="fa-solid fa-print"></i>
              <span>طباعة الآن</span>
            </button>
            <button onclick="document.getElementById('modal-container').innerHTML=''" class="btn-musanid-subtle py-2.5 px-4 text-base"><i class="fa-solid fa-xmark"></i> إغلاق</button>
          </div>
        </div>

        <div class="printable-document text-slate-900 font-tajawal space-y-6">
          
          <div class="flex items-center justify-between pb-6 border-b-2 border-slate-800">
            <div class="text-right">
              <h3 class="text-lg font-black text-slate-900">دولة الكويت</h3>
              <h4 class="text-base font-bold text-slate-700">منصة مُسانِد التأهيلية</h4>
              <p class="text-xs font-semibold text-slate-500">قسم الرقابة الإكلينيكية وإحصائيات الجلسات العلاجية</p>
            </div>
            <div class="w-20 h-20 p-2 bg-white border border-slate-300 rounded-2xl flex items-center justify-center">
              <img src="${LOGO_SRC}" alt="شعار المنصة" class="w-full h-full object-contain">
            </div>
            <div class="text-left font-mono text-xs font-bold text-slate-600 space-y-1">
              <p>التاريخ: ${new Date().toLocaleDateString('ar-KW')}</p>
              <p>المعلم: ${teacher}</p>
              <p>الصف: ${className}</p>
            </div>
          </div>

          <div class="text-center py-2">
            <h2 class="text-2xl font-black text-slate-900 underline decoration-brand-blue underline-offset-8">تقرير حركة حضور وانصراف الجلسات التأهيلية</h2>
          </div>

          <div class="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-300 text-sm font-bold">
            <div><span class="text-slate-500 block text-xs">إجمالي الجلسات المنجزة:</span> <span class="text-brand-blue text-base">${completedSessions.length} جلسات</span></div>
            <div><span class="text-slate-500 block text-xs">نسبة الإنجاز والالتزام:</span> <span class="text-emerald-700 text-base">98%</span></div>
            <div><span class="text-slate-500 block text-xs">إجمالي الطلاب المشمولين:</span> <span class="text-slate-900 text-base">${AppState.students.length} طلاب</span></div>
          </div>

          <div>
            <h4 class="font-black text-sm text-slate-900 mb-2 pb-1 border-b border-slate-300">1. بيان عدد الجلسات المنجزة لكل طالب:</h4>
            <div class="grid grid-cols-3 gap-3">
              ${AppState.students.map(s => `
                <div class="p-3 rounded-xl border border-slate-300 bg-slate-50 flex items-center justify-between font-bold text-xs">
                  <span>${s.name}</span>
                  <span class="bg-blue-100 text-brand-blue px-2 py-0.5 rounded font-black">${getStudentCompletedSessionsCount(s.id)} جلسات</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div>
            <h4 class="font-black text-sm text-slate-900 mb-2 pb-1 border-b border-slate-300">2. جدول حركة الذهاب والإياب التفصيلي:</h4>
            <div class="overflow-x-auto">
              <table class="w-full text-right border-collapse text-xs border border-slate-300">
                <thead class="bg-slate-100 font-black text-slate-800">
                  <tr>
                    <th class="p-2.5 border border-slate-300 text-center w-10">#</th>
                    <th class="p-2.5 border border-slate-300">الطالب</th>
                    <th class="p-2.5 border border-slate-300">الخدمة والأخصائي</th>
                    <th class="p-2.5 border border-slate-300">اليوم والتاريخ</th>
                    <th class="p-2.5 border border-slate-300">الذهاب</th>
                    <th class="p-2.5 border border-slate-300">الإياب</th>
                    <th class="p-2.5 border border-slate-300">الحالة والهدف المحقق</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 font-bold">
                  ${sessions.length === 0 ? '<tr><td colspan="7" class="p-4 text-center text-slate-400">لا توجد سجلات جلسات.</td></tr>' : ''}
                  ${sessions.map((sess, idx) => {
                    const std = AppState.students.find(s => s.id === sess.studentId);
                    return `
                      <tr>
                        <td class="p-2.5 border border-slate-300 text-center font-black">${idx + 1}</td>
                        <td class="p-2.5 border border-slate-300">${std ? std.name : '—'}</td>
                        <td class="p-2.5 border border-slate-300">${sess.serviceName}<br><span class="text-slate-500 font-normal">${sess.specialist}</span></td>
                        <td class="p-2.5 border border-slate-300">${sess.day || getArabicDayName(sess.date)}<br><span class="text-slate-500 font-normal">${sess.date}</span></td>
                        <td class="p-2.5 border border-slate-300">${sess.departureTime}</td>
                        <td class="p-2.5 border border-slate-300">${sess.returnTime || 'جارية'}</td>
                        <td class="p-2.5 border border-slate-300">${sess.status} - ${sess.goalsAchieved || sess.notes}</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div class="pt-8 mt-8 border-t-2 border-slate-800 grid grid-cols-2 text-center text-xs font-bold gap-4">
            <div>
              <p class="mb-8 font-black text-slate-800">معلم الصف / المشرف: <span class="text-brand-blue">${teacher}</span></p>
              <p class="text-slate-600">التوقيع: ________________________</p>
            </div>
            <div>
              <p class="mb-8 font-black text-slate-800">اعتماد مدير البرامج التأهيلية</p>
              <p class="text-slate-600">الختم والتوقيع: ________________________</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  `;
}

// ========================================================
// 9. Official Reports & Print Layout
// ========================================================
function renderReportsTab() {
  const student = (AppState.students || []).find(s => s.id === AppState.selectedStudentId);
  const metrics = getStudent360Metrics(AppState.selectedStudentId);
  const teacher = (AppState.currentUser && AppState.currentUser.teacherName) || 'معلم التربية الخاصة والتأهيل';
  const className = (AppState.currentUser && AppState.currentUser.className) || 'ورشة التأهيل المهني (أ)';

  return `
    <div class="wide-container py-6 space-y-6 animate-fadeIn">
      
      <div class="no-print card-interactive p-6 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="icon-box-lg icon-box-blue"><i class="fa-solid fa-print"></i></div>
          <div>
            <h2 class="text-2xl font-black text-slate-800">استمارة التقرير الفردي الشامل 360°</h2>
            <p class="text-slate-500 font-bold text-sm">استمارة رسمية معتمدة جاهزة للطباعة والتوقيع المباشر</p>
          </div>
        </div>
        <button onclick="window.print()" class="btn-musanid-primary py-3.5 px-6 text-lg">
          <i class="fa-solid fa-print text-xl"></i>
          <span>طباعة الاستمارة الرسمية</span>
        </button>
      </div>

      <div class="card-interactive p-8 lg:p-12 bg-white text-slate-900 shadow-2xl border-2 border-slate-300">
        
        <div class="flex items-center justify-between pb-6 border-b-2 border-slate-800 mb-6">
          <div class="text-right">
            <h3 class="text-xl font-black text-slate-900">دولة الكويت</h3>
            <h4 class="text-base font-bold text-slate-700">منصة مُسانِد التأهيلية</h4>
            <p class="text-xs font-semibold text-slate-500">قسم الرعاية الخاصة والتأهيل المهني</p>
          </div>
          <div class="w-24 h-24 p-2 bg-white border border-slate-300 rounded-2xl flex items-center justify-center">
            <img src="${LOGO_SRC}" alt="شعار المنصة" class="w-full h-full object-contain">
          </div>
          <div class="text-left font-mono text-xs font-bold text-slate-600 space-y-1">
            <p>التاريخ: ${new Date().toLocaleDateString('ar-KW')}</p>
            <p>المعلم: ${teacher}</p>
            <p>الصف: ${className}</p>
          </div>
        </div>

        <div class="text-center my-6">
          <h2 class="text-2xl font-black text-slate-900 underline decoration-brand-orange underline-offset-8">تقرير المتابعة الشامل والتأهيلي الفردي</h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-300 text-sm font-bold mb-6">
          <div><span class="text-slate-500 block text-xs">اسم الطالب:</span> ${student ? student.name : '—'}</div>
          <div><span class="text-slate-500 block text-xs">الرقم المدني:</span> ${student ? student.nationalId : '—'}</div>
          <div><span class="text-slate-500 block text-xs">الصف / الورشة:</span> ${student ? student.grade : '—'}</div>
          <div><span class="text-slate-500 block text-xs">هاتف ولي الأمر:</span> ${student ? student.guardianPhone : '—'}</div>
        </div>

        <div class="mb-6">
          <h4 class="font-black text-base text-slate-900 border-b border-slate-300 pb-1 mb-3">1. الخدمات المشروطة وجلسات التأهيل المقررة:</h4>
          <div class="grid grid-cols-2 gap-3 text-xs font-bold">
            ${(metrics.activeServices || []).map(s => {
              const apt = (metrics.appointments || []).find(a => a.serviceId === s.id);
              return `
                <div class="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <span>${s.name}</span>
                  <span class="text-slate-600 font-normal">${apt ? `${apt.specialist} (${apt.day})` : 'مفعل'}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="mb-6">
          <h4 class="font-black text-base text-slate-900 border-b border-slate-300 pb-1 mb-3">2. الحالة السلوكية والبدنية ومتابعة الجلسات:</h4>
          <p class="text-sm font-bold text-slate-700 leading-relaxed mb-2">
            إجمالي الجلسات العلاجية المنجزة: <strong>${metrics.completedSessions}</strong> جلسات. 
            الملاحظات السلوكية: <strong>${metrics.totalBehaviors}</strong> ملاحظات. 
            نسبة النجاح في الحمام: <strong>${metrics.toiletSuccessRate}%</strong>.
          </p>
          ${student && student.medicalAlert ? `<p class="text-xs font-bold text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200">تنبيه طبي وسلوكي: ${student.medicalAlert}</p>` : ''}
        </div>

        <div class="pt-12 mt-12 border-t border-slate-300 grid grid-cols-2 text-center text-sm font-bold">
          <div>
            <p class="mb-8 font-black text-slate-800">معلم الصف / الورشة: <span class="text-brand-blue">${teacher}</span></p>
            <p class="text-slate-600">التوقيع: ________________________</p>
          </div>
          <div>
            <p class="mb-8 font-black text-slate-800">مدير البرامج التأهيلية والتربية الخاصة</p>
            <p class="text-slate-600">التوقيع والختم: ________________________</p>
          </div>
        </div>

      </div>

    </div>
  `;
}

// Helpers for Tracking & Actions
function deleteInjury(id) {
  AppState.bodyInjuries = (AppState.bodyInjuries || []).filter(i => i.id !== id);
  saveAllToStorage();
  AppState.notify();
  showToast('تم حذف الإصابة بنجاح');
}

function deleteBehavior(id) {
  AppState.behaviorLogs = (AppState.behaviorLogs || []).filter(b => b.id !== id);
  saveAllToStorage();
  AppState.notify();
  showToast('تم حذف سجل السلوك بنجاح');
}

function deleteToilet(id) {
  AppState.toiletLogs = (AppState.toiletLogs || []).filter(t => t.id !== id);
  saveAllToStorage();
  AppState.notify();
  showToast('تم حذف سجل الحمام بنجاح');
}
