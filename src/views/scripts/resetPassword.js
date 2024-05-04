function changePage() {
    let email = document.getElementById('inputEmail').value;
    let password = document.getElementById('inputPassword').value;
    let confirmPassword = document.getElementById('inputConfirmPassword').value;

    console.log(email, password, confirmPassword);

    $('.modal-body').text('Validação realizada com sucesso');
    $('#modalLabel').text('Sucesso');
    $('#validationModal').modal('show');
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


