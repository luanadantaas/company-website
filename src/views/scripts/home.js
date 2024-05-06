$(document).ready(function(){
    $('#myCarousel').carousel();
});

document.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem('user'));
    const loggedIn = user.login;
    let navbar = document.querySelector('.navbar-nav');
    
    if (loggedIn) {
        let newItem = document.createElement('li');
        newItem.className = 'nav-item';

        let newLink = document.createElement('a');
        newLink.className = 'btn btn-primary';
        newLink.href = '../../views/pages/itSupport.html';
        newLink.textContent = 'Contact IT';

        newItem.appendChild(newLink);

        navbar.appendChild(newItem);
    }

    user.origin = "home";
    localStorage.setItem('user', JSON.stringify(user));
});