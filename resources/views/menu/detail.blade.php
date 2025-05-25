<div class='container'>
    <h2>Detail Menu</h2>
    <h3>Nama Menu: <?php echo $menu["nama_menu"]; ?></h3>
    
    <h4>Bahan:</h4>
    <ul>
        <?php
        $bahan = explode('-', $menu["bahan"]);
        foreach ($bahan as $item) {
            $trimmed_item = trim($item); 
            if (!empty($trimmed_item)) { 
                echo "<li> " . htmlspecialchars($trimmed_item) . "</li>";
            }
        }
        ?>
    </ul>
    
    <h4>Resep:</h4>
    <ol> 
        <?php
        $resep = $menu["resep"];
        $resep_array = preg_split('/\d+\.\s/', $resep, -1, PREG_SPLIT_NO_EMPTY);
        
        foreach ($resep_array as $step) {
            echo "<li>" . trim($step) . "</li>"; 
        } ?>
    </ol>

    <h4>Gambar:</h4>
    <img src="<?php echo $menu["gambar"]; ?>" alt="<?php echo $menu["nama_menu"]; ?>" style="max-width: 100%; height: auto;">
    
    <a href="index.php?c=MenuController&m=viewMenuDetail&id_kategori=<?php echo $menu['id_kategori']; ?>"><br><br>Kembali ke List Menu</a>
</div>