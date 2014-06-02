<?php
// File Name: proxy.php
if (!isset($_GET['url'])) die();
$url = urldecode($_GET['url']);
$url = 'http://' . str_replace('http://', '', $url); // Avoid accessing the file system

//созлаём контекст для подключения к сайту
    $context = stream_context_create(array(
        'http' => array( // протокол запроса
            'method' => 'GET', // метод запроса
            'header' => 'Api-Key: 53372fc492730ac02e30b6b0', // эмулируем подключение со скрипта для получения JSON строки
        ),
    ));

    // тут мы получаем строку
    $content = file_get_contents(
        $file = $url,
        $use_include_path = false,
        $context);

        echo $content;