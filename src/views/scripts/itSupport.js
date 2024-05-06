const services = [
    {
        id: 1,
        date: "02/02/2020",
        service: "User Support",
        status: "Delivered",
        price: "250.00",
        deadline: "07/02/2020",
    }, 
    {
        id: 2,
        date: "04/07/2022",
        service: "Data Security",
        status: "Delivered",
        price: "570.00",
        deadline: "19/07/2022",
    },
    {
        id: 3,
        date: "08/09/2022",
        service: "IT Infra",
        status: "Not Started",
        price: "1020.00",
        deadline: "18/09/2022",
    }
]
    


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
            loginNavItem.textContent = userName + " (" + user.email + ")"; // Mostra o nome do usuário
            loginNavItem.href = '#'; // Remove link de navegação

            // Remove "Join Us" ou substitua por algo mais relevante
            joinUsNavItem.parentNode.removeChild(joinUsNavItem);
        }
    }

    user.origin = "Contact";
    localStorage.setItem('user', JSON.stringify(user));

    services.map((service) => {
        const row = document.createElement("tr");
        row.id = `row${service.id}`;
        row.innerHTML = `
            <td>${service.id}</td>
            <td>${service.date}</td>
            <td>${service.service}</td>
            <td>${service.status}</td>
            <td>${service.price}</td>
            <td>${service.deadline}</td>
            <td id="deleterow${service.id}" onclick="deleteRow('row${service.id}')"><button type="button" class="btn btn-danger">Delete</button></td>
        `;

        const tbody = document.querySelector("#serviceRequests tbody");
        tbody.appendChild(row);
    })

    
    
});

let id = 3;

let deadlineDate;

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
    1: 5, // User Support
    2: 10, // IT Infrastructure
    3: 15, // Data Security
    4: 7, // System Installation
    5: 12 // IT Outsourcing
};

function updateServicePrice() {
    const serviceDropdown = document.getElementById('inputService');
    const selectedService = serviceDropdown.value;
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

    const estimatedDateLabel = document.getElementById('estimatedDate');
    deadlineDate = `${calculateEstimatedDate(serviceDeadlines[selectedService])}`
    if (selectedService in serviceDeadlines) {
      estimatedDateLabel.textContent = `${calculateEstimatedDate(serviceDeadlines[selectedService])}`;
    } else {
      estimatedDateLabel.textContent = '-';
    }

    const statusLabel = document.getElementById('serviceStatus');
    statusLabel.textContent = `In Progress`;
}

function deleteRow(rowId) {
    const row = document.getElementById(rowId);
    if (row && confirm('Are you sure you want to delete this row?')) {
        row.parentNode.removeChild(row);
    }
}

function calculateEstimatedDate(deadlineDays) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + deadlineDays);
    return currentDate.toLocaleDateString();
}

function addServiceRequest() {
    const serviceDropdown = document.getElementById('inputService');
    const selectedService = serviceDropdown.value;
    const name = `${serviceNames[selectedService]}`;
    const status = `In Progress`;
    const price = `${servicePrices[selectedService].toFixed(2)}`;
    const deadline = `${serviceDeadlines[selectedService]}`;
    const currentDate = new Date().toLocaleDateString();

    const row = document.createElement("tr");
    row.id = `row${id + 1}`;
    row.innerHTML = `
        <td>${id + 1}</td>
        <td>${currentDate}</td>
        <td>${name}</td>
        <td>${status}</td>
        <td>${price}</td>
        <td>${deadlineDate}</td>
        <td id="deleterow${id + 1}" onclick="deleteRow('row${id + 1}')"><button type="button" class="btn btn-danger">Delete</button></td>
    `;

    const tbody = document.querySelector("#serviceRequests tbody");
    tbody.appendChild(row);
    
    id++;
}
