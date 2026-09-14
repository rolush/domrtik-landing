---
title: "Смена почтового ящика лендинга на support@cadesign.ru"
date: 2026-09-14
tags:
  - domtrik
  - session
  - smtp
status: completed
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
- После выпуска нового пароля приложения повторная настройка завершена:
  отправитель и получатель production-формы — `support@cadesign.ru`.
- Контрольное письмо принято Яндекс SMTP.
- Создана [[knowledge/cloudflare-smtp-dns|инструкция ручной настройки SMTP DNS
  в Cloudflare]].

## Изменённые файлы и службы

- Beget: создана резервная копия
  `config.php.before-support-cadesign-20260914-2156`; production-конфигурация
  восстановлена из неё после неуспешного теста.
- Beget: создана резервная копия
  `config.php.before-support-retry-20260914-2206`; после успешного теста в
  production оставлен новый ящик.
- Репозиторий: `knowledge/cloudflare-smtp-dns.md`.

## Проверки

- Новый production-конфиг прошёл проверку синтаксиса PHP 8.3.
- Тест нового ящика завершился HTTP 502 до принятия письма сервером.
- После отката production-конфигурация снова указывает на ранее проверенный
  ящик `rolush@yandex.ru`.
- Повторная отправка с новым паролем завершилась `ok: true`.
- Production-конфигурация указывает на `support@cadesign.ru`, имеет права `600`.
- Главная страница, форма и `/admin/login` отвечают HTTP 200.

## Решения

- Не оставлять новую SMTP-конфигурацию в production до успешной отправки.
- Оставить новую SMTP-конфигурацию только после успешного теста; условие
  выполнено.

## Остаток

- Проверить контрольное письмо в папках «Входящие» и «Спам» нового ящика.

## Риски

- Пароль приложения был передан в переписке; после успешной настройки его
  желательно заменить на новый.
- До повторной проверки письма продолжают уходить через прежний рабочий ящик.

## Откат

Восстановить `config.php` из
`config.php.before-support-retry-20260914-2206`; это вернёт предыдущий рабочий
ящик.

## Связанные заметки

- [[knowledge/INDEX]]
- [[knowledge/CURRENT]]
- [[README|Спецификация проекта]]
- [[knowledge/cloudflare-smtp-dns]]
- [[knowledge/decisions/2026-09-14-yandex-smtp]]
- [[knowledge/sessions/2026-09-14-2118-smtp-investigation]]
- [[graphify-out/GRAPH_REPORT|Graphify report]]
