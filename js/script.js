// =======================================================================
// GLOBALS

const colorSelect = document.getElementById("colors-js-puns");
const otherTitle = document.getElementById("other-title");
const idPayment = document.getElementById("payment");

// =======================================================================
function initializePage() {
  const paypal = document.getElementById("paypal");
  const bitcoin = document.getElementById("bitcoin");
  const activities = document.querySelector(".activities");
  const creditCard = 1;

  // set focus to Name with **jQuery**
  $("#name").focus();

  // set up initial appearance of the page
  otherTitle.style.display = "none";
  colorSelect.style.display = "none";
  idPayment.selectedIndex = creditCard;
  paypal.className += " is-hidden";
  bitcoin.className += " is-hidden";
  activities.insertAdjacentHTML("afterend", `<p id="total">Total: $0</p>`);
}

// =======================  VALIDATIONS  =================================
// =======================================================================
function validateName() {
  const name = document.getElementById("name").value.length;
  // chk name is not blank
  if (name === 0) {
    return false;
  } else {
    return true;
  }
}

// =======================================================================
function validateEmail() {
  const email = document.getElementById("mail");
  // returns true or false
  // requires only "x@yy.zz" - validating email is a fool's errand
  const emailRegEx = /\S+@\S{2,}\.\S{2,4}/;
  let emailIsValid = emailRegEx.test(String(email.value).toLowerCase());

  return emailIsValid;
}

// =======================================================================
function validateActivity() {
  let errormsg = document.querySelector(".activities").firstChild.nextSibling;
  const total = document.getElementById("total").innerText;

  if (total === "Total: $0") {
    errormsg.innerHTML = `Register for Activities <span class="label-error">You must sign up for at least one activity.</span>`;
    return false;
  } else {
    errormsg.innerHTML = `Register for Activities`;
    return true;
  }
}

// ======================================================================
function validateCC() {
  // validate cc fields
  const creditCard = 1;
  const ccRegEx = /^[0-9]{13,16}$/;
  const zipRegEx = /^[0-9]{5}$/;
  const cvvRegEx = /^[0-9]{3}$/;
  const selectedPayment = idPayment.selectedIndex;
  const errormsg = document.getElementById("payment").previousElementSibling
    .previousElementSibling;
  const cardNumberError = document.querySelector("[for=cc-num]");
  const zipCodeError = document.querySelector("[for=zip]");
  const cvvError = document.querySelector("[for=cvv]");

  // is credit card  selected?
  if (selectedPayment === creditCard) {
    //validate cc# 13 - 16 digits
    const ccNum = document.getElementById("cc-num");
    let ccIsValid = ccRegEx.test(String(ccNum.value));

    // show validation error to user
    if (ccIsValid) {
      ccNum.style.borderColor = "#6f9ddc";
      ccNum.className -= "error";
      cardNumberError.innerText = "Card Number:";
    } else {
      ccNum.style.borderColor = "red";
      ccNum.className += "error";
      cardNumberError.innerHTML = `Card Number: <span class="label-error">Enter card number</span>`;
    }

    // validate the zip code
    const zip = document.getElementById("zip");
    let zipIsValid = zipRegEx.test(String(zip.value));

    // show validation error to user
    if (zipIsValid) {
      zip.style.borderColor = "#6f9ddc";
      zip.className -= "error";
      zipCodeError.innerText = "Zip Code:";
    } else {
      zip.style.borderColor = "red";
      zip.className += "error";
      zipCodeError.innerHTML = `Zip Code: <span class="label-error">Error!</span>`;
    }
    // validate the CVV
    const cvv = document.getElementById("cvv");
    let cvvIsValid = cvvRegEx.test(String(cvv.value));

    // show validation error to user
    if (cvvIsValid) {
      cvv.style.borderColor = "#6f9ddc";
      cvv.className -= "error";
      cvvError.innerText = "CVV:";
    } else {
      cvv.style.borderColor = "red";
      cvv.className += "error";
      cvvError.innerHTML = `CVV: <span class="label-error">Enter CVV</span>`;
    }

    // return validity state
    if (ccIsValid && zipIsValid && cvvIsValid) {
      errormsg.innerHTML = `Payment Info`;
      return true;
    } else {
      errormsg.innerHTML = `Payment Info <span class="label-error">Please enter correct credit card information</span>`;
      return false;
    }
  } else {
    // credit card is *not* selected
    return true;
  }
}

// =======================================================================
function validateForm() {
  const nameInput = document.getElementById("name");
  const nameError = document.querySelector("[for=name]");
  const nameResetMsg = "Name:";
  const nameErrorMsg = `Name: <span class="label-error"> Please enter a name</span>`;
  const email = document.getElementById("mail");
  const emailError = document.querySelector("[for=mail]");
  const emailResetMsg = "Email:";
  const emailErrorMsg = `Email: <span class="label-error">Please enter a valid email</span>`;
  const emailBlankMsg = `Email: <span class="label-error">You have to type something</span>`;

  // validate input and show error to user
  let nameIsValid = validateName();
  if (nameIsValid) {
    setIndicators(true, nameInput, nameError, nameResetMsg);
  } else {
    setIndicators(false, nameInput, nameError, nameErrorMsg);
  }

  // validate email & not blank
  let emailIsValid = validateEmail();
  if (emailIsValid) {
    setIndicators(true, email, emailError, emailResetMsg);
  } else {
    if (email.value.length === 0) {
      setIndicators(false, email, emailError, emailBlankMsg);
    } else {
      setIndicators(false, email, emailError, emailErrorMsg);
    }
  }

  // user has selected an activity
  let activityIsValid = validateActivity();

  // credit card is 13 - 16 numbers, zip is 5 numbers and cvv is 3 numbers
  let ccIsValid = validateCC();

  // return the results
  if (nameIsValid && emailIsValid && activityIsValid && ccIsValid) {
    return true;
  } else {
    return false;
  }
}

// =================== ERROR INDICATOR ===================================
// =======================================================================
function setIndicators(validity, element, msgElement, msg) {
  if (validity === true) {
    element.style.borderColor = "#6f9ddc";
    element.classList.remove("error");
    msgElement.innerHTML = msg;
  } else {
    element.style.borderColor = "red";
    element.classList.add("error");
    msgElement.innerHTML = msg;
  }
}

// ==================== LISTENERS ========================================

// =======================================================================
function emailListener() {
  // email event listener - live validation
  const emailInput = document.getElementById("mail");
  const emailError = document.querySelector("[for=mail]");
  const emailResetMsg = "Email:";
  const emailErrorMsg = `Email: <span class="label-error">Please enter a valid email</span>`;

  emailInput.addEventListener("keyup", () => {
    let emailIsValid = validateEmail();

    if (emailIsValid) {
      setIndicators(true, emailInput, emailError, emailResetMsg);
    } else {
      setIndicators(false, emailInput, emailError, emailErrorMsg);
    }
  });
}

// =======================================================================
function tshirtListener() {
  // sets up t-shirt options
  const selectItem = document.getElementById("design");
  const PUNS = 1,
    HEART = 2,
    CORNFLOWER = 0,
    TOMATO = 3;

  selectItem.addEventListener("change", () => {
    let chosenItem = selectItem.options[selectItem.selectedIndex].index;

    if (chosenItem === PUNS) {
      // JS Puns chosen - show the dropdown
      colorSelect.style.display = "inline-block";
      document.getElementById("color").selectedIndex = CORNFLOWER;

      // show the Puns Colors
      document.querySelector("[value=cornflowerblue]").style.display =
        "inline-block";
      document.querySelector("[value=darkslategrey]").style.display =
        "inline-block";
      document.querySelector("[value=gold]").style.display = "inline-block";

      // hide the JS colors
      document.querySelector("[value=tomato]").style.display = "none";
      document.querySelector("[value=steelblue]").style.display = "none";
      document.querySelector("[value=dimgrey]").style.display = "none";
    } else if (chosenItem === HEART) {
      // I heart JS was chosen
      colorSelect.style.display = "inline-block";
      document.getElementById("color").selectedIndex = TOMATO;

      document.querySelector("[value=cornflowerblue]").style.display = "none";
      document.querySelector("[value=darkslategrey]").style.display = "none";
      document.querySelector("[value=gold]").style.display = "none";

      document.querySelector("[value=tomato]").style.display = "inline-block";
      document.querySelector("[value=steelblue]").style.display =
        "inline-block";
      document.querySelector("[value=dimgrey]").style.display = "inline-block";
    } else {
      // 'select theme' was chosen
      colorSelect.style.display = "none";
    }
  });
}

// =======================================================================
function jobRoleListener() {
  // display box if job title is set to "other"
  const jobTitle = document.getElementById("title");
  const OTHER = 5;

  jobTitle.addEventListener("change", () => {
    let chosenItem = jobTitle.options[jobTitle.selectedIndex].index;

    if (chosenItem === OTHER) {
      otherTitle.style.display = "block";
    } else {
      otherTitle.style.display = "none";
    }
  });
}

// =======================================================================
function checkboxListener() {
  // calculate costs and validate schedule conflicts
  const checkState = document.querySelectorAll("input");
  let totalCost = 0;

  //                                      COST
  // put event handlers on every checkbox
  for (let i = 0; i < checkState.length; i++) {
    checkState[i].addEventListener("click", () => {
      // grab the cost
      const costString = document
        .getElementsByTagName("input")
        [i].getAttribute("data-cost");

      // trim the dollar sign
      let cost = parseInt(costString.substring(1));

      // if checked, add the amount, else subtract it
      if (checkState[i].checked === true) {
        totalCost += cost;
      } else if (checkState[i].checked === false) {
        totalCost -= cost;
      }

      // drop the amount into the DOM
      document.getElementById("total").innerHTML = `Total: $${totalCost}`;

      //                       SCHEDULE CONFLICT
      // get scheduled time
      const timeString = document
        .getElementsByTagName("input")
        [i].getAttribute("data-day-and-time");

      // loop thru and compare scheduled times
      for (let j = 0; j < checkState.length; j++) {
        let compareTimeString = document
          .getElementsByTagName("input")
          [j].getAttribute("data-day-and-time");

        // if they conflict, toggle
        if (timeString === compareTimeString && timeString != null && i != j) {
          if (checkState[j].disabled) {
            checkState[j].disabled = false;
          } else {
            checkState[j].disabled = true;
          }
        }
      }
    });
  }
}

// =======================================================================
function ccListener() {
  const creditCard = document.getElementById("credit-card");
  const errormsg = document.getElementById("payment").previousElementSibling
    .previousElementSibling;

  // display appropriate payment method
  const SPM = 0,
    CC = 1,
    PP = 2,
    BC = 3;

  idPayment.addEventListener("change", () => {
    let chosenItem = idPayment.options[idPayment.selectedIndex].index;

    if (chosenItem === CC) {
      // credit card
      creditCard.classList.remove("is-hidden");
      paypal.classList.add("is-hidden");
      bitcoin.classList.add("is-hidden");
    } else if (chosenItem === PP) {
      // paypal
      creditCard.classList.add("is-hidden");
      paypal.classList.remove("is-hidden");
      bitcoin.classList.add("is-hidden");
      errormsg.innerHTML = `Payment Info`;
    } else if (chosenItem === BC) {
      // bitcoin
      creditCard.classList.add("is-hidden");
      paypal.classList.add("is-hidden");
      bitcoin.classList.remove("is-hidden");
      errormsg.innerHTML = `Payment Info`;
    } else if (chosenItem === SPM) {
      idPayment.selectedIndex = CC;
      creditCard.classList.remove("is-hidden");
      paypal.classList.add("is-hidden");
      bitcoin.classList.add("is-hidden");
    }
  });
}

// =======================================================================
function submitButtonListener() {
  const submitButton = document.querySelector("[type=submit]");
  // validate form before allowing submission

  submitButton.addEventListener("click", event => {
    let formIsValid = validateForm();

    if (formIsValid) {
      //allow submit by doing nothing
    } else {
      // scroll to top and kill button
      $(document).scrollTop(0);
      event.preventDefault();
    }
  });
}

// =======================================================================
function main() {
  initializePage();

  // listeners
  emailListener();
  tshirtListener();
  jobRoleListener();
  ccListener();
  checkboxListener();
  submitButtonListener();
}

// =======================================================================
main();
