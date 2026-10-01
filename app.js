const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for(let select of dropdowns){
    for(currcode in countryList){
    let Newoption = document.createElement("option");
    Newoption.innerText = currcode;
    Newoption.value=currcode;
    if(select.name === "from" && currcode==="USD"){
        Newoption.selected = "selected";
    }
    if(select.name === "to" && currcode==="INR"){
        Newoption.selected = "selected";
    }
    select.append(Newoption);
}

  select.addEventListener("change",(evnt) =>{
     updateFlag(evnt.target);
  })
}
const updateFlag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

btn.addEventListener("click", async (event) => {
    event.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountval = Number(amount.value);

    if (amountval <= 0 || isNaN(amountval)) {
        amountval = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    const response = await fetch(URL);
    if (!response.ok) {
        document.querySelector(".msg").innerText = "Could not get the exchange rate. Please try again.";
        return;
    }
    const data = await response.json();
    // console.log(data);
    const rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    document.querySelector(".msg").innerText = `${amountval} ${fromCurr.value} = ${(amountval * rate).toFixed(2)} ${toCurr.value}`;
});

