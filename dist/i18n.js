(() => {
  const translations = {
    'brand-name': 'Abdelrahman Abu Risha',
    'home-label': 'Back to home', 'main-nav': 'Main navigation',
    'nav-ads': 'Advertisements', 'nav-short': 'Short Videos', 'nav-long': 'Long Videos', 'nav-approach': 'What I Do',
    'availability': 'Available for projects', 'hero-eyebrow': 'Generative AI Video Creator',
    'hero-title-1': 'I turn ideas', 'hero-title-2': 'scenes you can see.',
    'hero-description': 'I’m Abdelrahman Abu Risha. I create videos and visual scenes with generative AI tools, from the first idea to the final cut.',
    'explore': 'Explore my work', 'talk': 'Let’s talk about your project',
    'hero-note': 'A clear idea, a memorable image, and a story worth watching.',
    'hero-bottom': 'AI-generated video · Visual storytelling · Generative audio', 'scroll-cue': 'Explore the portfolio',
    'shortcut-eyebrow': 'Explore my work', 'shortcut-title': 'Where would you like to go?',
    'shortcut-aria': 'Portfolio section shortcuts', 'preview-count': 'Two featured videos',
    'section-overline': 'My Work', 'ads-title': 'Advertisements', 'ads-desc': 'Advertising ideas transformed into AI-crafted scenes.', 'more-ads': 'More advertisements',
    'short-title': 'Short Videos', 'short-desc': 'Quick stories with a concentrated visual rhythm.', 'more-short': 'More short videos',
    'long-title': 'Long Videos', 'long-desc': 'Longer projects that let ideas, scenes, and stories unfold.', 'more-long': 'More long videos',
    'ads-aria': 'Featured advertisements', 'short-aria': 'Featured short videos', 'long-aria': 'Featured long videos',
    'approach-eyebrow': 'Technical experience meets visual craft', 'approach-title-1': 'I turn AI tools', 'approach-title-2': 'visible impact.',
    'approach-statement': 'I build complete visual experiences from an idea, spanning video and imagery to spaces that express a brand.',
    'company-label': 'Professional experience at', 'company-name': 'Al Durra Global<br>for Food Products', 'company-skills': 'Visual content · Interior design',
    'role-content-index': '01 / CONTENT', 'role-content-title': 'Generative AI for a YouTube channel',
    'role-content-desc': 'I work as a generative AI specialist for the company’s YouTube channel, turning ideas and products into videos and visual stories for its audience.',
    'role-interior-index': '02 / SPACE', 'role-interior-title': 'Interior design for the company',
    'role-interior-desc': 'I contribute to the company’s interior design, shaping thoughtful details and spaces that reflect its identity.',
    'role-higgs-index': '03 / SPECIALIZED EXPERIENCE', 'months': 'months', 'role-higgs-title': 'Hands-on experience with Higgsfield',
    'role-higgs-desc': 'Three months of practical experience with a platform that brings together leading image and video generation models, choosing the right tool for each idea and scene.',
    'toolkit-eyebrow': 'My creative toolkit', 'toolkit-title-1': 'The right model,', 'toolkit-title-2': 'for the right idea.',
    'toolkit-desc': 'I choose the video, image, and audio tools that best serve each idea and bring it to life.',
    'tool-video': 'VIDEO & MOTION', 'tool-image': 'IMAGE & DESIGN', 'tool-intelligence': 'IDEAS & INTELLIGENCE', 'tool-audio': 'AUDIO & MUSIC',
    'tool-video-title': 'Video & Motion', 'tool-image-title': 'Image & Design', 'tool-intelligence-title': 'Ideas & Intelligence', 'tool-audio-title': 'Audio & Music',
    'contact-eyebrow': 'Have an idea?', 'contact-title-1': 'Let’s make it', 'contact-title-2': 'visible.', 'contact-copy': 'Tell me about your next project,\nand let’s start with the idea.',
    'whatsapp-recommended': 'Recommended', 'whatsapp-contact': 'Chat with me on WhatsApp',
    'footer-description': 'Generative AI video creation', 'footer-name': 'Abdelrahman Abu Risha',
    'category-back': 'Back to home', 'category-kicker': 'My portfolio', 'category-fallback': 'Portfolio',
    'category-empty': 'There are no projects in this section yet.', 'watch-back-category': 'Back to section', 'watch-back-gallery': 'Back to portfolio',
    'watch-kind': 'Now playing', 'watch-caption-ad': 'Locally hosted for direct playback.',
    'watch-caption-youtube': 'Watch this project here in the portfolio.', 'streamable-apology': 'We are sorry this ad may load slowly. For a smoother experience, choose a lower resolution in the player.', 'streamable-quality-label': 'Available quality options', 'streamable-quality-note': 'Open the Quality menu in the player and choose 360p for slower connections or 720p for a sharper picture.', 'streamable-whatsapp-label': 'Watch the videos on my public WhatsApp channel with 0% lag', 'watch-missing-title': 'This project could not be found',
    'watch-missing-kind': 'Project unavailable', 'watch-error': 'Return to the portfolio and choose an available video.',
    'kind-ad': 'Advertisement', 'kind-short': 'Short video', 'kind-long': 'Long video', 'watch-aria': 'Watch',
    'player-play': 'Play', 'player-pause': 'Pause', 'player-mute': 'Mute', 'player-unmute': 'Unmute', 'player-seek': 'Seek through video', 'player-volume': 'Volume', 'player-fullscreen': 'Fullscreen',
    'player-previous': 'Previous video', 'player-next': 'Next video', 'player-browse': 'Browse all videos in this section', 'watch-home': 'Go back to homepage',
    'count-one': 'project', 'count-many': 'projects', 'switch-to-english': 'انقر للعودة إلى الإنجليزية',
    'admin-kicker': 'Private access', 'admin-title': 'Video manager', 'admin-password': 'Your password', 'admin-login': 'Unlock',
    'admin-incorrect': 'You are not one of the site developers.', 'admin-unavailable': 'The video manager is unavailable until the site is connected to its server.',
    'admin-section': 'Choose a section', 'admin-ads': 'Advertisements', 'admin-short': 'Short Videos', 'admin-long': 'Long Videos',
    'admin-link': 'Vimeo or Streamable link', 'admin-add': 'Add video', 'admin-logout': 'Log out', 'admin-close': 'Close',
    'admin-added': 'The video was added to the portfolio.', 'admin-invalid': 'Enter a valid Vimeo or Streamable link.', 'admin-duplicate': 'This video is already in the portfolio.', 'admin-error': 'Something went wrong. Please try again.',
    'streamable-quality-label': 'Quality options in Streamable', 'streamable-quality-note': 'Use the player’s Quality menu. Available options vary by video; Streamable commonly offers 360p and 720p.',
    'ad-original-quality-label': 'Source resolution', 'ad-original-quality': 'Original', 'ad-fixed-quality-note': 'This ad is served as one video file, so its player cannot switch to 320p. A separate encoded version is needed to offer another quality.',
    'ad-provider-quality-label': 'Quality options in Vimeo', 'ad-provider-quality-note': 'Use Vimeo’s built-in quality menu. Available resolutions depend on the video and Vimeo player.'
  };
  const phrases = {
    'عبدالرحمن أبو ريشة': translations['brand-name'], 'ع': 'A', 'د': 'D', 'العودة إلى البداية': translations['home-label'],
    'التنقل الرئيسي': translations['main-nav'], 'الإعلانات': translations['nav-ads'], 'فيديوهات قصيرة': translations['nav-short'], 'فيديوهات طويلة': translations['nav-long'], 'ما أقدّمه': translations['nav-approach'],
    'تصميم تجريدي يرمز إلى صناعة الفيديو بالذكاء الاصطناعي': 'An abstract visual representing AI video creation',
    'متاح للتعاون': translations.availability, 'صانع محتوى بالذكاء الاصطناعي التوليدي': translations['hero-eyebrow'],
    'أحوّل الفكرة': translations['hero-title-1'], 'إلى': 'into', 'مشهدٍ يُرى.': translations['hero-title-2'],
    'أنا عبدالرحمن أبو ريشة. أصنع فيديوهات ومشاهد بصرية باستخدام أدوات الذكاء الاصطناعي التوليدي، من الفكرة إلى النسخة النهائية.': translations['hero-description'],
    'استكشف أعمالي': translations.explore, 'لنتحدث عن مشروعك': translations.talk,
    'فكرة واضحة، صورة لها أثر، وحكاية تستحق المشاهدة.': translations['hero-note'],
    'فيديو مولّد · سرد بصري · صوت توليدي': translations['hero-bottom'], 'اكتشف المعرض': translations['scroll-cue'],
    'تصفّح أعمالي': translations['shortcut-eyebrow'], 'إلى أي قسم تريد الانتقال؟': translations['shortcut-title'],
    'اختصارات أقسام الأعمال': translations['shortcut-aria'], 'مقطعان للمعاينة': translations['preview-count'],
    'أعمالي': translations['section-overline'], 'أفكار إعلانية تتحول إلى مشاهد مصممة بالذكاء الاصطناعي.': translations['ads-desc'], 'المزيد من الإعلانات': translations['more-ads'],
    'قصص سريعة وإيقاع بصري مكثف في صيغة قصيرة.': translations['short-desc'], 'المزيد من الفيديوهات القصيرة': translations['more-short'],
    'مشاريع أطول تبني الفكرة والمشهد والحكاية على مهل.': translations['long-desc'], 'المزيد من الفيديوهات': translations['more-long'],
    'نماذج من الإعلانات': translations['ads-aria'], 'نماذج من الفيديوهات القصيرة': translations['short-aria'], 'نماذج من الفيديوهات الطويلة': translations['long-aria'],
    'خبرة تجمع التقنية بالحسّ البصري': translations['approach-eyebrow'], 'أحوّل أدوات الذكاء': translations['approach-title-1'], 'أثرٍ يُرى.': translations['approach-title-2'],
    'أبني من الفكرة تجربة مرئية متكاملة؛ من محتوى الفيديو والصورة إلى المساحة التي تعبّر عن العلامة.': translations['approach-statement'],
    'خبرة عملية في': translations['company-label'], 'الدرة العالمية': 'Al Durra Global', 'للمنتجات الغذائية': 'for Food Products', 'المحتوى المرئي · التصميم الداخلي': translations['company-skills'],
    '01 / المحتوى': translations['role-content-index'], 'ذكاء توليدي لقناة YouTube': translations['role-content-title'],
    'أعمل خبيراً في الذكاء الاصطناعي التوليدي لقناة الشركة، وأحوّل الأفكار والمنتجات إلى فيديوهات ومشاهد بصرية تخاطب الجمهور.': translations['role-content-desc'],
    '02 / المكان': translations['role-interior-index'], 'تصميم داخلي للشركة': translations['role-interior-title'],
    'أشارك في تصميم المساحات الداخلية للشركة، مع اهتمام بتناسق التفاصيل وخلق بيئة تعكس هويتها.': translations['role-interior-desc'],
    '03 / خبرة متخصصة': translations['role-higgs-index'], 'أشهر': translations.months, 'تجربة عملية مع Higgsfield': translations['role-higgs-title'],
    'خبرة تطبيقية في منصة تجمع نماذج وأدوات لتوليد الصور والفيديو، مع اختيار النموذج المناسب لكل فكرة ومشهد.': translations['role-higgs-desc'],
    'صندوق أدواتي الإبداعي': translations['toolkit-eyebrow'], 'النموذج المناسب،': translations['toolkit-title-1'], 'للفكرة المناسبة.': translations['toolkit-title-2'],
    'أختار من أدوات الفيديو والصورة والصوت ما يخدم كل فكرة ويمنحها شكلها الأفضل.': translations['toolkit-desc'],
    'الفيديو والحركة': translations['tool-video-title'], 'الصور والتصميم': translations['tool-image-title'], 'الذكاء والتخطيط': translations['tool-intelligence-title'], 'الصوت والموسيقى': translations['tool-audio-title'],
    'هل لديك فكرة؟': translations['contact-eyebrow'], 'لنجعلها': translations['contact-title-1'], 'تُرى.': translations['contact-title-2'],
    'الخيار الأفضل': translations['whatsapp-recommended'], 'تواصل معي على واتساب': translations['whatsapp-contact'],
    'أخبرني عن مشروعك القادم،': 'Tell me about your next project,', 'ولنبدأ من الفكرة.': 'and let’s start with the idea.',
    'صناعة فيديو بالذكاء الاصطناعي التوليدي': translations['footer-description'], 'معرض أعمالي': translations['category-kicker'], 'الأعمال': translations['category-fallback'],
    'مشاريع فيديو بالذكاء الاصطناعي التوليدي.': 'Generative AI video projects.', 'العودة إلى الرئيسية': translations['category-back'], 'العودة إلى المعرض': translations['watch-back-gallery'],
    'مشاهدة العمل': translations['watch-kind'], 'يتم فتح العمل…': 'Loading project…', 'مشاهدة العمل من داخل معرض الأعمال.': translations['watch-caption-youtube'],
    'إعلان': translations['kind-ad'], 'فيديو قصير': translations['kind-short'], 'فيديو طويل': translations['kind-long']
  };
  const arabic = {
    'brand-name': 'عبدالرحمن أبو ريشة', 'home-label': 'العودة إلى البداية', 'main-nav': 'التنقل الرئيسي', 'nav-ads': 'الإعلانات', 'nav-short': 'فيديوهات قصيرة', 'nav-long': 'فيديوهات طويلة', 'nav-approach': 'ما أقدّمه',
    'availability': 'متاح للتعاون', 'hero-eyebrow': 'صانع محتوى بالذكاء الاصطناعي التوليدي', 'hero-title-1': 'أحوّل الفكرة', 'hero-title-2': 'إلى مشهدٍ يُرى.',
    'hero-description': 'أنا عبدالرحمن أبو ريشة. أصنع فيديوهات ومشاهد بصرية باستخدام أدوات الذكاء الاصطناعي التوليدي، من الفكرة إلى النسخة النهائية.', 'explore': 'استكشف أعمالي', 'talk': 'لنتحدث عن مشروعك',
    'hero-note': 'فكرة واضحة، صورة لها أثر، وحكاية تستحق المشاهدة.', 'hero-bottom': 'فيديو مولّد · سرد بصري · صوت توليدي', 'scroll-cue': 'اكتشف المعرض', 'shortcut-eyebrow': 'تصفّح أعمالي', 'shortcut-title': 'إلى أي قسم تريد الانتقال؟', 'shortcut-aria': 'اختصارات أقسام الأعمال', 'preview-count': 'مقطعان للمعاينة',
    'section-overline': 'أعمالي', 'ads-title': 'الإعلانات', 'ads-desc': 'أفكار إعلانية تتحول إلى مشاهد مصممة بالذكاء الاصطناعي.', 'more-ads': 'المزيد من الإعلانات', 'short-title': 'فيديوهات قصيرة', 'short-desc': 'قصص سريعة وإيقاع بصري مكثف في صيغة قصيرة.', 'more-short': 'المزيد من الفيديوهات القصيرة', 'long-title': 'فيديوهات طويلة', 'long-desc': 'مشاريع أطول تبني الفكرة والمشهد والحكاية على مهل.', 'more-long': 'المزيد من الفيديوهات',
    'ads-aria': 'نماذج من الإعلانات', 'short-aria': 'نماذج من الفيديوهات القصيرة', 'long-aria': 'نماذج من الفيديوهات الطويلة', 'approach-eyebrow': 'خبرة تجمع التقنية بالحسّ البصري', 'approach-title-1': 'أحوّل أدوات الذكاء', 'approach-title-2': 'إلى أثرٍ يُرى.', 'approach-statement': 'أبني من الفكرة تجربة مرئية متكاملة؛ من محتوى الفيديو والصورة إلى المساحة التي تعبّر عن العلامة.',
    'company-label': 'خبرة عملية في', 'company-name': 'الدرة العالمية<br>للمنتجات الغذائية', 'company-skills': 'المحتوى المرئي · التصميم الداخلي', 'role-content-index': '01 / المحتوى', 'role-content-title': 'ذكاء توليدي لقناة YouTube', 'role-content-desc': 'أعمل خبيراً في الذكاء الاصطناعي التوليدي لقناة الشركة، وأحوّل الأفكار والمنتجات إلى فيديوهات ومشاهد بصرية تخاطب الجمهور.', 'role-interior-index': '02 / المكان', 'role-interior-title': 'تصميم داخلي للشركة', 'role-interior-desc': 'أشارك في تصميم المساحات الداخلية للشركة، مع اهتمام بتناسق التفاصيل وخلق بيئة تعكس هويتها.', 'role-higgs-index': '03 / خبرة متخصصة', 'months': 'أشهر', 'role-higgs-title': 'تجربة عملية مع Higgsfield', 'role-higgs-desc': 'خبرة تطبيقية في منصة تجمع نماذج وأدوات لتوليد الصور والفيديو، مع اختيار النموذج المناسب لكل فكرة ومشهد.',
    'toolkit-eyebrow': 'صندوق أدواتي الإبداعي', 'toolkit-title-1': 'النموذج المناسب،', 'toolkit-title-2': 'للفكرة المناسبة.', 'toolkit-desc': 'أختار من أدوات الفيديو والصورة والصوت ما يخدم كل فكرة ويمنحها شكلها الأفضل.', 'tool-video': 'VIDEO & MOTION', 'tool-image': 'IMAGE & DESIGN', 'tool-intelligence': 'IDEAS & INTELLIGENCE', 'tool-audio': 'AUDIO & MUSIC', 'tool-video-title': 'الفيديو والحركة', 'tool-image-title': 'الصور والتصميم', 'tool-intelligence-title': 'الذكاء والتخطيط', 'tool-audio-title': 'الصوت والموسيقى',
    'contact-eyebrow': 'هل لديك فكرة؟', 'contact-title-1': 'لنجعلها', 'contact-title-2': 'تُرى.', 'contact-copy': 'أخبرني عن مشروعك القادم،\nولنبدأ من الفكرة.', 'footer-description': 'صناعة فيديو بالذكاء الاصطناعي التوليدي', 'footer-name': 'عبدالرحمن أبو ريشة',
    'category-back': 'العودة إلى الرئيسية', 'category-kicker': 'معرض أعمالي', 'category-fallback': 'الأعمال', 'category-empty': 'لا توجد أعمال في هذا القسم حاليًا.', 'watch-back-category': 'العودة إلى القسم', 'watch-back-gallery': 'العودة إلى المعرض', 'watch-kind': 'مشاهدة العمل', 'watch-caption-ad': 'يعمل الفيديو مباشرة من ملفات الموقع.', 'watch-caption-youtube': 'مشاهدة العمل من داخل معرض الأعمال.', 'streamable-apology': 'نعتذر عن بطء تحميل هذا الإعلان أحيانًا. لتقليل التقطّع، اختر دقة أقل من قائمة الجودة داخل المشغّل.', 'streamable-quality-label': 'خيارات الجودة المتاحة', 'streamable-quality-note': 'افتح قائمة الجودة في المشغّل واختر 360p للاتصال الأبطأ أو 720p لصورة أوضح.', 'streamable-whatsapp-label': 'شاهد الفيديوهات على قناتي العامة في واتساب دون تقطيع (0٪)', 'watch-missing-title': 'لم يتم العثور على هذا العمل', 'watch-missing-kind': 'العمل غير متاح', 'watch-error': 'ارجع إلى المعرض واختر فيديو متاحًا.', 'kind-ad': 'إعلان', 'kind-short': 'فيديو قصير', 'kind-long': 'فيديو طويل', 'watch-aria': 'شاهد', 'watch-home': 'العودة إلى الصفحة الرئيسية', 'player-play': 'تشغيل', 'player-pause': 'إيقاف مؤقت', 'player-mute': 'كتم الصوت', 'player-unmute': 'تشغيل الصوت', 'player-seek': 'التنقل في الفيديو', 'player-volume': 'مستوى الصوت', 'player-fullscreen': 'ملء الشاشة', 'player-previous': 'الفيديو السابق', 'player-next': 'الفيديو التالي', 'player-browse': 'عرض جميع فيديوهات هذا القسم', 'count-one': 'عمل', 'count-many': 'أعمال', 'switch-to-english': 'انقر للعودة إلى الإنجليزية',
    'admin-kicker': 'دخول خاص', 'admin-title': 'إدارة الفيديوهات', 'admin-password': 'كلمة المرور', 'admin-login': 'فتح لوحة الإدارة',
    'admin-incorrect': 'أنت لست من مطورين الموقع.', 'admin-unavailable': 'لوحة إضافة الفيديوهات غير متصلة بالخادم حاليًا.',
    'admin-section': 'اختر القسم', 'admin-ads': 'الإعلانات', 'admin-short': 'فيديوهات قصيرة', 'admin-long': 'فيديوهات طويلة',
    'admin-link': 'رابط Vimeo أو Streamable', 'admin-add': 'إضافة الفيديو', 'admin-logout': 'تسجيل الخروج', 'admin-close': 'إغلاق',
    'admin-added': 'تمت إضافة الفيديو إلى سجل الأعمال.', 'admin-invalid': 'أدخل رابط Vimeo أو Streamable صالحًا.', 'admin-duplicate': 'هذا الفيديو موجود بالفعل في سجل الأعمال.', 'admin-error': 'حدث خطأ. حاول مرة أخرى.',
    'streamable-quality-label': 'خيارات الجودة في Streamable', 'streamable-quality-note': 'استخدم قائمة الجودة داخل المشغّل. تختلف الخيارات حسب الفيديو؛ ويتيح Streamable عادةً 360p و720p.',
    'ad-original-quality-label': 'دقة الملف الأصلي', 'ad-original-quality': 'الأصلية', 'ad-fixed-quality-note': 'يُعرض هذا الإعلان من ملف واحد، لذلك لا يستطيع المشغّل التحويل إلى 320p. يلزم ملف مُرمّز بدقة إضافية لإتاحة جودة أخرى.',
    'ad-provider-quality-label': 'خيارات الجودة في Vimeo', 'ad-provider-quality-note': 'استخدم قائمة الجودة داخل مشغّل Vimeo. الدقات المتاحة تعتمد على الفيديو ومشغّل Vimeo.'
  };
  const currentLanguage = () => { try { return sessionStorage.getItem('portfolio-language') === 'ar' ? 'ar' : 'en'; } catch { return 'en'; } };
  const text = key => (currentLanguage() === 'ar' ? arabic[key] : translations[key]) || key;
  function apply(lang) {
    try { sessionStorage.setItem('portfolio-language', lang); } catch {}
    window.siteLanguage = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const key = node.nodeValue.trim();
      if (!key) continue;
      let replacement;
      if (lang === 'en') replacement = phrases[key];
      else replacement = Object.keys(phrases).find(ar => phrases[ar].trim() === key) || (Object.hasOwn(arabic, key) ? key : undefined);
      if (replacement !== undefined) node.nodeValue = node.nodeValue.replace(key, replacement);
    }
    document.querySelectorAll('[aria-label]').forEach(el => {
      const value = el.getAttribute('aria-label');
      const arabicKey = Object.keys(phrases).find(key => phrases[key].trim() === value);
      if (lang === 'en' && phrases[value]) el.setAttribute('aria-label', phrases[value]);
      else if (lang === 'ar' && arabicKey) el.setAttribute('aria-label', arabicKey);
    });
    document.querySelectorAll('#language-toggle').forEach(button => { button.textContent = lang === 'en' ? 'انقر للترجمة' : text('switch-to-english'); button.setAttribute('aria-label', lang === 'en' ? 'Translate the website into Arabic' : 'Switch the website to English'); });
    const title = document.querySelector('title');
    if (title) title.textContent = lang === 'en' ? (document.body.classList.contains('watch-page') ? 'Watch a Project — Abdelrahman Abu Risha' : document.body.classList.contains('category-page') ? 'Portfolio — Abdelrahman Abu Risha' : 'Abdelrahman Abu Risha — Generative AI Video Creator') : (document.body.classList.contains('watch-page') ? 'مشاهدة العمل — عبدالرحمن أبو ريشة' : document.body.classList.contains('category-page') ? 'معرض الأعمال — عبدالرحمن أبو ريشة' : 'عبدالرحمن أبو ريشة — صانع فيديو بالذكاء الاصطناعي');
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
  }
  window.siteLanguage = currentLanguage();
  window.siteText = text;
  window.setSiteLanguage = apply;
  apply(window.siteLanguage);
})();
