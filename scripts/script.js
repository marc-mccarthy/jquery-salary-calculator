$(document).ready(onReady);

function onReady() {
    $('#addEmployeeButton').on('click', addEmployee);
    $('#tableStart').on('click', '.deleteButton', deleteEmployee)
}

let employees = [];

function addEmployee() {
    let firstName = $('#firstNameInput').val();
    let lastName = $('#lastName').val();
    let id = $('#idInput').val();
    let title = $('#titleInput').val();
    let annualSalary = $('#annualSalaryInput').val();
    if (firstName === '' || lastName === '' || id === '' || title === '' || annualSalary === '') {
        alert('Forgot something...');
    } else {
        let newEmployee = {
            firstName: $('#firstNameInput').val(),
            lastName: $('#lastNameInput').val(),
            id: $('#idInput').val(),
            title: $('#titleInput').val(),
            annualSalary: $('#annualSalaryInput').val(),
        }
        employees.push(newEmployee);
        assembleTable();
        monthlySalaries();
        emptyInputs();
    }
}

function assembleTable() {
    let el = $('#tableBody');
    el.empty();
    for (i = 0; i < employees.length; i++) {
        el.append(`<tr class="employeeRow" id="index${i}"><td id="firstNameEmployee${i}">${employees[i].firstName}</td><td id="lastNameEmployee${i}">${employees[i].lastName}</td><td id="idEmployee${i}">${employees[i].id}</td><td id="titleEmployee${i}">${employees[i].title}</td><td class="annualSalaryEmployees" id="annualSalaryEmployee${i}">$${numberWithCommas(employees[i].annualSalary)}</td><td class="deleteEmployee"><button class="deleteButton" data-id="${i}">Delete</button></td></tr>`);
    }
    let el2 = $('#tableFoot')
    el2.append();
    el2.append('<><tr></tr>')
}

function monthlySalaries() {
    let el = $('#monthlySalaries');
    el.empty();
    let monthlySalaries = 0;
    for (i = 0; i < employees.length; i++) {
        monthlySalaries += ((Number(employees[i].annualSalary)) / 12);
    }
    el.append(`Total Monthly: $${numberWithCommas(monthlySalaries.toFixed(2))}`);
    if (monthlySalaries > 20000) {
        $('#monthlySalaries').css('background-color', 'red');
    }
}

function emptyInputs() {
    $('#firstNameInput').val('');
    $('#lastNameInput').val('');
    $('#idInput').val('');
    $('#titleInput').val('');
    $('#annualSalaryInput').val('');
}

function deleteEmployee() {
    employees.splice($(this).data('id'), 1);
    assembleTable();
    totalSalaries();
}

function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}