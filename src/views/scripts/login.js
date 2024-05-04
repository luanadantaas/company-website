let validationSuccess = false;

function changePage() {
    window.location.href = "home.html";
}

function login() {
    let email = document.getElementById('inputEmail').value;
    let password = document.getElementById('inputPassword').value;
    const user = JSON.parse(localStorage.getItem('user'));
    if (email === user.email && password === user.password) {
        console.log(user);
        $('.modal-body').text('Validação realizada com sucesso');
        $('#modalLabel').text('Sucesso');
        $('#validationModal').modal('show');
        validationSuccess = true;
        user.login = true;
        user.origin = "login";
        localStorage.setItem('user', JSON.stringify(user));
        console.log(user);
    } else {
        $('.modal-body').text('Email ou senhas não cadastrados');
        $('#modalLabel').text('Error');
        $('#validationModal').modal('show');
        validationSuccess = false;
    }
    
    document.getElementById('closeModalButton').addEventListener('click', function () {
        if (validationSuccess) {
            // Redireciona para outra página ao clicar no botão "Fechar"
            window.location.href = 'home.html'; // Altere para a URL desejada
        }
    });
}

function clearFields() {
    document.getElementById('inputEmail').value = '';
    document.getElementById('inputPassword').value = '';
    
    document.getElementById('inputEmail').focus();
}


