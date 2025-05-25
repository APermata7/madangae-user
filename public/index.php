<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());
//
session_start();

// Membuat koneksi database
$dbConnection = new mysqli("localhost", "root", "", "resepkos");
if ($dbConnection->connect_error) {
    die("Connection failed: " . $dbConnection->connect_error);
}

// Autoloader untuk otomatis memuat kelas controller
function my_autoloader($class) {
    if (file_exists("controllers/$class.class.php")) {
        include "controllers/$class.class.php";
    }
}
spl_autoload_register('my_autoloader');

// Menentukan controller dan method, dengan validasi input
$controller = isset($_GET['c']) ? $_GET['c']  : 'MenuController';
$method = isset($_GET['m']) ? $_GET['m'] : 'home';

// Mengecek apakah controller dan method valid
if (class_exists($controller) && method_exists($controller, $method)) {
    // Membuat objek controller dan memanggil method yang sesuai
    (new $controller($dbConnection))->$method($_GET);
} else {
    echo "Controller atau method tidak ditemukan.";
}
?>