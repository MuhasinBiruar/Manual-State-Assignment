import {getCurrentUser, logOut} from '../auth.js'

const user = getCurrentUser();

document.getElementById("userInfo").textContent = `Username: ${user.username} | Email: ${user.email}`;

document.getElementById("logOut").addEventListener("click", ()=>{
    localStorage.removeItem('currentUser');
    alert("You have been logged out.");
    document.location.href = "../index.html";
});