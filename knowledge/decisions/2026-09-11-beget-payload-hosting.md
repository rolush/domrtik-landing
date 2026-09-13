---
title: Payload CMS размещается на Beget вместе с лендингом
date: 2026-09-11
tags:
  - domtrik
  - decision
  - deployment
status: accepted
---

# Payload CMS размещается на Beget вместе с лендингом

## Решение

Production-окружение лендинга и Payload CMS размещается на виртуальном хостинге
Beget для `opt.domtrik.ru`. Статический лендинг остаётся в `public_html`, а
standalone-сборка CMS запускается через штатный Apache Passenger из соседнего
каталога `app`.

## Причины

- домен, SSL и текущий лендинг уже обслуживаются Beget;
- Passenger является штатным способом запуска Node.js на этом тарифе;
- standalone-сборка не требует хранения полного `node_modules` и экономит квоту;
- SQLite и медиатека находятся вне публичного каталога.

## Ограничения

- Node.js расположен внутри изолированного каталога приложения, поскольку
  Passenger не имеет доступа к пользовательскому `~/.local`;
- SMTP-адаптер Payload не настроен;
- обновление CMS требует новой standalone-сборки и перезапуска Passenger через
  `app/tmp/restart.txt`.

## Связанные заметки

- [[knowledge/sessions/2026-09-11-1835-beget-payload-deployment]]
- [[knowledge/CURRENT]]
- [[cms/README|Спецификация CMS]]
- [[graphify-out/GRAPH_REPORT|Graphify report]]
