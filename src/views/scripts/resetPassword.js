function changePage() {
    let email = document.getElementById('inputEmail').value;
    let password = document.getElementById('inputPassword').value;
    let confirmPassword = document.getElementById('inputConfirmPassword').value;

    console.log(email, password, confirmPassword);

    $('.modal-body').text('Validation successfully completed.');
    $('#modalLabel').text('Success');
    $('#validationModal').modal('show');
}

function resetPassword() {
    let email = document.getElementById('inputEmail').value;
    let password = document.getElementById('inputPassword').value;
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if(email === user.email){
        $('.modal-body').text('Validation successfully completed.');
        $('#modalLabel').text('Success');
        $('#validationModal').modal('show');
        user.password = password;
        user.origin = "resetPassword";
        localStorage.setItem('user', JSON.stringify(user));
        console.log(user);
    } else {
        $('.modal-body').text('Email not registered.');
        $('#modalLabel').text('Error');
        $('#validationModal').modal('show');
    }
}

function validatePassword(input) {
    const regex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%&*!?/\\|_+\-=.]).{6,}$/;
    const password = input.value;
    console.log(regex.test(password));
    input.setCustomValidity("");
    if (!regex.test(password)) {
        input.setCustomValidity("Incorrect password. Please try again.");
    }
}

function validateConfirmPassword(input) {
    const confirmPassword = input.value;
    const password = document.getElementById("inputPassword").value;
    input.setCustomValidity("");
    if (!(password === confirmPassword)) {
        input.setCustomValidity("Passwords do not match. Please try again.");
    }
}

function clearFields() {
    document.getElementById('inputEmail').value = '';
    document.getElementById('inputPassword').value = '';
    document.getElementById('inputConfirmPassword').value = '';

    document.getElementById('inputEmail').focus();
}


