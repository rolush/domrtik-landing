# Graph Report - domtrik  (2026-09-14)

## Corpus Check
- 65 files · ~792,017 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 396 nodes · 370 edges · 56 communities (45 shown, 11 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b3a7476c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- payload.config.ts
- devDependencies
- scripts
- dependencies
- compilerOptions
- DOMTRIK — Landing Page
- Ассеты
- Настройка постоянной проектной памяти
- Русификация и брендинг админки
- Крупные миниатюры изображений в админке
- Отключение индикатора Next.js
- Существующие изображения и WebP в админке
- Согласие на обработку персональных данных
- Редактируемые юридические страницы
- {{title}}
- Диагностика SMTP для opt.domtrik.ru
- admin.e2e.spec.ts
- [...slug]/route.ts
- Развёртывание Payload CMS на Beget
- Постоянная проектная память Graphify и Obsidian
- Проектная память DOMTRIK
- send.php
- .prettierrc.json
- Q: Как форма лендинга связана с обработчиком заявок Payload CMS?
- Текущее состояние
- app.json
- Проектная память
- next.config.ts
- DOMTRIK Payload CMS
- seed-legal-pages.ts
- (frontend)/layout.tsx
- cms/AGENTS.md
- eslint.config.mjs
- landing/js/main.js
- js/main.js
- Payload CMS размещается на Beget вместе с лендингом
- (payload)/layout.tsx
- HomePage.ts
- Яндекс SMTP для писем публичного лендинга
- import-landing-media.ts
- Leads.ts
- not-found.tsx
- [[...segments]]/page.tsx
- graphql/route.ts
- graphql-playground/route.ts

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `scripts` - 15 edges
3. `Диагностика SMTP для opt.domtrik.ru` - 9 edges
4. `Развёртывание Payload CMS на Beget` - 9 edges
5. `Ассеты` - 9 edges
6. `DOMTRIK — Landing Page` - 9 edges
7. `Настройка постоянной проектной памяти` - 9 edges
8. `Русификация и брендинг админки` - 9 edges
9. `Крупные миниатюры изображений в админке` - 9 edges
10. `Отключение индикатора Next.js` - 9 edges

## Surprising Connections (you probably didn't know these)
- `onlyBuiltDependencies` --extends--> `sharp`  [EXTRACTED]
  cms/package.json → cms/package.json  _Bridges community 2 → community 0_

## Import Cycles
- None detected.

## Communities (56 total, 11 thin omitted)

### Community 0 - "payload.config.ts"
Cohesion: 0.18
Nodes (8): Media, Users, LegalPages, SiteSettings, dirname, domtrikRu, filename, sharp

### Community 1 - "devDependencies"
Cohesion: 0.07
Nodes (29): devDependencies, eslint, eslint-config-next, jsdom, @playwright/test, prettier, @testing-library/react, tsx (+21 more)

### Community 2 - "scripts"
Cohesion: 0.07
Nodes (27): description, engines, node, pnpm, license, name, pnpm, onlyBuiltDependencies (+19 more)

### Community 3 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, cross-env, dotenv, graphql, next, payload, @payloadcms/db-sqlite, @payloadcms/next (+17 more)

### Community 4 - "compilerOptions"
Cohesion: 0.06
Nodes (30): compilerOptions, allowJs, baseUrl, esModuleInterop, incremental, isolatedModules, jsx, lib (+22 more)

### Community 5 - "DOMTRIK — Landing Page"
Cohesion: 0.15
Nodes (12): DOMTRIK — Landing Page, Демонстрационный режим, Запуск, Индексирование, Капча, Мобильная версия, Отправка заявок, Принятые решения (+4 more)

### Community 6 - "Ассеты"
Cohesion: 0.18
Nodes (10): Ассеты, Видео, Декоративные окружности, Иконки, Неиспользуемые файлы, Собранные иконки, Фавикон, Фотографии (+2 more)

### Community 7 - "Настройка постоянной проектной памяти"
Cohesion: 0.20
Nodes (9): Изменённые файлы и службы, Настройка постоянной проектной памяти, Остаток, Откат, Проверки, Решения, Риски, Связанные заметки (+1 more)

### Community 8 - "Русификация и брендинг админки"
Cohesion: 0.20
Nodes (9): Изменённые файлы и службы, Остаток, Откат, Проверки, Решения, Риски, Русификация и брендинг админки, Связанные заметки (+1 more)

### Community 9 - "Крупные миниатюры изображений в админке"
Cohesion: 0.20
Nodes (9): Изменённые файлы и службы, Крупные миниатюры изображений в админке, Остаток, Откат, Проверки, Решения, Риски, Связанные заметки (+1 more)

### Community 10 - "Отключение индикатора Next.js"
Cohesion: 0.20
Nodes (9): Изменённые файлы и службы, Остаток, Откат, Отключение индикатора Next.js, Проверки, Решения, Риски, Связанные заметки (+1 more)

### Community 11 - "Существующие изображения и WebP в админке"
Cohesion: 0.20
Nodes (9): Изменённые файлы и службы, Остаток, Откат, Проверки, Решения, Риски, Связанные заметки, Существующие изображения и WebP в админке (+1 more)

### Community 12 - "Согласие на обработку персональных данных"
Cohesion: 0.20
Nodes (9): Изменённые файлы и службы, Остаток, Откат, Проверки, Решения, Риски, Связанные заметки, Согласие на обработку персональных данных (+1 more)

### Community 13 - "Редактируемые юридические страницы"
Cohesion: 0.20
Nodes (9): Изменённые файлы и службы, Остаток, Откат, Проверки, Редактируемые юридические страницы, Решения, Риски, Связанные заметки (+1 more)

### Community 14 - "{{title}}"
Cohesion: 0.20
Nodes (9): {{title}}, Изменённые файлы и службы, Остаток, Откат, Проверки, Решения, Риски, Связанные заметки (+1 more)

### Community 15 - "Диагностика SMTP для opt.domtrik.ru"
Cohesion: 0.20
Nodes (9): Диагностика SMTP для opt.domtrik.ru, Изменённые файлы и службы, Остаток, Откат, Проверки, Решения, Риски, Связанные заметки (+1 more)

### Community 16 - "admin.e2e.spec.ts"
Cohesion: 0.39
Nodes (5): login(), LoginOptions, cleanupTestUser(), seedTestUser(), testUser

### Community 17 - "[...slug]/route.ts"
Cohesion: 0.29
Nodes (6): DELETE, GET, OPTIONS, PATCH, POST, PUT

### Community 18 - "Развёртывание Payload CMS на Beget"
Cohesion: 0.20
Nodes (9): Изменённые файлы и службы, Остаток, Откат, Проверки, Развёртывание Payload CMS на Beget, Решения, Риски, Связанные заметки (+1 more)

### Community 19 - "Постоянная проектная память Graphify и Obsidian"
Cohesion: 0.33
Nodes (5): Контекст, Последствия, Постоянная проектная память Graphify и Obsidian, Решение, Связи

### Community 20 - "Проектная память DOMTRIK"
Cohesion: 0.33
Nodes (5): Начать отсюда, Проектная память DOMTRIK, Рабочие каталоги, Решения, Сессии

### Community 22 - ".prettierrc.json"
Cohesion: 0.40
Nodes (4): printWidth, semi, singleQuote, trailingComma

### Community 23 - "Q: Как форма лендинга связана с обработчиком заявок Payload CMS?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Как форма лендинга связана с обработчиком заявок Payload CMS?, Source Nodes

### Community 24 - "Текущее состояние"
Cohesion: 0.40
Nodes (4): Активный контекст, Известные риски, Следующие действия, Текущее состояние

### Community 25 - "app.json"
Cohesion: 0.40
Nodes (4): alwaysUpdateLinks, attachmentFolderPath, newLinkFormat, useMarkdownLinks

### Community 26 - "Проектная память"
Cohesion: 0.50
Nodes (3): В конце сессии, В начале каждой сессии, Проектная память

### Community 27 - "next.config.ts"
Cohesion: 0.50
Nodes (3): dirname, __filename, nextConfig

### Community 28 - "DOMTRIK Payload CMS"
Cohesion: 0.50
Nodes (3): DOMTRIK Payload CMS, Локальный запуск, Редактируемый контент

### Community 29 - "seed-legal-pages.ts"
Cohesion: 0.33
Nodes (3): dirname, { JSDOM }, landingDir

### Community 45 - "Payload CMS размещается на Beget вместе с лендингом"
Cohesion: 0.33
Nodes (5): Payload CMS размещается на Beget вместе с лендингом, Ограничения, Причины, Решение, Связанные заметки

### Community 47 - "HomePage.ts"
Cohesion: 0.29
Nodes (6): benefits, categories, faq, hits, HomePage, reasons

### Community 48 - "Яндекс SMTP для писем публичного лендинга"
Cohesion: 0.29
Nodes (6): Ограничения, Откат, Причины, Решение, Связанные заметки, Яндекс SMTP для писем публичного лендинга

### Community 49 - "import-landing-media.ts"
Cohesion: 0.33
Nodes (5): assetsDir, categories, certificates, dirname, hits

### Community 50 - "Leads.ts"
Cohesion: 0.60
Nodes (3): fail(), Leads, submitLead()

## Knowledge Gaps
- **242 isolated node(s):** `Активный контекст`, `Следующие действия`, `Известные риски`, `Начать отсюда`, `Решения` (+237 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `onlyBuiltDependencies` connect `scripts` to `payload.config.ts`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `sharp` connect `payload.config.ts` to `scripts`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **What connects `Активный контекст`, `Следующие действия`, `Известные риски` to the rest of the system?**
  _242 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._