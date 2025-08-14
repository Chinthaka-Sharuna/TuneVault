function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    if (!email || !password) {
        errorMessage.style.display = 'block';
        return;
    }
    
    // email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = 'Please enter a valid email';
        errorMessage.style.display = 'block';
        return;
    }
    
    console.log('Login attempt:', { email, password });
    errorMessage.style.display = 'none';
    window.location.href = 'html/home.html';
}


function handleSignUp() {
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('error-message');

    if (!email || !username || !password || !confirmPassword) {
        errorMessage.textContent = 'Please fill all fields';
        errorMessage.style.display = 'block';
        return;
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = 'Please enter a valid email';
        errorMessage.style.display = 'block';
        return;
    }

    // Username validation (alphanumeric, 3-20 characters)
    const usernamePattern = /^[a-zA-Z0-9]{3,20}$/;
    console.log(usernamePattern);
    if (!usernamePattern.test(username)) {
        errorMessage.textContent = 'Username must be 3-20 alphanumeric characters';
        errorMessage.style.display = 'block';
        return;
    }

    // Password validation (min 6 characters)
    if (password.length < 6) {
        errorMessage.textContent = 'Password must be at least 6 characters';
        errorMessage.style.display = 'block';
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match';
        errorMessage.style.display = 'block';
        return;
    }

    console.log('Sign-up attempt:', { email, username, password });
    errorMessage.style.display = 'none';
    window.location.href = '/login.html';
}