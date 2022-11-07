const inputCheckBoxMWSTAdd = document.querySelector("#input-checkbox-mwst-add");
const inputCheckBoxMWSTSub = document.querySelector("#input-checkbox-mwst-sub");
const outputResultDescription = document.querySelector("#result-desc");
const outputResultMWST = document.querySelector("#result-mwst");
const outputResultType = document.querySelector("#result-type");
const outputResultVal = document.querySelector("#result-value");
const inputCheckBoxTaxPerc19 = document.querySelector("#input-checkbox-19perc");
const inputCheckBoxTaxPerc7 = document.querySelector("#input-checkbox-7perc");
const inputValAmount = document.querySelector("#input-amount");

const resetForm = (event) => {
  event.preventDefault();
  outputResultVal.innerHTML = "---";
  outputResultMWST.innerHTML = "---";
  inputValAmount.value = "";
};

const checkInput = (event) => {
  event.preventDefault();
  if (inputCheckBoxMWSTAdd.checked) {
    outputResultDescription.innerHTML = "Nettobetrag (Preis ohne Mehrwertsteuer) in Euro";
    outputResultType.innerHTML = "Bruttobetrag (Endpreis)";
  } else if (inputCheckBoxMWSTSub.checked) {
    outputResultDescription.innerHTML = "Bruttobetrag (Preis inklusive Mehrwertsteuer) in Euro";
    outputResultType.innerHTML = "Nettobetrag";
  } else {
    outputResultDescription.innerHTML = "Error";
    outputResultType.innerHTML = "Error";
  }
  if (inputValAmount.value != "") {
    calc(event);
  } else {
    resetForm(event);
  }
};

const calcTax = (paramVal, paramType, paramTax) => {
  switch (paramType) {
    case 1: // Brutto
      return `${(Number(paramVal) * (Number(paramTax) / 100 + 1)).toFixed(2)} €`;
      break;
    case 2: // Tax
      return `${(Number(paramVal) * (Number(paramTax) / 100)).toFixed(2)} €`;
      break;
    case 3: // Netto
      return `${(Number(paramVal) * (1 - Number(paramTax) / 100)).toFixed(2)} €`;
      break;
    default:
      break;
  }
};

const calc = (event) => {
  event.preventDefault();
  if (inputCheckBoxMWSTAdd.checked) {
    if (inputCheckBoxTaxPerc19.checked) {
      outputResultVal.innerHTML = calcTax(inputValAmount.value, 1, 19);
      outputResultMWST.innerHTML = calcTax(inputValAmount.value, 2, 19);
    } else if (inputCheckBoxTaxPerc7.checked) {
      outputResultVal.innerHTML = calcTax(inputValAmount.value, 1, 7);
      outputResultMWST.innerHTML = calcTax(inputValAmount.value, 2, 7);
    }
  } else if (inputCheckBoxMWSTSub.checked) {
    if (inputCheckBoxTaxPerc19.checked) {
      outputResultVal.innerHTML = calcTax(inputValAmount.value, 3, 19);
      outputResultMWST.innerHTML = calcTax(inputValAmount.value, 2, 19);
    } else if (inputCheckBoxTaxPerc7.checked) {
      outputResultVal.innerHTML = calcTax(inputValAmount.value, 3, 7);
      outputResultMWST.innerHTML = calcTax(inputValAmount.value, 2, 7);
    }
  }
};
