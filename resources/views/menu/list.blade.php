<div class="container">
    <h2>Daftar Menu <?php echo htmlspecialchars($kategori_nama); ?></h2>
    <ul>
        <?php
        if (count($menus) > 0) {
            foreach ($menus as $menu) {
                echo "<li>";
                echo "<img src='" . $menu["gambar"] . "' alt='" . $menu["nama_menu"] . "' width='150'>";
                echo "<br><a href='index.php?c=MenuController&m=viewMenuDetail&id_menu=" . $menu["id"] . "&id_kategori=$id_kategori" . "'>" 
                    . $menu["nama_menu"] . "</a>";
                echo "</li>";
            }
        } else {
            echo "<li>Menu untuk kategori " . htmlspecialchars($kategori_nama) . " belum tersedia.</li>";
        }
        ?>
    </ul>
</div>
