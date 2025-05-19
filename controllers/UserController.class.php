<?php
include_once 'models/UserModel.class.php';
include 'header.php';

class UserController
{
    private $model;

    public function __construct($dbConnection) {
        $this->model = new UserModel($dbConnection);
    }

    public function registerUser() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $username = $_POST['username'];
            $password = $_POST['password'];

            $result = $this->model->register($username, $password);

            if ($result === true) {
                header("Location: index.php?c=MenuController");  
                exit;
            } else {
                // Kirim pesan error ke tampilan
                $error_message = $result;
                include 'views/user/register.php';
                exit;
            }
        } else {
            include 'views/user/register.php'; 
            // Menampilkan form jika request bukan POST
        }
    }

    public function loginUser() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $username = $_POST['username'];
            $password = $_POST['password'];

            $result = $this->model->login($username, $password);

            if ($result === true) {
                header("Location: index.php?c=MenuController&m=listMenus");  // Redirect to the menu list after login
                exit;
            } else {
                // Kirim pesan error ke tampilan
                $error_message = $result; 
                // Menyimpan pesan error jika login gagal
                include 'views/user/login.php';
                exit;
            }
        } else {
            include 'views/user/login.php'; 
            // Menampilkan form jika request bukan POST
        }
    }

    public function logoutUser() {
        session_start(); 
        if (isset($_SESSION['username'])) {
            unset($_SESSION['username']);
            session_destroy();
        }
        header('Location: index.php?c=UserController&m=loginUser'); 
        exit;
    }
}
include 'footer.php';
