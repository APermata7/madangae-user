<div class="container">
    <h2>Login</h2>
    <form method="post" action="index.php?c=UserController&m=loginUser"> <!-- Mengarah ke controller dan method yang benar -->
        <label for="username">Username:</label>
        <input type="text" name="username" required><br>

        <label for="password">Password:</label>
        <input type="password" name="password" required><br>

        <!-- Tampilkan pesan error -->
        <?php if (!empty($error_message)) { ?>
            <div style="color: red; margin-top: 10px;">
                <?php echo $error_message; ?>
            </div>
        <?php } ?>

        <input type="submit" value="Login">
    </form>
</div>
