---
title: "Смена почтового ящика лендинга на support@cadesign.ru"
date: 2026-09-14
tags:
  - domtrik
  - session
  - smtp
status: blocked
related:
  - "[[knowledge/CURRENT]]"
  - "[[knowledge/decisions/2026-09-14-yandex-smtp]]"
  - "[[knowledge/cloudflare-smtp-dns]]"
---

# Смена почтового ящика лендинга на support@cadesign.ru

## Что сделано

- На Beget временно установлены новые логин и пароль приложения Яндекса.
- Выполнена одна контрольная отправка только на `support@cadesign.ru`.
- Яндекс не принял письмо; рабочая конфигурация `rolush@yandex.ru` сразу
  восстановлена, чтобы не оставлять форму недоступной.
- Создана [[knowledge/cloudflare-smtp-dns|инструкция ручной настройки SMTP DNS
  в Cloudflare]].

## Изменённые файлы и службы

- Beget: создана резервная копия
  `config.php.before-support-cadesign-20260914-2156`; production-конфигурация
  восстановлена из неё после неуспешного теста.
- Репозиторий: `knowledge/cloudflare-smtp-dns.md`.

## Проверки

- Новый production-конфиг прошёл проверку синтаксиса PHP 8.3.
- Тест нового ящика завершился HTTP 502 до принятия письма сервером.
- После отката production-конфигурация снова указывает на ранее проверенный
  ящик `rolush@yandex.ru`.

## Решения

- Не оставлять новую SMTP-конфигурацию в production до успешной отправки.
- Повторить проверку после активации пароля приложения Яндекса.

## Остаток

- Через 2–3 часа повторно проверить SMTP-авторизацию `support@cadesign.ru`.
- После успешного теста оставить новый ящик в production и обновить
  [[knowledge/decisions/2026-09-14-yandex-smtp]].

## Риски

- Пароль приложения был передан в переписке; после успешной настройки его
  желательно заменить на новый.
- До повторной проверки письма продолжают уходить через прежний рабочий ящик.

## Откат

Рабочая конфигурация уже восстановлена. Резервная копия перед попыткой смены —
`config.php.before-support-cadesign-20260914-2156`.

## Связанные заметки

- [[knowledge/INDEX]]
- [[knowledge/CURRENT]]
- [[README|Спецификация проекта]]
- [[knowledge/cloudflare-smtp-dns]]
- [[knowledge/decisions/2026-09-14-yandex-smtp]]
- [[knowledge/sessions/2026-09-14-2118-smtp-investigation]]
- [[graphify-out/GRAPH_REPORT|Graphify report]]
