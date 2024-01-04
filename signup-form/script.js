const firstName = document.getElementById("first-name")
const spanErrorFirstName = document.querySelector("#first-name + span.error")
const lastName = document.getElementById("last-name");
const spanErrorLastName = document.querySelector("#last-name + span.error")
const email = document.getElementById("email");
const spanErrorEmail = document.querySelector("#email + span.error")
const phoneNumber = document.getElementById("phone-number");
const spanErrorPhoneNumber = document.querySelector("#phone-number + span.error")
const password = document.getElementById("password");
const spanErrorPassword = document.querySelector("#password + span.error")
const confirmPassword = document.getElementById("confirm-password");
const spanErrorConfirmPassword = document.querySelector("#confirm-password + span.error")
const form = document.querySelector("form");

//email
let isSubmit = true
const handleEventEmail = () => {
    let isValidEmail = true
    if (email.validity.typeMismatch) {
        isValidEmail = false
        isSubmit = false
        spanErrorEmail.textContent = 'I am expecting an email address!'

    }
    if (email.validity.valueMissing) {
        isValidEmail = false
        isSubmit = false
        spanErrorEmail.textContent = 'email is required!'
    }
    if(isValidEmail) {
        spanErrorEmail.textContent =''
        email.classList.remove('input-error')
    }else {
        email.classList.add('input-error')
    }
}

email.addEventListener("input", (event) => {
    handleEventEmail()
});email.addEventListener("focusout", (event) => {
    handleEventEmail()
});

//first name
const handleEventFirstName = () => {
    let isValidFirstName = true
    if (firstName.validity.valueMissing) {
        isValidFirstName = false
        isSubmit = false
        spanErrorFirstName.textContent = 'first name is required!'
    }
    if(isValidFirstName) {
        spanErrorFirstName.textContent =''
        firstName.classList.remove('input-error')
    }else {
        firstName.classList.add('input-error')
    }
}
firstName.addEventListener("input", (event) => {
    handleEventFirstName()
});
firstName.addEventListener("focusout", (event) => {
    handleEventFirstName()
});

//last name

const handleEventLastName = () => {
    let isValidLastName = true
    if (lastName.validity.valueMissing) {
        isValidLastName = false
        isSubmit = false
        spanErrorLastName.textContent = 'last name is required!'
    }
    if(isValidLastName) {
        spanErrorLastName.textContent =''
        lastName.classList.remove('input-error')
    }else {
        lastName.classList.add('input-error')
    }
}
lastName.addEventListener("input", (event) => {
    handleEventLastName()
});
lastName.addEventListener("focusout", (event) => {
    handleEventLastName()
});


//phone Number

const phoneNumberRegExp =
    /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
const handleEventPhoneNumber = () => {
    let isValidPhoneNumber = true

    if (!phoneNumberRegExp.test(phoneNumber.value)) {
        isValidPhoneNumber = false
        isSubmit = false
        spanErrorPhoneNumber.textContent = 'phone number is invalid!'
    }
    if (phoneNumber.validity.valueMissing) {
        isValidPhoneNumber = false
        isSubmit = false
        spanErrorPhoneNumber.textContent = 'phone number is required!'
    }
    if(isValidPhoneNumber) {
        spanErrorPhoneNumber.textContent =''
        phoneNumber.classList.remove('input-error')
    }else {
        phoneNumber.classList.add('input-error')
    }
}

phoneNumber.addEventListener("input", (event) => {
    handleEventPhoneNumber()
});
phoneNumber.addEventListener("focusout", (event) => {
    handleEventPhoneNumber()
});


//password
const handleEventPassword = () => {
    let isValidPassword = true
    if (password.validity.valueMissing) {
        isValidPassword = false
        isSubmit = false
        spanErrorPassword.textContent = 'password is required!'
    }
    if (password.validity.tooLong) {
        isValidPassword = false
        isSubmit = false
        spanErrorPassword.textContent = 'password is in 8 to 16 words!'
    }
    if (password.validity.tooShort) {
        isValidPassword = false
        isSubmit = false
        spanErrorPassword.textContent = 'password is in 8 to 16 words!'
    }
    if(isValidPassword) {
        spanErrorPassword.textContent =''
        password.classList.remove('input-error')
    }else {
        password.classList.add('input-error')
    }
}
password.addEventListener("input", (event) => {
    handleEventPassword()
    handleEventConfirmPassword()
});
password.addEventListener("focusout", (event) => {
    handleEventPassword()
    handleEventConfirmPassword()
});


//password confirm
const handleEventConfirmPassword = () => {
    let isValidConfirmPassword = true
    if (confirmPassword.validity.valueMissing) {
        isValidConfirmPassword = false
        isSubmit = false
        spanErrorConfirmPassword.textContent = 'confirm password is required!'
    }
    if (confirmPassword.value !== password.value) {
        isValidConfirmPassword = false
        isSubmit = false
        spanErrorConfirmPassword.textContent = 'confirm password is equal password!'
    }
    if(isValidConfirmPassword) {
        spanErrorConfirmPassword.textContent =''
        confirmPassword.classList.remove('input-error')
    }else {
        confirmPassword.classList.add('input-error')
    }
}
confirmPassword.addEventListener("input", (event) => {
    handleEventConfirmPassword()
});
confirmPassword.addEventListener("focusout", (event) => {
    handleEventConfirmPassword()
});

//submit
form.addEventListener("submit", (event) => {
    isSubmit = true
    event.preventDefault()
    handleEventEmail()
    handleEventFirstName()
    handleEventLastName()
    handleEventPhoneNumber()
    handleEventPassword()
    handleEventConfirmPassword()
    if(isSubmit){
        form.submit()
    }
});
