<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Resep Kos</title>
<link rel="stylesheet" href="style.css">
</head>

<body>

<div class='nav'>
<a href='index.php?c=MenuController&m=home'>Home</a>

<?php if (isset($_SESSION['username'])) { ?>
        <div class='dropdown'>
            <a href='#'>List Menu</a>
            <ul>
                <li><a href='index.php?c=MenuController&m=listMenus&id_kategori=1'>Lauk Pauk</a></li>
                <li><a href='index.php?c=MenuController&m=listMenus&id_kategori=2'>Sayur</a></li>
            </ul>
        </div>
        <!-- Logout (hanya saat session isset) -->
        <a href='index.php?c=UserController&m=logoutUser'>Logout</a>
    <?php } else { ?>
        <!-- Login and Register (hanya saat session unset) -->
        <a href='index.php?c=UserController&m=loginUser'>Login</a>
        <a href='index.php?c=UserController&m=registerUser'>Register</a>
    <?php } ?>
    
</div>
