<?php
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
