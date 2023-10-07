const http = require('http');
const url = require('url');
const fs = require('fs');
const endPointRoot = "http://localhost:8080/"
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
    let resource = "create/"
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", endPointRoot + resource, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(event);
    xhttp.onreadystatechange =function ()  {
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("result").innerHTML =this.responseText;
        } 
    }
}

function getDefaultAutoSelectFamily() {
    const xhttp = new XMLHttpRequest();
    let resource = 'get/'
    xhttp.open("GET", endPointRoot + resource, true);
    xhttp.send();
    xhttp.onreadystatechange =function ()  {
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("result").innerHTML =this.responseText;
        } 
    }
}