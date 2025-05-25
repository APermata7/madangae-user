<div class='container'>

<h2>Tambah Item</h2>
<form method="post" enctype="multipart/form-data">
    Nama Menu: <input type="text" name="nama_menu" required><br>
    Bahan: <textarea name="bahan" required></textarea><br>
    Resep: <textarea name="resep" required></textarea><br>
    Gambar: <input type="file" name="gambar" required><br>
    Kategori: 
    <select name="id_kategori" required>
        <?php
        while ($kategori = $kategori_result->fetch_assoc()) {
            echo "<option value='" . $kategori['id_kategori'] . "'>" . $kategori['nama_kategori'] . "</option>";
        }
        ?>
    </select><br>
    <input type="submit" value="Tambah Item">
</form>
</div>