<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Resep Kos</title>
<link rel="stylesheet" href="css/style.css">
</head>

<body>

<div class='nav'>
<a href="{{ route('home') }}">Home</a>

@auth
    <div class="dropdown">
        <a href="#">List Menu</a>
        <ul>
            <li><a href="{{ route('menus.category', ['id' => 1]) }}">Lauk Pauk</a></li>
            <li><a href="{{ route('menus.category', ['id' => 2]) }}">Sayur</a></li>
        </ul>
    </div>
    <form method="POST" action="{{ route('logout') }}" style="display:inline;">
        @csrf
        <button type="submit">Logout</button>
                <!-- Logout (hanya saat session isset) -->
    </form>
@else
    <a href="{{ route('login.form') }}">Login</a>
    <a href="{{ route('register.form') }}">Register</a>
            <!-- Login and Register (hanya saat session unset) -->
@endauth
</div>