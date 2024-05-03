function changePage() {
    let email = document.getElementById('inputEmail').value;
    let password = document.getElementById('inputPassword').value;

    // Aqui você pode adicionar o código para fazer algo com os valores de email e senha
    console.log('Email:', email, 'Password:', password);

    // Por exemplo, você pode fazer uma chamada AJAX para enviar os dados sem recarregar a página
    // fetch ou AJAX para enviar dados para o servidor aqui

    window.location.href = "home.html";
}

