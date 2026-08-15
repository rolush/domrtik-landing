---
title: Настройка постоянной проектной памяти
date: 2026-08-15T22:33:04+03:00
tags:
  - domtrik
  - session
  - graphify
  - obsidian
status: completed
related:
  - "[[knowledge/decisions/2026-08-15-project-memory]]"
  - "[[graphify-out/GRAPH_REPORT]]"
---

# Настройка постоянной проектной памяти

## Что сделано

- Построен первичный Graphify-граф кода без внешней LLM.
- Установлены штатные Graphify Git-hooks и merge driver.
- Корень проекта подготовлен как Obsidian vault, создана структура `knowledge/`.
- Добавлен обязательный протокол начала и завершения сессий в [[AGENTS]].

## Изменённые файлы и службы

- `.graphifyignore`, `.obsidian/app.json`, `AGENTS.md`.
- `graphify-out/graph.json`, `graphify-out/GRAPH_REPORT.md`, `graphify-out/graph.html`.
- `knowledge/` и локальные `.git/hooks/post-commit`, `.git/hooks/post-checkout`.
- systemd-службы не создавались.

## Проверки

- Graphify query подтвердил регистрацию `Leads` и обработчика `submitLead`.
- Временный TypeScript-модуль автоматически добавился в граф после коммита и
  исчез после удаления; тестовая Git-ветка удалена.
- Git hook имеет статус `installed`, merge driver зарегистрирован.

## Решения

- Принято [[knowledge/decisions/2026-08-15-project-memory|решение о проектной памяти]].

## Остаток

- Для документов при необходимости выполнить отдельное семантическое обновление.
- SMTP и черновики Payload остаются отдельным продуктовым этапом.

## Риски

- Диагностика первичного графа: 61 dangling-связь и одна схлопнутая параллельная
  связь. Основные исходники индексируются, но динамические browser-связи могут
  потребовать ручной проверки.
- Obsidian CLI не найден в `PATH`; vault проверяется как файловая структура и
  может быть открыт установленным приложением Obsidian.

## Откат

- `graphify hook uninstall` удалит hooks и merge driver.
- Удаление `.obsidian/`, `knowledge/`, `graphify-out/`, `.graphifyignore` и
  добавленного раздела `AGENTS.md` вернёт проект к прежнему состоянию.

## Связанные заметки

- [[knowledge/INDEX]]
- [[knowledge/CURRENT]]
- [[README|Спецификация лендинга]]
- [[cms/README|Спецификация CMS]]
- [[graphify-out/GRAPH_REPORT|Graphify report]]
