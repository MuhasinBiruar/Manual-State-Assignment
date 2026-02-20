import { signUp } from '../auth.js';

const signUpForm = document.getElementById('signUpForm');


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

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = signUpForm.username.value;
    const email = signUpForm.email.value;
    const password = signUpForm.password.value;



    const result = signUp(userName, email, password);

    if(result.success){
        alert("Sign up successful! Please Log In to continue.");
        document.location.href = "../index.html";
    }
    
});