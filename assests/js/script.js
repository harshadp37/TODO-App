/* SET THE DEADLINE AS IT SHOULD SHOW DATES FROM TODAY ONWARDS */
var datePicker = document.querySelector('#deadline');
var today = new Date();
datePicker.min = today.getFullYear() + '-' + (today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate());

let checkCount = 0;

/* SHOW DELETE BUTTON WHEN AT LEAST ONE CHECKBOX IS SELECTED FOR DELETION IF NOT THEN HIDE BUTTON */
function atleastOneCheck(e) {
    if(e.target.checked){
        checkCount++;
        e.target.parentElement.previousElementSibling.style.textDecorationLine = "line-through";
        e.target.parentElement.firstElementChild.style.textDecorationLine = "line-through";
    }else{
        checkCount--;
        e.target.parentElement.previousElementSibling.style.textDecorationLine = "none";
        e.target.parentElement.firstElementChild.style.textDecorationLine = "none";
    }
    if(checkCount == 0){
        let deleteBtn = document.querySelector('.deleteBtn');
        deleteBtn.style.height = "0";
    }else{
        let deleteBtn = document.querySelector('.deleteBtn');
        deleteBtn.style.height = "40px";
    }
}