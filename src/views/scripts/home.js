$(document).ready(function(){
    $('#myCarousel').carousel();
});

document.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem('user'));
    // Verificar se o usuário está logado
    const isLoggedIn = user.login;
    const origin = user.origin;
    const userName = user.name;

    if (isLoggedIn && userName && origin === "login") {
        // Substituir "Log In" e "Join Us" pelo nome do usuário
        const loginNavItem = document.querySelector('.nav-item a[href="logIn.html"]');
        const joinUsNavItem = document.querySelector('.nav-item a[href="joinUs.html"]');

        if (loginNavItem && joinUsNavItem) {
            loginNavItem.textContent = userName; // Mostra o nome do usuário
            loginNavItem.href = '#'; // Remove link de navegação

            // Remove "Join Us" ou substitua por algo mais relevante
            joinUsNavItem.parentNode.removeChild(joinUsNavItem);
        }
    }

    user.origin = "home";
    localStorage.setItem('user', JSON.stringify(user));
});