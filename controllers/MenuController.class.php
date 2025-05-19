<?php
include_once 'models/MenuModel.class.php';
include 'header.php';

class MenuController {
    private $model;

    public function __construct($dbConnection) {
        // Inisialisasi model dengan koneksi database        $this->model = new MenuModel($dbConnection);
    }

    public function home() {
        if (!isset($_SESSION['username'])) {
            header("Location: index.php?c=UserController&m=loginUser");
            exit;
        }
        // Ambil semua menu untuk ditampilkan di halaman utama
        $menus = $this->model->getAllMenus();
    
        // Tampilkan view home
        include 'views/home.php';
    }    

    public function listMenus() {
        if (!isset($_SESSION['username'])) {
            header("Location: index.php?c=UserController&m=loginUser");
            exit;
        }
        $id_kategori = isset($_GET['id_kategori']) ? $_GET['id_kategori'] : 1;

        // Mengambil nama kategori
        $kategori_nama = $this->model->getKategoriNama($id_kategori);
        
        // Mengambil semua menu berdasarkan kategori
        $menus = $this->model->getAllMenus($id_kategori);

        // Memasukkan data ke view
        include 'views/menu/list.php';
    }
    

    public function viewMenuDetail() {
        // Validasi parameter
        if (!isset($_GET['id_menu']) || empty($_GET['id_menu'])) {
            die("ID Menu tidak ditemukan.");
        }
    
        // Ambil id_menu dari GET
        $id_menu = intval($_GET['id_menu']); 
        $menu = $this->model->getMenuById($id_menu);
    
        if (!$menu) {
            echo "Menu atau Kategori tidak ditemukan.";
            return;
        }
    
        // Tampilkan view jika menu ditemukan
        include 'views/menu/detail.php';
    }

    public function createMenu() {
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $nama_menu = $_POST['nama_menu'];
            $bahan = $_POST['bahan'];
            $resep = $_POST['resep'];
            $id_kategori = $_POST['id_kategori'];
    
            // unggahan file
            $target_file = '';
            if (isset($_FILES["gambar"]) && $_FILES["gambar"]["error"] == UPLOAD_ERR_OK) {
                $allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
                $maxSize = 2 * 1024 * 1024; // 2MB
                
                $fileType = mime_content_type($_FILES["gambar"]["tmp_name"]);
                $fileSize = $_FILES["gambar"]["size"];
                
                if (!in_array($fileType, $allowedTypes)) {
                    die("File yang diunggah harus berupa PNG atau JPEG.");
                }
                
                if ($fileSize > $maxSize) {
                    die("Ukuran file tidak boleh lebih dari 2MB.");
                }
    
                $target_dir = "uploads/";
                $target_file = $target_dir . basename($_FILES["gambar"]["name"]);
                move_uploaded_file($_FILES["gambar"]["tmp_name"], $target_file);
            }
    
            $result = $this->model->insertMenu($nama_menu, $bahan, $resep, $target_file, $id_kategori);
            if ($result) {
                header("Location: index.php?c=MenuController&m=listMenus&id_kategori=$id_kategori");
                exit;
            } else {
                echo "Gagal menambahkan menu.";
            }
        } else {
            // Ambil daftar kategori
            $kategori_result = $this->model->getAllCategories();
            include 'views/menu/insert.php'; 
            // Tampilkan form untuk membuat menu
        }
    }
    
    public function updateMenu() {
        // Validasi ID menu dari GET parameter
        if (!isset($_GET['id']) || empty($_GET['id'])) {
            die("ID menu tidak ditemukan.");
        }
        $id = intval($_GET['id']);
    
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            // Ambil data dari POST
            $nama_menu = $_POST['nama_menu'];
            $bahan = $_POST['bahan'];
            $resep = $_POST['resep'];
            $id_kategori = $_POST['id_kategori'];
    
            //unggahan file
            $target_file = $_POST['existing_gambar']; // Default: gambar lama
            if (isset($_FILES["gambar"]) && $_FILES["gambar"]["error"] == UPLOAD_ERR_OK) {
                $target_dir = "uploads/";
                $target_file = $target_dir . basename($_FILES["gambar"]["name"]);
                move_uploaded_file($_FILES["gambar"]["tmp_name"], $target_file);
            }
    
            // Update data di database
            $result = $this->model->updateMenu($id, $nama_menu, $bahan, $resep, $target_file, $id_kategori);
            if ($result) {
                header("Location: index.php?c=MenuController&m=listMenus&id_kategori=$id_kategori");
                exit;
            } else {
                echo "Gagal mengupdate menu.";
            }
        } else {
            // Ambil data menu untuk ditampilkan di form
            $menu = $this->model->getMenuById($id);
            if (!$menu) {
                die("Menu tidak ditemukan.");
            }
    
            // Ambil daftar kategori untuk dropdown
            $kategori_result = $this->model->getAllCategories();
            include 'views/menu/update.php';
        }
    }
    
    

    public function deleteMenu() {
        //Periksa apakah 'id' dilewatkan dalam string kueri
        if (!isset($_GET['id']) || empty($_GET['id'])) {
            die("ID menu tidak ditemukan.");
        }
    
        // 'id' dari parameter GET
        $id = intval($_GET['id']); // Konversikan ke bilangan bulat 

        // Memanggil model untuk menghapus menu berdasarkan ID
        $result = $this->model->deleteMenu($id);
    
        if ($result) {
            header("Location: index.php?c=MenuController&m=listMenus");
            exit;
        } else {
            echo "Gagal menghapus menu.";
        }
    }
    
}

include 'footer.php';
?>