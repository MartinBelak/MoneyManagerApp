//Functionality
function AddMonth(){
    var Name =document.getElementById("Name").value;
    var Income = document.getElementById("Income").value;
    
    var months = JSON.parse(localStorage.getItem('StoredMonths'));
    if(Income==0){
        Income=0;
    } 
    if (Name ==""){
        //if its the first month being created set id to 1 to use it as a name
        if(months==null){
            var textId=1
        }
        else{
            //otherwise get maxID and increment id by 1
           var maxId = GetMaxId(months);          
           textId = maxId+1;
        }
        
        Name = textId +"."       
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
    var index = FindIndexById(months,Id)
    var SelectedMonth = months[index]; 

    localStorage.setItem('SelectedMonth',JSON.stringify(SelectedMonth));
    window.location.href = '../MoneyManagerApp/index.html';
}

function Delete(MonthId){
    var months = JSON.parse(localStorage.getItem('StoredMonths'));
    var SelectedMonth = JSON.parse(localStorage.getItem('SelectedMonth'));      
    var index = FindIndexById(months,MonthId)
    months.splice(index,1);

    
    if(SelectedMonth!=null){
        //delete selected month if it exist to prevent phantom read 
        if(SelectedMonth.id===MonthId)
        {
           localStorage.setItem('SelectedMonth',null);                       
        }
    }
            
    localStorage.setItem('StoredMonths',JSON.stringify(months));         
    location.reload();     
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

    //calculate new total for outcomes
    var Total = GetTotalForCurrentExpenses(SelectedMonth);        
    SelectedMonth.outcome=Total;
    localStorage.setItem('SelectedMonth',JSON.stringify(SelectedMonth));
   
    var index = FindIndexById(months,SelectedMonth.id)      
    months[index] = SelectedMonth;
            
    localStorage.setItem('StoredMonths',JSON.stringify(months));
    location.reload();   
}

function AddNewExpenseCategory(){
    var months = JSON.parse(localStorage.getItem('StoredMonths'));
    var SelectedMonth = JSON.parse(localStorage.getItem('SelectedMonth'));
    var NewCategoryName = document.getElementById('NewCategory').value;
    
    SelectedMonth.expenses[NewCategoryName]=0;
    
    localStorage.setItem('SelectedMonth',JSON.stringify(SelectedMonth));

    var index = FindIndexById(months,SelectedMonth.id)
    months[index] = SelectedMonth
    localStorage.setItem('StoredMonths',JSON.stringify(months));
    location.reload();   
}

function DeleteExpense(elem){
    // name of the expense is stored in id of the element
    var result = confirm("Do you want to delete this expense ?"); 
    if(result){
        var months = JSON.parse(localStorage.getItem('StoredMonths'));
        var SelectedMonth = JSON.parse(localStorage.getItem('SelectedMonth')); 
        SelectedMonth.expenses[elem.id]=0;
        SelectedMonth.outcome = GetTotalForCurrentExpenses(SelectedMonth);
        localStorage.setItem('SelectedMonth',JSON.stringify(SelectedMonth));
        var index = FindIndexById(months,SelectedMonth.id)
        months[index] = SelectedMonth
        localStorage.setItem('StoredMonths',JSON.stringify(months));
        location.reload();
    }    
}

function DeleteCategory(elem){
    var months = JSON.parse(localStorage.getItem('StoredMonths'));
    var SelectedMonth = JSON.parse(localStorage.getItem('SelectedMonth')); 
    delete SelectedMonth.expenses[elem.id];
    localStorage.setItem('SelectedMonth',JSON.stringify(SelectedMonth));
    var index = FindIndexById(months,SelectedMonth.id)
    months[index] = SelectedMonth
    localStorage.setItem('StoredMonths',JSON.stringify(months));
    location.reload();
}

//Main functions
function Overview() {   
    var months = JSON.parse(localStorage.getItem('StoredMonths'));   
    var TotalBalance = 0;
   
    if(months==null||months.length==0){
        document.getElementById('Heading').innerHTML="";
    }
    else{

        months.forEach(DisplayMonths);
        GetTotalBalance();

        function DisplayMonths(item){ 
            var Income = item.income;
            var Outcome = item.outcome;
            var Balance = Income-Outcome;
            TotalBalance+= Balance;
            var newElement = document.createElement('div');
            newElement.className='col-sm-3 text-center';
            //creating single Month element here- nicer example of this can be found on Overview.html as commented example
            newElement.innerHTML = '<div class="border"> <div class="bold">'+item.name+'</div> <div class="space"> Income: <div class="green" > ' + Income+'</div></div> <br> <div class="space"> Outcome: <div class="red"> '+Outcome+'</div> </div> <div id=balance> Balance: '+Balance+'</div>  <input type="button" class="btn btn-success" onclick="Select('+item.id+')" id='+item.id+'  value="Select Month" " /> <input type="button" class="btn btn-danger" onclick="Delete('+item.id+')" id='+item.name+'  value="Remove Month" " /> </div>';
            document.getElementById("AllMonths").appendChild(newElement);

        }

        function GetTotalBalance(){
            var newElement = document.createElement('div');
            if(TotalBalance>=0||TotalBalance==null){
                newElement.className='green';
            }
            else{
                newElement.className='red';
            }
                       
            newElement.innerHTML=TotalBalance
            document.getElementById("TotalBalance").appendChild(newElement);
            
        }
    }

}

function MainIndex(){     
    var SelectedMonth = JSON.parse(localStorage.getItem('SelectedMonth'));  
    if(SelectedMonth==undefined){ 
        //if no month is selected show message with instructions       
        document.getElementById('MainPage').innerHTML="";       
        var newElement = document.createElement('div');
        newElement.className='jumbotron';
        newElement.innerHTML='<h2>Start by Selecting or Creating new Month in Overview Page</h2>'
        document.getElementById('MainPage').appendChild(newElement);
        
    }
    else{
   
        var income = SelectedMonth.income;
        var outcome = SelectedMonth.outcome
        var balance = income - outcome;

        window.onload = GetIncome(),GetOutcome(), GetBalance(),GetMonthName(),ShowExpenses(),PopulateExpensesDropDown();

        function GetMonthName(){
            document.getElementById("month").append(SelectedMonth.name);
        }

        function GetIncome() {        
            document.getElementById("green").append(income);
        }

        function GetOutcome() {       
            var Total = GetTotalForCurrentExpenses(SelectedMonth);    
            document.getElementById("red").append(Total);       
        }

        function GetBalance() {
            var newElement = document.createElement('div');
            if(balance>=0){
                newElement.className='green';
            }
            else{
                newElement.className='red';
            }
                       
            newElement.innerHTML=balance
            document.getElementById("balance").appendChild(newElement);
                  
        }

    
        function ShowExpenses(){      
            var expenses = SelectedMonth.expenses;  
            var ElementToAppend ="";     
            for (var key in expenses){
                var Expense = parseInt(expenses[key],10);
                //if the expense holds value render delete value button, render delete category otherwise
                if(Expense>0){
                    ElementToAppend= '<td> ' + key + ': ' +expenses[key] + ' <button class="btn btn-warning btn-sm" id="'+key+'" onclick="DeleteExpense(this)" >Delete Expense</button> </td>'
                }
                else{
                    ElementToAppend ='<td> ' + key + ': ' +expenses[key] + ' <button class="btn btn-danger btn-sm" id="'+key+'" onclick="DeleteCategory(this)" >Delete Category</button> </td>'
                }
                //populate table that shows category name and total in that category 
                var newElement = document.createElement('tr');
                newElement.innerHTML = ElementToAppend;
                document.getElementById("expenses").append(newElement);                
            }         

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

//Utility functions
function FindIndexById(months,Id){
 var Index=0;
    months.forEach((month,index)=> {
        if(month.id === Id){
          Index = index;
        }
    });
   return Index
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

function GetTotalForCurrentExpenses(Month){
    var Total =0;
    for (var key in Month.expenses){
        var ExpenseAsString = Month.expenses[key]     
        var ExpenseAsInt = parseInt(ExpenseAsString,10);
        Total+=ExpenseAsInt;           
    }    
    return Total   
}

