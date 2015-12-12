//this function will run onClick. Logs the form data for localstorage, gets text data, and manipulates text based on form submission.
var clicked = function(event) {
  event.preventDefault();
  //Following Lines assign variables to user inputs in the html form, Logs to console and places them in an array.
  var formAuthor = $('#authorname').val();
  var formQuantity = $('#quantity').val();
  var formParaWords;
  var formPTag;

  if ($('#para input:checked')) {
    formParaWords = "Paragraphs";
    console.log(formParaWords);
  } else if ($('#words input:checked')) {
    formParaWords = "Words";
    console.log(formParaWords);
  }

  if ($('#pTag input:checked')) {
    formPTag = true;
    console.log(formPTag);
  } else {
    formPTag = false;
    console.log(formPTag);
  }

  var formFont = $('#fontname').val();

  var userEntry = [formAuthor, formQuantity, formParaWords, formPTag, formFont];

  var generatorStorage = JSON.stringify(userEntry);
  localStorage.setItem("select", generatorStorage);

  //BEGIN IPSUM GENERATOR
  for (var i = 0; i < authorData.length; i++) {
    if (formAuthor == authorData[i].shortname) {
      str = authorData[i].text;
    }
  }
  //var counter = 0
  var num = formQuantity;
  var font = formFont;
  var parag;
  var j = [];

  if (formParaWords === "Paragraphs" && formPTag) {
    //take str and split it into num parts and add ptags
    for (var k = 0; k < authorData.length; k++) {
      if (formAuthor === authorData[k].shortname) {
        parag = authorData[k].para;
      }
    }

    for (var l = 0; l < formQuantity; l++) {
      j.push("<p>" + "&lt;p&gt" + parag[l] + "&lt/p&gt");
    }
      str = j;
      console.log(str);

  } else if (formParaWords === "Words" && formPTag) {
    //take str and split it into a new string with only num words and wrap it in ptags
    var splitStr = str.split(" ").splice(0,num).join(" ");
    str = "&lt;p&gt" + splitStr + "&lt/p&gt";

  } else if (formParaWords === "Paragraphs") {
      for (var m = 0; m < authorData.length; m++) {
        if (formAuthor === authorData[m].shortname) {
          parag = authorData[m].para;
        }
      }

      for (var n = 0; n < formQuantity; n++) {
        j.push("<p>" + parag[n]);
      }
        str = j;
        console.log(str);
  } else if (formParaWords === "Words") {
    str = str.split(" ").splice(0,num).join(" ");
  }

  //assign section id='generatedtext' a classname based on font choice
  if (formFont === "lora") {
    $('#generatedtext').className = "lora";
  } else if (formFont === "poiret1") {
    $('#generatedtext').className = "poiret1";
  } else if (formFont === "o2") {
    $('#generatedtext').className = "o2";
  } else if (formFont === "pmarker") {
    $('#generatedtext').className = "pmarker";
  }

  $('#generatedtext').html(str);

}; //END OF CLICKED FUNCTION

//check local storage for form content and repopulate dropdown menue of authors
var authors = $('#authorname').val();

function fillAuthor() {
  if (localStorage.getItem("select")) {
    var getForm = JSON.parse(localStorage.getItem("select"));
    if (getForm[0]) {
      for (var i in authors) {
        if (authors[i].value === getForm[0]) {
          authors[i].selected = true;
          return;
        }
      }
    }
  }
}

//check local storage for form content and repopulate par or word quantity
var formQuant = $('#quantity').val();

function keepQuantity() {
  if (localStorage.getItem("select")) {
    var getForm = JSON.parse(localStorage.getItem("select"));
    if (getForm[1]) {
      formQuant.value = getForm[1];
    }
  }
}

//check local storage for form content and repopulate word or paragraph radio button
var getPar = $('#para').val();
var getWord = $('#words').val();

function keepParWord() {
  if (localStorage.getItem("select")) {
    var getForm = localStorage.getItem("select");
    getForm = JSON.parse(getForm);
    if (getForm[2] === "Paragraphs") {
      getPar.checked = true;
    } else if (getForm[2] === "Words") {
      getWord.checked = true;
    }
  }
}

//check local storage for form content and repopulate checkbox
var checkBox = $('#pTag');

function fillCheckbox() {
  if (localStorage.getItem("select")) {
    var getForm = localStorage.getItem("select");
    getForm = JSON.parse(getForm);
    if (getForm[3]) {
      checkBox.checked = true;
    }
  }
}

//check local storage for form content and repopulate dropdown menue for fonts
var fonts = $('#fontname').val();

function keepFont() {
  if (localStorage.getItem("select")) {
    var getForm = JSON.parse(localStorage.getItem("select"));
    if (getForm[4]) {
      for (var i in fonts) {
        if (fonts[i].value === getForm[4]) {
          fonts[i].selected = true;
          return;
        }
      }
    }
  }
}

//Event Listener for 'Generate Ipsum' Button
var generate = $('#generate').on('click', clicked);
