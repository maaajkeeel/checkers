/*
    UI - obsługa interfejsu użytkownika
*/

function Ui() {

    document.getElementById("reset").addEventListener("click", function () {
        net.sendData(this.id);
    })
    document.getElementById("graj")
                .addEventListener("click", function () {
                    net.sendData(this.id);

                });
 

    
   
}