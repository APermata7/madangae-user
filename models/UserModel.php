<?php

class UserModel {
    protected $conn;

    public function __construct($dbConnection) {
        $this->conn = $dbConnection;
    }

    public function register($username, $password) {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            return "Username sudah digunakan!";
        }

        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $this->conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $username, $hashedPassword);

        if ($stmt->execute()) {
            return true; 
        } else {
            return "Terjadi kesalahan saat registrasi.";
        }
    }

    public function login($username, $password) {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                session_start();
                $_SESSION['username'] = $username;
                return true; 
            }
            return "Password salah!";
        }
        return "Username tidak ditemukan!";
    }
}

 ?>