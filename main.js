document.addEventListener('keydown', function(evento) {
    if (evento.keyCode == 32) {
        console.log("saltar");
        if (nivel.muerto == false) {
            saltar();
            audio.play();
        } else {


        }
    }
});
var audio = "";

//bucle principal
var ancho = 1000;
var alto = 400;
var ctx, canvas;

var FPS = 10;
var intervalo = 700;
setInterval(function() {
    principal();
}, intervalo / FPS);

function inicializa() {
    canvas = document.getElementById('canvas');
    audio = document.getElementById("audio");
    ctx = canvas.getContext('2d');
    console.log("cargando");
    cargaImagenes();
    principal();
}

function recarga() {
    location.reload();
}

function principal() {
    cargaImagenes();
    borrarcanvas();
    gravedad();
    logicacaptus();
    logicacaptus2();
    dibujarex();
    dibujacaptus();
    dibujacaptus2();
    colision1();
    puntuacion();
}

function borrarcanvas() {
    canvas.width = ancho;
    canvas.height = alto;
}

/*Vamos a cargar las imagenes*/

var imgRex, imgcaptus1, imgcaptus2;
var txt1;
var suelo = 250;
var nivel = { velocidad: 14, puntuacion: 0, muerto: false, esnivel: 2, muertes: 1 };
var captus = { x: ancho + 100, y: suelo, res: true, texto: "" }
var captus2 = { x: ancho + 100, y: suelo - 90, res: true, texto: "" }
var respuesta = { res: false };
let verbos1 = [
    ["rojo", false, "cual es rojo1"],
    ["false", true, "cual es rojo2"],
    ["rojo", false, "cual es rojo3"],
    ["false", true, "cual es rojo4"],
    ["rojo", false, "cual es rojo5"],
    ["false", true, "cual es rojo6"],
    ["rojo", false, "cual es rojo7"],
    ["false", true, "cual es rojo8"],
    ["rojo", false, "cual es rojo9"],
    ["false", true, "cual es rojo10"],
    ["azul", false, "cual es azul1"],
    ["false", true, "cual es azul2"],
    ["azul", false, "cual es azul3"],
    ["false", true, "cual es azul4"],
    ["azul", false, "cual es azul5"],
    ["false", true, "cual es azul6"],
    ["azul", false, "cual es azul7"],
    ["false", true, "cual es azul8"],
    ["azul", false, "cual es azul9"],
    ["false", true, "cual es azul10"],
];
let verbos2 = [
    ["false", true],
    ["rojo", false],
    ["false", true],
    ["rojo", false],
    ["false", true],
    ["rojo", false],
    ["false", true],
    ["verbo8", false],
    ["false", true],
    ["rojo", false],
    ["false", true],
    ["azul", false],
    ["false", true],
    ["azul", false],
    ["false", true],
    ["azul", false],
    ["false", true],
    ["azul", false],
    ["false", true],
    ["azul", false],
];

function cargaImagenes() {
    imgRex = new Image();
    imgcaptus1 = new Image();
    imgcaptus2 = new Image();
    imgRex.src = 'img/rex.png';
    captus.texto = verbos1[nivel.puntuacion][0];
    captus2.texto = verbos2[nivel.puntuacion][0];
    captus.res = verbos1[nivel.puntuacion][1];
    console.log(captus.res);
    captus2.res = verbos2[nivel.puntuacion][1];
    console.log(captus2.res);

}

var trex = { y: 250, vy: 0, gravedad: 2, salto: 20, vymax: 9, saltando: false }

function dibujarex() {
    ctx.drawImage(imgRex, 0, 0, 300, 165, -100, trex.y, 300, 165, 100, 50);
}

function dibujacaptus() {
    ctx.font = "400 40px serif";
    ctx.fillStyle = '#0051ff';
    ctx.shadowColor = 'aqua';
    ctx.shadowOffsetX = 0;
    ctx.shadowBlur = 10;
    ctx.fillText(`${captus.texto}`, captus2.x + 120, captus2.y + 110);
    //ctx.drawImage(imgcaptus1, 0, 0, 300, 165, captus.x, captus.y, 300, 165, 100, 50);
}

function dibujacaptus2() {
    ctx.font = "400 40px fantasy";
    ctx.fillStyle = '#9c17ff';
    ctx.shadowColor = 'red';
    ctx.shadowOffsetX = 0;
    ctx.shadowBlur = 10;
    ctx.fillText(`${captus2.texto}`, captus2.x + 120, captus2.y + 190);
    //ctx.drawImage(imgcaptus2, 0, 0, 300, 165, captus2.x, captus2.y, 300, 165, 100, 50);//
}

function logicacaptus() {

    if (captus.x < -150) {
        captus.x = ancho + 100;
    } else {
        captus.x -= nivel.velocidad;
    }
}

function logicacaptus2() {

    if (captus2.x < -150) {
        captus2.x = ancho + 100;
        nivel.puntuacion++;
        speechSynthesis.speak(new SpeechSynthesisUtterance(`${verbos1[nivel.puntuacion][2]}`));
        if (nivel.esnivel == nivel.puntuacion) {
            speechSynthesis.speak(new SpeechSynthesisUtterance('NIVEL COMPLETO'));
            nivel.velocidad = 18;
        }
    } else {
        captus2.x -= nivel.velocidad;
    }
}

function saltar() {
    trex.saltando = true;
    if (trex.y == 250) {
        trex.vy = trex.salto;
    }
}

function gravedad() {
    if (trex.saltando == true) {
        if (trex.y - trex.vy - trex.gravedad > 250) {
            trex.saltando = false;
            trex.vy = 0;
            trex.y = 250;
        } else {
            trex.vy -= trex.gravedad;
            trex.y -= trex.vy;
        }
    }
}


function colision1() {

    if (captus.x >= -90 && captus.x <= -50) {
        if (trex.y >= suelo - 25) {
            if (captus.res == false) {
                nivel.muerto = true;
                nivel.muertes = 0;
                nivel.velocidad = 0;
                FPS = 0;
                intervalo = 0;
            }

        }
    }
    if (captus2.x >= -90 && captus2.x <= -50) {
        if (trex.y <= suelo - 25) {
            if (captus2.res == false) {
                nivel.muerto = true;
                nivel.muertes = 0;
                nivel.velocidad = 0;
                FPS = 0;
                intervalo = 0;
            }
        }
    }
}


function puntuacion() {
    ctx.font = "30px impact";
    ctx.fillStyle = '#000000';
    ctx.shadowColor = 'white';
    ctx.shadowOffsetX = 0;
    ctx.shadowBlur = 10;
    ctx.fillText(`${verbos1[nivel.puntuacion][2]}`, 150, 50);
    ctx.font = "30px impact";
    ctx.fillStyle = ' #0feb0c';
    ctx.shadowColor = '#aeeb0c';
    ctx.shadowOffsetX = 0;
    ctx.shadowBlur = 10;
    ctx.fillText(`Pts:  ${nivel.puntuacion}`, 50, 50);

    if (nivel.esnivel == nivel.puntuacion) {
        ctx.font = "50px impact";
        ctx.fillStyle = '#00FF00';
        ctx.shadowColor = 'red';
        ctx.shadowOffsetX = 0;
        ctx.shadowBlur = 10;
        ctx.fillText(`NIVEL COMPLETO`, 400, 180);
        ctx.font = "25px impact";
        ctx.fillStyle = '#00FF00';
        ctx.shadowColor = 'red';
        ctx.shadowOffsetX = 0;
        ctx.shadowBlur = 10;
        ctx.fillText(`NIVEL 2`, 530, 220);
    }
    if (nivel.muerto == true) {
        borrarcanvas();
        ctx.font = "60px impact";
        ctx.fillStyle = '#f6f2f1';
        ctx.shadowColor = 'red';
        ctx.shadowOffsetX = 0;
        ctx.shadowBlur = 10;
        ctx.fillText(`GAME OVER`, 400, 250);

        ctx.font = "30px impact";
        ctx.fillStyle = '#e75452';
        ctx.shadowColor = 'yellow';
        ctx.shadowOffsetX = 0;
        ctx.shadowBlur = 10;
        ctx.fillText(`total score : ${nivel.puntuacion}`, 440, 280);
    }
    if (nivel.muertes == 0) {
        nivel.muertes = 0;
        speechSynthesis.speak(new SpeechSynthesisUtterance('GAME OVER'));

    }



}