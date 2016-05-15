/*
    klasa Game
*/


function Game() {

    /*
        zmienna prywatna widoczna tylko w tej klasie
    */

    var test = 10;
    var inte = setInterval(function () { }, 0);
    var plansza = [];
    var pionki = [];
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
              45, //Field Of View (FOV) 
              window.innerWidth / window.innerHeight, // proporcje widoku
              0.1, //min renderowana odległość
              10000 //max renderowana odległość
              );


    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize(window.innerWidth, window.innerHeight);

    //--------------------------------------------------------------------

    var materialPl1 = new THREE.MeshBasicMaterial({
        color: 0x000000, side: THREE.DoubleSide
    });
    var materialPl2 = new THREE.MeshBasicMaterial({
        color: 0xffffff, side: THREE.DoubleSide
    });
    var planszaGeometry = new THREE.BoxGeometry(100, 100,10);
    var axis = new THREE.AxisHelper(1000);
    scene.add(axis)
    for (var i = 0; i < 8 ; i++) {
        plansza[i] = new Array();
        for (var j = 0; j < 8; j++) {
            if ((i + j) % 2 == 0){
                planszaMesh = new THREE.Mesh(planszaGeometry, materialPl1);
                planszaMesh.userData = { kolor: 1 };
                plansza[i][j] = 0;
            }
            else{
                planszaMesh = new THREE.Mesh(planszaGeometry, materialPl2);
                planszaMesh.userData = { kolor: 0 };
                plansza[i][j] = 1;
            }
            planszaMesh.rotateX(Math.PI/2)
            planszaMesh.position.set(i * 100 -350, 0, j * 100 - 350);
            
            scene.add(planszaMesh);
        }
    }
    //0 - KOLOR BIALY
    //1 - KOLOR CZARNY

    for (var i = 0; i < 8 ; i++) {
        pionki[i] = new Array();
        for (var j = 0; j < 8; j++) {
            if ((i + j) % 2 == 0) {
                if (i == 0 || i == 1) {
                    pionki[i][j] = 1;
                } else if (i == 6 || i == 7)
                    pionki[i][j] = 2;
                else
                    pionki[i][j] = 0;
            } else
                pionki[i][j] = 0;
        }
    }
    console.log(JSON.stringify(pionki));
    
    

   
  
    pionekGeometry = new THREE.CylinderGeometry(40, 40, 30, 30);

    /*    var mesh = new THREE.Mesh(geometry, material);
        mesh.rotateX(Math.PI / 2);
        mesh.position.set(0, 50, 450);
        scene.add(mesh);
            var mesh = new THREE.Mesh(geometry, material2);
            mesh.rotateX(Math.PI / 2);
            mesh.position.set(0, 50, -450);
            scene.add(mesh);
        */
   // addMeshes();
            

       
   var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
   var mouseVector = new THREE.Vector2() // wektor (x,y) wykorzystany bedzie do określenie pozycji myszy na ekranie

   document.addEventListener("mousedown", onMouseDown, false);
   function onMouseDown(event) {
       //pozycja myszy zostaje przeliczona na wartości 0-1, wymagane przez raycaster

       mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
       mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;


       // szukamy punktów wspólnych "promienia" i obiektu 3D 

       raycaster.setFromCamera(mouseVector, camera);

       //intersects - tablica obiektów w które "trafia" nasz "promień" wysyłany z kamery

       var intersects = raycaster.intersectObjects(scene.children);



       if (intersects.length > 0) {
           if (intersects[0].object.userData.kolor != undefined) {
               // zerowy czyli najbliższy kamery jest tek którego potrzebujemy
               if (intersects[0].object.userData.pionek){
               obj = intersects[0].object;
               obj.material.color = "0x0000ff";
               console.log(obj.userData.kolor)
               }
           }
       }


   }

    document.getElementById("mainDiv").appendChild(renderer.domElement);

    camera.position.x = 0;
    camera.position.y = 500;
    camera.position.z = -1300;

    camera.lookAt(scene.position);
    animateScene();
    function animateScene() {
        camera.lookAt(new THREE.Vector3(0, 0, 0));


        camera.updateProjectionMatrix();
        requestAnimationFrame(animateScene);

        renderer.render(scene, camera);
        
    }
    /*
        zmienna publiczna, dostępna z innych klas, nie używać
    */
    //this.test = 0; 
    
    /*
        funkcja prywatna widoczna tylko w tej klasie
    */
    


   


    /*
        funkcje publiczne możliwe do wywołania z innych klas
    */
    this.setInte = function () {
        inte = setInterval(function () {
            var ilu  = net.sendData("ilu");
            console.log(ilu + " tylu");
            if (ilu == 2) {
                clearInterval(inte);
                document.body.removeChild(document.getElementById("waiting"));
            }
            document.getElementById("waiting").style.zIndex = 10000;
        }, 500);
    };
 
    this.addMeshes = function (data) {
        if (data) {
            
            for (var i = 0; i < pionki.length; i++) {
                for (var j = 0; j < pionki[i].length; j++) {
                    var material = new THREE.MeshBasicMaterial({
                        color: 0xf3f3f3
                    });
                    var material2 = new THREE.MeshBasicMaterial({
                        color: 0xff0000
                    });
                    if (pionki[i][j] != 0) {
                        if (pionki[i][j] == 1) {
                            var mesh = new THREE.Mesh(pionekGeometry, material);
                            console.log("pionek czarny")
                            mesh.userData = { kolor: 1, pionek: true }
                        }
                        else {
                            var mesh = new THREE.Mesh(pionekGeometry, material2);
                            console.log("pionek biały")

                        }

                        mesh.position.set(j * 100 - 350, 10, i * 100 - 350);
                        scene.add(mesh)
                    }
                }
            }
            this.setInte();
            //this.setInte();
            /*var mesh = new THREE.Mesh(pionekGeometry, material);
            mesh.rotateX(Math.PI / 2);
            
            scene.add(mesh);
            var mesh = new THREE.Mesh(pionekGeometry, material2);
            mesh.rotateX(Math.PI / 2);
            mesh.position.set(0, 50, -450);
            scene.add(mesh);*/
          
        }
        else {
            for (var i = 0; i < pionki.length; i++) {
                for (var j = 0; j < pionki[i].length; j++) {
                    var material = new THREE.MeshBasicMaterial({
                        color: 0xf3f3f3
                    });
                    var material2 = new THREE.MeshBasicMaterial({
                        color: 0xff0000
                    });
                    if (pionki[i][j] != 0) {
                        if (pionki[i][j] == 1) {
                            var mesh = new THREE.Mesh(pionekGeometry, material2);
                            console.log("pionek czarny")
                            mesh.userData = { kolor: 0, pionek: true };
                        }
                        else {
                            var mesh = new THREE.Mesh(pionekGeometry, material);
                            console.log("pionek biały")
                        }

                        mesh.position.set(j * 100 - 350, 10, i * 100 - 350);
                        scene.add(mesh)
                    }
                }
            }
           
        }
        //animateScene();
    };

}