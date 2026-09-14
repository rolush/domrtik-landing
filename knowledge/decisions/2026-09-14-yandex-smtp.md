---
title: Яндекс SMTP для писем публичного лендинга
date: 2026-09-14
tags:
  - domtrik
  - decision
  - smtp
status: accepted
---

# Яндекс SMTP для писем публичного лендинга

## Решение

Публичная форма `opt.domtrik.ru` отправляет письма через Яндекс SMTP из
`send.php`. Отправитель и получатель настроены на `support@cadesign.ru`.
Пароль приложения хранится только в закрытом production-файле `config.php`,
который исключён из Git.

## Причины

- нет доступа к DNS-зоне Cloudflare для подтверждения SMTP.BZ;
- отправка не требует изменений SPF, DKIM, MX или основного сайта;
- отдельный пароль приложения можно отозвать без смены основного пароля;
- существующая реализация `send.php` уже поддерживает SSL SMTP.

## Ограничения

- решение относится к публичному PHP-обработчику лендинга;
- системные письма Payload CMS этим решением не настраиваются;
- SMTP.BZ и добавленный там неактивный домен не используются.

## Откат

Восстановить production-конфигурацию из
`config.php.before-support-retry-20260914-2206` и отозвать пароль приложения в
Яндекс ID.

## Связанные заметки

- [[knowledge/sessions/2026-09-14-2118-smtp-investigation]]
- [[knowledge/decisions/2026-09-11-beget-payload-hosting]]
- [[knowledge/CURRENT]]
- [[graphify-out/GRAPH_REPORT|Graphify report]]
