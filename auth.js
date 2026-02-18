let users = JSON.parse(localStorage.getItem('users')) || [];

let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;


const signUp = (username, email, password) => {
    //save as an array of users
    //use localStorage.setItem
}


const logIn = (email, password) => {
    //check if the email and password match any user in the users array
    //if they do, set currentUser to that user and save it in localStorage
    //if exists in users table then store as currentUser and return user object finally redirect to home page
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('currentUser'));
}

const logOut = () => {
    //clear currentUser from localStorage
    //use removeITem
}
export {signUp, logIn, getCurrentUser};