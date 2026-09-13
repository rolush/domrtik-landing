---
title: "Развёртывание Payload CMS на Beget"
date: 2026-09-11
tags:
  - domtrik
  - session
  - deployment
status: completed
related:
  - "[[knowledge/CURRENT]]"
  - "[[knowledge/decisions/2026-09-11-beget-payload-hosting]]"
---

# Развёртывание Payload CMS на Beget

## Что сделано

- Payload CMS перенесена на Beget и подключена к `https://opt.domtrik.ru/admin`.
- Локальная SQLite-база и медиатека перенесены вместе с production-сборкой.
- Статический лендинг сохранён в корне домена.
- Node.js 20.20.2 подключён к штатному Apache Passenger.

## Изменённые файлы и службы

- Локально: `cms/next.config.ts` — включён standalone-режим Next.js.
- Beget: `/home/d/domtrik/opt.domtrik.ru/app` — production-приложение.
- Beget: `/home/d/domtrik/opt.domtrik.ru/public_html/.htaccess` — Passenger.
- Beget: SSH-доступ аккаунта включён через API.

## Проверки

- production-сборка webpack завершена успешно;
- локальный пакет: админка, API и лендинг отвечают HTTP 200;
- production: корень, `/admin/login`, API globals и `/landing/index.html` отвечают HTTP 200;
- `.env` заблокирован веб-сервером, `cms.db` не найден в публичном каталоге;
- подробные страницы ошибок Passenger отключены.

## Решения

- Принято [[knowledge/decisions/2026-09-11-beget-payload-hosting|решение о совместном размещении лендинга и CMS на Beget]].
- На сервер загружается standalone-сборка, а не полный каталог зависимостей.

## Остаток

- Проверить интерактивный вход администратора и сохранение тестового изменения.
- После проверки отключить API и SSH-доступ, удалить временный SSH-ключ.
- Отдельно настроить SMTP-адаптер Payload, если нужны письма из CMS.

## Риски

- SQLite подходит для текущего небольшого лендинга, но не для параллельной высокой нагрузки.
- Резервная копия хранится в квоте того же аккаунта и не заменяет внешний бэкап.

## Откат

Удалить Passenger-конфигурацию и восстановить каталог сайта из
`/home/d/domtrik/opt.domtrik.ru-before-payload-20260911-182338.tar.gz`.

## Связанные заметки

- [[knowledge/INDEX]]
- [[knowledge/CURRENT]]
- [[README|Спецификация проекта]]
- [[cms/README|Спецификация CMS]]
- [[graphify-out/GRAPH_REPORT|Graphify report]]
