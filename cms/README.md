# DOMTRIK Payload CMS

## Локальный запуск

```bash
cp .env.example .env
npm install
npm run dev
```

- Админка: <http://localhost:3000/admin>
- CMS-превью лендинга: <http://localhost:3000/landing/index.html>
- API настроек: <http://localhost:3000/api/globals/site-settings>
- API главной страницы: <http://localhost:3000/api/globals/home-page>

SQLite хранится в `cms.db`. База, `.env`, загруженные медиа, `.next` и `node_modules`
исключены из Git.

## Редактируемый контент

- «Настройки сайта»: email, телефоны и ссылка MAX.
- «Главная страница»: первый экран, категории продукции и хиты продаж.
- «Media»: изображения с обязательным alt-текстом.

Лендинг сохраняет исходный контент, если API временно недоступен. Черновики и история
версий пока отключены: для существующей SQLite-базы им нужна отдельная миграция.
Отправку PHP-форм проверяйте на исходном лендинге: статическое CMS-превью не исполняет `send.php`.
