<?php
class MenuModel
{
    private $conn;

    public function __construct($dbConnection) {
        $this->conn = $dbConnection;
    }

    public function getAllMenus($id_kategori = null) {
        if ($id_kategori) {
            $sql = "SELECT * FROM menu WHERE id_kategori = ?";
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param("i", $id_kategori);
        } else {
            $sql = "SELECT * FROM menu";
            $stmt = $this->conn->prepare($sql);
        }
    
        $stmt->execute();
        $result = $stmt->get_result();
        $menus = [];
        while ($row = $result->fetch_assoc()) {
            $menus[] = $row;
        }
        return $menus;
    }
    
    public function getAllCategories() {
        $sql = "SELECT * FROM kategori";
        $result = $this->conn->query($sql);
    
        if ($result->num_rows > 0) {
            return $result;
        } else {
            return [];
        }
    }    
    
    public function getKategoriNama($id_kategori) {
        $sql = "SELECT nama_kategori FROM kategori WHERE id_kategori = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id_kategori);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            return $row['nama_kategori'];
        } else {
            return "Kategori Tidak Ditemukan"; 
        }
          }

    public function getMenuById($id) {
        $sql = "SELECT * FROM menu WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }
        
        

    public function insertMenu($nama_menu, $bahan, $resep, $target_file, $id_kategori) {
        $sql = "INSERT INTO menu (nama_menu, bahan, resep, gambar, id_kategori) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssssi", $nama_menu, $bahan, $resep, $target_file, $id_kategori);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function updateMenu($id, $nama_menu, $bahan, $resep, $target_file, $id_kategori) {
        $sql = "UPDATE menu SET nama_menu=?, bahan=?, resep=?, gambar=?, id_kategori=? WHERE id=?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssssii", $nama_menu, $bahan, $resep, $target_file, $id_kategori, $id);
        return $stmt->execute();
    }

    public function deleteMenu($id) {
        $sql = "DELETE FROM menu WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        if (!$stmt->execute()) {
            die("Error: " . $stmt->error);
        }
    
        return true;
    }
}