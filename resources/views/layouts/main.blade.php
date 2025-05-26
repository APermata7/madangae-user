<?php
session_start();

// Membuat koneksi database
$dbConnection = new mysqli("localhost", "root", "", "resepkos");
if ($dbConnection->connect_error) {
    die("Connection failed: " . $dbConnection->connect_error);
}

// Autoloader untuk controller dan model
function my_autoloader($class) {
    $paths = [
        "../app/Http/Controllers/$class.php",
        "../app/Models/$class.php"
    ];

    foreach ($paths as $path) {
        if (file_exists($path)) {
            include_once $path;
            return;
        }
    }
}
spl_autoload_register('my_autoloader');

// Fungsi untuk debug ketika controller tidak ditemukan
function debugControllerNotFound($controller) {
    $paths = ["../app/Http/Controllers/$controller.php"];
    echo "Debug: Mencari controller '$controller' di:<br>";
    foreach ($paths as $path) {
        echo "- $path: " . (file_exists($path) ? "✓ Found" : "✗ Not found") . "<br>";
    }
    die("Controller '$controller' tidak ditemukan!");
}

// Jika belum login
if (!isset($_SESSION['username'])) {
    // Tentukan controller dan method
    $controller = isset($_GET['c']) ? $_GET['c'] : 'UserController';
    $method = isset($_GET['m']) ? $_GET['m'] : 'showLoginForm';

    // Hanya izinkan controller dan method tertentu
    $allowedControllers = ['UserController'];
    $allowedMethods = ['showLoginForm', 'login', 'showRegisterForm', 'register'];

    if (in_array($controller, $allowedControllers) && in_array($method, $allowedMethods)) {
        if (!class_exists($controller)) {
            debugControllerNotFound($controller);
        }

        if (method_exists($controller, $method)) {
            $controllerInstance = new $controller($dbConnection);
            $controllerInstance->$method();
        } else {
            echo "Method '$method' tidak ditemukan pada controller '$controller'.<br>";
            echo "Method yang tersedia: " . implode(', ', get_class_methods($controller));
        }
    } else {
        // Default ke login
        if (class_exists('UserController')) {
            $controllerInstance = new UserController($dbConnection);
            $controllerInstance->login();
        } else {
            debugControllerNotFound('UserController');
        }
    }
} else {
    // Sudah login, gunakan controller dan method dari parameter
    $controller = isset($_GET['c']) ? $_GET['c'] : 'MenuController';
    $method = isset($_GET['m']) ? $_GET['m'] : 'home';

    if (!class_exists($controller)) {
        debugControllerNotFound($controller);
    }

    if (method_exists($controller, $method)) {
        $controllerInstance = new $controller($dbConnection);
        $controllerInstance->$method();
    } else {
        echo "Method '$method' tidak ditemukan pada controller '$controller'.<br>";
        echo "Method yang tersedia: " . implode(', ', get_class_methods($controller));
    }
}
?>
