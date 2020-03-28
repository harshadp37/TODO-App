/* Set the DEADLINE as it should contains dates from today onwards */
var datePicker = document.querySelector('#deadline');
var today = new Date();
datePicker.min = today.getFullYear() + '-' + (today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate());

let checkCount = 0;

/* Show DELETE BUTTON when at least one checkbox is selected for delete if not then hide */
function atleastOneCheck(e) {
    if(e.target.checked){
        checkCount++;
    }else{
        checkCount--;
    }
    console.log(checkCount)
    if(checkCount == 0){
        let deleteBtn = document.querySelector('.deleteBtn');
        deleteBtn.style.height = "0";
        deleteBtn.style.padding = "0";
    }else{
        let deleteBtn = document.querySelector('.deleteBtn');
        deleteBtn.style.height = "50px";
        deleteBtn.style.padding = "8px";
    }
}