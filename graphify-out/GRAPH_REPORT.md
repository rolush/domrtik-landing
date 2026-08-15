# Graph Report - domtrik  (2026-08-15)

## Corpus Check
- 49 files · ~790,889 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 281 nodes · 266 edges · 34 communities (28 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6ee43d10`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- payload.config.ts
- devDependencies
- dependencies
- compilerOptions
- scripts
- Настройка постоянной проектной памяти
- include
- admin.e2e.spec.ts
- [...slug]/route.ts
- send.php
- .prettierrc.json
- next.config.ts
- DOMTRIK — Landing Page
- Ассеты
- (frontend)/layout.tsx
- eslint.config.mjs
- landing/js/main.js
- js/main.js
- Q: Как форма лендинга связана с обработчиком заявок Payload CMS?
- DOMTRIK Payload CMS
- {{title}}
- AGENTS.md
- Постоянная проектная память Graphify и Obsidian
- Проектная память DOMTRIK
- Текущее состояние
- app.json
- Проектная память

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `scripts` - 13 edges
3. `Настройка постоянной проектной памяти` - 9 edges
4. `{{title}}` - 9 edges
5. `Ассеты` - 9 edges
6. `DOMTRIK — Landing Page` - 9 edges
7. `include` - 6 edges
8. `Проектная память DOMTRIK` - 5 edges
9. `Постоянная проектная память Graphify и Obsidian` - 5 edges
10. `Текущее состояние` - 4 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (34 total, 6 thin omitted)

### Community 0 - "payload.config.ts"
Cohesion: 0.06
Nodes (20): Args, Args, GET, OPTIONS, POST, Args, fail(), Leads (+12 more)

### Community 1 - "devDependencies"
Cohesion: 0.07
Nodes (29): devDependencies, eslint, eslint-config-next, jsdom, @playwright/test, prettier, @testing-library/react, tsx (+21 more)

### Community 2 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, cross-env, dotenv, graphql, next, payload, @payloadcms/db-sqlite, @payloadcms/next (+17 more)

### Community 3 - "compilerOptions"
Cohesion: 0.09
Nodes (22): compilerOptions, allowJs, baseUrl, esModuleInterop, incremental, isolatedModules, jsx, lib (+14 more)

### Community 4 - "scripts"
Cohesion: 0.07
Nodes (26): description, engines, node, pnpm, license, name, pnpm, onlyBuiltDependencies (+18 more)

### Community 5 - "Настройка постоянной проектной памяти"
Cohesion: 0.20
Nodes (9): Изменённые файлы и службы, Настройка постоянной проектной памяти, Остаток, Откат, Проверки, Решения, Риски, Связанные заметки (+1 more)

### Community 6 - "include"
Cohesion: 0.22
Nodes (8): exclude, include, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx

### Community 7 - "admin.e2e.spec.ts"
Cohesion: 0.39
Nodes (5): login(), LoginOptions, cleanupTestUser(), seedTestUser(), testUser

### Community 8 - "[...slug]/route.ts"
Cohesion: 0.29
Nodes (6): DELETE, GET, OPTIONS, PATCH, POST, PUT

### Community 10 - ".prettierrc.json"
Cohesion: 0.40
Nodes (4): printWidth, semi, singleQuote, trailingComma

### Community 11 - "next.config.ts"
Cohesion: 0.50
Nodes (3): dirname, __filename, nextConfig

### Community 12 - "DOMTRIK — Landing Page"
Cohesion: 0.15
Nodes (12): DOMTRIK — Landing Page, Демонстрационный режим, Запуск, Индексирование, Капча, Мобильная версия, Отправка заявок, Принятые решения (+4 more)

### Community 13 - "Ассеты"
Cohesion: 0.18
Nodes (10): Ассеты, Видео, Декоративные окружности, Иконки, Неиспользуемые файлы, Собранные иконки, Фавикон, Фотографии (+2 more)

### Community 24 - "Q: Как форма лендинга связана с обработчиком заявок Payload CMS?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Как форма лендинга связана с обработчиком заявок Payload CMS?, Source Nodes

### Community 25 - "DOMTRIK Payload CMS"
Cohesion: 0.50
Nodes (3): DOMTRIK Payload CMS, Локальный запуск, Редактируемый контент

### Community 26 - "{{title}}"
Cohesion: 0.20
Nodes (9): {{title}}, Изменённые файлы и службы, Остаток, Откат, Проверки, Решения, Риски, Связанные заметки (+1 more)

### Community 29 - "Постоянная проектная память Graphify и Obsidian"
Cohesion: 0.33
Nodes (5): Контекст, Последствия, Постоянная проектная память Graphify и Obsidian, Решение, Связи

### Community 30 - "Проектная память DOMTRIK"
Cohesion: 0.33
Nodes (5): Начать отсюда, Проектная память DOMTRIK, Рабочие каталоги, Решения, Сессии

### Community 31 - "Текущее состояние"
Cohesion: 0.40
Nodes (4): Активный контекст, Известные риски, Следующие действия, Текущее состояние

### Community 32 - "app.json"
Cohesion: 0.40
Nodes (4): alwaysUpdateLinks, attachmentFolderPath, newLinkFormat, useMarkdownLinks

### Community 33 - "Проектная память"
Cohesion: 0.50
Nodes (3): В конце сессии, В начале каждой сессии, Проектная память

## Knowledge Gaps
- **158 isolated node(s):** `alwaysUpdateLinks`, `attachmentFolderPath`, `newLinkFormat`, `useMarkdownLinks`, `В начале каждой сессии` (+153 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `sharp` connect `scripts` to `payload.config.ts`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **What connects `alwaysUpdateLinks`, `attachmentFolderPath`, `newLinkFormat` to the rest of the system?**
  _158 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `payload.config.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.056910569105691054 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._