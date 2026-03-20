import { useState, useEffect, useMemo, useCallback } from "react";

// ─── Types ──────────────────────────────────────────────
type Tag =
  | "3D"
  | "2D"
  | "Текстуры"
  | "Звук"
  | "Музыка"
  | "Unity"
  | "Construct"
  | "Шрифты"
  | "UI"
  | "Спрайты"
  | "Модели"
  | "Анимация"
  | "Инструменты"
  | "Туториалы"
  | "Шейдеры"
  | "Иконки"
  | "Тайлы"
  | "VFX";

interface Resource {
  name: string;
  url: string;
  description: string;
  tags: Tag[];
  category: string;
}

// ─── Data ───────────────────────────────────────────────
const ALL_TAGS: Tag[] = [
  "3D", "2D", "Текстуры", "Звук", "Музыка", "Unity", "Construct",
  "Шрифты", "UI", "Спрайты", "Модели", "Анимация", "Инструменты",
  "Туториалы", "Шейдеры", "Иконки", "Тайлы", "VFX",
];

const CATEGORIES = [
  "Все",
  "3D Ассеты",
  "2D Ассеты",
  "Аудио",
  "Инструменты и утилиты",
  "Unity ресурсы",
  "Construct ресурсы",
  "Обучение",
];

const resources: Resource[] = [
  // 3D
  {
    name: "Kenney.nl",
    url: "https://kenney.nl/assets",
    description: "Огромная библиотека бесплатных 2D и 3D ассетов, UI элементов, аудио. Один из лучших ресурсов для инди-разработчиков.",
    tags: ["3D", "2D", "Модели", "UI", "Спрайты", "Тайлы"],
    category: "3D Ассеты",
  },
  {
    name: "Poly Pizza",
    url: "https://poly.pizza",
    description: "Бесплатные low-poly 3D модели, идеально подходящие для прототипирования и стилизованных игр.",
    tags: ["3D", "Модели"],
    category: "3D Ассеты",
  },
  {
    name: "Quaternius",
    url: "https://quaternius.com/packs",
    description: "Бесплатные анимированные low-poly 3D модели: персонажи, окружение, транспорт и многое другое.",
    tags: ["3D", "Модели", "Анимация"],
    category: "3D Ассеты",
  },
  {
    name: "Sketchfab (Free)",
    url: "https://sketchfab.com/features/free-3d-models",
    description: "Тысячи бесплатных 3D моделей с предпросмотром прямо в браузере. Различные форматы экспорта.",
    tags: ["3D", "Модели", "Анимация"],
    category: "3D Ассеты",
  },
  {
    name: "Mixamo",
    url: "https://www.mixamo.com",
    description: "Бесплатные 3D персонажи и анимации от Adobe. Автоматический риггинг моделей.",
    tags: ["3D", "Анимация", "Модели"],
    category: "3D Ассеты",
  },
  {
    name: "AmbientCG",
    url: "https://ambientcg.com",
    description: "Высококачественные PBR материалы и текстуры, полностью бесплатные (CC0). HDRI карты окружения.",
    tags: ["3D", "Текстуры"],
    category: "3D Ассеты",
  },
  {
    name: "PolyHaven",
    url: "https://polyhaven.com",
    description: "Бесплатные HDRI, текстуры и 3D модели высокого качества. Всё под CC0 лицензией.",
    tags: ["3D", "Текстуры", "Модели"],
    category: "3D Ассеты",
  },
  // 2D
  {
    name: "OpenGameArt",
    url: "https://opengameart.org",
    description: "Крупнейшее сообщество бесплатной игровой графики: спрайты, тайлсеты, иконки, фоны и звуки.",
    tags: ["2D", "Спрайты", "Тайлы", "Иконки", "Звук"],
    category: "2D Ассеты",
  },
  {
    name: "itch.io (Game Assets)",
    url: "https://itch.io/game-assets/free",
    description: "Огромная коллекция бесплатных игровых ассетов от инди-авторов: спрайты, тайлы, шрифты, звуки и многое другое.",
    tags: ["2D", "3D", "Спрайты", "Тайлы", "Звук", "Шрифты", "UI"],
    category: "2D Ассеты",
  },
  {
    name: "CraftPix",
    url: "https://craftpix.net/freebies/",
    description: "Бесплатные 2D игровые ассеты: персонажи, тайлсеты, фоны, GUI элементы и иконки.",
    tags: ["2D", "Спрайты", "Тайлы", "UI", "Иконки"],
    category: "2D Ассеты",
  },
  {
    name: "Game-Icons.net",
    url: "https://game-icons.net",
    description: "Более 4000 бесплатных SVG иконок для игр. Настраиваемые цвета и стили.",
    tags: ["2D", "Иконки", "UI"],
    category: "2D Ассеты",
  },
  {
    name: "Piskel",
    url: "https://www.piskelapp.com",
    description: "Бесплатный онлайн-редактор пиксель-арта с поддержкой анимации. Экспорт в PNG, GIF, спрайт-листы.",
    tags: ["2D", "Спрайты", "Анимация", "Инструменты"],
    category: "2D Ассеты",
  },
  {
    name: "Lospec Palette List",
    url: "https://lospec.com/palette-list",
    description: "Коллекция цветовых палитр для пиксель-арта и игровой графики. Фильтры по количеству цветов.",
    tags: ["2D", "Инструменты"],
    category: "2D Ассеты",
  },
  // Audio
  {
    name: "Freesound",
    url: "https://freesound.org",
    description: "Огромная база бесплатных звуковых эффектов. Записи окружения, UI звуки, эффекты взрывов и многое другое.",
    tags: ["Звук"],
    category: "Аудио",
  },
  {
    name: "Incompetech (Kevin MacLeod)",
    url: "https://incompetech.com/music/royalty-free/music.html",
    description: "Бесплатная royalty-free музыка для игр и видео. Сотни треков в различных жанрах.",
    tags: ["Музыка"],
    category: "Аудио",
  },
  {
    name: "Mixkit",
    url: "https://mixkit.co/free-sound-effects/",
    description: "Бесплатные звуковые эффекты и музыка. Высокое качество, без необходимости регистрации.",
    tags: ["Звук", "Музыка"],
    category: "Аудио",
  },
  {
    name: "BFXR",
    url: "https://www.bfxr.net",
    description: "Генератор 8-битных звуковых эффектов прямо в браузере. Идеально для ретро-игр.",
    tags: ["Звук", "Инструменты"],
    category: "Аудио",
  },
  // Tools
  {
    name: "Tiled Map Editor",
    url: "https://www.mapeditor.org",
    description: "Бесплатный редактор тайловых карт. Поддерживает изометрические и гексагональные карты. Экспорт в JSON/XML.",
    tags: ["Инструменты", "Тайлы", "2D"],
    category: "Инструменты и утилиты",
  },
  {
    name: "Blender",
    url: "https://www.blender.org",
    description: "Мощный бесплатный 3D-редактор. Моделирование, анимация, рендеринг, скульптинг и многое другое.",
    tags: ["3D", "Инструменты", "Анимация", "Модели"],
    category: "Инструменты и утилиты",
  },
  {
    name: "GIMP",
    url: "https://www.gimp.org",
    description: "Бесплатный графический редактор — альтернатива Photoshop. Работа с текстурами, спрайтами и UI.",
    tags: ["2D", "Инструменты", "Текстуры"],
    category: "Инструменты и утилиты",
  },
  {
    name: "LibreSprite",
    url: "https://libresprite.github.io",
    description: "Редактор пиксель-арта с мощной анимацией. Бесплатный форк Aseprite.",
    tags: ["2D", "Спрайты", "Анимация", "Инструменты"],
    category: "Инструменты и утилиты",
  },
  {
    name: "Shadertoy",
    url: "https://www.shadertoy.com",
    description: "Платформа для создания и обмена шейдерами. Отличный ресурс для изучения визуальных эффектов.",
    tags: ["Шейдеры", "VFX", "Инструменты"],
    category: "Инструменты и утилиты",
  },
  {
    name: "Google Fonts",
    url: "https://fonts.google.com",
    description: "Бесплатные шрифты для ваших игровых проектов. Поддержка кириллицы и множества языков.",
    tags: ["Шрифты", "UI"],
    category: "Инструменты и утилиты",
  },
  // Unity
  {
    name: "Unity Asset Store (Free)",
    url: "https://assetstore.unity.com/packages/top-assets/top-free",
    description: "Бесплатные ассеты из официального магазина Unity. 3D модели, шейдеры, скрипты, эффекты.",
    tags: ["Unity", "3D", "2D", "Шейдеры", "VFX"],
    category: "Unity ресурсы",
  },
  {
    name: "Unity Learn",
    url: "https://learn.unity.com",
    description: "Официальные туториалы и курсы от Unity. Пошаговые проекты для начинающих и продвинутых.",
    tags: ["Unity", "Туториалы"],
    category: "Unity ресурсы",
  },
  {
    name: "Brackeys (YouTube)",
    url: "https://www.youtube.com/@Brackeys",
    description: "Один из лучших YouTube-каналов для изучения Unity. Понятные и качественные туториалы.",
    tags: ["Unity", "Туториалы"],
    category: "Unity ресурсы",
  },
  {
    name: "DOTween",
    url: "https://dotween.demigiant.com",
    description: "Бесплатная анимационная библиотека для Unity. Простое создание плавных анимаций и переходов.",
    tags: ["Unity", "Анимация", "Инструменты"],
    category: "Unity ресурсы",
  },
  {
    name: "Unity VFX Samples",
    url: "https://github.com/Unity-Technologies/VisualEffectGraph-Samples",
    description: "Официальные примеры Visual Effect Graph от Unity. Частицы, шейдеры, визуальные эффекты.",
    tags: ["Unity", "VFX", "Шейдеры"],
    category: "Unity ресурсы",
  },
  // Construct
  {
    name: "Construct 3 Free Edition",
    url: "https://www.construct.net",
    description: "Официальный сайт Construct. Бесплатная версия для начала разработки 2D игр без программирования.",
    tags: ["Construct", "Инструменты"],
    category: "Construct ресурсы",
  },
  {
    name: "Construct Arcade",
    url: "https://www.construct.net/en/free-online-games",
    description: "Галерея игр, сделанных на Construct. Отличный источник вдохновения и примеров.",
    tags: ["Construct", "Туториалы"],
    category: "Construct ресурсы",
  },
  {
    name: "Scirra Tutorials",
    url: "https://www.construct.net/en/tutorials",
    description: "Официальные и пользовательские туториалы для Construct 2/3. От основ до продвинутых техник.",
    tags: ["Construct", "Туториалы"],
    category: "Construct ресурсы",
  },
  {
    name: "Construct Community Addons",
    url: "https://www.construct.net/en/make-games/addons",
    description: "Плагины и расширения для Construct от сообщества. Новые поведения, эффекты и инструменты.",
    tags: ["Construct", "Инструменты", "VFX"],
    category: "Construct ресурсы",
  },
  {
    name: "itch.io (Construct Assets)",
    url: "https://itch.io/game-assets/tag-construct-2",
    description: "Ассеты на itch.io специально для Construct 2/3. Шаблоны, спрайты, плагины и готовые проекты.",
    tags: ["Construct", "2D", "Спрайты", "Инструменты"],
    category: "Construct ресурсы",
  },
  // Learning
  {
    name: "GDQuest",
    url: "https://www.gdquest.com",
    description: "Бесплатные туториалы по игровой разработке. Фокус на Godot, но принципы применимы к любому движку.",
    tags: ["Туториалы", "2D", "3D"],
    category: "Обучение",
  },
  {
    name: "Game Programming Patterns",
    url: "https://gameprogrammingpatterns.com",
    description: "Бесплатная онлайн-книга о паттернах проектирования в играх. Обязательна к прочтению!",
    tags: ["Туториалы"],
    category: "Обучение",
  },
  {
    name: "Red Blob Games",
    url: "https://www.redblobgames.com",
    description: "Интерактивные статьи об алгоритмах в играх: поиск пути, генерация карт, шум Перлина и другое.",
    tags: ["Туториалы"],
    category: "Обучение",
  },
  {
    name: "GDD Template",
    url: "https://docs.google.com/document/d/1-I08qX76DgSFyN1ByIGtPuqXh7bVKraHcNIA25tpAzE",
    description: "Шаблон документа игрового дизайна. Поможет структурировать ваши идеи перед началом разработки.",
    tags: ["Инструменты", "Туториалы"],
    category: "Обучение",
  },
  {
    name: "itch.io (Game Jams)",
    url: "https://itch.io/jams",
    description: "Геймджемы на itch.io — лучший способ попрактиковаться и получить опыт в разработке игр.",
    tags: ["Туториалы", "Инструменты"],
    category: "Обучение",
  },
];

// ─── SVG Icons ──────────────────────────────────────────
function SearchIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" strokeLinecap="round" />
    </svg>
  );
}

function ExternalLinkIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GamepadIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="6" />
      <path d="M12 12h.01" />
      <path d="M7 10v4" />
      <path d="M5 12h4" />
      <path d="M15 10l2 2-2 2" />
    </svg>
  );
}

function ChevronUpIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ArrowDownIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  );
}

// ─── Tag colors ─────────────────────────────────────────
function getTagStyle(tag: Tag): string {
  const styles: Record<string, string> = {
    "3D": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "2D": "bg-lime-500/20 text-lime-300 border-lime-500/30",
    "Текстуры": "bg-amber-500/20 text-amber-300 border-amber-500/30",
    "Звук": "bg-purple-500/20 text-purple-300 border-purple-500/30",
    "Музыка": "bg-pink-500/20 text-pink-300 border-pink-500/30",
    "Unity": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    "Construct": "bg-green-500/20 text-green-300 border-green-500/30",
    "Шрифты": "bg-orange-500/20 text-orange-300 border-orange-500/30",
    "UI": "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    "Спрайты": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    "Модели": "bg-sky-500/20 text-sky-300 border-sky-500/30",
    "Анимация": "bg-rose-500/20 text-rose-300 border-rose-500/30",
    "Инструменты": "bg-teal-500/20 text-teal-300 border-teal-500/30",
    "Туториалы": "bg-violet-500/20 text-violet-300 border-violet-500/30",
    "Шейдеры": "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
    "Иконки": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    "Тайлы": "bg-lime-600/20 text-lime-400 border-lime-600/30",
    "VFX": "bg-red-500/20 text-red-300 border-red-500/30",
  };
  return styles[tag] || "bg-slate-500/20 text-slate-300 border-slate-500/30";
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    "3D Ассеты": "🧊",
    "2D Ассеты": "🎨",
    "Аудио": "🎵",
    "Инструменты и утилиты": "🛠️",
    "Unity ресурсы": "⚙️",
    "Construct ресурсы": "🏗️",
    "Обучение": "📚",
  };
  return icons[category] || "📦";
}

// ─── Navbar ─────────────────────────────────────────────
function Navbar({ activeSection }: { activeSection: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const sections = [
    { id: "hero", label: "Главная" },
    { id: "resources", label: "Ресурсы" },
    { id: "about", label: "О школе" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-lime-400 shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-110">
            <GamepadIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">
            <span className="text-white">R</span>
            <span className="bg-gradient-to-r from-blue-400 to-lime-400 bg-clip-text text-transparent">Code</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 sm:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeSection === s.id
                  ? "bg-blue-500/15 text-blue-400"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Mobile burger */}
        <button
          className="flex flex-col gap-1.5 sm:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span className={`block h-0.5 w-6 rounded bg-white transition-all duration-300 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 rounded bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 rounded bg-white transition-all duration-300 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/5 bg-slate-950/95 backdrop-blur-xl sm:hidden">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-3 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ───────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-16">
      {/* BG decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-lime-500/10 blur-[120px] animate-pulse-glow animation-delay-600" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-[150px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300">
          <span className="inline-block h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
          Для учеников школы RCode
        </div>

        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
          Ресурсы для{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-lime-400 bg-clip-text text-transparent">
            игровой разработки
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
          Коллекция лучших бесплатных ассетов, инструментов и учебных материалов
          для создания игр на <span className="text-blue-400 font-medium">Unity</span> и{" "}
          <span className="text-lime-400 font-medium">Construct 2</span>. Собрано специально для
          учеников школы программирования <span className="text-white font-semibold">RCode</span>.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#resources"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:scale-105"
          >
            Смотреть ресурсы
            <ArrowDownIcon className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-slate-300 transition-all hover:bg-white/10 hover:text-white"
          >
            О школе RCode
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8">
          {[
            { n: `${resources.length}+`, label: "Ресурсов" },
            { n: `${CATEGORIES.length - 1}`, label: "Категорий" },
            { n: "100%", label: "Бесплатно" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-lime-400 bg-clip-text text-transparent sm:text-3xl">{s.n}</div>
              <div className="mt-1 text-xs text-slate-500 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Resource Card ──────────────────────────────────────
function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-white transition-colors group-hover:text-blue-400 sm:text-lg">
          {resource.name}
        </h3>
        <ExternalLinkIcon className="w-4 h-4 shrink-0 text-slate-600 transition-colors group-hover:text-blue-400 mt-1" />
      </div>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-400">
        {resource.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {resource.tags.map((tag) => (
          <span
            key={tag}
            className={`inline-block rounded-md border px-2 py-0.5 text-[11px] font-medium ${getTagStyle(tag)}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}

// ─── Resources Section ──────────────────────────────────
function ResourcesSection() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [activeTags, setActiveTags] = useState<Tag[]>([]);
  const [showAllTags, setShowAllTags] = useState(false);

  const toggleTag = useCallback((tag: Tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearch("");
    setActiveCategory("Все");
    setActiveTags([]);
  }, []);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchCategory = activeCategory === "Все" || r.category === activeCategory;
      const matchTags = activeTags.length === 0 || activeTags.every((t) => r.tags.includes(t));
      const q = search.trim().toLowerCase();
      const matchSearch =
        q === "" ||
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q));
      return matchCategory && matchTags && matchSearch;
    });
  }, [search, activeCategory, activeTags]);

  const hasFilters = search !== "" || activeCategory !== "Все" || activeTags.length > 0;
  const visibleTags = showAllTags ? ALL_TAGS : ALL_TAGS.slice(0, 8);

  return (
    <section id="resources" className="relative px-4 py-24 sm:px-6">
      {/* Subtle BG */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-1/4 h-64 w-64 rounded-full bg-blue-600/5 blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-lime-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">
            📦 Каталог ресурсов
          </h2>
          <p className="mx-auto max-w-2xl text-slate-400">
            Используй поиск, категории и теги, чтобы найти нужные ассеты.
            Все ресурсы бесплатные и проверенные преподавателями RCode.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative mx-auto mb-8 max-w-xl">
          <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск ресурсов..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-10 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-blue-500/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-blue-500/20"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:text-white transition-colors"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20"
                  : "border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat !== "Все" && <span className="mr-1.5">{getCategoryIcon(cat)}</span>}
              {cat}
            </button>
          ))}
        </div>

        {/* Tags */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {visibleTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-md border px-3 py-1 text-xs font-medium transition-all ${
                  activeTags.includes(tag)
                    ? "border-lime-400/50 bg-lime-500/20 text-lime-300 shadow-sm shadow-lime-500/10"
                    : "border-white/10 bg-white/[0.03] text-slate-500 hover:border-white/20 hover:text-slate-300"
                }`}
              >
                #{tag}
              </button>
            ))}
            {ALL_TAGS.length > 8 && (
              <button
                onClick={() => setShowAllTags(!showAllTags)}
                className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-blue-400 hover:bg-white/[0.06] transition-all"
              >
                {showAllTags ? "Свернуть" : `Ещё +${ALL_TAGS.length - 8}`}
              </button>
            )}
          </div>
          {hasFilters && (
            <div className="mt-4 flex items-center justify-center gap-3 text-sm">
              <span className="text-slate-500">
                Найдено: <span className="text-white font-medium">{filtered.length}</span>
              </span>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <XIcon className="w-3.5 h-3.5" />
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>

        {/* Results grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <ResourceCard key={r.name} resource={r} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-12 text-center">
            <div className="mb-4 text-5xl">🔍</div>
            <h3 className="mb-2 text-lg font-semibold text-white">Ничего не найдено</h3>
            <p className="mb-4 text-sm text-slate-400">
              Попробуйте изменить поисковый запрос или сбросить фильтры
            </p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
            >
              Сбросить все фильтры
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── About Section ──────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="relative px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-blue-600/8 blur-[100px]" />
        <div className="absolute top-0 right-1/3 h-72 w-72 rounded-full bg-lime-500/8 blur-[100px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-8 backdrop-blur-sm sm:p-12">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-lime-400 shadow-lg shadow-blue-500/20">
              <GamepadIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                Школа программирования{" "}
                <span className="bg-gradient-to-r from-blue-400 to-lime-400 bg-clip-text text-transparent">RCode</span>
              </h2>
              <p className="text-sm text-slate-400">Создавай игры, которые покорят мир</p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              <span className="font-semibold text-white">RCode</span> — это школа программирования, где мы учим создавать
              настоящие игры с нуля. Наши ученики осваивают{" "}
              <span className="text-blue-400 font-medium">Unity</span>,{" "}
              <span className="text-lime-400 font-medium">Construct 2</span>, основы геймдизайна, работу с графикой и звуком.
            </p>
            <p>
              Этот сайт — ваш помощник в поиске качественных бесплатных ресурсов для учебных проектов.
              Все ссылки проверены преподавателями и рекомендованы для использования на занятиях.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: "🎮", title: "Игровая разработка", desc: "Unity, Construct 2, геймдизайн" },
              { icon: "🎨", title: "Цифровое искусство", desc: "2D графика, 3D моделирование" },
              { icon: "💻", title: "Программирование", desc: "C#, JavaScript, логика" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 text-center transition-all hover:bg-white/[0.06] hover:border-blue-500/20"
              >
                <div className="mb-2 text-3xl">{item.icon}</div>
                <h4 className="mb-1 text-sm font-semibold text-white">{item.title}</h4>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-lime-400">
            <GamepadIcon className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-slate-400">
            <span className="text-slate-300">R</span>Code
          </span>
        </div>
        <p className="text-xs text-slate-600 text-center">
          © {new Date().getFullYear()} RCode — Школа программирования. Все ресурсы принадлежат их авторам.
        </p>
      </div>
    </footer>
  );
}

// ─── Scroll to Top ──────────────────────────────────────
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-110 hover:shadow-blue-500/50"
      aria-label="Scroll to top"
    >
      <ChevronUpIcon className="w-5 h-5" />
    </button>
  );
}

// ─── App ────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sectionIds = ["about", "resources", "hero"];
          for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 120) {
                setActiveSection(id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar activeSection={activeSection} />
      <HeroSection />
      <ResourcesSection />
      <AboutSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
