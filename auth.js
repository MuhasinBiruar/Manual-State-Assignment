let users = JSON.parse(localStorage.getItem('users')) || [];

let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;


const signUp = (username, email, password) => {
    //save as an array of users
    //use localStorage.setItem
    const newUser = {
        username: username,
        email: email,
        password: password
    }

    const index = users.findIndex(user => user.email === email);
    if (index !== -1) {
        alert("Email already exists. Please use a different email.");
        return {success : false};
    }
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return {success : true};
}


const logIn = (email, password) => {
    //check if the email and password match any user in the users array
    //if they do, set currentUser to that user and save it in localStorage
    //if exists in users table then store as currentUser and return user object finally redirect to home page
    const user = users.find(user => user.email === email && user.password === password);
    if(user){
        currentUser = user;
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        return currentUser;
    }
    else{
        return null;
        //null means user not found or incorrect password
    }
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('currentUser'));
}

const logOut = () => {
    //clear currentUser from localStorage
    //use removeITem
    localStorage.removeItem('currentUser');
}
export {signUp, logIn, getCurrentUser, logOut};