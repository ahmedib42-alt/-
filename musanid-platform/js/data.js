/**
 * ========================================================
 * منصة مُسانِد v2.5 - النسخة الأساسية المعيارية
 * ملف البيانات التأسيسية الأولية (Seed & Default Data)
 * ========================================================
 */

const MusanidDefaultData = {
  currentUser: {
    teacherName: 'معلم التربية الخاصة والتأهيل',
    className: 'ورشة التأهيل المهني (أ)',
    isLoggedIn: true
  },

  students: [
    {
      id: 'std-101',
      name: 'سعود ناصر العتيبي',
      dob: '2016-04-12',
      nationalId: '316041200981',
      grade: 'الصف الرابع / دمج وتأهيل',
      workshop: 'ورشة التأهيل المهني (أ)',
      teacher: 'معلم التربية الخاصة',
      guardianPhone: '96599887766',
      medicalAlert: 'حساسية طعام خفيفة، يحتاج إشراف بصري أثناء الأنشطة الحركية',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&h=200&fit=crop&crop=faces',
      activeServices: ['speech', 'occupational', 'behavior', 'transport'],
      joinedDate: '2023-09-01'
    },
    {
      id: 'std-102',
      name: 'فيصل أحمد الهاجري',
      dob: '2015-11-20',
      nationalId: '315112000843',
      grade: 'ورشة الأشغال اليدوية والخياطة',
      workshop: 'ورشة الأشغال الفنية',
      teacher: 'معلم التربية الخاصة',
      guardianPhone: '96598765432',
      medicalAlert: 'لا توجد موانع طبية',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=faces',
      activeServices: ['behavior', 'vocational', 'skills'],
      joinedDate: '2023-09-01'
    },
    {
      id: 'std-103',
      name: 'عبد العزيز محمد الدوسري',
      dob: '2017-02-15',
      nationalId: '317021500412',
      grade: 'صف التهيئة الحركية والاستقلالية',
      workshop: 'ورشة التربية الفكرية والتهيئة',
      teacher: 'معلم التربية الخاصة',
      guardianPhone: '96597711223',
      medicalAlert: 'صعوبة في التوازن الحركي الدقيق',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
      activeServices: ['physio', 'occupational', 'toilet_training'],
      joinedDate: '2024-01-10'
    }
  ],

  services: [
    { id: 'speech', name: 'جلسات النطق والتخاطب', icon: 'fa-comments', category: 'علاجي', color: 'blue' },
    { id: 'occupational', name: 'العلاج الوظيفي وتنمية المهارات', icon: 'fa-hand-sparkles', category: 'تأهيلي', color: 'orange' },
    { id: 'physio', name: 'العلاج الطبيعي والتأهيل الحركي', icon: 'fa-person-walking', category: 'بدني', color: 'emerald' },
    { id: 'behavior', name: 'برنامج تعديل السلوك والدعم النفسي', icon: 'fa-brain', category: 'سلوكي', color: 'purple' },
    { id: 'vocational', name: 'التدريب والإنتاجية المهنية', icon: 'fa-hammer', category: 'مهني', color: 'orange' },
    { id: 'toilet_training', name: 'برنامج التدريب على الحمام والاستقلالية', icon: 'fa-restroom', category: 'استقلالي', color: 'emerald' },
    { id: 'transport', name: 'خدمة النقل والمرافقة الخاصة', icon: 'fa-bus', category: 'لوجستي', color: 'blue' },
    { id: 'feeding', name: 'المتابعة الغذائية والحمية', icon: 'fa-utensils', category: 'صحي', color: 'orange' }
  ],

  serviceAppointments: [
    { id: 'apt-1', studentId: 'std-101', serviceId: 'speech', specialist: 'د. يوسف التميمي', day: 'الأحد', time: '08:30 ص', notes: 'التركيز على مخارج حرف الراء' },
    { id: 'apt-2', studentId: 'std-101', serviceId: 'occupational', specialist: 'أ. منى الحمدان', day: 'الثلاثاء', time: '10:15 ص', notes: 'تمارين القبضة الثلاثية للقلم' },
    { id: 'apt-3', studentId: 'std-102', serviceId: 'vocational', specialist: 'م. إبراهيم الخالدي', day: 'الإثنين', time: '09:00 ص', notes: 'قص وتجهيز قوالب الخشب' },
    { id: 'apt-4', studentId: 'std-103', serviceId: 'physio', specialist: 'د. أحمد الصالح', day: 'الأربعاء', time: '11:00 ص', notes: 'تمارين التوازن الحركي والتوافق العضلي' },
    { id: 'apt-5', studentId: 'std-102', serviceId: 'behavior', specialist: 'أ. فهد الشمري', day: 'الخميس', time: '08:45 ص', notes: 'تعزيز ضبط الذات في الورشة' },
    { id: 'apt-6', studentId: 'std-101', serviceId: 'transport', specialist: 'مشرف النقل', day: 'الأحد', time: '07:30 ص', notes: 'خط سير الرحلة الصباحية' }
  ],

  sessionAttendance: [
    {
      id: 'sess-1',
      studentId: 'std-101',
      serviceId: 'speech',
      serviceName: 'جلسات النطق والتخاطب',
      specialist: 'د. يوسف التميمي',
      day: 'الأحد',
      date: '2026-09-05',
      departureTime: '08:30 ص',
      returnTime: '09:15 ص',
      status: 'مكتملة',
      duration: '45 دقيقة',
      goalsAchieved: 'إتقان نطق حرف الراء بنسبة 80%',
      notes: 'استجابة ممتازة وتركيز عالٍ'
    },
    {
      id: 'sess-2',
      studentId: 'std-101',
      serviceId: 'occupational',
      serviceName: 'العلاج الوظيفي وتنمية المهارات',
      specialist: 'أ. منى الحمدان',
      day: 'الثلاثاء',
      date: '2026-09-03',
      departureTime: '10:15 ص',
      returnTime: '11:00 ص',
      status: 'مكتملة',
      duration: '45 دقيقة',
      goalsAchieved: 'تحسن مسكة القلم الثلاثية',
      notes: 'تمارين عضلات اليد الدقيقة'
    },
    {
      id: 'sess-3',
      studentId: 'std-101',
      serviceId: 'behavior',
      serviceName: 'برنامج تعديل السلوك والدعم النفسي',
      specialist: 'أ. فهد الشمري',
      day: 'الخميس',
      date: '2026-09-01',
      departureTime: '08:45 ص',
      returnTime: '09:30 ص',
      status: 'مكتملة',
      duration: '45 دقيقة',
      goalsAchieved: 'ضبط الذات والجلوس 20 دقيقة',
      notes: 'استجابة إيجابية للتعزيز الرمزي'
    },
    {
      id: 'sess-4',
      studentId: 'std-102',
      serviceId: 'vocational',
      serviceName: 'التدريب والإنتاجية المهنية',
      specialist: 'م. إبراهيم الخالدي',
      day: 'الإثنين',
      date: '2026-09-04',
      departureTime: '09:00 ص',
      returnTime: '09:50 ص',
      status: 'مكتملة',
      duration: '50 دقيقة',
      goalsAchieved: 'قص قوالب خشبية بأمان',
      notes: 'التزام بإرشادات السلامة بالورشة'
    },
    {
      id: 'sess-5',
      studentId: 'std-103',
      serviceId: 'physio',
      serviceName: 'العلاج الطبيعي والتأهيل الحركي',
      specialist: 'د. أحمد الصالح',
      day: 'الأربعاء',
      date: '2026-09-03',
      departureTime: '11:00 ص',
      returnTime: '11:45 ص',
      status: 'مكتملة',
      duration: '45 دقيقة',
      goalsAchieved: 'المشي على خط مستقيم بتوازن',
      notes: 'تمارين التوافق العضلي العصبي'
    }
  ],

  behaviorLogs: [
    {
      id: 'beh-1',
      studentId: 'std-101',
      day: 'الأحد',
      date: '2026-09-05',
      type: 'رفض ورمي أدوات',
      intensity: 'متوسطة',
      duration: '5 دقائق',
      ant: 'طلب إتمام مهمة كتابية صعبة بمفرده',
      beh: 'رمي القلم ورفض الجلوس على المقعد',
      con: 'استخدام التعزيز البديل وتقسيم المهمة لخطوات بسيطة',
      setting: 'الصف الدراسي',
      sensory: 'أصوات مرتفعة أثناء النشاط الجماعي',
      specialist: 'معلم التربية الخاصة'
    },
    {
      id: 'beh-2',
      studentId: 'std-102',
      day: 'الثلاثاء',
      date: '2026-09-03',
      type: 'نوبة غضب وصراخ',
      intensity: 'مرتفعة',
      duration: '10 دقائق',
      ant: 'تغيير غير متوقع في ترتيب الورشة',
      beh: 'الصراخ وضرب الطاولة باليد',
      con: 'اصطحابه إلى ركن الهدوء الحسي وتوفير بطاقات بصرية',
      setting: 'ورشة الأشغال الفنية',
      sensory: 'إضاءة قوية ورائحة دهان جديدة',
      specialist: 'أخصائي تعديل السلوك'
    }
  ],

  bodyInjuries: [
    { id: 'inj-1', studentId: 'std-101', view: 'front', x: 45, y: 35, type: 'كدمة زرقاء خفيفة', severity: 'بسيطة', notes: 'تمت الملاحظة أثناء الحصة الرياضية', date: '2026-09-04' },
    { id: 'inj-2', studentId: 'std-101', view: 'back', x: 52, y: 40, type: 'احمرار جلدي', severity: 'متوسطة', notes: 'احتكاك بحزام الحقيبة', date: '2026-09-05' }
  ],

  bodyAttachments: [
    {
      id: 'att-1',
      studentId: 'std-101',
      name: 'توثيق حركة اليد - العلاج الوظيفي.jpg',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600',
      size: '1.2 MB',
      date: '2026-09-04',
      notes: 'صورة توضح مدى استجابة حركة الأصابع'
    },
    {
      id: 'att-2',
      studentId: 'std-101',
      name: 'تقرير التقييم السريري والتوافق الحركي.pdf',
      type: 'doc',
      url: '#',
      size: '420 KB',
      date: '2026-09-03',
      notes: 'تقرير تشخيصي من مركز الكويت للتوحد'
    }
  ],

  toiletLogs: [
    { id: 'toi-1', studentId: 'std-101', date: '2026-09-05', day: 'الأحد', time: '09:00 ص', type: 'تبول', isSuccess: true, fluids: 'كوب ماء (150 مل)', notes: 'استجابة سريعة للنداء والإخراج بالحمام' },
    { id: 'toi-2', studentId: 'std-101', date: '2026-09-05', day: 'الأحد', time: '11:15 ص', type: 'تبول', isSuccess: true, fluids: 'عصير برتقال (200 مل)', notes: 'طلب الذهاب بمفرده عبر الإشارة' },
    { id: 'toi-3', studentId: 'std-101', date: '2026-09-04', day: 'السبت', time: '12:30 م', type: 'إخراج', isSuccess: false, fluids: 'كوب ماء', notes: 'بلل لاإرادي خفيف قبل الوصول للحمام' }
  ],

  tasks: [
    {
      id: 'task-1',
      title: 'مراجعة أهداف الخطة التربوية الفردية IEP',
      date: '2026-09-06',
      time: '09:00 ص',
      priority: 'high',
      category: 'فردي',
      studentName: 'سعود ناصر العتيبي',
      notes: 'تقييم تقدم الطالب في مهارات النطق والتواصل التعبيري',
      completed: false
    },
    {
      id: 'task-2',
      title: 'تجهيز خامات ورشة الأشغال اليدوية والألوان',
      date: '2026-09-06',
      time: '11:00 ص',
      priority: 'medium',
      category: 'ورشة',
      studentName: 'فيصل أحمد الهاجري',
      notes: 'فحص معايير السلامة المهنية لأدوات القص الآمن',
      completed: false
    },
    {
      id: 'task-3',
      title: 'تسجيل التقرير الدوري لتوازن السوائل والحمام',
      date: '2026-09-06',
      time: '01:00 م',
      priority: 'medium',
      category: 'تقارير',
      studentName: 'عبد العزيز الدوسري',
      notes: 'تحديث بيانات جدول الحمام وإرسال إشعار لولي الأمر',
      completed: true
    },
    {
      id: 'task-4',
      title: 'جلسة التنسيق المشترك مع أخصائي العلاج الطبيعي',
      date: '2026-09-07',
      time: '10:30 ص',
      priority: 'high',
      category: 'إداري',
      studentName: 'عام لجميع الطلاب',
      notes: 'مناقشة خطة التوافق الحركي والأنشطة الرياضية المعدلة',
      completed: false
    }
  ],

  archiveFiles: [
    {
      id: 'arch-1',
      name: 'الخطة التربوية والتأهيلية الفردية الشاملة IEP 2026.pdf',
      type: 'pdf',
      category: 'خطط تربوية',
      size: '1.4 MB',
      date: '2026-09-05',
      uploader: 'معلم التربية الخاصة',
      url: '#',
      notes: 'وثيقة الخطة الفردية المعتمدة لطلاب الورشة للفصل الدراسي الأول'
    },
    {
      id: 'arch-2',
      name: 'تقرير التقييم السريري الشامل لمركز الكويت للتوحد.pdf',
      type: 'pdf',
      category: 'تقارير طبية',
      size: '850 KB',
      date: '2026-09-03',
      uploader: 'أخصائي التشخيص',
      url: '#',
      notes: 'الفحص السريري والتقييم النفسي الحركي والتوافق العصبي'
    },
    {
      id: 'arch-3',
      name: 'توثيق جلسة العلاج الوظيفي والقبضة الثلاثية.mp4',
      type: 'video',
      category: 'فيديوهات تأهيلية',
      size: '12.5 MB',
      date: '2026-09-04',
      uploader: 'أ. منى الحمدان',
      url: '',
      notes: 'مقطع فيديو يوضح مدى استجابة حركة الأصابع في الورشة'
    },
    {
      id: 'arch-4',
      name: 'معرض إنتاج وإنجازات ورشة التأهيل المهني.jpg',
      type: 'photo',
      category: 'صور الأنشطة',
      size: '2.1 MB',
      date: '2026-09-02',
      uploader: 'معلم التربية الخاصة',
      url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800',
      notes: 'صور منتجات الطلاب والأشغال اليدوية بالورشة الفنية'
    },
    {
      id: 'arch-5',
      name: 'استمارة رصد التغذية والمتابعة الصحية.pdf',
      type: 'pdf',
      category: 'مستندات صحية',
      size: '340 KB',
      date: '2026-09-01',
      uploader: 'التمريض المدرسي',
      url: '#',
      notes: 'جدول الحمية الغذائية وتناول السوائل اليومي'
    }
  ]
};
