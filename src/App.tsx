import { useState, useMemo } from "react";
import { resources, allTags, categories, type Tag, type Resource } from "./data/resources";

function TagBadge({
  tag,
  active,
  onClick,
}: {
  tag: Tag;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200 cursor-pointer border
        ${
          active
            ? "bg-gradient-to-r from-blue-500 to-lime-400 text-white border-transparent shadow-md shadow-blue-500/20 scale-105"
            : "bg-slate-800/60 text-slate-300 border-slate-700 hover:border-blue-500/50 hover:text-blue-300"
        }`}
    >
      {tag}
    </button>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  const categoryColors: Record<string, string> = {
    assets: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    tools: "from-lime-500/20 to-emerald-500/20 border-lime-500/30",
    learning: "from-violet-500/20 to-blue-500/20 border-violet-500/30",
  };

  const categoryLabels: Record<string, string> = {
    assets: "Ассет",
    tools: "Инструмент",
    learning: "Обучение",
  };

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm p-5 transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-lime-500/20 text-2xl">
          {resource.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-lg font-bold text-white group-hover:text-lime-300 transition-colors truncate">
              {resource.title}
            </h3>
            <span
              className={`inline-block rounded-full bg-gradient-to-r ${categoryColors[resource.category]} border px-2 py-0.5 text-[10px] font-semibold text-slate-200`}
            >
              {categoryLabels[resource.category]}
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed mb-3">
            {resource.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {resource.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-700/50 px-2 py-0.5 text-[10px] font-medium text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-5 h-5 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </div>
    </a>
  );
}

export default function App() {
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState<Tag[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const toggleTag = (tag: Tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setActiveTags([]);
    setActiveCategory("all");
  };

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchesSearch =
        search === "" ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase()) ||
        r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory =
        activeCategory === "all" || r.category === activeCategory;

      const matchesTags =
        activeTags.length === 0 || activeTags.some((t) => r.tags.includes(t));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [search, activeTags, activeCategory]);

  const hasFilters = search !== "" || activeTags.length > 0 || activeCategory !== "all";

  const countByCategory = (cat: string) =>
    cat === "all"
      ? resources.length
      : resources.filter((r) => r.category === cat).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Ambient background blurs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-lime-500/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-lime-400 shadow-lg shadow-blue-500/25">
                <span className="text-lg font-black text-white">R</span>
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-white">R</span>
                <span className="bg-gradient-to-r from-blue-400 to-lime-400 bg-clip-text text-transparent">
                  Code
                </span>
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-6 text-sm">
              <a href="#resources" className="text-slate-400 hover:text-lime-300 transition-colors">
                Ресурсы
              </a>
              <a href="#categories" className="text-slate-400 hover:text-lime-300 transition-colors">
                Категории
              </a>
              <a
                href="https://itch.io/game-assets"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-to-r from-blue-600 to-lime-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
              >
                itch.io →
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300 mb-6">
            <span className="inline-block h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
            Школа программирования RCode
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
            Ресурсы для{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-lime-400 bg-clip-text text-transparent">
              GameDev
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400 leading-relaxed mb-8">
            Коллекция бесплатных ассетов, инструментов и учебных материалов для
            учеников школы <strong className="text-white">RCode</strong>. 
            Всё что нужно для разработки игр на{" "}
            <span className="text-blue-300 font-semibold">Unity</span> и{" "}
            <span className="text-lime-300 font-semibold">Construct 2</span>.
          </p>

          {/* Search */}
          <div className="mx-auto max-w-xl relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск ресурсов: 3D модели, звуки, Unity..."
              className="w-full rounded-2xl border border-slate-700/80 bg-slate-900/80 backdrop-blur-sm py-3.5 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-blue-400">{resources.length}</span>
              <span className="text-slate-500">ресурсов</span>
            </div>
            <div className="h-6 w-px bg-slate-700" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-lime-400">{allTags.length}</span>
              <span className="text-slate-500">тегов</span>
            </div>
            <div className="h-6 w-px bg-slate-700" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-cyan-400">100%</span>
              <span className="text-slate-500">бесплатно</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        {/* Categories */}
        <section id="categories" className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer border
                  ${
                    activeCategory === cat.key
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white border-blue-400/50 shadow-lg shadow-blue-500/25"
                      : "bg-slate-800/60 text-slate-300 border-slate-700 hover:border-blue-500/40 hover:text-white"
                  }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                <span
                  className={`ml-1 rounded-full px-2 py-0.5 text-xs ${
                    activeCategory === cat.key
                      ? "bg-white/20 text-white"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {countByCategory(cat.key)}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Tags */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Фильтр по тегам
            </h3>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-blue-400 hover:text-lime-300 transition-colors cursor-pointer"
              >
                ✕ Сбросить фильтры
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <TagBadge
                key={tag}
                tag={tag}
                active={activeTags.includes(tag)}
                onClick={() => toggleTag(tag)}
              />
            ))}
          </div>
        </section>

        {/* Results info */}
        <section id="resources" className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Найдено:{" "}
              <span className="text-white font-bold">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "ресурс" : filtered.length < 5 ? "ресурса" : "ресурсов"}
            </p>
          </div>
        </section>

        {/* Resource Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-slate-300 mb-2">
              Ничего не найдено
            </h3>
            <p className="text-slate-500 mb-4">
              Попробуйте изменить фильтры или поисковый запрос
            </p>
            <button
              onClick={clearFilters}
              className="rounded-full bg-gradient-to-r from-blue-600 to-lime-500 px-6 py-2 text-sm font-bold text-white cursor-pointer hover:shadow-lg hover:shadow-blue-500/25 transition-shadow"
            >
              Сбросить фильтры
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <section className="mt-20 rounded-3xl border border-slate-700/50 bg-gradient-to-br from-blue-600/10 via-slate-800/50 to-lime-500/10 p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-black mb-4">
            Не нашли нужный ресурс?
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-6">
            Сообщите преподавателям школы{" "}
            <strong className="text-lime-300">RCode</strong>, и мы добавим его
            в коллекцию. Мы постоянно обновляем библиотеку ресурсов!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://itch.io/game-assets"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:-translate-y-0.5"
            >
              🎮 Смотреть itch.io
            </a>
            <a
              href="https://kenney.nl/assets"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-lime-500/40 bg-lime-500/10 px-6 py-3 text-sm font-bold text-lime-300 hover:bg-lime-500/20 transition-all hover:-translate-y-0.5"
            >
              🧱 Kenney Assets
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-lime-400">
                <span className="text-xs font-black text-white">R</span>
              </div>
              <span className="text-sm font-bold text-slate-300">
                RCode — Школа программирования
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Собрано с 💚 для учеников RCode • GameDev ресурсы {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
