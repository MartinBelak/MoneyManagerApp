

 function AddMonth(){
    var Name =document.getElementById("Name").value;
    var Income = document.getElementById("Income").value;
    console.log(Name,Income);
    var months = JSON.parse(localStorage.getItem('StoredMonths'));
    console.log(months);
    if (months==null) {
        
        var month={
       
            id:1,
            name:Name,
            income:Income,
            outcome:0,
            expenses:{
                "food":200,
                "rent":400
            }
        }
        var months =[]
        months.push(month);
        localStorage.setItem('StoredMonths',JSON.stringify(months));
        location.reload();
    }
    else{
    var month={
              id:months.length+1,
              name:Name,
              income:Income,
              outcome:0,
              expenses:{ 
                  "food":200,
                  "rent":400

                        }

              };
          months.push(month);
          localStorage.setItem('StoredMonths',JSON.stringify(months));
          location.reload();
    }
}


  
function Overview(){
// window.onload(DisplayMonths)
var months = JSON.parse(localStorage.getItem('StoredMonths'));
console.log(months);

// months.pop();
// localStorage.setItem('StoredMonths',JSON.stringify(months));

months.forEach(DisplayMonths);




var globalId;
function DisplayMonths(item){ 
     
var newElement = document.createElement('div');
newElement.innerHTML = '<div class="col-sm-3   text-center id="22"  "><div class="border">'+item.name+'<br> Income:'+item.income+'<br> Outcome:'+item.outcome+'<br><input type="button" id='+item.id+'  value="Select Month" " /> <input type="button" id='+item.name+'  value="Remove Month" " /> </div></div>';
document.getElementById("AllMonths").appendChild(newElement);
document.getElementById(item.id).onclick= function(){
    globalId= item.id
    console.log(globalId);
    months.forEach(Compare)
};
document.getElementById(item.name).onclick= function(){
    globalId= item.name
    console.log(globalId);
    months.forEach(Remove)
};

}
   
function Remove(month){
    console.log("month name is :"+month.name);
    console.log("id of element is "+globalId)
    if (month.name==globalId) {
        console.log(month);
        var index =months.indexOf(month);
        months.splice(index,1);
        localStorage.setItem('StoredMonths',JSON.stringify(months));
        location.reload();
    }
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





//    var Months =[];



// var month2 = {
//     id:2,
//     name:"December",
//     income:0,
//     outcome:500,
//     isSelected:false
// }

// Months.push(month,month2);

//  localStorage.setItem('StoredMonths',JSON.stringify(Months));

}

function AddCategory(){
    var selectedEl = document.getElementById("select");
    var CatName = selectedEl.options[selectedEl.selectedIndex].text;
   
    var amount= document.getElementById("amount").value;

    var SelectedMonth = JSON.parse(localStorage.getItem('SelectedMonth'));

    SelectedMonth.expenses[CatName] = amount;
    localStorage.setItem('SelectedMonth',JSON.stringify(SelectedMonth));
    location.reload();

}


function MainIndex(){

var SelectedMonth = JSON.parse(localStorage.getItem('SelectedMonth'));
console.log(SelectedMonth);

var income = SelectedMonth.income;
var outcome = SelectedMonth.outcome
var balance = income - outcome;



window.onload = GetIncome(),GetBalance(),GetMonthName(),ShowExpenses(),PopulateExpensesDropDown();


function GetMonthName(){
    document.getElementById("month").append(SelectedMonth.name);
}

function GetIncome() {
    
    document.getElementById("green").append(income);
}




function GetOutcome() {
   var expenses = SelectedMonth.expenses;
   var total = 0;
   for (var key in expenses){
       var text = expenses[key]     
       num = parseInt(text,10);
       total= total + num;           
   }
  
    document.getElementById("red").append(total);
    return (total)
}

function GetBalance() {
    document.getElementById("balance").append(income-GetOutcome());
}

function ShowExpenses(){

    var expenses = SelectedMonth.expenses;
    var total = 0;
    for (var key in expenses){

     var newElement = document.createElement('tr');
     newElement.innerHTML = '<td> ' + key + ': ' +expenses[key] + ' </td>';
     document.getElementById("expenses").append(newElement)

              
    }


    
}


function PopulateExpensesDropDown(){
    var select = document.getElementById('select');
    var options =[];
    var expenses = SelectedMonth.expenses;
    for (var key in expenses){
        options.push(key)
    }
    
    for (var i =0; i<options.length; i++){
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent=opt;
        el.value=opt;
        select.appendChild(el);
    }
}


}
