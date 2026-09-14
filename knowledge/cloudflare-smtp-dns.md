---
title: Ручная настройка SMTP DNS в Cloudflare
date: 2026-09-14
tags:
  - domtrik
  - guide
  - cloudflare
  - smtp
status: active
related:
  - "[[knowledge/decisions/2026-09-14-yandex-smtp]]"
  - "[[knowledge/sessions/2026-09-14-2118-smtp-investigation]]"
---

# Ручная настройка SMTP DNS в Cloudflare

Инструкция нужна, если для `domtrik.ru` решено включить SMTP.BZ или другой
почтовый сервис. Пока лендинг использует Яндекс SMTP, выполнять эти действия не
нужно.

> [!warning] Перед изменением
> Экспортировать DNS-зону Cloudflare или сделать снимки всех записей. Не менять
> `A`, `AAAA`, `MX` и `NS`. Убедиться, что известны все сервисы, отправляющие
> письма от имени `domtrik.ru`.

## Открыть DNS-зону

1. Войти в Cloudflare.
2. Выбрать сайт `domtrik.ru`.
3. Открыть **DNS → Records**.

## Добавить DKIM

Создать запись:

| Поле | Значение |
|---|---|
| Type | `TXT` |
| Name | `smtpbz._domainkey` |
| Content | Полное значение из окна подтверждения домена SMTP.BZ |
| TTL | `Auto` |

DKIM — публичная DNS-запись, но её значение всё равно следует копировать из
актуальной панели SMTP.BZ: сервис может заменить ключ.

## Объединить SPF

У домена должна быть только одна TXT-запись, начинающаяся с `v=spf1`. Несколько
таких записей вызывают ошибку проверки SPF.

На 14 сентября 2026 года для сохранения NIC.RU, Beget и добавления SMTP.BZ был
подготовлен следующий объединённый вариант:

```text
v=spf1 a mx include:dc1.nicmail.ru include:dc2.nicmail.ru include:_spf1.beget.ru include:_spf2.beget.ru include:_spf3.beget.ru include:spf.smtp.bz ~all
```

Перед применением повторно проверить актуальные требования всех почтовых
провайдеров. После проверки удалить прежние TXT-записи `v=spf1` и создать одну:

| Поле | Значение |
|---|---|
| Type | `TXT` |
| Name | `@` |
| Content | Проверенная объединённая строка SPF |
| TTL | `Auto` |

## Добавить статистику SMTP.BZ

Создать запись:

| Поле | Значение |
|---|---|
| Type | `CNAME` |
| Name | `stats` |
| Target | `smtp.bz` |
| Proxy status | `DNS only` — серое облако |
| TTL | `Auto` |

## Проверить

После сохранения подождать распространения DNS и проверить записи:

```bash
dig +short TXT domtrik.ru
dig +short TXT smtpbz._domainkey.domtrik.ru
dig +short CNAME stats.domtrik.ru
```

В результате должна отображаться одна SPF-запись, полный DKIM и CNAME
`stats.domtrik.ru → smtp.bz`. Затем в SMTP.BZ нажать **Проверить наличие
записей**. Если проверка не прошла, повторить через 30–90 минут.

## Откат

1. Удалить добавленные `smtpbz._domainkey` и `stats`.
2. Восстановить SPF из экспорта DNS-зоны.
3. Повторно проверить основной сайт и отправку его почты.

## Безопасность

- Не помещать в DNS пароли SMTP, API-токены и приватные ключи.
- Не публиковать Cloudflare API Token.
- Для CNAME `stats` не включать проксирование Cloudflare.
- Не добавлять вторую отдельную SPF-запись.

## Связанные заметки

- [[knowledge/INDEX]]
- [[knowledge/CURRENT]]
- [[knowledge/decisions/2026-09-14-yandex-smtp]]
- [[knowledge/sessions/2026-09-14-2118-smtp-investigation]]
- [[graphify-out/GRAPH_REPORT|Graphify report]]
