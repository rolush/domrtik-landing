# Graph Report - domtrik  (2026-08-15)

## Corpus Check
- 42 files · ~790,068 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 235 nodes · 227 edges · 29 communities (22 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e6ebc400`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- payload.config.ts
- devDependencies
- dependencies
- compilerOptions
- package.json
- scripts
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
- not-found.tsx
- AGENTS.md

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `scripts` - 13 edges
3. `Ассеты` - 9 edges
4. `DOMTRIK — Landing Page` - 9 edges
5. `include` - 6 edges
6. `onlyBuiltDependencies` - 4 edges
7. `lib` - 4 edges
8. `Q: Как форма лендинга связана с обработчиком заявок Payload CMS?` - 4 edges
9. `engines` - 3 edges
10. `Leads` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (29 total, 7 thin omitted)

### Community 0 - "payload.config.ts"
Cohesion: 0.06
Nodes (19): Args, GET, OPTIONS, POST, Args, fail(), Leads, submitLead() (+11 more)

### Community 1 - "devDependencies"
Cohesion: 0.07
Nodes (29): devDependencies, eslint, eslint-config-next, jsdom, @playwright/test, prettier, @testing-library/react, tsx (+21 more)

### Community 2 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, cross-env, dotenv, graphql, next, payload, @payloadcms/db-sqlite, @payloadcms/next (+17 more)

### Community 3 - "compilerOptions"
Cohesion: 0.09
Nodes (22): compilerOptions, allowJs, baseUrl, esModuleInterop, incremental, isolatedModules, jsx, lib (+14 more)

### Community 4 - "package.json"
Cohesion: 0.14
Nodes (13): description, engines, node, pnpm, license, name, pnpm, onlyBuiltDependencies (+5 more)

### Community 5 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, dev, devsafe, generate:importmap, generate:types, lint, migrate (+5 more)

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

## Knowledge Gaps
- **125 isolated node(s):** `singleQuote`, `trailingComma`, `printWidth`, `semi`, `eslintConfig` (+120 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `sharp` connect `package.json` to `payload.config.ts`?**
  _High betweenness centrality (0.167) - this node is a cross-community bridge._
- **What connects `singleQuote`, `trailingComma`, `printWidth` to the rest of the system?**
  _125 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `payload.config.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06401137980085349 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._