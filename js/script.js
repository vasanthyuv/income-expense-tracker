const balance = document.querySelector("#balance");
const description = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const incomeamount = document.querySelector("#income-amt");
const expenseamount = document.querySelector("#exp-amt");
const trans = document.querySelector("#trans");
const form = document.querySelector("#form");


/*const dummydata =[
    {id:1,description:"flower",amount:-20},
    {id:2,description:"gift",amount:60},
    {id:3,description:"petrol",amount:-200},
    {id:4,description:"purchase",amount:-100},
    {id:5,description:"Rent",amount:300}
]

let transactions = dummydata;*/
function loadtransactiondetails(transactions){
    const sign=transactions.amount<0?"-":"+";
    console.log(transactions,sign);
    const item=document.createElement("li");
    item.classList.add(transactions.amount<0?"exp":"inc");
   
    item.innerHTML=`
    ${transactions.description}
    <span>${sign} ${Math.abs(transactions.amount)}</span>
    <button class="btn-del" onclick="removetrans(${transactions.id})">x</button>
    
    `;
    trans.appendChild(item);
  
}
 
function config(){
    trans.innerHTML="";
    transactions.forEach(loadtransactiondetails);
    updateamount();

}

window.addEventListener("load",function(){
    config();
}) 
function removetrans(id){
   console.log(id);
   let fil = transactions.filter(idd=>id!=idd.id);
   console.log(fil);
   transactions=fil;
   config();
   updatelocalstorage();
}

 
function updateamount(){
    
     const amounts = transactions.map((transaction) => transaction.amount);
    console.log("amount",amounts);
    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

    balance.innerHTML=`&#8377; ${total}`
  
    const income = amounts.filter((item)=>item>0);
    console.log(income);
    const totalincome = income.reduce((acc,item)=>(acc+=item),0);
    incomeamount.innerHTML=`&#8377; ${totalincome}`;
    const expense = amounts.filter((item)=>item<0);
    const expenseamounts =expense.reduce((acc,item)=>(acc+=item),0);
    expenseamount.innerHTML=`&#8377;  ${expenseamounts}`;
   
}

function addtransaction(e){
    e.preventDefault();
    if(description.value.trim()==""||amount.value.trim()==""){
        alert("please enter the valid description and amount");
    }
    else{
   const transaction ={
    id:uniqueid(),
    description:description.value,
    amount:+amount.value,
   };
   transactions.push(transaction);
   console.log("transc",transaction);
  
   loadtransactiondetails(transaction);
   description.value="";
   amount.value="";
   updatelocalstorage();
   updateamount();
    }
    
}
form.addEventListener("submit", addtransaction);

const locastoragetrans = JSON.parse(localStorage.getItem("trans"));
let transactions = localStorage.getItem("trans")!=null?locastoragetrans:[];
function updatelocalstorage(){
    localStorage.setItem("trans",JSON.stringify(transactions));
}
function uniqueid(){
    return Math.floor(Math.random() * 1000000);
}