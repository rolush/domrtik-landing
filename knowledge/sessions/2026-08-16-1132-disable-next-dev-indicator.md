---
title: "Отключение индикатора Next.js"
date: "2026-08-16"
tags:
  - domtrik
  - session
  - cms
status: completed
related:
  - "[[knowledge/CURRENT]]"
---

# Отключение индикатора Next.js

## Что сделано

В локальном интерфейсе проекта полностью отключён экранный индикатор Next.js Dev Tools.

## Изменённые файлы и службы

- `cms/next.config.ts`: добавлен `devIndicators: false`.
- Локальный Next/Payload dev-сервер автоматически перезапущен на порту 3000.

## Проверки

- `npx tsc --noEmit` — успешно.
- Лендинг после перезапуска отвечает `HTTP 200`.

## Решения

Использован штатный параметр Next.js 16.3.0; ошибки компиляции и выполнения по-прежнему будут показываться.

## Остаток

Нет.

## Риски

Скрыт только экранный индикатор разработки, а не сами диагностические ошибки.

## Откат

Удалить `devIndicators: false` из `cms/next.config.ts` и перезапустить сервер.

## Связанные заметки

- [[knowledge/INDEX]]
- [[knowledge/CURRENT]]
- [[cms/README|Спецификация CMS]]
- [[graphify-out/GRAPH_REPORT|Graphify report]]
