class User {
    constructor(email, name, password, confirmPassword, phone, birthday, cpf, education, status_civil, login, origin) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.phone = phone;
        this.birthday = birthday;
        this.cpf = cpf;
        this.education = education;
        this.status_civil = status_civil;
        this.login = login;
        this.origin = origin;
    }
}

function changePage() {
    let email = document.getElementById('inputEmail').value;
    let name = document.getElementById('inputName').value;
    let password = document.getElementById('inputPassword4').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let phone = document.getElementById('inputPhone').value;
    let birthday = document.getElementById('inputBirthday').value;
    let cpf = document.getElementById('inputCpf').value;
    let education = document.getElementById('inputEducation').value;
    let status_civil = document.querySelector('input[name="inlineRadioOptions"]:checked').value;


    const user = new User(email, name, password, confirmPassword, phone, birthday, cpf, education, status_civil, false, "register");
    localStorage.setItem('user', JSON.stringify(user));
    console.log("inserindo no localStorage:", user);

    $('.modal-body').text('Validação realizada com sucesso');
    $('#modalLabel').text('Sucesso');
    $('#validationModal').modal('show');
}

function goBack() {
    window.history.back();
}

function maskCPF(input) {
    let cpf = input.value;

    // Remove tudo o que não é dígito
    cpf = cpf.replace(/\D/g, '');

    // Aplica a máscara de CPF
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    // Limita o tamanho do CPF a 14 caracteres (incluindo pontos e traço)
    cpf = cpf.substring(0, 14);

    // Atualiza o valor do input com o CPF formatado
    input.value = cpf;
}

function maskDate(input) {
    let date = input.value;

    // Remove tudo o que não é dígito
    date = date.replace(/\D/g, '');

    // Aplica a máscara de data: DD/MM/AAAA
    date = date.replace(/(\d{2})(\d)/, '$1/$2'); // Insere a barra após o dia
    date = date.replace(/(\d{2})(\d)/, '$1/$2'); // Insere a barra após o mês

    // Limita o tamanho da data a 10 caracteres (incluindo as barras)
    date = date.substring(0, 10);

    // Atualiza o valor do input com a data formatada
    input.value = date;
}

function maskPhone(input) {
    let phone = input.value;

    // Remove tudo o que não é dígito
    phone = phone.replace(/\D/g, '');

    // Aplica a máscara de telefone
    phone = phone.replace(/^(\d{2})(\d)/, '($1) $2'); // Coloca parênteses em torno dos dois primeiros dígitos (código de área)
    phone = phone.replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona hífen depois dos quatro primeiros dígitos do número

    // Limita o tamanho do telefone para adequar-se ao formato
    phone = phone.substring(0, 15); // (XX) XXXXX-XXXX tem 15 caracteres

    // Atualiza o valor do input com o telefone formatado
    input.value = phone;
}

function checkCpf(input) {

    let cpf = input.value

    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    
    input.setCustomValidity("");
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf))
        input.setCustomValidity('Please enter a valid CPF number.'); // Verifica se tem tamanho 11 ou se é uma sequência de dígitos iguais
        console.log(cpf);
    let soma = 0, resto;

    // Verifica o primeiro dígito verificador
    for (let i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11))
        resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10)))
        input.setCustomValidity('Please enter a valid CPF number.');

    soma = 0;
    // Verifica o segundo dígito verificador
    for (let i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11))
        resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11)))
        input.setCustomValidity('Please enter a valid CPF number.');

    return true;
}

function checkAge(input) {
    const birthdateValue = input.value;
    const parts = birthdateValue.split('/'); // Divide a string da data em partes
    if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Mês no JavaScript começa em 0
        const year = parseInt(parts[2], 10);
        const birthdate = new Date(year, month, day); // Cria um objeto Date
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();

        let age = currentYear - year; // Calcula a diferença dos anos
        // Ajusta a idade baseando-se no mês e dia
        if (month > currentMonth || (month === currentMonth && day > currentDay)) {
            age--;
        }

        if (age < 18) {
            input.setCustomValidity('You must be at least 18 years old.'); // Configura a validade do input para falso
        } else {
            input.setCustomValidity(''); // Limpa a validade do input
        }
    } else {
        document.getElementById('ageError').textContent = 'Invalid date format. Please use DD/MM/YYYY.';
        document.getElementById('ageError').style.display = 'block';
        input.setCustomValidity('Invalid date format. Please use DD/MM/YYYY.'); // Configura a validade do input para falso
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
    const password = document.getElementById("inputPassword4").value;
    input.setCustomValidity("");
    if (!(password === confirmPassword)) {
        input.setCustomValidity("Passwords do not match. Please try again.");
    }
}

function clearFields() {
    document.getElementById('inputEmail').value = '';
    document.getElementById('inputName').value = '';
    document.getElementById('inputPassword4').value = '';
    document.getElementById('confirmPassword').value = '';
    document.getElementById('inputPhone').value = '';
    document.getElementById('inputBirthday').value = '';
    document.getElementById('inputCpf').value = '';
    document.getElementById('inputEducation').value = 3;
    document.getElementById('inlineRadio1').checked = true;
    
    document.getElementById('inputEmail').focus();
}
