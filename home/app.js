import {getCurrentUser, logOut} from '../auth.js'


const user = getCurrentUser();

if(!user){
    alert("No user is currently logged in. Please log in to continue.");
    document.location.href = "../index.html";
}

document.getElementById("userInfo").textContent = `Username: ${user.username} | Email: ${user.email}`;

document.getElementById("logOut").addEventListener("click", ()=>{
    localStorage.removeItem('currentUser');
    alert("You have been logged out.");
    document.location.href = "../index.html";
});