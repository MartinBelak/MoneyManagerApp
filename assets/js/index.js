

 
  
function Overview(){
// window.onload(DisplayMonths)
var months = JSON.parse(localStorage.getItem('StoredMonths'));
console.log(months);


months.forEach(DisplayMonths);




var globalId;
function DisplayMonths(item){ 
     
var newElement = document.createElement('div');
newElement.innerHTML = '<div class="col-sm-1   text-center id="22"  "><div class="border">'+item.name+'<br> Income:'+item.income+'<br> Outcome:'+item.outcome+'<br><input type="button" id='+item.id+'  value="Select Month" " /> </div></div>';
newElement.onclick= function(){
    globalId= item.id
    console.log(globalId);
    months.forEach(Compare)
}, 

document.getElementById("AllMonths").appendChild(newElement);

}
   

    
function Compare(month){
    console.log("month id is :"+month.id);
    console.log("id of element is "+globalId)
    if (month.id==globalId) {
        console.log(month);
        var SelectedMonth = month;
        localStorage.setItem('SelectedMonth',JSON.stringify(SelectedMonth));
    }
}



//  var Months =[];

// var month = {
//     id:1,
//     name:"Oktober",
//     income:0,
//     outcome:500,
//     isSelected:false
// }

// var month2 = {
//     id:2,
//     name:"December",
//     income:0,
//     outcome:500,
//     isSelected:false
// }

// Months.push(month,month2);

// localStorage.setItem('StoredMonths',JSON.stringify(Months));

}



function MainIndex(){

var SelectedMonth = JSON.parse(localStorage.getItem('SelectedMonth'));
console.log(SelectedMonth);

var income = SelectedMonth.income;
var outcome = SelectedMonth.outcome
var balance = income - outcome;



window.onload = GetIncome(),GetOutcome(),GetBalance(),GetMonthName();


function GetMonthName(){
    document.getElementById("month").append(SelectedMonth.name);
}

function GetIncome() {
    
    document.getElementById("green").append(income);
}
function GetOutcome() {
   
    document.getElementById("red").append(outcome);
}
function GetBalance() {
    document.getElementById("balance").append(balance);
}
}
