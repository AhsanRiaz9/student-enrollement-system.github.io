// this function will clear the form data and set default fields
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('website').value = '';
    document.getElementById('imageLink').value = '';
    document.getElementById('male').checked = true;
    document.getElementById('female').checked = false;
    document.getElementById('java').checked = true;
    document.getElementById('html').checked = false;
    document.getElementById('css').checked = false;
}

// this function get data of form then create a student object, then check if the student data is valid or not
// if there is no error, then it will update the table, otherwise show alert of error message on screen 
function addStudent() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let website = document.getElementById('website').value;
    let imageLink = document.getElementById('imageLink').value;
    let maleFlag = document.getElementById('male').checked;
    let femaleFlag = document.getElementById('female').checked;
    let java = document.getElementById('java').checked;
    let html = document.getElementById('html').checked;
    let css = document.getElementById('css').checked;
    let gender = 'Male';
    if (femaleFlag == true) {
        gender = 'Female'
    }
    let skills = '';
    if (java == true) {
        skills = 'Java';
    }
    if (html == true) {
        if (skills.length > 0) {
            skills = skills + ', ';
        }
        skills = skills + 'HTML';
    }
    if (css == true) {
        if (skills.length > 0) {
            skills = skills + ', ';
        }
        skills = skills + 'CSS';
    }
    //create student object
    let std = { 'name': name, 'email': email, 'website': website, 'imageLink': imageLink, 'gender': gender, 'skills': skills };
    console.log(std);            //testing
    let error =checkError(std); 
    // check error 
    if (error.length==0) {
        updateTable(std);
    }
    else{
        // display error messages
        alert(error);
    }
}

// this function will check if all then input fields are valid or not
// if there is any errror, then it will return error message
function checkError(std) {
    let error = '';
    if(std.name=='') {
        error = error + `Name field can't be empty.\n`; 
    }
    if(std.email=='')
    {
        error = error + `Email field can't be empty.\n`;
    }
    else if(std.email.indexOf('.')==-1 || std.email.indexOf('@')==-1)
    {
        error = error + 'Please enter a valid email.\n'
    }
    if(std.website==''){
        error = error + `Website field can't be empty.\n`;
    }
    else if(std.website.indexOf('.')==-1)
    {
        error = error + 'Please enter a valid website.\n';
    }
    if(std.imageLink==''){
        error = error + `Image Link field can't be empty.\n`;
    }
    return error;
}

// this function will add new row in table with id = registeredStd, it used data of std object to insert new row
function updateTable(std) {
    let table = document.getElementById("registeredStd");
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.className = "descCol";
    cell2.className = "imageCol";
    cell1.innerHTML = `<div>
    <p class='name'>${std.name}</p>
        <p>${std.gender}</p>
        <p><a href='http://${std.website}' target='_blank'>${std.website}</a></p>
        <p>${std.skills}</p>
    </div>`;
    cell2.innerHTML = `<img src='${std.imageLink}' />`;
    // use fade in effect
    $('#registeredStd tr:last').css('display', 'none');
    $('#registeredStd tr:last').fadeIn('slow').delay(2000);   
}