function keepParWord() {
  if (localStorage.getItem("select")) {
    var getForm = localStorage.getItem("select");
    getForm = JSON.parse(getForm);
    if (getForm[2] && getPar.checked) {
      getPar.checked = true;
    } else if (getForm[2] && getWord.checked) {
      getWord.checked = true;
    }
  }
}

var formQuantity = $('#quantity');

function keepQuantity() {
  if (localStorage.getItem("select")) {
    var getForm = localStorage.getItem("select");
    getForm = JSON.parse(getForm);
    if (getForm[1]) {
      formQuantity.selected = "selected";
    }
  }
}

keepQuantity();
