<div class="container">
    <h2>Daftar Menu {{ $kategori_nama }}</h2>
    <ul>
        @if(count($menus) > 0)
            @foreach($menus as $menu)
                <li>
                    <img src="{{ asset($menu->gambar) }}" alt="{{ $menu->nama_menu }}" width="150">
                    <br>
                    <a href="{{ route('menus.detail', ['id' => $menu->id]) }}">
                        {{ $menu->nama_menu }}
                    </a>
                </li>
            @endforeach
        @else
            <li>Menu untuk kategori {{ $kategori_nama }} belum tersedia.</li>
        @endif
    </ul>
</div>
