// =======================================================================
// GLOBALS
const submitButton = document.querySelector("[type=submit]");
const colorSelect = document.getElementById("colors-js-puns");
const otherTitle = document.getElementById("other-title");
const idPayment = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");

// =======================================================================
function initializePage() {
  const paypal = document.getElementById("paypal");
  const bitcoin = document.getElementById("bitcoin");

  // set focus to Name with jQuery
  $("#name").focus();

  // Hide Other Job Role
  otherTitle.style.display = "none";
  submitButton.disabled = true;
  colorSelect.style.display = "none";
  idPayment.selectedIndex = 1;
  paypal.className += " is-hidden";
  bitcoin.className += " is-hidden";
}

// =======================  VALIDATIONS  =================================
// =======================================================================
function validateName(name) {
  if (name === 0) {
    return false;
  } else {
    return true;
  }
}

// =======================================================================
function validateEmail(email) {
  // returns true or false
  // \S = any char except whitespace + @ + any char + . + any char
  let emailRegEx = /\S+@\S+\.\S+/;

  return emailRegEx.test(String(email).toLowerCase());
}

// ==================== LISTENERS ========================================
// =======================================================================
function nameListener() {
  // name event listener - validates on blur
  // SHOULD VALIDATE ON REGISTER???
  let nameInput = document.getElementById("name");
  let errormsg = document.querySelector("[for=name]");

  nameInput.addEventListener("blur", event => {
    let name = nameInput.value.length;
    let nameIsValid = validateName(name);

    if (nameIsValid || name === "") {
      nameInput.style.borderColor = "#6f9ddc";
      nameInput.className -= "error";
      errormsg.innerText = "Name:";
      submitButton.disabled = false;
    } else {
      nameInput.style.borderColor = "lightcoral";
      nameInput.className += " error";
      errormsg.innerHTML =
        "Name: <span class='label-error'> * * * Please enter a name * * * </span>";
      submitButton.disabled = true;
    }
  });
}

// =======================================================================
function emailListener() {
  // email event listener - live validation
  let emailInput = document.getElementById("mail");
  let errormsg = document.querySelector("[for=mail]");

  emailInput.addEventListener("keyup", event => {
    let email = emailInput.value;
    let emailIsValid = validateEmail(email);

    if (emailIsValid || email === "") {
      emailInput.style.borderColor = "#6f9ddc";
      emailInput.className -= "error";
      errormsg.innerText = "Email:";
      submitButton.disabled = false;
    } else {
      emailInput.style.borderColor = "lightcoral";
      emailInput.className += " error";
      errormsg.innerHTML =
        "Email: <span class='label-error'> * * * Must be a valid email address * * * </span>";
      submitButton.disabled = true;
    }
  });
}

// =======================================================================
function selectListener() {
  const selectItem = document.getElementById("design");
  const PUNS = 1,
    HEART = 2,
    CORNFLOWER = 0,
    TOMATO = 3;

  selectItem.addEventListener("change", event => {
    let chosenItem = selectItem.options[selectItem.selectedIndex].index;

    if (chosenItem === PUNS) {
      // JS Puns chosen
      // show the dropdown
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
function ccListener() {
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
    } else if (chosenItem === BC) {
      // bitcoin
      creditCard.classList.add("is-hidden");
      paypal.classList.add("is-hidden");
      bitcoin.classList.remove("is-hidden");
    } else if (chosenItem === SPM) {
      idPayment.selectedIndex = CC;
      creditCard.classList.remove("is-hidden");
      paypal.classList.add("is-hidden");
      bitcoin.classList.add("is-hidden");
    }
  });
}

// =======================================================================
function checkboxListener() {
  let check = document.querySelectorAll("input");

  for (let i = 0; i < 7; i++) {
    check[i].addEventListener("click", event => {
      cost = document
        .getElementsByTagName("input")
        [i].getAttribute("data-cost");

      console.log(cost);

      // strip dollar sign
      // accumulate and de-accumulate values with += and -=
      // show values in the insertion div
      // use string literal to drop the amount behind
      // a dollar sign
    });
  }
  // ****  INSERTION DIV
  document.querySelector(".activities").insertAdjacentHTML(
    "afterend",
    `<p>Hello there wonderful human!</p>
    <p>This is where the total will go.</p>`
  );
}

// =======================================================================
function main() {
  initializePage();

  // listeners
  nameListener();
  emailListener();
  selectListener();
  jobRoleListener();
  ccListener();
  checkboxListener();
}

// =======================================================================
main();

// =======================================================================
// =======================================================================
// =======================================================================
// =======================================================================
/*      NOTES
TODO =-=-=-=-=-=-=-=-=-=-=-==-=

Cannot select conflicting activities

Total cost displayed

Form cannot be submitted if
  name is blank
  email is bad or blank
  at least one activity is checked
  If CC is up
    CC# is a 13-16 digit number
    zip is a 5 digit number
    CVV is a 3 digit number

ERROR on Submit for:
  Name
  Email
  Register
  CC, Zip CVV (if CC is selected)

One changing error message field 
  i.e., 2 errors - blank or wrong
JS disabled, everything is displayed



*/
