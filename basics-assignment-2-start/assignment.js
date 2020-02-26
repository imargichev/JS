const task3Element = document.getElementById('task-3');

const userBtnName = document.getElementById('btnDisplayName');
const userInput = document.getElementById('nameForAlertFunc');

const firstName = document.getElementById('firstName');
const secondName = document.getElementById('secondName');
const famalyName = document.getElementById('familyName');

alert("test!");

function outputNameWithAlert(){
    let userText = userInput.value;
    alert(userText);
}

function alertTest(){
alert("Test!")
}

function concatNames(){
    alert(firstName.value + " " + secondName.value + " " + famalyName.value);
}




userBtnName.addEventListener('click' , outputNameWithAlert);
task3Element.addEventListener('click',alertTest);
concatName.addEventListener('click',concatNames)