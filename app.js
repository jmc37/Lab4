const http = require('http');
const url = require('url');
const fs = require('fs');
const endPointRoot = "http://localhost:8080/";
const CREATE_ITEM_ROUTE = "create/"


http.createServer(function (req, res) {
  let q = url.parse(req.url, true);
  let filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);

function createItem(event) {
    let regex = /^[a-zA-Z]+$/;
    let definitionRegex = /^[a-zA-Z\s]+$/;
    event.preventDefault();
    let term = document.getElementById("new-term").value;
    let definition = document.getElementById("definition").value;

    if (!regex.test(term) || !definitionRegex.test(definition)) {
        alert("Both term and definition must be valid strings (letters only).");
        return;
    }
    let data = {
      "term": term,
      "definition": definition
    }
    let jsonData = JSON.stringify(data)
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", 'http://localhost:8888/', true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(jsonData);
    xhttp.onreadystatechange =function ()  {
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("result").innerHTML = JSON.parse(this.responseText);
        } 
    }
}

function getItem(event) {
    let regex = /^[a-zA-Z]+$/;
    event.preventDefault();
    let term = document.getElementById("search-term").value;
    if (!regex.test(term)) {
      alert("Term must be valid strings (letters only).");
      return;
  }
    const xhttp = new XMLHttpRequest();
    let resource = 'get/'
    xhttp.open("GET", 'http://localhost:8888/' + `?term=${term}`, true);
    xhttp.send();
    xhttp.onreadystatechange =function ()  {
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("result").innerHTML = JSON.parse(this.responseText);
        } 
    }
}