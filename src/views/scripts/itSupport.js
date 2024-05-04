document.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem('user'));
    // Verificar se o usuário está logado
    const isLoggedIn = user.login;
    const userName = user.name;

    console.log(user);

    if (isLoggedIn && userName) {
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

    user.origin = "Contact";
    localStorage.setItem('user', JSON.stringify(user));
});


const servicePrices = {
    1: 250.00, // User Support
    2: 570.00, // IT Infrastructure
    3: 1020.00, // Data Security
    4: 450.00, // System Installation
    5: 800.00  // IT Outsourcing
};

function updateServicePrice() {
    const serviceDropdown = document.getElementById('inputService');
    const selectedService = serviceDropdown.value;
    const priceLabel = document.getElementById('servicePrice');
  
    // Verifica se há um preço para o serviço selecionado
    if (selectedService in servicePrices) {
      // Define o preço correspondente ao serviço selecionado
      priceLabel.textContent = `$${servicePrices[selectedService].toFixed(2)}`;
    } else {
      // Exibe um traço se nenhum serviço estiver selecionado
      priceLabel.textContent = '-';
    }
}

document.getElementById('inputService').addEventListener('change', updateServicePrice);