import {logIn} from '../auth.js';

const logInForm = document.getElementById('logInForm');

// Password visibility toggle
document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }
});

logInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = logInForm.email.value;
    const password = logInForm.password.value;

    const user = logIn(email, password);

    if(user !== null){
        alert("Log in successful!");
        document.location.href = "../home/index.html";
    } else {
        alert("Invalid email or password.");
    }

});