export type Tag =
  | "3D"
  | "2D"
  | "Текстуры"
  | "Звуки"
  | "Музыка"
  | "Шрифты"
  | "UI"
  | "Unity"
  | "Construct"
  | "Спрайты"
  | "Модели"
  | "Иконки"
  | "Анимации"
  | "Шейдеры"
  | "Туториалы"
  | "Инструменты"
  | "Бесплатно"
  | "Генераторы";

export interface Resource {
  id: number;
  title: string;
  description: string;
  url: string;
  tags: Tag[];
  category: "assets" | "tools" | "learning";
  icon: string;
}

export const allTags: Tag[] = [
  "3D",
  "2D",
  "Текстуры",
  "Звуки",
  "Музыка",
  "Шрифты",
  "UI",
  "Unity",
  "Construct",
  "Спрайты",
  "Модели",
  "Иконки",
  "Анимации",
  "Шейдеры",
  "Туториалы",
  "Инструменты",
  "Бесплатно",
  "Генераторы",
];

export const categories = [
  { key: "all" as const, label: "Все ресурсы", emoji: "📦" },
  { key: "assets" as const, label: "Ассеты", emoji: "🎨" },
  { key: "tools" as const, label: "Инструменты", emoji: "🛠️" },
  { key: "learning" as const, label: "Обучение", emoji: "📚" },
];

export const resources: Resource[] = [
  // ===== ASSETS =====
  {
    id: 1,
    title: "itch.io — Game Assets",
    description:
      "Огромная коллекция бесплатных и платных 2D/3D ассетов, спрайтов, тайлсетов, звуков и музыки от инди-авторов со всего мира.",
    url: "https://itch.io/game-assets",
    tags: ["2D", "3D", "Спрайты", "Звуки", "Музыка", "Бесплатно"],
    category: "assets",
    icon: "🎮",
  },
  {
    id: 2,
    title: "Kenney.nl",
    description:
      "Тысячи бесплатных игровых ассетов: 2D спрайты, 3D модели, UI элементы, звуковые эффекты. Идеально для прототипирования.",
    url: "https://kenney.nl/assets",
    tags: ["2D", "3D", "Спрайты", "Модели", "UI", "Звуки", "Бесплатно"],
    category: "assets",
    icon: "🧱",
  },
  {
    id: 3,
    title: "OpenGameArt.org",
    description:
      "Бесплатные арты, спрайты, текстуры, 3D модели, звуки и музыка для игр с открытыми лицензиями.",
    url: "https://opengameart.org",
    tags: ["2D", "3D", "Текстуры", "Звуки", "Музыка", "Спрайты", "Бесплатно"],
    category: "assets",
    icon: "🎨",
  },
  {
    id: 4,
    title: "Mixamo",
    description:
      "Бесплатные 3D персонажи и анимации от Adobe. Автоматический риггинг моделей, экспорт в FBX для Unity.",
    url: "https://www.mixamo.com",
    tags: ["3D", "Анимации", "Модели", "Unity", "Бесплатно"],
    category: "assets",
    icon: "🏃",
  },
  {
    id: 5,
    title: "Poly Pizza (бывш. Poly Haven)",
    description:
      "Коллекция бесплатных low-poly 3D моделей. Отлично подходит для мобильных игр и проектов в стиле low-poly.",
    url: "https://poly.pizza",
    tags: ["3D", "Модели", "Бесплатно"],
    category: "assets",
    icon: "🍕",
  },
  {
    id: 6,
    title: "Freesound.org",
    description:
      "Огромная база бесплатных звуковых эффектов с различными лицензиями Creative Commons.",
    url: "https://freesound.org",
    tags: ["Звуки", "Бесплатно"],
    category: "assets",
    icon: "🔊",
  },
  {
    id: 7,
    title: "Textures.com",
    description:
      "Библиотека высококачественных PBR текстур. Есть бесплатные загрузки каждый день.",
    url: "https://www.textures.com",
    tags: ["Текстуры", "3D", "Бесплатно"],
    category: "assets",
    icon: "🖼️",
  },
  {
    id: 8,
    title: "Ambientcg.com",
    description:
      "Полностью бесплатные PBR текстуры, HDRI карты и 3D модели. Лицензия CC0 — никаких ограничений.",
    url: "https://ambientcg.com",
    tags: ["Текстуры", "3D", "Модели", "Бесплатно"],
    category: "assets",
    icon: "🌅",
  },
  {
    id: 9,
    title: "Google Fonts",
    description:
      "Бесплатные шрифты от Google. Подходят для UI в играх, заголовков и стилизованных текстов.",
    url: "https://fonts.google.com",
    tags: ["Шрифты", "UI", "Бесплатно"],
    category: "assets",
    icon: "🔤",
  },
  {
    id: 10,
    title: "Unity Asset Store — Free",
    description:
      "Бесплатные ассеты в официальном магазине Unity: модели, скрипты, шейдеры, звуки и целые шаблоны проектов.",
    url: "https://assetstore.unity.com/packages?price=0-0&orderBy=1",
    tags: ["Unity", "3D", "2D", "Шейдеры", "Бесплатно"],
    category: "assets",
    icon: "🔷",
  },
  {
    id: 11,
    title: "Game-Icons.net",
    description:
      "Более 4000 бесплатных SVG иконок для игр: оружие, заклинания, предметы, навыки и многое другое.",
    url: "https://game-icons.net",
    tags: ["Иконки", "UI", "2D", "Бесплатно"],
    category: "assets",
    icon: "⚔️",
  },
  {
    id: 12,
    title: "Скрипты Construct 2 на itch.io",
    description:
      "Шаблоны, плагины и готовые проекты для Construct 2/3 на itch.io. Ускорьте разработку своих 2D игр.",
    url: "https://itch.io/game-assets/tag-construct-2",
    tags: ["Construct", "2D", "Спрайты", "Бесплатно"],
    category: "assets",
    icon: "🏗️",
  },

  // ===== TOOLS =====
  {
    id: 13,
    title: "Piskel",
    description:
      "Бесплатный онлайн-редактор пиксель-арта и анимированных спрайтов. Работает прямо в браузере.",
    url: "https://www.piskelapp.com",
    tags: ["2D", "Спрайты", "Анимации", "Инструменты", "Бесплатно"],
    category: "tools",
    icon: "✏️",
  },
  {
    id: 14,
    title: "Tiled Map Editor",
    description:
      "Бесплатный редактор тайловых карт. Поддерживает экспорт в Unity, Construct и другие движки.",
    url: "https://www.mapeditor.org",
    tags: ["2D", "Инструменты", "Unity", "Construct", "Бесплатно"],
    category: "tools",
    icon: "🗺️",
  },
  {
    id: 15,
    title: "Blender",
    description:
      "Мощный бесплатный 3D-редактор. Моделирование, анимация, рендеринг, экспорт в FBX/GLTF для Unity.",
    url: "https://www.blender.org",
    tags: ["3D", "Модели", "Анимации", "Инструменты", "Бесплатно"],
    category: "tools",
    icon: "🧊",
  },
  {
    id: 16,
    title: "BFXR",
    description:
      "Генератор ретро-звуковых эффектов для игр. Создавайте звуки выстрелов, прыжков, взрывов за секунды.",
    url: "https://www.bfxr.net",
    tags: ["Звуки", "Инструменты", "Генераторы", "Бесплатно"],
    category: "tools",
    icon: "🎵",
  },
  {
    id: 17,
    title: "ShaderToy",
    description:
      "Платформа для создания и шеринга шейдеров. Вдохновляйтесь и изучайте GLSL шейдеры в реальном времени.",
    url: "https://www.shadertoy.com",
    tags: ["Шейдеры", "Инструменты", "3D"],
    category: "tools",
    icon: "✨",
  },
  {
    id: 18,
    title: "TexturePacker",
    description:
      "Инструмент для создания спрайтшитов. Оптимизирует атласы текстур для 2D игр. Есть бесплатная версия.",
    url: "https://www.codeandweb.com/texturepacker",
    tags: ["2D", "Спрайты", "Инструменты"],
    category: "tools",
    icon: "📐",
  },
  {
    id: 19,
    title: "Aseprite (trial) / LibreSprite",
    description:
      "Профессиональный редактор пиксель-арта и анимаций. LibreSprite — бесплатный форк с открытым кодом.",
    url: "https://www.aseprite.org",
    tags: ["2D", "Спрайты", "Анимации", "Инструменты"],
    category: "tools",
    icon: "🎞️",
  },

  // ===== LEARNING =====
  {
    id: 20,
    title: "Unity Learn",
    description:
      "Официальные курсы и туториалы от Unity. Пошаговые проекты от начального до продвинутого уровня.",
    url: "https://learn.unity.com",
    tags: ["Unity", "Туториалы", "Бесплатно"],
    category: "learning",
    icon: "🎓",
  },
  {
    id: 21,
    title: "Construct 2 — Руководство",
    description:
      "Официальная документация и руководства по Construct 2. Идеально для начинающих в 2D разработке.",
    url: "https://www.construct.net/en/construct-2/manuals",
    tags: ["Construct", "Туториалы", "2D", "Бесплатно"],
    category: "learning",
    icon: "📖",
  },
  {
    id: 22,
    title: "Brackeys (YouTube)",
    description:
      "Легендарный YouTube-канал с туториалами по Unity. Сотни видео по C#, шейдерам, игровому дизайну.",
    url: "https://www.youtube.com/@Brackeys",
    tags: ["Unity", "Туториалы", "3D", "2D", "Шейдеры", "Бесплатно"],
    category: "learning",
    icon: "📹",
  },
  {
    id: 23,
    title: "Catlike Coding",
    description:
      "Подробные туториалы по Unity: рендеринг, шейдеры, процедурная генерация, физика. Высокое качество материалов.",
    url: "https://catlikecoding.com/unity/tutorials/",
    tags: ["Unity", "Туториалы", "Шейдеры", "3D", "Бесплатно"],
    category: "learning",
    icon: "🐱",
  },
  {
    id: 24,
    title: "Game Design — itch.io Jams",
    description:
      "Участвуйте в геймджемах на itch.io! Отличная практика для учеников — создать игру за 48 часов.",
    url: "https://itch.io/jams",
    tags: ["Туториалы", "Бесплатно"],
    category: "learning",
    icon: "🏆",
  },
  {
    id: 25,
    title: "GDQuest (YouTube & Docs)",
    description:
      "Качественные туториалы по геймдеву. Основной фокус на Godot, но принципы применимы к любому движку.",
    url: "https://www.gdquest.com",
    tags: ["Туториалы", "2D", "3D", "Бесплатно"],
    category: "learning",
    icon: "🤖",
  },
];
