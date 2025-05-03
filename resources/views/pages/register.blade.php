@extends('layouts.main')

@section('title', 'Register')

@section('content')
    <h2>Register</h2>

    <form action="{{ route('register.action') }}" method="POST">
        @csrf

        <div>
            <label>Nama Lengkap:</label>
            <input type="text" name="name" required>
        </div>

        <div>
            <label>Email:</label>
            <input type="email" name="email" required>
        </div>

        <div>
            <label>Password:</label>
            <input type="password" name="password" required>
        </div>

        <div>
            <label>Konfirmasi Password:</label>
            <input type="password" name="password_confirmation" required>
        </div>

        <button type="submit">Register</button>
    </form>
@endsection