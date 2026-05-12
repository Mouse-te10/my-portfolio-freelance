import React, { useState, useEffect, useMemo } from 'react';

// Переводы
const translations = {
  ru: {
    nav: {
      projects: 'Проекты',
      about: 'Обо мне',
      contact: 'Контакты'
    },
    hero: {
      title1: 'Учусь делать',
      title2: 'красивый',
      title3: 'и понятный дизайн.',
      description: 'Привет, я Александра. Помогаю брендам обрести своё лицо: от разработки логотипа и фирменного стиля до оформления сайтов и полиграфии.'
    },
    filters: ['Все', 'Айдентика', 'Логотипы', 'Веб-дизайн', 'Печатная графика'],
    sections: {
      featured: 'Избранные проекты',
      archive: 'Архив работ',
      showArchive: 'Скрыть архив',
      hideArchive: 'Архив работ'
    },
    modal: {
      year: 'Год'
    },
    footer: {
      label: 'Давайте работать вместе',
      heading: 'Связаться со мной',
      status: 'Доступна для новых проектов',
      copyright: '© 2024—2026 Alexandra Blagodatskikh'
    },
    categories: {
      'Айдентика': 'Айдентика',
      'Логотипы': 'Логотипы',
      'Веб-дизайн': 'Веб-дизайн',
      'Печатная графика': 'Печатная графика'
    },
    projects: {
      f1: { title: "AUTOHUB - социальная сеть для автолюбителей (сайт)", desc: "Прототип социальной сети для автолюбителей в формате вайрфреймов и финальном виде." },
      f2: { title: "AUTOPART - онлайн магазин автозапчастей (сайт)", desc: "Прототип онлайн магазина автозапчастей в формате вайрфреймов и финальном виде." },
      f3: { title: "Картина мира - конкурсная работа (векторная иллюстрация)", desc: "Работа выполнена в программе Adobe Illutrator в векторной графике на конкурс от Комус Арт." },
      f4: { title: "EVENTIFLY - организация концертов (брендбук)", desc: "Брендбук для компании Eventifly." },
      f5: { title: "Океан (фото-коллаж)", desc: "Фото-коллаж с собственными фотографиями, может быть использован в качестве принта на одежду." },
      f6: { title: "Мошенники: инструкция по обезвреживанию (лонгрид)", desc: "Лонгрид на конкурс о том, как избежать мошеннических схем." },
      a72: { title: "Логотип и иконки для космической станции 'Галактика'", desc: "Разработка фирменного стиля космической станции." },
      a71: { title: "Дизайн упаковки для чая 'Тихий Сигнал'", desc: "Концепция упаковки премиального чая." },
      a70: { title: "Вёрстка газеты 'Северные Вести'", desc: "Макет регионального издания." },
      a69: { title: "Верстка газеты 'Вечерняя Фундуклеевка' (пример)", desc: "Учебный проект по верстке печатных изданий." },
      a68: { title: "Прототип мобильного сайта для подбора интересных мест 'Travel Mood'", desc: "UX/UI дизайн туристического приложения." },
      a67: { title: "Прототип главной страницы сайта 'Я + Мои Друзья'", desc: "Концепция социальной платформы." },
      a66: { title: "Дипломы для конкурса новогодних открыток ГБОУДО ЦДЮТ 'Бибирево'", desc: "Дизайн наградных документов." },
      a65: { title: "Элементы фирменного стиля для мастерской масок ручной работы 'Qarma Craft'", desc: "Брендинг для творческой мастерской." },
      a64: { title: "Плакат на день учителя", desc: "Праздничный постер для образовательного учреждения." },
      a63: { title: "Листовка 'Китай. Тур на 7 дней'", desc: "Рекламный материал туристического агентства." },
      a62: { title: "Салон красоты 'Престиж' - редизайн рекламного плаката", desc: "Обновление визуальной коммуникации." },
      a61: { title: "AboutZoo - товары для животных", desc: "Логотип зоомагазина." },
      a60: { title: "CheeseDog - редизайн фирменного стиля приложения для дрессировки собак (брендбук)", desc: "Обновление айдентики мобильного приложения." },
      a59: { title: "Буклет с заданиями для детей 'Кафе с корицей'", desc: "Игровые материалы для семейного кафе." },
      a58: { title: "Плакат 'Осенний фестиваль колледжей'", desc: "Афиша студенческого мероприятия." },
      a57: { title: "Буклет с работами по учебной практике 2025", desc: "Презентация учебных проектов." },
      a56: { title: "Зелёный луч - кофейня, коворкинг и лекторий (Мини-брендбук)", desc: "Фирменный стиль культурного пространства." },
      a55: { title: "Серия векторных иллюстраций 'Мемфис'", desc: "Графика в стиле Memphis Design." },
      a54: { title: "Диаграмма для ГМИИ им. Пушкина", desc: "Инфографика для музейной экспозиции." },
      a53: { title: "Диаграмма для музея на Шаболовской", desc: "Визуализация данных для выставки." },
      a52: { title: "Фото-коллаж", desc: "Экспериментальная композиция." },
      a51: { title: "Принт для носового платка в славянском стиле", desc: "Орнамент в традициях народного искусства." },
      a50: { title: "Работы с производственной практики 2025", desc: "Портфолио практических заданий." },
      a49: { title: "Социальные плакаты в защиту бездомных животных", desc: "Серия плакатов для благотворительной кампании." },
      a48: { title: "Морская Симфония - биоразлагаемый гель без хлора", desc: "Дизайн упаковки эко-продукта." },
      a47: { title: "Conception - обложка журнала на тему графического дизайна", desc: "Концепт-дизайн специализированного издания." },
      a46: { title: "Glitch Coffee - редизайн фирменного стиля", desc: "Обновление айдентики кофейни." },
      a45: { title: "Плакат 'Хлеб всему голова'", desc: "Социальный постер о ценности хлеба." },
      a44: { title: "Векторная иллюстрация 'Монохром'", desc: "Графическая работа в чёрно-белой гамме." },
      a43: { title: "Плакаты на день открытых дверей", desc: "Рекламные материалы для учебного заведения." },
      a42: { title: "Кафе 'GastroArt'", desc: "Брендинг гастрономического заведения." },
      a41: { title: "Векторная иллюстрация 'Колонны у озера'", desc: "Пейзажная композиция в векторе." },
      a40: { title: "Логотип 'Профмед'", desc: "Айдентика медицинского центра." },
      a39: { title: "Сила винила - магазин виниловых пластинок", desc: "Фирменный стиль музыкального магазина." },
      a38: { title: "Афиша для концерта 'Open your voice'", desc: "Постер вокального мероприятия." },
      a37: { title: "Оформление презентации 'Портфолио работ'", desc: "Дизайн слайдов для защиты проектов." },
      a36: { title: "Настольный календарь для Россельхозбанк", desc: "Корпоративная полиграфия." },
      a35: { title: "Визитка для графического дизайнера", desc: "Персональная деловая карточка." },
      a34: { title: "Оформление презентации 'Портфолио работ за второй семестр'", desc: "Презентация учебных достижений." },
      a33: { title: "Ночной салют", desc: "Анимированная иллюстрация." },
      a32: { title: "Cubomeduza - светодиодная подсветка", desc: "Брендинг для производителя освещения." },
      a31: { title: "Giliutas - чипсы из сушеного кальмара", desc: "Логотип для снековой продукции." },
      a30: { title: "Карманный календарь для Россельхозбанк", desc: "Компактная рекламная полиграфия." },
      a29: { title: "Новогодняя открытка", desc: "Праздничный дизайн поздравительной карточки." },
      a28: { title: "Движение Вверх - детская спортивная школа", desc: "Айдентика спортивного учреждения." },
      a27: { title: "Логотип для республики Башкортостан", desc: "Региональная символика." },
      a26: { title: "#МоиМысли", desc: "Брендинг личного проекта." },
      a25: { title: "Фестиваль 'Галафест'", desc: "Визуальная айдентика культурного события." },
      a24: { title: "Омега - охранное агентство", desc: "Фирменный стиль службы безопасности." },
      a23: { title: "Свимли - уроки плавания для детей", desc: "Брендинг детской секции." },
      a22: { title: "Визитка для тюнинг-салона", desc: "Деловая карточка автосервиса." },
      a21: { title: "Визитка для лэшмейкера-бровиста", desc: "Персональная карточка мастера красоты." },
      a20: { title: "Визитки для специалиста по кадрам", desc: "Корпоративные визитные карточки." },
      a19: { title: "Карточка товара для заколок-звёздочек", desc: "E-commerce дизайн аксессуаров." },
      a18: { title: "Карточка товара для плодов шиповника", desc: "Оформление товара для интернет-магазина." },
      a17: { title: "Логотип для телеграм-канала на тему искусственного интеллекта", desc: "Айдентика образовательного канала." },
      a16: { title: "Элементы фирменного стиля для мексиканского ресторана", desc: "Брендинг заведения этнической кухни." },
      a15: { title: "Sharpinion - ножи ручной работы", desc: "Фирменный стиль мастерской." },
      a14: { title: "One - детские уроки вокала на YouTube", desc: "Айдентика образовательного канала." },
      a13: { title: "Рецепт чизкейка", desc: "Инфографический рецепт." },
      a12: { title: "Forge - магазин спортивного инвентаря", desc: "Брендинг спортивного ритейла." },
      a11: { title: "Рекламный плакат для колледжа информационных технологий ITHUB", desc: "Постер для образовательного учреждения." },
      a10: { title: "Плакат на тему соблюдение правил по использованию электросамокатов", desc: "Социальная реклама о безопасности." },
      a9: { title: "Афиша для театра Солнца и Луны", desc: "Постер театральной постановки." },
      a8: { title: "Принт для одежды абстракция", desc: "Графический паттерн для текстиля." },
      a7: { title: "Объемный шар", desc: "3D-иллюстрация." },
      a6: { title: "Векторная иллюстрация по картине", desc: "Адаптация живописи в векторную графику." },
      a5: { title: "Упаковка шоколада в азиатском стиле", desc: "Дизайн упаковки с этническими мотивами." },
      a3: { title: "Баннер на экологический конкурс", desc: "Рекламный материал для эко-инициативы." },
      a2: { title: "Pawerful - приложение для дрессировки собак", desc: "UI/UX дизайн мобильного приложения." },
      a1: { title: "Оформление портфолио 2024", desc: "Презентация годовых работ." }
    }
  },
  en: {
    nav: {
      projects: 'Projects',
      about: 'About',
      contact: 'Contact'
    },
    hero: {
      title1: 'Learning to create',
      title2: 'beautiful',
      title3: 'and clear design.',
      description: 'Hi, I\'m Alexandra. I help brands find their identity: from logo and brand style development to website and print design.'
    },
    filters: ['All', 'Branding', 'Logos', 'Web Design', 'Print Graphics'],
    sections: {
      featured: 'Featured Projects',
      archive: 'Archive',
      showArchive: 'Hide archive',
      hideArchive: 'Show archive'
    },
    modal: {
      year: 'Year'
    },
    footer: {
      label: 'Let\'s work together',
      heading: 'Contact me',
      status: 'Available for new projects',
      copyright: '© 2024—2026 Alexandra Blagodatskikh'
    },
    categories: {
      'Айдентика': 'Branding',
      'Логотипы': 'Logos',
      'Веб-дизайн': 'Web Design',
      'Печатная графика': 'Print Graphics'
    },
    projects: {
      f1: { title: "AUTOHUB - social network for car enthusiasts (website)", desc: "Social network prototype for car enthusiasts in wireframe and final format." },
      f2: { title: "AUTOPART - online auto parts store (website)", desc: "Online auto parts store prototype in wireframe and final format." },
      f3: { title: "World Picture - competition work (vector illustration)", desc: "Vector graphics work created in Adobe Illustrator for Komus Art competition." },
      f4: { title: "EVENTIFLY - concert organization (brandbook)", desc: "Brandbook for Eventifly company." },
      f5: { title: "Ocean (photo collage)", desc: "Photo collage with own photographs, can be used as clothing print." },
      f6: { title: "Scammers: neutralization guide (longread)", desc: "Competition longread about avoiding scam schemes." },
      a72: { title: "Logo and icons for space station 'Galaxy'", desc: "Corporate identity development for space station." },
      a71: { title: "Tea packaging design 'Silent Signal'", desc: "Premium tea packaging concept." },
      a70: { title: "Newspaper layout 'Northern News'", desc: "Regional publication layout." },
      a69: { title: "Newspaper layout 'Evening Fundukleeevka' (example)", desc: "Educational project on print media layout." },
      a68: { title: "Mobile website prototype for finding interesting places 'Travel Mood'", desc: "UX/UI design for travel app." },
      a67: { title: "Homepage prototype 'Me + My Friends'", desc: "Social platform concept." },
      a66: { title: "Diplomas for New Year card contest GBOUDO CDT 'Bibirevo'", desc: "Award document design." },
      a65: { title: "Brand identity elements for handmade mask workshop 'Qarma Craft'", desc: "Branding for creative workshop." },
      a64: { title: "Teacher's Day poster", desc: "Holiday poster for educational institution." },
      a63: { title: "Flyer 'China. 7-day tour'", desc: "Travel agency promotional material." },
      a62: { title: "Beauty salon 'Prestige' - advertising poster redesign", desc: "Visual communication update." },
      a61: { title: "AboutZoo - pet products", desc: "Pet store logo." },
      a60: { title: "CheeseDog - dog training app brand identity redesign (brandbook)", desc: "Mobile app identity update." },
      a59: { title: "Activity booklet for children 'Cinnamon Cafe'", desc: "Game materials for family cafe." },
      a58: { title: "Poster 'Autumn College Festival'", desc: "Student event poster." },
      a57: { title: "Training practice portfolio 2025", desc: "Educational projects presentation." },
      a56: { title: "Green Ray - cafe, coworking and lecture hall (Mini-brandbook)", desc: "Cultural space brand identity." },
      a55: { title: "Vector illustrations series 'Memphis'", desc: "Memphis Design style graphics." },
      a54: { title: "Chart for Pushkin Museum", desc: "Museum exhibition infographics." },
      a53: { title: "Chart for Shabolovka museum", desc: "Exhibition data visualization." },
      a52: { title: "Photo collage", desc: "Experimental composition." },
      a51: { title: "Handkerchief print in Slavic style", desc: "Folk art ornament." },
      a50: { title: "Industrial practice works 2025", desc: "Practical assignments portfolio." },
      a49: { title: "Social posters for homeless animal protection", desc: "Poster series for charity campaign." },
      a48: { title: "Sea Symphony - biodegradable chlorine-free gel", desc: "Eco-product packaging design." },
      a47: { title: "Conception - graphic design magazine cover", desc: "Specialized publication concept design." },
      a46: { title: "Glitch Coffee - brand identity redesign", desc: "Coffee shop identity update." },
      a45: { title: "Poster 'Bread is everything'", desc: "Social poster about bread value." },
      a44: { title: "Vector illustration 'Monochrome'", desc: "Black and white graphic work." },
      a43: { title: "Open house day posters", desc: "Educational institution promotional materials." },
      a42: { title: "Cafe 'GastroArt'", desc: "Gastronomic venue branding." },
      a41: { title: "Vector illustration 'Columns by the lake'", desc: "Vector landscape composition." },
      a40: { title: "Logo 'Profmed'", desc: "Medical center identity." },
      a39: { title: "Vinyl Power - vinyl record store", desc: "Music store brand identity." },
      a38: { title: "Concert poster 'Open your voice'", desc: "Vocal event poster." },
      a37: { title: "Presentation design 'Work portfolio'", desc: "Project defense slide design." },
      a36: { title: "Desktop calendar for Rosselkhozbank", desc: "Corporate print materials." },
      a35: { title: "Business card for graphic designer", desc: "Personal business card." },
      a34: { title: "Presentation design 'Second semester portfolio'", desc: "Academic achievements presentation." },
      a33: { title: "Night fireworks", desc: "Animated illustration." },
      a32: { title: "Cubomeduza - LED lighting", desc: "Lighting manufacturer branding." },
      a31: { title: "Giliutas - dried squid chips", desc: "Snack product logo." },
      a30: { title: "Pocket calendar for Rosselkhozbank", desc: "Compact promotional print." },
      a29: { title: "New Year card", desc: "Holiday greeting card design." },
      a28: { title: "Movement Up - children's sports school", desc: "Sports institution identity." },
      a27: { title: "Logo for Bashkortostan Republic", desc: "Regional symbols." },
      a26: { title: "#MyThoughts", desc: "Personal project branding." },
      a25: { title: "Festival 'Galafest'", desc: "Cultural event visual identity." },
      a24: { title: "Omega - security agency", desc: "Security service brand identity." },
      a23: { title: "Swimly - children's swimming lessons", desc: "Children's section branding." },
      a22: { title: "Business card for tuning shop", desc: "Auto service business card." },
      a21: { title: "Business card for lash-brow artist", desc: "Beauty master personal card." },
      a20: { title: "Business cards for HR specialist", desc: "Corporate business cards." },
      a19: { title: "Product card for star hairpins", desc: "Accessories e-commerce design." },
      a18: { title: "Product card for rose hips", desc: "Online store product layout." },
      a17: { title: "Logo for AI Telegram channel", desc: "Educational channel identity." },
      a16: { title: "Brand identity elements for Mexican restaurant", desc: "Ethnic cuisine venue branding." },
      a15: { title: "Sharpinion - handmade knives", desc: "Workshop brand identity." },
      a14: { title: "One - children's vocal lessons on YouTube", desc: "Educational channel identity." },
      a13: { title: "Cheesecake recipe", desc: "Infographic recipe." },
      a12: { title: "Forge - sports equipment store", desc: "Sports retail branding." },
      a11: { title: "Advertising poster for ITHUB IT college", desc: "Educational institution poster." },
      a10: { title: "Poster about electric scooter safety rules", desc: "Safety social advertising." },
      a9: { title: "Poster for Sun and Moon Theater", desc: "Theater performance poster." },
      a8: { title: "Abstract clothing print", desc: "Textile graphic pattern." },
      a7: { title: "3D sphere", desc: "3D illustration." },
      a6: { title: "Vector illustration based on painting", desc: "Painting adaptation to vector graphics." },
      a5: { title: "Asian style chocolate packaging", desc: "Packaging design with ethnic motifs." },
      a3: { title: "Banner for environmental contest", desc: "Eco-initiative promotional material." },
      a2: { title: "Pawerful - dog training app", desc: "Mobile app UI/UX design." },
      a1: { title: "Portfolio design 2024", desc: "Annual work presentation." }
    }
  }
};

const Icon = ({ name }) => {
  const icons = {
    telegram: (
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.52-.46-.01-1.33-.26-1.98-.48-.8-.27-1.43-.42-1.37-.89.03-.25.38-.51 1.03-.78 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.88 5.17-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.03.19z"/>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    ),
    close: (
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    )
  };

  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      {icons[name]}
    </svg>
  );
};

const App = () => {
  const [filter, setFilter] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [lang, setLang] = useState('ru');
  
  const t = translations[lang];

  const getPath = (url) => {
    const base = process.env.PUBLIC_URL || '';
    const cleanUrl = url.startsWith('/') ? url : '/' + url;
    return base + cleanUrl;
  };
  // ─────────────────────────────────────────────────────────────────────────────
  // ВАЖНО: все пути начинаются с  images/...  (без слэша в начале и без my-portfolio/)
  // Папка public/ — это корень сайта на GitHub Pages, React сам её подставляет.
  // ─────────────────────────────────────────────────────────────────────────────
  const projectsData = useMemo(() => ({
    featured: [
      { id: 'f1', cat: "Веб-дизайн",       year: 2025, img: getPath("images/features/5.PNG"),             pdf: "/images/features/autohub/autohub.pdf" },
      { id: 'f2', cat: "Веб-дизайн",       year: 2025, img: getPath("images/features/4.PNG"),            pdf: "/images/features/autopart/autopart.pdf" },
      { id: 'f3', cat: "Веб-дизайн",       year: 2025, img: getPath("images/features/1.PNG"),            pdf: "images/features/mir/картина мира.pdf" },
      { id: 'f4', cat: "Айдентика",        year: 2025, img: getPath("images/features/2.PNG"),            pdf: "images/features/eventifly/eventifly.pdf" },
      { id: 'f5', cat: "Печатная графика", year: 2025, img: getPath("images/ocean/1.png"),                pdf: "images/ocean/2.pdf" },
      { id: 'f6', cat: "Веб-дизайн",       year: 2025, img: getPath("images/features/longrid/1.PNG"),    pdf: "images/features/longrid/2.pdf" },
    ],
    archive: [
      { id: 'a72', cat: "Айдентика",        year: 2026, img: "images/космическая станция/1.png",  pdf: "images/космическая станция/2.pdf" },
      { id: 'a71', cat: "Печатная графика", year: 2026, img: "images/тихий сигнал/1.png",        pdf: "images/тихий сигнал/2.pdf" },
      { id: 'a70', cat: "Печатная графика", year: 2025, img: "images/северные вести/1.png",       pdf: "images/северные вести/2.pdf" },
      { id: 'a69', cat: "Печатная графика", year: 2026, img: "images/фундуклеевка/1.png",         pdf: "images/фундуклеевка/2.pdf" },
      { id: 'a68', cat: "Веб-дизайн",       year: 2026, img: "images/travelmood/1.png",           pdf: "images/travelmood/2.pdf" },
      { id: 'a67', cat: "Веб-дизайн",       year: 2025, img: "images/я+моидрузья/1.png",          pdf: "images/я+моидрузья/2.pdf" },
      { id: 'a66', cat: "Печатная графика", year: 2025, img: "images/дипломы/1.png",              pdf: "images/дипломы/2.pdf" },
      { id: 'a65', cat: "Айдентика",        year: 2025, img: "images/qarma/1.png",                pdf: "images/qarma/2.pdf" },
      { id: 'a64', cat: "Печатная графика", year: 2025, img: "images/плакат день учителя/1.png",  pdf: "images/плакат день учителя/2.pdf" },
      { id: 'a63', cat: "Печатная графика", year: 2025, img: "images/листовка китай/1.png",       pdf: "images/листовка китай/2.pdf" },
      { id: 'a62', cat: "Печатная графика", year: 2025, img: "images/престиж/1.png",              pdf: "images/престиж/2.pdf" },
      { id: 'a61', cat: "Логотипы",         year: 2025, img: "images/aboutzoo/1.png",             pdf: "images/aboutzoo/2.pdf" },
      { id: 'a60', cat: "Айдентика",        year: 2025, img: "images/cheesedog/1.png",            pdf: "images/cheesedog/2.pdf" },
      { id: 'a59', cat: "Печатная графика", year: 2025, img: "images/кафе с корицей/1.png",       pdf: "images/кафе с корицей/2.pdf" },
      { id: 'a58', cat: "Печатная графика", year: 2025, img: "images/осенний фестиваль/1.png",    pdf: "images/осенний фестиваль/2.pdf" },
      { id: 'a57', cat: "Веб-дизайн",       year: 2025, img: "images/учебная практика/1.jpg",     pdf: "images/учебная практика/2.pdf" },
      { id: 'a56', cat: "Айдентика",        year: 2025, img: "images/зеленый луч/1.png",          pdf: "images/зеленый луч/2.pdf" },
      { id: 'a55', cat: "Веб-дизайн",       year: 2025, img: "images/мемфис/1.png",               pdf: "images/мемфис/2.pdf" },
      { id: 'a54', cat: "Веб-дизайн",       year: 2025, img: "images/диаграмма пушкинский/1.png", pdf: "images/диаграмма пушкинский/2.pdf" },
      { id: 'a53', cat: "Веб-дизайн",       year: 2025, img: "images/диаграмма шаболовка/1.png",  pdf: "images/диаграмма шаболовка/2.pdf" },
      { id: 'a52', cat: "Веб-дизайн",       year: 2025, img: "images/коллаж/1.png",               pdf: "images/коллаж/2.pdf" },
      { id: 'a51', cat: "Печатная графика", year: 2025, img: "images/платок/1.jpg",               pdf: "images/платок/2.pdf" },
      { id: 'a50', cat: "Веб-дизайн",       year: 2025, img: "images/практика 2024/1.png",        pdf: "images/практика 2024/2.pdf" },
      { id: 'a49', cat: "Печатная графика", year: 2025, img: "images/плакаты/1.png",              pdf: "images/плакаты/2.pdf" },
      { id: 'a48', cat: "Печатная графика", year: 2025, img: "images/морская симфония/1.png",     pdf: "images/морская симфония/2.pdf" },
      { id: 'a47', cat: "Печатная графика", year: 2025, img: "images/conception/1.png",           pdf: "images/conception/2.pdf" },
      { id: 'a46', cat: "Айдентика",        year: 2025, img: "images/glitch/1.png",               pdf: "images/glitch/2.pdf" },
      { id: 'a45', cat: "Печатная графика", year: 2025, img: "images/хлеб/1.jpg",                 pdf: "images/хлеб/2.pdf" },
      { id: 'a44', cat: "Веб-дизайн",       year: 2025, img: "images/монохром/1.jpg",             pdf: "images/монохром/2.pdf" },
      { id: 'a43', cat: "Печатная графика", year: 2025, img: "images/день открытых дверей/1.png", pdf: "images/день открытых дверей/2.pdf" },
      { id: 'a42', cat: "Айдентика",        year: 2025, img: "images/гастроарт/1.png",            pdf: "images/гастроарт/2.pdf" },
      { id: 'a41', cat: "Веб-дизайн",       year: 2025, img: "images/пейзаж/1.jpg",               pdf: "images/пейзаж/2.pdf" },
      { id: 'a40', cat: "Логотипы",         year: 2025, img: "images/профмед/1.jpg",              pdf: "images/профмед/2.pdf" },
      { id: 'a39', cat: "Печатная графика", year: 2025, img: "images/сила винила/1.png",          pdf: "images/сила винила/2.pdf" },
      { id: 'a38', cat: "Печатная графика", year: 2025, img: "images/open voice/1.jpg",           pdf: "images/open voice/2.pdf" },
      { id: 'a37', cat: "Веб-дизайн",       year: 2025, img: "images/портфолио пиксель/1.png",    pdf: "images/портфолио пиксель/2.pdf" },
      { id: 'a36', cat: "Печатная графика", year: 2025, img: "images/календарь перекидной/1.jpg", pdf: "images/календарь перекидной/2.pdf" },
      { id: 'a35', cat: "Айдентика",        year: 2025, img: "images/визитка дизайнера/1.jpg",    pdf: "images/визитка дизайнера/2.pdf" },
      { id: 'a34', cat: "Веб-дизайн",       year: 2025, img: "images/майнкрафт/1.png",            pdf: "images/майнкрафт/2.pdf" },
      { id: 'a33', cat: "Веб-дизайн",       year: 2025, img: "images/гиф/1.png",                  pdf: "images/гиф/2.pdf" },
      { id: 'a32', cat: "Айдентика",        year: 2025, img: "images/кубомедуза/1.jpg",           pdf: "images/кубомедуза/2.pdf" },
      { id: 'a31', cat: "Логотипы",         year: 2025, img: "images/гилиутас/1.jpg",             pdf: "images/гилиутас/2.pdf" },
      { id: 'a30', cat: "Печатная графика", year: 2025, img: "images/календарь карманный/1.jpg",  pdf: "images/календарь карманный/2.pdf" },
      { id: 'a29', cat: "Печатная графика", year: 2025, img: "images/открытка/1.png",             pdf: "images/открытка/2.pdf" },
      { id: 'a28', cat: "Айдентика",        year: 2025, img: "images/движение вверх/1.jpg",       pdf: "images/движение вверх/2.pdf" },
      { id: 'a27', cat: "Логотипы",         year: 2025, img: "images/барс/1.jpg",                 pdf: "images/барс/2.pdf" },
      { id: 'a26', cat: "Айдентика",        year: 2025, img: "images/мои мысли/1.jpg",            pdf: "images/мои мысли/2.pdf" },
      { id: 'a25', cat: "Печатная графика", year: 2025, img: "images/галафест/1.png",             pdf: "images/галафест/2.pdf" },
      { id: 'a24', cat: "Айдентика",        year: 2024, img: "images/омега/1.png",                pdf: "images/омега/2.pdf" },
      { id: 'a23', cat: "Айдентика",        year: 2024, img: "images/свимли/1.jpg",               pdf: "images/свимли/2.pdf" },
      { id: 'a22', cat: "Айдентика",        year: 2024, img: "images/визитка тюнинг/1.jpg",       pdf: "images/визитка тюнинг/2.pdf" },
      { id: 'a21', cat: "Айдентика",        year: 2024, img: "images/визитка бровиста/1.jpg",     pdf: "images/визитка бровиста/2.pdf" },
      { id: 'a20', cat: "Айдентика",        year: 2024, img: "images/визитки маме/1.jpg",         pdf: "images/визитки маме/2.pdf" },
      { id: 'a19', cat: "Веб-дизайн",       year: 2024, img: "images/заколки/1.jpg",              pdf: "images/заколки/2.pdf" },
      { id: 'a18', cat: "Веб-дизайн",       year: 2024, img: "images/шиповник/1.jpg",             pdf: "images/шиповник/2.pdf" },
      { id: 'a17', cat: "Логотипы",         year: 2024, img: "images/ии/1.jpg",                   pdf: "images/ии/2.pdf" },
      { id: 'a16', cat: "Айдентика",        year: 2024, img: "images/перчик/1.jpg",               pdf: "images/перчик/2.pdf" },
      { id: 'a15', cat: "Айдентика",        year: 2024, img: "images/sharpinion/1.jpg",           pdf: "images/sharpinion/2.pdf" },
      { id: 'a14', cat: "Айдентика",        year: 2024, img: "images/one/1.jpg",                  pdf: "images/one/2.pdf" },
      { id: 'a13', cat: "Печатная графика", year: 2024, img: "images/рецепты/1.png",              pdf: "images/рецепты/2.pdf" },
      { id: 'a12', cat: "Айдентика",        year: 2024, img: "images/forge/1.jpg",                pdf: "images/forge/2.pdf" },
      { id: 'a11', cat: "Печатная графика", year: 2024, img: "images/ithub/1.jpg",                pdf: "images/ithub/2.pdf" },
      { id: 'a10', cat: "Печатная графика", year: 2024, img: "images/самокаты/1.jpg",             pdf: "images/самокаты/2.pdf" },
      { id: 'a9',  cat: "Печатная графика", year: 2024, img: "images/театр/1.png",                pdf: "images/театр/2.pdf" },
      { id: 'a8',  cat: "Печатная графика", year: 2024, img: "images/абстракция/1.png",           pdf: "images/абстракция/2.pdf" },
      { id: 'a7',  cat: "Веб-дизайн",       year: 2024, img: "images/шар/1.jpg",                  pdf: "images/шар/2.pdf" },
      { id: 'a6',  cat: "Веб-дизайн",       year: 2024, img: "images/шенк/1.png",                 pdf: "images/шенк/2.pdf" },
      { id: 'a5',  cat: "Печатная графика", year: 2024, img: "images/шоколад/1.jpg",              pdf: "images/шоколад/2.pdf" },
      { id: 'a3',  cat: "Печатная графика", year: 2024, img: "images/turtles/1.jpg",              pdf: "images/turtles/2.pdf" },
      { id: 'a2',  cat: "Веб-дизайн",       year: 2024, img: "images/pawerful/1.png",             pdf: "images/pawerful/2.pdf" },
      { id: 'a1',  cat: "Веб-дизайн",       year: 2024, img: "images/портфолио 2024/1.jpg",       pdf: "images/портфолио 2024/2.pdf" },
    ]
  }), []);

  const getProjectTitle = (project) => t.projects[project.id]?.title || project.id;
  const getProjectDesc  = (project) => t.projects[project.id]?.desc  || '';
  const getCategoryName = (cat)     => t.categories[cat] || cat;

  const filterFn = (p) => {
    if (filter === 0) return true;
    const ruCategories = ['Айдентика', 'Логотипы', 'Веб-дизайн', 'Печатная графика'];
    return p.cat === ruCategories[filter - 1];
  };

  const filteredFeatured = projectsData.featured.filter(filterFn);
  const filteredArchive  = projectsData.archive.filter(filterFn);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 140, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <div className="bg-glow"></div>
      <div className="bg-noise"></div>

      <div className="header-fixed-block">
        <header className={`header ${isScrolled ? 'header-shrink' : ''}`}>
          <div className="header-inner">
            <div className="logo">
              <span className="logo-dot"></span>
              АЛЕКСАНДРА БЛАГОДАТСКИХ
            </div>
            <nav className="desktop-nav">
              <button onClick={() => scrollTo('projects')}>{t.nav.projects}</button>
              <button onClick={() => scrollTo('about')}>{t.nav.about}</button>
              <button onClick={() => scrollTo('contact')}>{t.nav.contact}</button>
            </nav>
            <div className="header-icons">
              <button onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')} className="lang-toggle">
                {lang === 'ru' ? 'EN' : 'RU'}
              </button>
              <a href="https://t.me/renraie" target="_blank" rel="noreferrer" className="glass-icon"><Icon name="telegram"/></a>
              <a href="tel:+79639960003" className="glass-icon"><Icon name="phone"/></a>
            </div>
          </div>
        </header>

        <div className="filter-bar">
          <div className="filter-inner">
            {t.filters.map((cat, idx) => (
              <button key={idx} onClick={() => setFilter(idx)} className={`filter-tag ${filter === idx ? 'active' : ''}`}>{cat}</button>
            ))}
          </div>
        </div>
      </div>

      <section id="about" className="hero-section">
        <h1 className="reveal-text">
          {t.hero.title1} <span className="italic-accent">{t.hero.title2}</span> <br/>
          {t.hero.title3}
        </h1>
        <p className="fade-in-delay">{t.hero.description}</p>
      </section>

      <main id="projects" className="projects-section">
        <div className="section-header">
           <h2 className="section-title">{t.sections.featured}</h2>
           <div className="section-line"></div>
        </div>
        
        <div className="projects-grid">
          {filteredFeatured.map((project, index) => (
            <div key={project.id} className="project-card" onClick={() => setSelectedProject(project)} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="img-container">
                <img src={project.img} alt={getProjectTitle(project)} />
                <div className="img-overlay"><span>{lang === 'ru' ? 'Смотреть кейс' : 'View case'}</span></div>
              </div>
              <div className="project-details">
                <div className="project-info-main">
                  <span className="category-tag">{getCategoryName(project.cat)}</span>
                  <h3>{getProjectTitle(project)}</h3>
                </div>
                <span className="year">{project.year}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="archive-wrapper">
          <button onClick={() => setShowArchive(!showArchive)} className="archive-toggle-btn">
            <span className="btn-text">{showArchive ? t.sections.showArchive : t.sections.hideArchive}</span>
            <span className="btn-icon">{showArchive ? '↑' : '↓'}</span>
          </button>
          
          {showArchive && (
            <div className="archive-grid">
              {filteredArchive.map((project) => (
                <div key={project.id} className="archive-item" onClick={() => setSelectedProject(project)}>
                  <div className="archive-img-box">
                    <img src={project.img} alt={getProjectTitle(project)} />
                  </div>
                  <div className="archive-info">
                    <h4>{getProjectTitle(project)}</h4>
                    <p>{getCategoryName(project.cat)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {selectedProject && (
        <div className="project-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedProject(null)}><Icon name="close" /></button>
            <div className="modal-body">
              <div className="modal-info">
                <span className="category-tag">{getCategoryName(selectedProject.cat)}</span>
                <h2>{getProjectTitle(selectedProject)}</h2>
                <p>{getProjectDesc(selectedProject)}</p>
                <div className="modal-year">{t.modal.year}: {selectedProject.year}</div>
              </div>
              <div className="modal-viewer">
                {selectedProject.pdf && selectedProject.pdf.endsWith('.pdf') ? (
                  <iframe src={selectedProject.pdf} title="PDF" width="100%" height="100%" />
                ) : Array.isArray(selectedProject.gallery) ? (
                  <div className="modal-gallery">
                    {selectedProject.gallery.map((image, index) => (
                      <img key={index} src={image} alt={`slide-${index}`} className="gallery-img" />
                    ))}
                  </div>
                ) : (
                  <div className="pdf-placeholder">
                    <img src={selectedProject.img} alt="preview" />
                    <p>{lang === 'ru' ? 'Презентация загружается или в разработке' : 'Presentation loading or in development'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer id="contact" className="main-footer">
        <div className="footer-container">
          <div className="footer-content">
            <span className="footer-label">{t.footer.label}</span>
            <h2 className="footer-heading">{t.footer.heading}</h2>
            <div className="footer-links">
              <a href="tel:+79639960003" className="big-link">
                <span className="link-arrow">↗</span> 8 (963) 996-00-03
              </a>
              <a href="https://t.me/renraie" target="_blank" rel="noreferrer" className="big-link">
                <span className="link-arrow">↗</span> Telegram: @renraie
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="copyright">{t.footer.copyright}</p>
            <div className="footer-status">{t.footer.status}</div>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;600&display=swap');

        .modal-gallery { display: flex; flex-direction: column; gap: 20px; padding: 20px; overflow-y: auto; height: 100%; }
        .gallery-img { width: 100%; height: auto; border-radius: 12px; display: block; }
  
        :root {
          --bg: #08080a; --accent: #ffb3d9; --text: #ffffff;
          --text-dim: rgba(255, 255, 255, 0.5);
          --glass-border: rgba(255, 255, 255, 0.08);
          --glass: rgba(255, 255, 255, 0.03);
        }

        body { margin: 0; background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        .bg-noise { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-image: url("https://grainy-gradients.vercel.app/noise.svg"); opacity: 0.05; pointer-events: none; z-index: 1; }
        .bg-glow { position: fixed; top: -10%; right: -10%; width: 50%; height: 50%; background: radial-gradient(circle, rgba(255, 179, 217, 0.08) 0%, transparent 70%); filter: blur(80px); z-index: 0; pointer-events: none; }

        .header-fixed-block { position: fixed; top: 0; width: 100%; z-index: 100; padding: 20px 0; }
        .header { max-width: 1200px; margin: 0 auto; padding: 20px 30px; border-radius: 24px; background: rgba(13, 13, 15, 0.6); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); transition: 0.4s; }
        .header-shrink { padding: 12px 30px; transform: scale(0.98); background: rgba(8, 8, 10, 0.8); }
        .header-inner { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-weight: 600; letter-spacing: 0.1em; font-size: 13px; display: flex; align-items: center; gap: 10px; }
        .logo-dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; box-shadow: 0 0 10px var(--accent); }
        .desktop-nav { display: flex; gap: 8px; }
        .desktop-nav button { background: transparent; border: 1px solid transparent; color: var(--text-dim); font-size: 11px; padding: 8px 16px; border-radius: 12px; text-transform: uppercase; cursor: pointer; transition: 0.3s; }
        .desktop-nav button:hover { color: #fff; background: var(--glass); }
        .header-icons { display: flex; gap: 10px; }
        .glass-icon { width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; border-radius: 12px; border: 1px solid var(--glass-border); color: var(--text-dim); transition: 0.3s; text-decoration: none; }
        .glass-icon:hover { background: var(--accent); color: #000; }
        .lang-toggle { width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; border-radius: 12px; border: 1px solid var(--glass-border); background: var(--glass); color: var(--text); font-size: 11px; font-weight: 600; cursor: pointer; transition: 0.3s; font-family: inherit; }
        .lang-toggle:hover { background: var(--accent); color: #000; }

        .filter-bar { margin-top: 20px; }
        .filter-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: center; gap: 8px; }
        .filter-tag { padding: 10px 20px; border-radius: 14px; border: 1px solid var(--glass-border); background: var(--glass); color: var(--text-dim); font-size: 11px; cursor: pointer; transition: 0.3s; }
        .filter-tag.active { background: #fff; color: #000; }

        .hero-section { max-width: 1200px; margin: 0 auto; padding: 280px 50px 150px; }
        .reveal-text { font-family: 'Playfair Display', serif; font-size: clamp(45px, 8vw, 100px); line-height: 1; margin-bottom: 40px; }
        .italic-accent { font-style: italic; color: var(--accent); }

        .projects-section { max-width: 1200px; margin: 0 auto; padding: 0 50px 150px; }
        .projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px 40px; }
        .project-card { cursor: pointer; opacity: 0; animation: fadeInUp 0.8s forwards; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .project-card:hover { transform: translateY(-15px) scale(1.02); z-index: 10; }
        .project-card:nth-child(even):not(:hover) { transform: translateY(60px); }
        .img-container { position: relative; border-radius: 32px; overflow: hidden; aspect-ratio: 16/11; border: 1px solid var(--glass-border); transition: all 0.5s ease; }
        .project-card:hover .img-container { border-color: var(--accent); box-shadow: 0 20px 60px rgba(255, 179, 217, 0.2); }
        .img-container img { width: 100%; height: 100%; object-fit: cover; transition: 1.2s cubic-bezier(0.16, 1, 0.3, 1); filter: saturate(0.8); }
        .img-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; opacity: 0; transition: 0.4s; backdrop-filter: blur(4px); }
        .img-overlay span { padding: 12px 24px; border-radius: 30px; background: #fff; color: #000; font-size: 12px; font-weight: 600; transform: translateY(20px); transition: 0.4s ease; }
        .project-card:hover .img-overlay { opacity: 1; }
        .project-card:hover .img-overlay span { transform: translateY(0); }
        .project-card:hover img { transform: scale(1.1); filter: saturate(1.1); }
        .project-details { display: flex; justify-content: space-between; padding: 25px 10px 0; }
        .project-details h3 { margin: 0; font-size: 28px; font-family: 'Playfair Display', serif; }

        .archive-wrapper { text-align: center; margin-top: 150px; }
        .archive-toggle-btn { display: inline-flex; align-items: center; gap: 15px; padding: 20px 40px; border-radius: 20px; background: var(--glass); border: 1px solid var(--glass-border); color: #fff; cursor: pointer; transition: 0.4s; font-family: inherit; }
        .archive-toggle-btn:hover { background: #fff; color: #000; }
        .archive-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-top: 60px; animation: fadeInUp 0.8s both; }
        .archive-item { text-align: left; background: var(--glass); padding: 15px; border-radius: 24px; border: 1px solid var(--glass-border); transition: 0.4s; cursor: pointer; }
        .archive-item:hover { border-color: var(--accent); transform: translateY(-5px); }
        .archive-img-box { border-radius: 16px; overflow: hidden; aspect-ratio: 4/3; margin-bottom: 20px; }
        .archive-img-box img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1); opacity: 0.5; transition: 0.6s; }
        .archive-item:hover img { filter: grayscale(0); opacity: 1; }
        .archive-info h4 { margin: 0 0 5px; font-size: 18px; }
        .archive-info p { margin: 0; font-size: 12px; color: var(--text-dim); }

        .project-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 40px; backdrop-filter: blur(10px); }
        .project-modal { background: #0b0b0d; width: 100%; max-width: 1100px; height: 85vh; border-radius: 32px; position: relative; border: 1px solid var(--glass-border); overflow: hidden; }
        .close-modal { position: absolute; top: 20px; right: 20px; background: #fff; color: #000; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; z-index: 10; display: flex; align-items: center; justify-content: center; }
        .modal-body { display: grid; grid-template-columns: 350px 1fr; height: 100%; }
        .modal-info { padding: 60px 40px; border-right: 1px solid var(--glass-border); overflow-y: auto; }
        .modal-info h2 { font-family: 'Playfair Display', serif; font-size: 32px; margin: 20px 0; }
        .modal-info p { color: var(--text-dim); line-height: 1.6; }
        .modal-viewer { background: #111; }

        .main-footer { background: #050507; padding: 150px 0 60px; border-top: 1px solid var(--glass-border); position: relative; overflow: hidden; }
        .footer-container { max-width: 1200px; margin: 0 auto; padding: 0 50px; }
        .footer-label { font-size: 12px; text-transform: uppercase; color: var(--accent); letter-spacing: 0.3em; display: block; margin-bottom: 20px; }
        .footer-heading { font-family: 'Playfair Display', serif; font-size: clamp(40px, 6vw, 80px); font-weight: 400; margin-bottom: 60px; }
        .footer-links { display: flex; flex-direction: column; gap: 30px; align-items: flex-start; }
        .big-link { font-size: clamp(24px, 4vw, 42px); color: #fff; text-decoration: none; display: flex; align-items: center; gap: 20px; transition: 0.4s; }
        .link-arrow { color: var(--accent); opacity: 0; transform: translate(-20px, 20px); transition: 0.4s; }
        .big-link:hover { padding-left: 20px; color: var(--accent); }
        .big-link:hover .link-arrow { opacity: 1; transform: translate(0, 0); }
        .footer-bottom { margin-top: 100px; padding-top: 40px; border-top: 1px solid var(--glass-border); display: flex; justify-content: space-between; align-items: center; }
        .copyright { font-size: 11px; color: var(--text-dim); margin: 0; }
        .footer-status { font-size: 11px; color: #00ffaa; display: flex; align-items: center; gap: 8px; }
        .footer-status::before { content: ''; width: 6px; height: 6px; background: #00ffaa; border-radius: 50%; box-shadow: 0 0 10px #00ffaa; }

        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 768px) {
          .header-fixed-block { padding: 10px 15px; }
          .header { padding: 15px 20px; border-radius: 16px; }
          .header-shrink { padding: 10px 20px; }
          .logo { font-size: 10px; letter-spacing: 0.05em; }
          .logo-dot { width: 4px; height: 4px; }
          .desktop-nav { display: none; }
          .header-icons { gap: 8px; }
          .glass-icon { width: 32px; height: 32px; }
          .lang-toggle { width: 32px; height: 32px; font-size: 10px; }
          .filter-bar { margin-top: 10px; }
          .filter-inner { gap: 6px; flex-wrap: wrap; padding: 0 15px; }
          .filter-tag { padding: 8px 14px; font-size: 10px; border-radius: 10px; }
          .hero-section { padding: 180px 25px 80px; }
          .reveal-text { font-size: 36px; margin-bottom: 25px; }
          .fade-in-delay { font-size: 15px; }
          .projects-section { padding: 0 25px 80px; }
          .projects-grid { grid-template-columns: 1fr; gap: 50px; }
          .project-card:nth-child(even) { transform: translateY(0) !important; }
          .project-details h3 { font-size: 20px; }
          .category-tag { font-size: 10px; }
          .archive-wrapper { margin-top: 80px; }
          .archive-toggle-btn { padding: 15px 25px; font-size: 14px; gap: 10px; }
          .archive-grid { grid-template-columns: 1fr; gap: 20px; margin-top: 40px; }
          .project-overlay { padding: 20px; }
          .project-modal { height: 90vh; border-radius: 20px; }
          .modal-body { grid-template-columns: 1fr; overflow-y: auto; }
          .modal-info { padding: 40px 25px; border-right: none; border-bottom: 1px solid var(--glass-border); }
          .modal-info h2 { font-size: 24px; }
          .close-modal { top: 15px; right: 15px; width: 36px; height: 36px; }
          .main-footer { padding: 80px 0 40px; }
          .footer-container { padding: 0 25px; }
          .footer-heading { font-size: 32px; margin-bottom: 40px; }
          .big-link { font-size: 20px; gap: 12px; }
          .footer-bottom { margin-top: 60px; flex-direction: column; gap: 20px; align-items: flex-start; }
        }

        @media (max-width: 400px) {
          .logo { font-size: 9px; }
          .filter-tag { padding: 6px 10px; font-size: 9px; }
          .reveal-text { font-size: 28px; }
          .project-details h3 { font-size: 18px; }
        }
      `}</style>
    </div>
  );
};

export default App;