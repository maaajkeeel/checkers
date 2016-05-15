/*
    klasa obsługująca komunikację Ajax - serwer
*/

function Net() {
    /*
        funkcja publiczna możliwa do uruchomienia 
        z innych klas
    */
    var ilu = 0;
    this.sendData = function (index) {
        //alert("wysyłam dane Ajaxem z klasy Net na serwer")
       
        var akcja;
        if (index == "graj"){
            akcja = "add_user";
            var user = document.getElementById("user").value;
        }
        else if (index == "reset")
            akcja = "reset";
        else
            akcja = "ilu";

        $.ajax({
            url: "http://localhost:3000",
            data: {
                user: user,
                akcja: akcja
            },
            type: "POST",
            success: function (data) {
                //czytamy odesłane z serwera dane

                //KODY BLEDOW
                //0 za duzo uzytkownikow
                //1 uzytkownik juz istnieje
                //2 uzytkownik utworzony poprawnie
                //jeśli ujemne trza dodać 5 i będzie liczba userów

                var obj = JSON.parse(data)
                
                console.log(obj[0].kod);
                if (obj[0].kod > 0) {
                    if (obj[0].kod == 2) {

                        game.addMeshes(obj[0].pier);
                        
                        var node = document.getElementById("mainDiv").lastChild;
                        document.getElementById("mainDiv").removeChild(node);
                    } else if (obj[0].kod == 0) {
                        alert("BLAD dwoch uzytkownikow juz utworzonych!");
                    } else
                        alert("BLAD taki uzytkownik juz istnieje!");
                } else {
                    
                    ilu = obj[0].kod + 5;

                }
                

            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
        return ilu;
    }

}