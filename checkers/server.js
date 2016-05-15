var fs = require("fs");
var qs = require("querystring");
var http = require("http");
var users = [];
require("colors");
var server = http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            pobierzStrone(req, res);
            
            break;
        case "POST":
            // tu wykonaj funkcję "servResp", która pobierze dane przesłane 
            // w formularzu i odpowie do przeglądarki 
            // (uwaga - adres żądania się nie zmienia)
            servResp(req, res)
            
            break;

    }
   
    console.log("adres żądania: " + req.url)
    console.log(req.method)
})


server.listen(3000);
console.log("serwer staruje na porcie 3000 - ten komunikat zobaczysz tylko raz")
//----------



function servResp(req, res) {
    var allData = "";

    //kiedy przychodzą dane postem, w postaci pakietów
    //łącza się po kolei do jednej zmiennej "allData"

    req.on("data", function (data) {
        console.log("data: " + data)
        allData += data;
    })

    //kiedy przyjdą już wszystkie dane
    //parsujemy je do obiektu
    //i odsyłamy do przeglądarki
    var tabl = [];
    req.on("end", function (data) {
        console.log("users "+JSON.stringify(users))
        var finish = qs.parse(allData);
        
        var akcja = finish.akcja;
        
        //KODY BLEDOW
        //0 za duzo uzytkownikow
        //1 uzytkownik juz istnieje
        //2 uzytkownik utworzony poprawnie
        if (akcja == "add_user") {
            var user1 = finish.user;
            if (users.length == 2) {
                console.log("ERROR dwoch uzytkownikow juz zostalo utworzonych".red);
                tabl.push({ kod: 0 })
                res.end(JSON.stringify(tabl));
            } else if (users.length == 0) {
                users.push(user1);
                console.log("Uzytkownik utworzony poprawnie".green);
                tabl.push({ kod: 2, pier: true });
                res.end(JSON.stringify(tabl));

            } else {
                if (users[0] == user1) {
                    console.log("ERROR taki uzytkownik juz istnieje".red);
                    console.log(JSON.stringify(tabl));
                    tabl.push({ kod: 1 });
                    res.end(JSON.stringify(tabl));
                } else {
                    users.push(user1);
                    console.log("Uzytkownik utworzony poprawnie".green);
                    console.log(JSON.stringify(tabl));
                    tabl.push({ kod: 2, pier: false });
                    res.end(JSON.stringify(tabl));
                }
            }
            res.end(JSON.stringify("BLAD ELO"));
        } else if (akcja == "reset") {
            console.log(JSON.stringify(tabl))
            users = [];
        } else if (akcja == "ilu") {
            tabl.push({ kod: users.length - 5 });
            res.end(JSON.stringify(tabl));
        }

        //console.log(JSON.stringify(users));
        
        //var rg2 = finish.rg;
       // finish.rg2 = rg2;
        //var iloczyn = finish.txt1 * finish.txt2;
        //var suma = parseInt(finish.txt1) + parseInt(finish.txt2);
//finish.suma = suma;
  //      finish.iloczyn = iloczyn;
        //console.log(finish.bt1)
       
    })

}

function pobierzStrone(request, response) {
    if (request.url === "/") {
        fs.readFile("static/index.html", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        })
    }else if (request.url === "/index2.html") {
        fs.readFile("static/index2.html", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        })
    } else if (request.url === "/Game.js") {
        fs.readFile("static/Game.js", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'application/javascript' });
            response.write(data);
            response.end();
        })
    }
    else if (request.url === "/UI.js") {
        fs.readFile("static/UI.js", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'application/javascript' });
            response.write(data);
            response.end();
        })
    }
    else if (request.url === "/scriptZadanie.js") {
        fs.readFile("static/scriptZadanie.js", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'application/javascript' });
            response.write(data);
            response.end();
        })
    }
    else if (request.url === "/Net.js") {
        fs.readFile("static/Net.js", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'application/javascript' });
            response.write(data);
            response.end();
        })
    } else if (request.url === "/libs/three.js") {
        fs.readFile("static/libs/three.js", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'application/javascript' });
            response.write(data);
            response.end();
        })
    } else if (request.url === "/style.css") {
        fs.readFile("static/style.css", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(data);
            response.end();
        })
    } else {
        response.writeHead(200, { "content-type": "text/html;charset=utf-8" })
        response.end("<marquee>Błąd 404</marquee>")
    }
}