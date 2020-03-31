

function AddMonth(){
    var Name =document.getElementById("Name").value;
    var Income = document.getElementById("Income").value;
    
    var months = JSON.parse(localStorage.getItem('StoredMonths'));
    console.log(months);   
    if (Name ==""){
       
        if(months==null){
            var textId=1
        }
        else{

           var maxId = GetMaxId(months);          
           textId = maxId+1;
        }
        
        Name = textId +"."
        console.log(Name,Income);
    }   
    if (months==null) {
       
        var month={
             
            id:1,
            name:Name,
            income:Income,
            outcome:0,     
            expenses:{ }
        }
        var months =[]
        months.push(month);
        localStorage.setItem('StoredMonths',JSON.stringify(months));
        
    }
    else{
    var maxId = GetMaxId(months);
    var month={
              id:maxId+1,
              name:Name,
              income:Income,
              outcome:0,
              expenses:{}

              };
          months.push(month);
          localStorage.setItem('StoredMonths',JSON.stringify(months));
          
    }
    location.reload();
}


function Select(Id){
    var months = JSON.parse(localStorage.getItem('StoredMonths'));
    console.log("month id is :"+Id);
    var index = FindIndexById(months,Id)
    var SelectedMonth = months[index]; 
    console.log(index);
    localStorage.setItem('SelectedMonth',JSON.stringify(SelectedMonth));
}

function Delete(MonthId){
    var months = JSON.parse(localStorage.getItem('StoredMonths'));
    var SelectedMonth = JSON.parse(localStorage.getItem('SelectedMonth'));   
    
    var index = FindIndexById(months,MonthId)
    var RemovedMonth = months.splice(index,1);
   

    if(SelectedMonth.id===RemovedMonth)
    {
        localStorage.setItem('SelectedMonth',null);                       
    }
            
localStorage.setItem('StoredMonths',JSON.stringify(months));         
location.reload();     
}

function Overview() {
     // window.onload(DisplayMonths)
    var months = JSON.parse(localStorage.getItem('StoredMonths'));
    var SelectedMonth = JSON.parse(localStorage.getItem('SelectedMonth'));
    console.log(months);






    
    months.forEach(DisplayMonths);




    var globalId;
    function DisplayMonths(item){ 
     
    var newElement = document.createElement('div');
    newElement.innerHTML = '<div class="col-sm-3   text-center id="22"  "><div class="border">'+item.name+'<br> Income:'+item.income+'<br> Outcome:'+item.outcome+'<br><input type="button" onclick="Select('+item.id+')" id='+item.id+'  value="Select Month" " /> <input type="button" onclick="Delete('+item.id+')" id='+item.name+'  value="Remove Month" " /> </div></div>';
    document.getElementById("AllMonths").appendChild(newElement);
    // document.getElementById(item.id).onclick= function(){
    // globalId= item.id
    // console.log(globalId);
    // months.forEach(Compare)};

    // document.getElementById(item.name).onclick= function(){
    // globalId= item.name
    // console.log(globalId);
    // months.forEach(Remove)}
}
     

}

function AddExpense(){
    var selectedEl = document.getElementById("select");
    var CatName = selectedEl.options[selectedEl.selectedIndex].text;  
    var amount= document.getElementById("amount").value;
    var SelectedMonth = JSON.parse(localStorage.getItem('SelectedMonth'));
    var months = JSON.parse(localStorage.getItem('StoredMonths'));
    var OriginalAmount = SelectedMonth.expenses[CatName];
    var NewTotalExpenesAmount = +OriginalAmount + +amount; 

    SelectedMonth.expenses[CatName] =  NewTotalExpenesAmount;
    localStorage.setItem('SelectedMonth',JSON.stringify(SelectedMonth));
   
    var index = FindIndexById(months,SelectedMonth.id)      
    months[index] = SelectedMonth;
    months[index].outcome = NewTotalExpenesAmount;
        
    
    localStorage.setItem('StoredMonths',JSON.stringify(months));
    
    
    console.log(months)
    location.reload();
    

}

function MainIndex(){

   
    var SelectedMonth = JSON.parse(localStorage.getItem('SelectedMonth'));
    if(SelectedMonth==null)

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

function AddNewExpenseCategory(){
    var NewCategory = document.getElementById('NewCategory').value;
    
}

function ClearLocalStorage(){
    localStorage.clear();
    location.reload();
}
function PopulateLocalStorage(){

    var Months =[];

    var month1 = {
        id:1,
        name:"November",
        income:3000,
        outcome:500,      
        expenses:{
            "food":200, 
            "rent":400
        }
    }

    var month2 = {
        id:2,
        name:"December",
        income:2000,
        outcome:500,
       
        expenses:{
            "food":0,
            "rent":400
        }
    }

    Months.push(month1,month2);
    
    localStorage.setItem('StoredMonths',JSON.stringify(Months));
    location.reload();
     
}
function GetMaxId(months){
    var maxId=0;
    months.map(function(month){
        if(month.id> maxId){
            maxId = month.id ;
        }
    })
    return maxId;
}

function FindIndexById(months,Id){
 var Index=0;
    months.forEach((month,index)=> {
        if(month.id === Id){
          Index = index;
        }
    });
   return Index
}

    

