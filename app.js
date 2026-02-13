let state = {
    studentType: "",
    religion: "",
    civilStatus: "",
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    contactNumber: "",
    birthDate: "",
    sex: "",
    emailAddress: "",
    nationality: ""
};

const form = document.getElementById("personalInfoForm");

const setState = (newState) => {
    state = { ...state, ...newState };
    render();
}

const handleInput = (e) => {
    const { name, value } = e.target;
    setState({ [name]: value });
}

document.querySelectorAll("#personalInfoForm input, #personalInfoForm select").forEach((input) => {
    input.addEventListener("input", handleInput);
});

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const render = () => {
    let isValid = true;
    if(state.studentType === ""){
        document.getElementById("studentTypeError").innerText = "*Select a student type.*";
        isValid = false;
    }
    else{
        document.getElementById("studentTypeError").innerText = "";
    }

    if(state.religion === ""){
        document.getElementById("religionError").innerText = "*Select a religion.*";
        isValid = false;
    }
    else{
        document.getElementById("religionError").innerText = "";
    }

    if(state.civilStatus === ""){
        document.getElementById("civilStatusError").innerText = "*Select a civil status.*";
        isValid = false;
    }
    else{
        document.getElementById("civilStatusError").innerText = "";
    }

    if(state.firstName === ""){
        document.getElementById("firstNameError").innerText = "*First name is required.*";
        isValid = false;
    }
    else{
        document.getElementById("firstNameError").innerText = "";
    }

    if(state.lastName === ""){
        document.getElementById("lastNameError").innerText = "*Last name is required.*";
        isValid = false;
    }
    else{
        document.getElementById("lastNameError").innerText = "";
    }

    if(state.contactNumber === ""){
        document.getElementById("contactNumberError").innerText = "*Contact number is required.*";
        isValid = false;
    }else{
        document.getElementById("contactNumberError").innerText = "";
    }
    
    if(state.birthDate === ""){
        document.getElementById("birthDateError").innerText = "*Birth date is required.*";
        isValid = false;
    }
    else{
        document.getElementById("birthDateError").innerText = "";
    }

    if(state.sex === ""){
        document.getElementById("sexError").innerText = "*Select assigned sex at birth.*";
        isValid = false;
    }
    else{
        document.getElementById("sexError").innerText = "";
    }

    if(state.emailAddress === ""){
        document.getElementById("emailAddressError").innerText = "*Email address is required.*";
        isValid = false;
    }
    else if(!isValidEmail(state.emailAddress)){
        document.getElementById("emailAddressError").innerText = "*Email address is invalid.*";
        isValid = false;
    }
    else{
        document.getElementById("emailAddressError").innerText = "";
    }

    if(state.nationality === ""){
        document.getElementById("nationalityError").innerText = "*Select a Nationality.*";
        isValid = false;
    }
    else{
        document.getElementById("nationalityError").innerText = "";
    }
    return isValid;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if(!render()){
        alert("Please fill in all required fields correctly before saving.");
        return;
    }

    localStorage.setItem("personalInfoData", JSON.stringify(state));

    alert("Successfully saved state in localStorage!");
});

