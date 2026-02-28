
var svgBackground = new Image ();

window.onload = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    svgBackground.src = "img/labirint.svg";

    animate (); 

}

function drawImage(){
    ctx.strokeStyle = "white";
    ctx.drawImage(svgBackground, 0, 0, canvas.width, canvas.height);
}
  /*  var x = 234;
    var y = 2;

    var dx = 0;
    var dy = 0;
    function drawIt() {
        var canvas = document.getElementById('canvas');
        var c = canvas.getContext('2d');
        c.clearRect(0,0,canvas.width,canvas.height);//pobriše vse
        drawImage(); // nazaj narise labirint
        c.fillStyle = "red";    
        c.fillRect(x,y,10,10); 
        x+=dx;
        y+=dy; 
    }
    setInterval(drawIt, 100);*/

    const path = [
        [234,2],[234,10],[154,10],[154,26],[138,26],[138,42],[154,42],
        [154,58],[138,58],[138,90],[202,90],[202,106],[154,106],
        [154,122],[122,122],[122,138],[74,138],[74,154],[90,154],
        [90,186],[106,186],[106,170],[138,170],[138,186],[154,186],
        [154,202],[138,202],[138,250],[106,250],[106,234],[122,234],
        [122,202],[74,202],[74,170],[58,170],[58,138],[26,138],
        [26,154],[10,154],[10,186],[26,186],[26,170],[42,170],
        [42,186],[58,186],[58,202],[26,202],[26,218],[42,218],
        [42,234],[58,234],[58,218],[90,218],[90,234],[74,234],
        [74,250],[90,250],[90,266],[106,266],[106,282],[122,282],
        [122,266],[154,266],[154,234],[186,234],[186,202],[170,202],
        [170,186],[186,186],[186,170],[170,170],[170,154],[186,154],
        [186,138],[202,138],[202,122],[218,122],[218,74],[234,74],
        [234,106],[250,106],[250,42],[282,42],[282,90],[298,90],
        [298,74],[314,74],[314,106],[330,106],[330,58],[346,58],
        [346,74],[362,74],[362,106],[378,106],[378,90],[394,90],
        [394,106],[410,106],[410,122],[426,122],[426,106],[442,106],
        [442,74],[458,74],[458,58],[474,58],[474,90],[458,90],
        [458,106],[474,106],[474,138],[458,138],[458,122],[442,122],
        [442,202],[378,202],[378,186],[362,186],[362,202],[346,202],
        [346,234],[362,234],[362,218],[378,218],[378,234],[394,234],
        [394,218],[410,218],[410,250],[394,250],[394,266],[378,266],
        [378,282],[362,282],[362,250],[314,250],[314,266],[282,266],
        [282,282],[266,282],[266,298],[298,298],[298,282],[314,282],
        [314,298],[330,298],[330,314],[298,314],[298,362],[282,362],
        [282,346],[266,346],[266,314],[250,314],[250,378],[266,378],
        [266,410],[282,410],[282,378],[314,378],[314,362],[330,362],
        [330,378],[346,378],[346,362],[378,362],[378,346],[394,346],
        [394,362],[410,362],[410,378],[426,378],[426,394],[410,394],
        [410,410],[426,410],[426,442],[410,442],[410,426],[378,426],
        [378,410],[346,410],[346,426],[314,426],[314,394],[298,394],
        [298,426],[282,426],[282,442],[266,442],[266,458],[250,458],
        [250,482]
    ];

    var img1 = new Image(); img1.src = "img/lion.png";
    var img2 = new Image(); img2.src = "img/giraffe.png";
    var img3 = new Image(); img3.src = "img/zebra.png";
    var img4 = new Image(); img4.src = "img/antelope.png";
    var kvadratek1 = { index: 0, t: 0, speed: 0.06, delay: 100, img: img1, size: 20};
    var kvadratek2 = { index: 0, t: 0, speed: 0.03, delay: 0, img: img2, size: 20, stopped: false, lastX: 0, lastY: 0};
    var kvadratek3 = { index: 0, t: 0, speed: 0.04, delay: 0, img: img3, size: 20, stopped: false, lastX: 0, lastY: 0};
    var kvadratek4 = { index: 0, t: 0, speed: 0.05, delay: 0, img: img4, size: 20, stopped: false, lastX: 0, lastY: 0};

    var endImg = new Image();
    endImg.src = "img/lion.png"; // Pot do tvoje slike za konec
    var showEndImageUntil = 0;

function animate() {
    // 1. Če je igre konec, nariši sliko in ČAKAJ (brez novega requestAnimationFrame tukaj)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImage();

    const now = Date.now();

    // Če moramo prikazovati končno sliko
    if (now < showEndImageUntil) {
        ctx.drawImage(endImg, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(animate);
        return;
    }

    // 2. Normalno risanje
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImage();

    const pos1 = getPos(kvadratek1);
    const pos2 = getPos(kvadratek2);
    const pos3 = getPos(kvadratek3);
    const pos4 = getPos(kvadratek4);

    // 3. Preverjanje trka za kvadratek 2
    if (!kvadratek2.stopped && kvadratek1.delay === 0 && kvadratek2.delay === 0) {
        let dist = Math.sqrt((pos1.x - pos2.x)**2 + (pos1.y - pos2.y)**2);
        if (dist < 10) {
            showEndImageUntil = Date.now() + 1500;            
                kvadratek2.stopped = true;   // riba se ustavi
                kvadratek2.lastX = pos2.x; // Shrani lokacijo ulova
                kvadratek2.lastY = pos2.y;
                kvadratek2.delay = Infinity; // nikoli več se ne aktivira
                requestAnimationFrame(animate);
                return;
            }
        }
    

    // 4. Preverjanje trka za kvadratek 3
    if (!kvadratek3.stopped && kvadratek1.delay === 0 && kvadratek3.delay === 0) {
        let dist = Math.sqrt((pos1.x - pos3.x)**2 + (pos1.y - pos3.y)**2);
        if (dist < 10) {
            showEndImageUntil = Date.now() + 1500;            
                kvadratek3.stopped = true;   // riba se ustavi
                kvadratek3.delay = Infinity; // nikoli več se ne aktivira
                kvadratek3.lastX = pos3.x;
                kvadratek3.lastY = pos3.y;
                requestAnimationFrame(animate);
                return;
            }
    }

    if (!kvadratek4.stopped && kvadratek1.delay === 0 && kvadratek4.delay === 0) {
        let dist = Math.sqrt((pos1.x - pos4.x)**2 + (pos1.y - pos4.y)**2);
        if (dist < 10) {
            showEndImageUntil = Date.now() + 1500;            
                kvadratek4.stopped = true;   // riba se ustavi
                kvadratek4.delay = Infinity;
                kvadratek4.lastX = pos4.x;
                kvadratek4.lastY = pos4.y;
                requestAnimationFrame(animate);
                return;
            }
    }
        
    

    // 5. Posodabljanje in risanje, če ni trka
    updateAndDraw(kvadratek1);
    updateAndDraw(kvadratek2);
    updateAndDraw(kvadratek3);
    updateAndDraw(kvadratek4);

    requestAnimationFrame(animate);

// Pomožna funkcija, ki samo vrne trenutni X in Y brez premikanja
function getPos(obj) {
    if (obj.index >= path.length - 1) {
        return { x: path[path.length - 1][0], y: path[path.length - 1][1] };
    }
    const [x1, y1] = path[obj.index];
    const [x2, y2] = path[obj.index + 1];
    return {
        x: x1 + (x2 - x1) * obj.t,
        y: y1 + (y2 - y1) * obj.t
    };
}


// Pomožna funkcija, ki poskrbi za premikanje in risanje posameznega objekta
function updateAndDraw(kvadratek) {
    if (kvadratek.stopped) {
        ctx.drawImage(kvadratek.img, kvadratek.lastX - kvadratek.size / 2, kvadratek.lastY - kvadratek.size / 2, kvadratek.size, kvadratek.size);
        return;
    }
    // 1. Preverjanje zamika
    if (kvadratek.delay > 0) {
        kvadratek.delay--;
        return;
    }

    // 2. Pridobivanje pozicije
    const pos = getPos(kvadratek);

    // 3. Risanje slike (vedno narišemo na trenutni poziciji)
    ctx.drawImage(kvadratek.img, pos.x - kvadratek.size / 2, pos.y - kvadratek.size / 2, kvadratek.size, kvadratek.size);

    // 4. LOGIKA PREMIKANJA (posodobi se samo, če NI ustavljen in NI na koncu)
    if (!kvadratek.stopped && kvadratek.index < path.length - 1) {
        kvadratek.t += kvadratek.speed;
        if (kvadratek.t >= 1) {
            kvadratek.t = 0;
            kvadratek.index++;
        }
    }
}
}