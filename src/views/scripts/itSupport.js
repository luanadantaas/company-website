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

let id = 3;

const servicePrices = {
    1: 250.00, // User Support
    2: 570.00, // IT Infrastructure
    3: 1020.00, // Data Security
    4: 450.00, // System Installation
    5: 800.00  // IT Outsourcing
};

const serviceNames = {
    1: "User Support", // User Support
    2: "IT Infrastructure", // IT Infrastructure
    3: "Data Security", // Data Security
    4: "System Installation", // System Installation
    5: "IT Outsourcing" // IT Outsourcing
};

const serviceDeadlines = {
    1: '5 days', // User Support
    2: '10 days', // IT Infrastructure
    3: '15 days', // Data Security
    4: '7 days', // System Installation
    5: '12 days' // IT Outsourcing
};

function updateServicePrice() {
    const serviceDropdown = document.getElementById('inputService');
    const selectedService = serviceDropdown.value;
    console.log(servicePrices[selectedService].toFixed(2));
    const priceLabel = document.getElementById('servicePrice');
  
    // Verifica se há um preço para o serviço selecionado
    if (selectedService in servicePrices) {
      // Define o preço correspondente ao serviço selecionado
      priceLabel.textContent = `${servicePrices[selectedService].toFixed(2)}`;
    } else {
      // Exibe um traço se nenhum serviço estiver selecionado
      priceLabel.textContent = '-';
    }

    const deadlineLabel = document.getElementById('deadlineDate');
    if (selectedService in serviceDeadlines) {
      deadlineLabel.textContent = `${serviceDeadlines[selectedService]}`;
    } else {
      deadlineLabel.textContent = '-';
    }
}

function deleteRow(rowId) {
    if (row && confirm('Are you sure you want to delete this row?')) {
        row.parentNode.removeChild(row);
    }
}

function addServiceRequest() {
    const serviceDropdown = document.getElementById('inputService');
    const selectedService = serviceDropdown.value;
    const name = `${serviceNames[selectedService]}`;
    const price = `${servicePrices[selectedService].toFixed(2)}`;
    const deadline = `${serviceDeadlines[selectedService]}`;
    const currentDate = new Date().toLocaleDateString();;

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${id + 1}</td>
        <td>${currentDate}</td>
        <td>${name}</td>
        <td>${status}</td>
        <td>${price}</td>
        <td>${deadline}</td>
        <td id="deleterow${id + 1}" onclick="deleteRow('deleterow${id + 1}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
        </svg></td>
    `;

    document.querySelector("#serviceRequests tbody").appendChild(row);

    row.querySelector(".delete").addEventListener("click", function() {
        row.remove();
    });

    id++;
}
