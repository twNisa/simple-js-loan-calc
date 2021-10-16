// listener for calculator btn
document.getElementById("loan-form").addEventListener("submit", function(e){
  // hide results
  document.querySelector(".results").style.display="none";
  

  setTimeout(calculate,1000);
  
  e.preventDefault();
});

function calculate(){
  // ui vars
  const UIamount = document.querySelector("#amount");
  const UIinterest = document.querySelector("#interest");
  const UIyears = document.querySelector("#years");
  const UImonthly = document.querySelector("#monthly-payment");
  const UItotal = document.querySelector("#total-payment");
  const UItotalInterest = document.querySelector("#total-interest");

  
  const principal = parseFloat(UIamount.value);
  const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
  const calculatedPayments = parseFloat(UIyears.value) * 12;

  // monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest) / (x - 1);
  // check monthly is finite
  if(isFinite(monthly)){
   
    UImonthly.value = monthly.toFixed(2);
    UItotal.value = (monthly * calculatedPayments).toFixed(2);
    UItotalInterest.value = ((monthly*calculatedPayments) - principal).toFixed(2);
    document.querySelector(".results").style.display="block";
  } else{
    showError("Please check your numbers");
  }

  
}
function showError(error){
  document.querySelector(".results").style.display="none";
  document.querySelector("#loading").style.display="none";
  // create div
  const errorDiv = document.createElement("div");
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  errorDiv.className = ("alert alert-danger");
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading);
  // clear error after 3 seconds
  setTimeout(clearError, 3000);

}
function clearError(){
  document.querySelector(".alert").remove();
}