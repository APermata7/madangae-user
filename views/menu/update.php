<div class='container'>
    <h2>Update Item</h2>
    <form method="post" enctype="multipart/form-data">
        <input type="hidden" name="existing_gambar" value="<?= htmlspecialchars($menu['gambar']); ?>">

        Nama Menu: <input type="text" name="nama_menu" value="<?= htmlspecialchars($menu['nama_menu']); ?>" required><br>
        Bahan: <textarea name="bahan" required><?= htmlspecialchars($menu['bahan']); ?></textarea><br>
        Resep: <textarea name="resep" required><?= htmlspecialchars($menu['resep']); ?></textarea><br>
        Gambar: <input type="file" name="gambar"><br>
        <img src="<?= htmlspecialchars($menu['gambar']); ?>" alt="Gambar Menu" width="100"><br>
        Kategori: 
        <select name="id_kategori" required>
            <?php while ($kategori = $kategori_result->fetch_assoc()): ?>
                <option value="<?= $kategori['id_kategori']; ?>" 
                    <?= $kategori['id_kategori'] == $menu['id_kategori'] ? 'selected' : ''; ?>>
                    <?= htmlspecialchars($kategori['nama_kategori']); ?>
                </option>
            <?php endwhile; ?>
        </select>
<br>

        <input type="submit" value="Update Item">
    </form>
</div>
