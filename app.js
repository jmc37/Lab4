const create_route = 'https://comp4537-lab4-hb0k.onrender.com/create'
const search_route = 'https://comp4537-lab4-hb0k.onrender.com/search/?term='
const alert_create = "Both term and definition must be valid strings (letters only)."
const alert_get = "Term must be valid strings (letters only)."
const http = require('http');

function createItem(event) {
    event.preventDefault();
    let regex = /^[a-zA-Z]+$/;
    let definitionRegex = /^[a-zA-Z\s]+$/;
    let term = document.getElementById("new-term").value;
    let definition = document.getElementById("definition").value;

    if (!regex.test(term) || !definitionRegex.test(definition)) {
        alert(alert_create);
        return;
    } 
    let data = {
      "term": term,
      "definition": definition
    }
    let jsonData = JSON.stringify(data)
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST",create_route , true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(jsonData);
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
          if (this.status == 201) {
              document.getElementById("result").innerHTML = JSON.parse(this.responseText).result;
          } else {
              document.getElementById("result").innerHTML = JSON.parse(this.responseText).error;
          }
      }
  }
}

function getItem(event) {
    event.preventDefault();
    const regex = /^[a-zA-Z]+$/;
    const term = document.getElementById("search-term").value;
    if (!regex.test(term)) {
      alert(alert_get);
      return;
  }
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `${search_route}`+`${term}`, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
          if (this.status == 200) {
              document.getElementById("result").innerHTML = JSON.parse(this.responseText).result;
          } else {
              document.getElementById("result").innerHTML = JSON.parse(this.responseText).error;
          }
      }
  }
}