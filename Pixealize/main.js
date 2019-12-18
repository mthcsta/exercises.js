contador = new Counter();

h1 = document.getElementsByTagName('h1')[0];

canvas = document.getElementById("animation");
ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = canvas.width / 4;
canvas.style.backgroundColor = "transparent"; //"#1d1d1d";

loadingBar = {
    color: "#FF1180",//"purple",
    width: canvas.width / 100,
    height: canvas.height / 3
};

bubbles = [];

function createBubble(){
    // POS: when POS value is 0, move to UP; 1, move to DOWN
    return {pos: 0, posX: 0, posY: Math.random() * loadingBar.height, opacity:1, color: 0, colors: ['#FF1180', '#ad1e60']};
}

bubbles.push(createBubble())

function runAnimate(){

    date = getDate()

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clean Canvas
    
// Create Loading Bar    
    loadingBar.width < canvas.width && (loadingBar.width = (canvas.width / 100 * date.percent));
    ctx.fillStyle = loadingBar.color;
    ctx.globalAlpha = 1;
    ctx.fillRect(0, loadingBar.height, loadingBar.width, loadingBar.height);

// Effect Pixel

    bubbles.forEach(element => {
        ctx.fillStyle = element.colors[element.color];
        element.color = Math.floor(Math.random() * element.colors.length);
        element.posY < -Math.random() * 30  && !element.pos && element.pos++;
        element.pos ? (
            element.posX+=Math.random() / 3,
            element.posY+=Math.random()
        ) 
        : 
        (
            element.posX+=Math.random(),
            element.posY-=Math.random()
        );
        element.posY > Math.random() * 20 && element.opacity > 0.1 && (element.opacity-=0.01);
        ctx.globalAlpha = element.opacity;
        ctx.fillRect(loadingBar.width + element.posX, loadingBar.height + element.posY, 2, 2);
    });


    dias = Math.floor(date.rest / 86400);
    horas = Math.floor((date.rest - (dias * 86400)) / 3600);// / 3600;
    minutos = Math.floor((date.rest - (dias * 86400 + horas * 3600)) / 60);
    segundos = Math.floor((date.rest - (dias * 86400 + horas * 3600 + minutos * 60)));

    h1.innerHTML = `Faltam <b>${contador.read(dias)}</b> dias, <b>${contador.read(horas)}</b> horas, <b>${contador.read(minutos)}</b> minutos e <b>${contador.read(segundos)}</b> segundos`; //`Faltam ${(date.restINT / 86400)} dias, ${(date.restINT / )}`
    
    requestAnimationFrame(runAnimate); // Run Animation Everywhere
}

setInterval(()=>{
    loadingBar.width < canvas.width &&  bubbles.push(createBubble())
},25);

runAnimate();