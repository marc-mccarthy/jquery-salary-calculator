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
        totalSalaries();
        emptyInputs();
    }
}

function assembleTable() {
    let el = $('#tableStart');
    el.empty();
    el.append(`<tr id="tableHeaders"><th scope="col" id="firstNameCol">First Name</th><th scope="col" id="lastNameCol">Last Name</th><th scope="col" id="idCol">ID</th><th scope="col" id="titleCol">Title</th><th scope="col" id="annualSalaryCol">Annual Salary<th></tr>`);
    for (i = 0; i < employees.length; i++) {
        el.append(`<tr class="employeeRow" id="index${i}"><td id="firstNameEmployee${i}">${employees[i].firstName}</td><td id="lastNameEmployee${i}">${employees[i].lastName}</td><td id="idEmployee${i}">${employees[i].id}</td><td id="titleEmployee${i}">${employees[i].title}</td><td id="annualSalaryEmployee${i}">$${employees[i].annualSalary}</td><td class="deleteEmployee"><button class="deleteButton" data-index="${i}">Delete</button></td></tr>`);
    }
}

function totalSalaries() {
    let el = $('#totalSalaries');
    el.empty();
    let totalSalaries = 0;
    for (i = 0; i < employees.length; i++) {
        totalSalaries += Number(employees[i].annualSalary);
    }
    el.append(`Total Monthly: $${totalSalaries.toFixed(2)}`);
    if (totalSalaries > 20000) {
        $('#totalSalaries').css('background-color', 'red');
    }
}

function emptyInputs() {
    $('#firstNameInput').val('');
    $('#lastName').val('');
    $('#idInput').val('');
    $('#titleInput').val('');
    $('#annualSalaryInput').val('');
}

function deleteEmployee() {
    employees.splice($(this).data('index'), 1);
    assembleTable();
    totalSalaries();
}