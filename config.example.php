<?php
/**
 * Скопируйте этот файл рядом под именем config.php и подставьте пароль приложения.
 * config.php в .gitignore — в репозиторий он не попадёт.
 */

return [
    // куда приходят заявки
    'mail_to' => 'rabidosus@gmail.com',

    // ящик, от которого уходят письма
    'smtp_host' => 'smtp.yandex.ru',
    'smtp_port' => 465,
    'smtp_secure' => 'ssl',            // 'ssl' для порта 465, 'tls' для 587
    'smtp_user' => 'rolush@yandex.ru',
    'smtp_pass' => 'ПАРОЛЬ_ПРИЛОЖЕНИЯ', // Яндекс ID → Безопасность → Пароли приложений → Почта

    // Ключ сервера от SmartCaptcha (начинается с «ysc2_»). Пока пусто —
    // проверка не выполняется. Парный ключ клиента — в js/main.js.
    'captcha_secret' => '',
];
