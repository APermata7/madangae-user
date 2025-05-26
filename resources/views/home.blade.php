<?php
if (!isset($_SESSION)) {
    session_start();
}
?>
<div class="container">
    <h2>Selamat datang, <?= htmlspecialchars($_SESSION['username']); ?>!</h2>
    <i>Remaja kos hari ini, mau masak apa?</i>
    <p>Silakan pilih menu di bawah:</p>
    <ul>
        <li><a href="{{ route('menus.category', ['id' => 1]) }}">Menu Lauk Pauk</a></li>
        <li><a href="{{ route('menus.category', ['id' => 2]) }}">Menu Sayur</a></li>
    </ul>
</div>

<div class="container">
    <h2>Daftar Menu</h2>
    <i>Berikut semua daftar menu yang ada:</i><br>

    <?php if (!empty($menus)): ?>
        <ul class="menu-list">
            <?php foreach ($menus as $menu): ?>
                <li>
                    <?= htmlspecialchars($menu['nama_menu']); ?>
                    <a href="{{ route('menus.edit', ['id' => $menu->id]) }}">Update</a>
                    <form action="{{ route('menus.delete', ['id' => $menu->id]) }}" method="POST" style="display:inline;" onsubmit="return confirm('Apakah Anda yakin ingin menghapus item ini?');">
                        @csrf
                        @method('DELETE')
                        <button type="submit">Delete</button>
                    </form>
                    <a href="{{ route('menus.detail', ['id' => $menu->id]) }}">Detail</a>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php else: ?>
        <p>Belum ada menu.</p>
    <?php endif; ?>

    <br><i>Jika menu belum lengkap, catat di sini:</i><br><br>
    <a href="?c=MenuController&m=createMenu">Tambah Item Baru</a>
</div>
