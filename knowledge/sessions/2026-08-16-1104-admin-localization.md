---
title: "Русификация и брендинг админки"
date: "2026-08-16"
tags:
  - domtrik
  - session
  - cms
status: completed
related:
  - "[[knowledge/CURRENT]]"
  - "[[cms/README|Спецификация CMS]]"
---

# Русификация и брендинг админки

## Что сделано

- Админка переведена на штатную русскую локаль Payload.
- Название, метаданные, логотип и favicon заменены на DOMTRIK.
- Сохранено написание `E-mail`, принятое на лендинге.
- Русские названия добавлены пользователям, медиафайлам и строкам массивов.
- Интерфейс получил шрифт Vela Sans, оранжевые основные кнопки и скругления сайта.

## Изменённые файлы и службы

- `cms/src/payload.config.ts`
- `cms/src/components/Branding.tsx`
- `cms/src/app/(payload)/custom.scss`
- `cms/src/app/(payload)/admin/importMap.js`
- `cms/src/collections/Users.ts`
- `cms/src/collections/Media.ts`
- `cms/src/globals/SiteSettings.ts`
- `cms/src/globals/HomePage.ts`
- Локальный Next/Payload dev-сервер на порту 3000 подхватил изменения.

## Проверки

- `npx tsc --noEmit` — успешно.
- `npm run lint` — ошибок нет; осталось 9 прежних предупреждений в служебных и тестовых файлах.
- Impeccable detector — замечаний нет.
- `/admin/login`, логотип и favicon отвечают успешно; HTML имеет `lang="ru"`, заголовок `Войти — DOMTRIK` и русские метаданные.

## Решения

- Использована встроенная локаль `ru`, без собственного слоя переводов и подмены DOM.
- Для брендинга использованы существующие SVG и шрифты лендинга.
- Схема данных и имена API-полей не менялись; русифицированы только административные подписи.

## Остаток

- После входа вручную просмотреть редкие экраны Payload, которые не доступны без авторизованной сессии.

## Риски

- Качество отдельных формулировок зависит от встроенного русского словаря Payload 3.88.0.
- Семантический граф документов требует обновления; внешний LLM не подключался.

## Откат

Вернуть перечисленные файлы к предыдущей версии и удалить `cms/src/components/Branding.tsx`, затем снова выполнить `npm run generate:importmap`.

## Связанные заметки

- [[knowledge/INDEX]]
- [[knowledge/CURRENT]]
- [[cms/README|Спецификация CMS]]
- [[graphify-out/GRAPH_REPORT|Graphify report]]
