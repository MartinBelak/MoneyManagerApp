

 
  
function Overview(){

var months = JSON.parse(localStorage.getItem('StoredMonths'));
months.forEach(DisplayMonths);

function DisplayMonths(item){
 document.getElementById("AllMonths").innerHTML += item.name +"<br>"+ "income:"+ item.income + "<br>"+"outcome:"+item.outcome;
}
    
    


// var Months =[];

// var month = {
//     name:"Oktober",
//     income:0,
//     outcome:500
// }

// Months.push(month);

// localStorage.setItem('StoredMonths',JSON.stringify(Months));

}



function MainIndex(){


var Months = JSON.parse(localStorage.getItem('StoredMonths'));

var lastMonth = Months.length;

var income = Months[lastMonth-1].income;
var outcome = Months[lastMonth-1].outcome
var balance = income - outcome;



window.onload = GetIncome(),GetOutcome(),GetBalance(),GetMonthName();


function GetMonthName(){
    document.getElementById("month").append(Months[lastMonth-1].name);
}

function GetIncome() {
    
    document.getElementById("green").append(Months[lastMonth-1].income);
}
function GetOutcome() {
   
    document.getElementById("red").append(Months[lastMonth-1].outcome);
}
function GetBalance() {
    document.getElementById("balance").append(balance);
}
}
