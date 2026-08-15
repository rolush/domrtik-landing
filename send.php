<?php
/**
 * Приём заявок с лендинга и отправка письма через SMTP.
 *
 * Настройки лежат в config.php рядом с этим файлом — он в .gitignore,
 * пароль в репозиторий не попадает. Шаблон: config.example.php.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

const MAX_PER_HOUR = 5;      // заявок с одного IP в час
const MIN_FILL_SECONDS = 3;  // быстрее человек форму не заполнит

function fail(string $message, int $status = 400, array $fields = []): never
{
    http_response_code($status);
    echo json_encode(['ok' => false, 'error' => $message, 'fields' => $fields], JSON_UNESCAPED_UNICODE);
    exit;
}

function clean(string $value): string
{
    // переводы строк в заголовках письма — это подстановка чужих заголовков
    return trim(str_replace(["\r", "\n", "\0"], '', $value));
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    fail('Метод не поддерживается', 405);
}

$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    error_log('send.php: нет config.php');
    fail('Отправка не настроена', 500);
}
$config = require $configPath;

/* --- защита от ботов --- */

if (clean((string) ($_POST['company'] ?? '')) !== '') {
    // поле-ловушка скрыто от людей, заполнить его мог только бот
    echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

$startedAt = (int) ($_POST['ts'] ?? 0);
if ($startedAt > 0 && (time() - intdiv($startedAt, 1000)) < MIN_FILL_SECONDS) {
    fail('Слишком быстрая отправка, попробуйте ещё раз', 429);
}

$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$logPath = sys_get_temp_dir() . '/domtrik-rate-' . md5($ip) . '.json';

/* --- проверка полей, теми же правилами, что и на клиенте --- */

$name = clean((string) ($_POST['name'] ?? ''));
$email = clean((string) ($_POST['email'] ?? ''));
$phone = clean((string) ($_POST['phone'] ?? ''));
$source = clean((string) ($_POST['source'] ?? 'Форма на сайте'));
$agree = ($_POST['agree'] ?? '') !== '';

$errors = [];
if (mb_strlen($name) < 2) {
    $errors['name'] = 'Укажите имя';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)
    || !preg_match('/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/', $email)) {
    $errors['email'] = 'Проверьте адрес почты — например, name@mail.ru';
}
// скобки, пробелы и дефисы в номере игнорируем, дальше нужен +7 или 8 и ровно 10 цифр
if (!preg_match('/^(\+7|8)\d{10}$/', preg_replace('/[\s()\-]/u', '', $phone))) {
    $errors['phone'] = 'Телефон в формате +7 999 123 45 67 или 8 999 123 45 67';
}
if (!$agree) {
    $errors['agree'] = 'Подтвердите согласие на обработку данных';
}
if ($errors) {
    fail('Проверьте заполнение полей', 422, $errors);
}

/* --- капча --- */

// пока ключ сервера не прописан, проверка пропускается и формы работают как раньше
if (($config['captcha_secret'] ?? '') !== '') {
    $token = clean((string) ($_POST['smart-token'] ?? ''));
    if ($token === '' || !captcha_passed((string) $config['captcha_secret'], $token, $ip)) {
        fail('Проверка не пройдена. Обновите страницу и попробуйте ещё раз.', 403);
    }
}

/* --- письмо --- */

$subject = 'Заявка с сайта DOMTRIK — ' . $source;
$body = implode("\r\n", [
    'Имя: ' . $name,
    'E-mail: ' . $email,
    'Телефон: ' . $phone,
    'Форма: ' . $source,
    'Дата: ' . date('d.m.Y H:i:s'),
    'IP: ' . $ip,
]);

$headers = [
    'From: ' . sprintf('=?UTF-8?B?%s?= <%s>', base64_encode('Сайт DOMTRIK'), $config['smtp_user']),
    'Reply-To: ' . sprintf('=?UTF-8?B?%s?= <%s>', base64_encode($name), $email),
    'To: ' . $config['mail_to'],
    'Subject: =?UTF-8?B?' . base64_encode($subject) . '?=',
    'Date: ' . date('r'),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
];

// считаем попытку, а не успех: иначе неудачные отправки не ограничиваются вовсе
rate_limit($logPath);

try {
    smtp_send($config, $config['mail_to'], implode("\r\n", $headers) . "\r\n\r\n" . chunk_split(base64_encode($body)));
} catch (Throwable $e) {
    error_log('send.php: ' . $e->getMessage());
    fail('Не удалось отправить заявку. Позвоните нам или напишите на почту.', 502);
}

echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);

function rate_limit(string $path): void
{
    $file = fopen($path, 'c+');
    if ($file === false || !flock($file, LOCK_EX)) {
        fail('Не удалось проверить ограничение отправки', 500);
    }

    $hits = (array) json_decode((string) stream_get_contents($file), true);
    $hits = array_values(array_filter($hits, static fn ($t): bool => (int) $t > time() - 3600));
    if (count($hits) >= MAX_PER_HOUR) {
        fail('Слишком много заявок с одного адреса, попробуйте позже', 429);
    }

    $hits[] = time();
    rewind($file);
    ftruncate($file, 0);
    fwrite($file, json_encode($hits));
    flock($file, LOCK_UN);
    fclose($file);
}

/**
 * Спрашивает у Яндекса, настоящий ли посетитель прислал заявку.
 *
 * Если сервер капчи не ответил, считаем проверку пройденной: недоступность
 * чужого сервиса не повод терять заявку. В журнал при этом пишем.
 */
function captcha_passed(string $secret, string $token, string $ip): bool
{
    $url = 'https://smartcaptcha.yandexcloud.net/validate?'
        . http_build_query(['secret' => $secret, 'token' => $token, 'ip' => $ip]);

    $context = stream_context_create(['http' => ['timeout' => 5, 'ignore_errors' => true]]);
    $answer = @file_get_contents($url, false, $context);

    if ($answer === false) {
        error_log('send.php: капча не ответила, заявка пропущена без проверки');
        return true;
    }

    $result = json_decode($answer, true);
    if (!is_array($result)) {
        error_log('send.php: капча ответила неразборчиво: ' . $answer);
        return true;
    }

    return ($result['status'] ?? '') === 'ok';
}

/**
 * Минимальный SMTP-клиент: подключение, AUTH LOGIN, отправка одного письма.
 */
function smtp_send(array $config, string $to, string $message): void
{
    $socket = @stream_socket_client(
        sprintf('%s://%s:%d', $config['smtp_secure'] === 'ssl' ? 'ssl' : 'tcp', $config['smtp_host'], $config['smtp_port']),
        $errno,
        $errstr,
        15,
        STREAM_CLIENT_CONNECT
    );
    if (!$socket) {
        throw new RuntimeException("не удалось подключиться к SMTP: $errstr ($errno)");
    }
    stream_set_timeout($socket, 15);

    $read = static function () use ($socket): array {
        $lines = [];
        do {
            $line = fgets($socket, 1024);
            if ($line === false) {
                throw new RuntimeException('SMTP не ответил');
            }
            $lines[] = rtrim($line);
            // в многострочном ответе после кода стоит дефис, в последней строке — пробел
        } while (isset($line[3]) && $line[3] === '-');
        return [(int) substr(end($lines), 0, 3), implode(' | ', $lines)];
    };

    $say = static function (string $command, int ...$expected) use ($socket, $read): void {
        fwrite($socket, $command . "\r\n");
        [$code, $text] = $read();
        if (!in_array($code, $expected, true)) {
            throw new RuntimeException("SMTP ответил «$text» на «" . explode(' ', $command)[0] . '»');
        }
    };

    [$code, $text] = $read();
    if ($code !== 220) {
        throw new RuntimeException("SMTP поздоровался как «$text»");
    }

    $host = $config['smtp_host'];
    $say('EHLO ' . $host, 250);

    if ($config['smtp_secure'] === 'tls') {
        $say('STARTTLS', 220);
        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            throw new RuntimeException('не удалось включить TLS');
        }
        $say('EHLO ' . $host, 250);
    }

    $say('AUTH LOGIN', 334);
    $say(base64_encode($config['smtp_user']), 334);
    $say(base64_encode($config['smtp_pass']), 235);
    $say('MAIL FROM:<' . $config['smtp_user'] . '>', 250);
    $say('RCPT TO:<' . $to . '>', 250, 251);
    $say('DATA', 354);

    // точка в начале строки завершает данные — экранируем её
    fwrite($socket, preg_replace('/^\./m', '..', $message) . "\r\n.\r\n");
    [$code, $text] = $read();
    if ($code !== 250) {
        throw new RuntimeException("SMTP не принял письмо: «$text»");
    }

    $say('QUIT', 221);
    fclose($socket);
}
