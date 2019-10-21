// =======================================================================
function initializePage() {
  // set focus to Name
  $("#name").focus();

  // Hide Other Job Role input
  const other = document.getElementById("other-title");
  other.style.display = "none";
}

// =======================================================================
function main() {
  initializePage();
}

// =======================================================================
main();

// =======================================================================
// =======================================================================
// =======================================================================
// =======================================================================
/*      NOTES
 add span programtically under each field to contain the text of a tool tip
 e.g.,
   <span>Can only contain letters a-z in lowercase</span>
      <span>Must contain a lowercase, uppercase letter and a number</span>
      REGEX: return /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password)

      <span>The telephone number must be in the format of (555) 555-5555</span>
return /^\(\d{3}\)\s\d{3}-\d{4}$/.test(telephone);
return /^\D*\d{3}\D*\d{3}\D*\d{4}\D*$/.test(telephone);
force format blur event:
telephoneInput.addeventlistener("blur", event => {
  event.target.value = formatTelephone(event.target.value);
});
func formatTelephone(text) {
  const regex = /^\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/
  return text.replace(regex, "($1) $2-$3");
}


      <span>Must be a valid email address</span>
      return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);

      Then style with CSS to be a cool tool tip. Also, turn the border red, the background red and stuff like that
*/
