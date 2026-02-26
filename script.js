
var svgBackground = new Image ();

window.onload = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    svgBackground.src = "img/labirint.svg";

    animate (); 

}

function drawImage(){
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

    var img1 = new Image(); img1.src = "img/shark.png";
    var img2 = new Image(); img2.src = "img/fish.png";
    var img3 = new Image(); img3.src = "img/fish.png";
    var kvadratek1 = { index: 0, t: 0, speed: 0.06, delay: 100, img: img1, size: 20};
    var kvadratek2 = { index: 0, t: 0, speed: 0.04, delay: 0, img: img2, size: 20, stopped: false};
    var kvadratek3 = { index: 0, t: 0, speed: 0.05, delay: 0, img: img3, size: 20, stopped: false};

    var endImg = new Image();
    endImg.src = "img/shark.png"; // Pot do tvoje slike za konec
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

    // 3. Preverjanje trka za kvadratek 2
    if (!kvadratek2.stopped && kvadratek1.delay === 0 && kvadratek2.delay === 0) {
        let dist = Math.sqrt((pos1.x - pos2.x)**2 + (pos1.y - pos2.y)**2);
        if (dist < 10) {
            showEndImageUntil = Date.now() + 1500;            
                kvadratek2.stopped = true;   // riba se ustavi
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
                requestAnimationFrame(animate);
                return;
            }
    }
        
    

    // 5. Posodabljanje in risanje, če ni trka
    updateAndDraw(kvadratek1);
    updateAndDraw(kvadratek2);
    updateAndDraw(kvadratek3);

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
    if (kvadratek.stopped) return;
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




   /* function drawPath() {
        ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.lineCap = "square";
    ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(2, 2);
        ctx.lineTo(226, 2);

        ctx.moveTo(242, 2);
        ctx.lineTo(482, 2);

        ctx.moveTo(50, 18);
        ctx.lineTo(66, 18);

        ctx.moveTo(82, 18);
        ctx.lineTo(146, 18);

        ctx.moveTo(178, 18);
        ctx.lineTo(226, 18);

        ctx.moveTo(322, 18);
        ctx.lineTo(370, 18);

        ctx.moveTo(418, 18);
        ctx.lineTo(450, 18);

        ctx.moveTo(18, 34);
        ctx.lineTo(50, 34);

        ctx.moveTo(146, 34);
        ctx.lineTo(162, 34);

        ctx.moveTo(226, 34);
        ctx.lineTo(290, 34);

        ctx.moveTo(322, 34);
        ctx.lineTo(354, 34);

        ctx.moveTo(402, 34);
        ctx.lineTo(434, 34);

        ctx.moveTo(466, 34);
        ctx.lineTo(482, 34);

        ctx.moveTo(2, 50);
        ctx.lineTo(18, 50);




        ctx.moveTo(66, 50);
        ctx.lineTo(82, 50);




        ctx.moveTo(130, 50);
        ctx.lineTo(146, 50);




        ctx.moveTo(162, 50);
        ctx.lineTo(226, 50);




        ctx.moveTo(258, 50);
        ctx.lineTo(274, 50);




        ctx.moveTo(306, 50);
        ctx.lineTo(370, 50);




        ctx.moveTo(402, 50);
        ctx.lineTo(418, 50);




        ctx.moveTo(434, 50);
        ctx.lineTo(466, 50);




        ctx.moveTo(34, 66);
        ctx.lineTo(50, 66);




        ctx.moveTo(82, 66);
        ctx.lineTo(98, 66);




        ctx.moveTo(146, 66);
        ctx.lineTo(162, 66);




        ctx.moveTo(178, 66);
        ctx.lineTo(194, 66);




        ctx.moveTo(210, 66);
        ctx.lineTo(242, 66);




        ctx.moveTo(290, 66);
        ctx.lineTo(322, 66);




        ctx.moveTo(354, 66);
        ctx.lineTo(386, 66);




        ctx.moveTo(402, 66);
        ctx.lineTo(450, 66);




        ctx.moveTo(34, 82);
        ctx.lineTo(82, 82);






        ctx.moveTo(146, 82);
        ctx.lineTo(210, 82);






        ctx.moveTo(258, 82);
        ctx.lineTo(274, 82);






        ctx.moveTo(370, 82);
        ctx.lineTo(418, 82);






        ctx.moveTo(450, 82);
        ctx.lineTo(466, 82);






        ctx.moveTo(18, 98);
        ctx.lineTo(66, 98);






        ctx.moveTo(82, 98);
        ctx.lineTo(114, 98);






        ctx.moveTo(146, 98);
        ctx.lineTo(194, 98);






        ctx.moveTo(258, 98);
        ctx.lineTo(306, 98);






        ctx.moveTo(402, 98);
        ctx.lineTo(434, 98);






        ctx.moveTo(466, 98);
        ctx.lineTo(482, 98);






        ctx.moveTo(2, 114);
        ctx.lineTo(34, 114);






        ctx.moveTo(50, 114);
        ctx.lineTo(98, 114);






        ctx.moveTo(114, 114);
        ctx.lineTo(146, 114);






        ctx.moveTo(162, 114);
        ctx.lineTo(178, 114);






        ctx.moveTo(194, 114);
        ctx.lineTo(210, 114);






        ctx.moveTo(226, 114);
        ctx.lineTo(258, 114);






        ctx.moveTo(274, 114);
        ctx.lineTo(322, 114);






        ctx.moveTo(354, 114);
        ctx.lineTo(386, 114);






        ctx.moveTo(434, 114);
        ctx.lineTo(466, 114);






        ctx.moveTo(34, 130);
        ctx.lineTo(114, 130);






        ctx.moveTo(130, 130);
        ctx.lineTo(162, 130);






        ctx.moveTo(178, 130);
        ctx.lineTo(194, 130);






        ctx.moveTo(210, 130);
        ctx.lineTo(242, 130);






        ctx.moveTo(306, 130);
        ctx.lineTo(338, 130);






        ctx.moveTo(386, 130);
        ctx.lineTo(434, 130);






        ctx.moveTo(2, 146);
        ctx.lineTo(18, 146);






        ctx.moveTo(34, 146);
        ctx.lineTo(50, 146);






        ctx.moveTo(82, 146);
        ctx.lineTo(130, 146);






        ctx.moveTo(146, 146);
        ctx.lineTo(178, 146);






        ctx.moveTo(194, 146);
        ctx.lineTo(210, 146);






        ctx.moveTo(226, 146);
        ctx.lineTo(274, 146);






        ctx.moveTo(290, 146);
        ctx.lineTo(354, 146);






        ctx.moveTo(370, 146);
        ctx.lineTo(418, 146);






        ctx.moveTo(450, 146);
        ctx.lineTo(482, 146);






        ctx.moveTo(18, 162);
        ctx.lineTo(34, 162);






        ctx.moveTo(66, 162);
        ctx.lineTo(82, 162);






        ctx.moveTo(98, 162);
        ctx.lineTo(146, 162);






        ctx.moveTo(178, 162);
        ctx.lineTo(194, 162);






        ctx.moveTo(210, 162);
        ctx.lineTo(226, 162);






        ctx.moveTo(242, 162);
        ctx.lineTo(322, 162);






        ctx.moveTo(370, 162);
        ctx.lineTo(386, 162);






        ctx.moveTo(418, 162);
        ctx.lineTo(434, 162);






        ctx.moveTo(50, 178);
        ctx.lineTo(66, 178);






        ctx.moveTo(114, 178);
        ctx.lineTo(130, 178);






        ctx.moveTo(146, 178);
        ctx.lineTo(178, 178);






        ctx.moveTo(194, 178);
        ctx.lineTo(210, 178);






        ctx.moveTo(226, 178);
        ctx.lineTo(242, 178);






        ctx.moveTo(274, 178);
        ctx.lineTo(290, 178);






        ctx.moveTo(322, 178);
        ctx.lineTo(418, 178);






        ctx.moveTo(466, 178);
        ctx.lineTo(482, 178);






        ctx.moveTo(2, 194);
        ctx.lineTo(50, 194);






        ctx.moveTo(82, 194);
        ctx.lineTo(146, 194);






        ctx.moveTo(178, 194);
        ctx.lineTo(194, 194);






        ctx.moveTo(210, 194);
        ctx.lineTo(226, 194);






        ctx.moveTo(242, 194);
        ctx.lineTo(354, 194);






        ctx.moveTo(386, 194);
        ctx.lineTo(434, 194);






        ctx.moveTo(450, 194);
        ctx.lineTo(466, 194);






        ctx.moveTo(34, 210);
        ctx.lineTo(114, 210);






        ctx.moveTo(162, 210);
        ctx.lineTo(178, 210);






        ctx.moveTo(210, 210);
        ctx.lineTo(242, 210);






        ctx.moveTo(258, 210);
        ctx.lineTo(306, 210);






        ctx.moveTo(354, 210);
        ctx.lineTo(434, 210);






        ctx.moveTo(450, 210);
        ctx.lineTo(482, 210);






        ctx.moveTo(2, 226);
        ctx.lineTo(34, 226);






        ctx.moveTo(66, 226);
        ctx.lineTo(82, 226);






        ctx.moveTo(146, 226);
        ctx.lineTo(178, 226);






        ctx.moveTo(226, 226);
        ctx.lineTo(290, 226);






        ctx.moveTo(306, 226);
        ctx.lineTo(322, 226);






        ctx.moveTo(434, 226);
        ctx.lineTo(466, 226);






        ctx.moveTo(34, 242);
        ctx.lineTo(66, 242);






        ctx.moveTo(82, 242);
        ctx.lineTo(98, 242);






        ctx.moveTo(114, 242);
        ctx.lineTo(130, 242);






        ctx.moveTo(162, 242);
        ctx.lineTo(226, 242);






        ctx.moveTo(258, 242);
        ctx.lineTo(290, 242);






        ctx.moveTo(306, 242);
        ctx.lineTo(402, 242);






        ctx.moveTo(450, 242);
        ctx.lineTo(466, 242);






        ctx.moveTo(18, 258);
        ctx.lineTo(82, 258);






        ctx.moveTo(98, 258);
        ctx.lineTo(146, 258);






        ctx.moveTo(226, 258);
        ctx.lineTo(258, 258);






        ctx.moveTo(274, 258);
        ctx.lineTo(306, 258);






        ctx.moveTo(322, 258);
        ctx.lineTo(338, 258);






        ctx.moveTo(370, 258);
        ctx.lineTo(386, 258);






        ctx.moveTo(402, 258);
        ctx.lineTo(418, 258);






        ctx.moveTo(450, 258);
        ctx.lineTo(482, 258);






        ctx.moveTo(2, 274);
        ctx.lineTo(18, 274);






        ctx.moveTo(82, 274);
        ctx.lineTo(98, 274);






        ctx.moveTo(130, 274);
        ctx.lineTo(194, 274);






        ctx.moveTo(210, 274);
        ctx.lineTo(226, 274);






        ctx.moveTo(242, 274);
        ctx.lineTo(274, 274);






        ctx.moveTo(290, 274);
        ctx.lineTo(322, 274);






        ctx.moveTo(386, 274);
        ctx.lineTo(418, 274);






        ctx.moveTo(434, 274);
        ctx.lineTo(482, 274);






        ctx.moveTo(18, 290);
        ctx.lineTo(34, 290);






        ctx.moveTo(66, 290);
        ctx.lineTo(130, 290);






        ctx.moveTo(146, 290);
        ctx.lineTo(162, 290);






        ctx.moveTo(194, 290);
        ctx.lineTo(210, 290);






        ctx.moveTo(274, 290);
        ctx.lineTo(290, 290);






        ctx.moveTo(322, 290);
        ctx.lineTo(370, 290);






        ctx.moveTo(418, 290);
        ctx.lineTo(434, 290);






        ctx.moveTo(450, 290);
        ctx.lineTo(466, 290);






        ctx.moveTo(18, 306);
        ctx.lineTo(66, 306);






        ctx.moveTo(146, 306);
        ctx.lineTo(178, 306);






        ctx.moveTo(194, 306);
        ctx.lineTo(210, 306);






        ctx.moveTo(242, 306);
        ctx.lineTo(274, 306);






        ctx.moveTo(290, 306);
        ctx.lineTo(322, 306);






        ctx.moveTo(354, 306);
        ctx.lineTo(402, 306);






        ctx.moveTo(434, 306);
        ctx.lineTo(450, 306);






        ctx.moveTo(466, 306);
        ctx.lineTo(482, 306);






        ctx.moveTo(34, 322);
        ctx.lineTo(50, 322);






        ctx.moveTo(82, 322);
        ctx.lineTo(114, 322);






        ctx.moveTo(162, 322);
        ctx.lineTo(194, 322);






        ctx.moveTo(210, 322);
        ctx.lineTo(226, 322);






        ctx.moveTo(306, 322);
        ctx.lineTo(322, 322);






        ctx.moveTo(354, 322);
        ctx.lineTo(370, 322);






        ctx.moveTo(402, 322);
        ctx.lineTo(418, 322);






        ctx.moveTo(450, 322);
        ctx.lineTo(466, 322);






        ctx.moveTo(2, 338);
        ctx.lineTo(34, 338);






        ctx.moveTo(50, 338);
        ctx.lineTo(66, 338);






        ctx.moveTo(98, 338);
        ctx.lineTo(162, 338);






        ctx.moveTo(178, 338);
        ctx.lineTo(210, 338);






        ctx.moveTo(226, 338);
        ctx.lineTo(242, 338);






        ctx.moveTo(274, 338);
        ctx.lineTo(290, 338);






        ctx.moveTo(338, 338);
        ctx.lineTo(354, 338);






        ctx.moveTo(370, 338);
        ctx.lineTo(402, 338);






        ctx.moveTo(418, 338);
        ctx.lineTo(466, 338);






        ctx.moveTo(18, 354);
        ctx.lineTo(50, 354);






        ctx.moveTo(66, 354);
        ctx.lineTo(82, 354);






        ctx.moveTo(130, 354);
        ctx.lineTo(146, 354);






        ctx.moveTo(162, 354);
        ctx.lineTo(226, 354);






        ctx.moveTo(258, 354);
        ctx.lineTo(274, 354);






        ctx.moveTo(306, 354);
        ctx.lineTo(370, 354);






        ctx.moveTo(402, 354);
        ctx.lineTo(418, 354);






        ctx.moveTo(434, 354);
        ctx.lineTo(450, 354);






        ctx.moveTo(2, 370);
        ctx.lineTo(66, 370);






        ctx.moveTo(82, 370);
        ctx.lineTo(98, 370);






        ctx.moveTo(146, 370);
        ctx.lineTo(194, 370);






        ctx.moveTo(258, 370);
        ctx.lineTo(306, 370);






        ctx.moveTo(354, 370);
        ctx.lineTo(402, 370);






        ctx.moveTo(418, 370);
        ctx.lineTo(434, 370);






        ctx.moveTo(466, 370);
        ctx.lineTo(482, 370);






        ctx.moveTo(34, 386);
        ctx.lineTo(82, 386);






        ctx.moveTo(98, 386);
        ctx.lineTo(114, 386);






        ctx.moveTo(130, 386);
        ctx.lineTo(162, 386);






        ctx.moveTo(194, 386);
        ctx.lineTo(226, 386);






        ctx.moveTo(242, 386);
        ctx.lineTo(258, 386);






        ctx.moveTo(290, 386);
        ctx.lineTo(354, 386);






        ctx.moveTo(370, 386);
        ctx.lineTo(418, 386);






        ctx.moveTo(434, 386);
        ctx.lineTo(466, 386);






        ctx.moveTo(50, 402);
        ctx.lineTo(66, 402);






        ctx.moveTo(82, 402);
        ctx.lineTo(98, 402);






        ctx.moveTo(114, 402);
        ctx.lineTo(146, 402);






        ctx.moveTo(162, 402);
        ctx.lineTo(194, 402);






        ctx.moveTo(226, 402);
        ctx.lineTo(242, 402);






        ctx.moveTo(338, 402);
        ctx.lineTo(386, 402);






        ctx.moveTo(418, 402);
        ctx.lineTo(434, 402);






        ctx.moveTo(466, 402);
        ctx.lineTo(482, 402);






        ctx.moveTo(34, 418);
        ctx.lineTo(50, 418);






        ctx.moveTo(98, 418);
        ctx.lineTo(146, 418);






        ctx.moveTo(210, 418);
        ctx.lineTo(258, 418);






        ctx.moveTo(274, 418);
        ctx.lineTo(290, 418);






        ctx.moveTo(322, 418);
        ctx.lineTo(338, 418);






        ctx.moveTo(354, 418);
        ctx.lineTo(370, 418);






        ctx.moveTo(386, 418);
        ctx.lineTo(418, 418);






        ctx.moveTo(18, 434);
        ctx.lineTo(34, 434);






        ctx.moveTo(50, 434);
        ctx.lineTo(66, 434);






        ctx.moveTo(98, 434);
        ctx.lineTo(114, 434);






        ctx.moveTo(162, 434);
        ctx.lineTo(210, 434);






        ctx.moveTo(226, 434);
        ctx.lineTo(274, 434);






        ctx.moveTo(290, 434);
        ctx.lineTo(322, 434);






        ctx.moveTo(338, 434);
        ctx.lineTo(354, 434);






        ctx.moveTo(370, 434);
        ctx.lineTo(402, 434);






        ctx.moveTo(450, 434);
        ctx.lineTo(482, 434);






        ctx.moveTo(18, 450);
        ctx.lineTo(50, 450);






        ctx.moveTo(66, 450);
        ctx.lineTo(162, 450);






        ctx.moveTo(210, 450);
        ctx.lineTo(258, 450);






        ctx.moveTo(274, 450);
        ctx.lineTo(290, 450);






        ctx.moveTo(306, 450);
        ctx.lineTo(338, 450);






        ctx.moveTo(354, 450);
        ctx.lineTo(386, 450);






        ctx.moveTo(402, 450);
        ctx.lineTo(434, 450);






        ctx.moveTo(18, 466);
        ctx.lineTo(50, 466);






        ctx.moveTo(82, 466);
        ctx.lineTo(130, 466);






        ctx.moveTo(146, 466);
        ctx.lineTo(162, 466);






        ctx.moveTo(178, 466);
        ctx.lineTo(194, 466);






        ctx.moveTo(210, 466);
        ctx.lineTo(226, 466);






        ctx.moveTo(258, 466);
        ctx.lineTo(274, 466);






        ctx.moveTo(290, 466);
        ctx.lineTo(322, 466);






        ctx.moveTo(338, 466);
        ctx.lineTo(354, 466);






        ctx.moveTo(434, 466);
        ctx.lineTo(466, 466);






        ctx.moveTo(2, 482);
        ctx.lineTo(242, 482);






        ctx.moveTo(258, 482);
        ctx.lineTo(482, 482);






        ctx.moveTo(2, 2);
        ctx.lineTo(2, 482);






        ctx.moveTo(18, 18);
        ctx.lineTo(18, 34);






        ctx.moveTo(18, 50);
        ctx.lineTo(18, 66);






        ctx.moveTo(18, 82);
        ctx.lineTo(18, 98);






        ctx.moveTo(18, 130);
        ctx.lineTo(18, 146);






        ctx.moveTo(18, 162);
        ctx.lineTo(18, 178);






        ctx.moveTo(18, 210);
        ctx.lineTo(18, 226);






        ctx.moveTo(18, 242);
        ctx.lineTo(18, 258);






        ctx.moveTo(18, 306);
        ctx.lineTo(18, 322);






        ctx.moveTo(18, 370);
        ctx.lineTo(18, 450);






        ctx.moveTo(34, 2);
        ctx.lineTo(34, 18);






        ctx.moveTo(34, 34);
        ctx.lineTo(34, 82);






        ctx.moveTo(34, 98);
        ctx.lineTo(34, 130);






        ctx.moveTo(34, 146);
        ctx.lineTo(34, 162);






        ctx.moveTo(34, 178);
        ctx.lineTo(34, 194);






        ctx.moveTo(34, 226);
        ctx.lineTo(34, 242);






        ctx.moveTo(34, 258);
        ctx.lineTo(34, 290);






        ctx.moveTo(34, 322);
        ctx.lineTo(34, 338);






        ctx.moveTo(34, 386);
        ctx.lineTo(34, 418);






        ctx.moveTo(50, 34);
        ctx.lineTo(50, 50);






        ctx.moveTo(50, 146);
        ctx.lineTo(50, 178);






        ctx.moveTo(50, 210);
        ctx.lineTo(50, 226);






        ctx.moveTo(50, 258);
        ctx.lineTo(50, 290);






        ctx.moveTo(50, 338);
        ctx.lineTo(50, 354);






        ctx.moveTo(50, 418);
        ctx.lineTo(50, 434);






        ctx.moveTo(50, 466);
        ctx.lineTo(50, 482);






        ctx.moveTo(66, 2);
        ctx.lineTo(66, 34);






        ctx.moveTo(66, 50);
        ctx.lineTo(66, 82);






        ctx.moveTo(66, 98);
        ctx.lineTo(66, 114);






        ctx.moveTo(66, 130);
        ctx.lineTo(66, 162);






        ctx.moveTo(66, 178);
        ctx.lineTo(66, 210);






        ctx.moveTo(66, 226);
        ctx.lineTo(66, 242);






        ctx.moveTo(66, 274);
        ctx.lineTo(66, 338);






        ctx.moveTo(66, 354);
        ctx.lineTo(66, 370);






        ctx.moveTo(66, 402);
        ctx.lineTo(66, 466);






        ctx.moveTo(82, 18);
        ctx.lineTo(82, 50);






        ctx.moveTo(82, 82);
        ctx.lineTo(82, 98);






        ctx.moveTo(82, 162);
        ctx.lineTo(82, 194);






        ctx.moveTo(82, 258);
        ctx.lineTo(82, 274);






        ctx.moveTo(82, 306);
        ctx.lineTo(82, 354);






        ctx.moveTo(82, 370);
        ctx.lineTo(82, 434);






        ctx.moveTo(82, 466);
        ctx.lineTo(82, 482);






        ctx.moveTo(98, 34);
        ctx.lineTo(98, 98);






        ctx.moveTo(98, 162);
        ctx.lineTo(98, 178);






        ctx.moveTo(98, 210);
        ctx.lineTo(98, 258);






        ctx.moveTo(98, 274);
        ctx.lineTo(98, 306);






        ctx.moveTo(98, 354);
        ctx.lineTo(98, 370);






        ctx.moveTo(98, 402);
        ctx.lineTo(98, 418);






        ctx.moveTo(114, 18);
        ctx.lineTo(114, 82);






        ctx.moveTo(114, 98);
        ctx.lineTo(114, 130);






        ctx.moveTo(114, 178);
        ctx.lineTo(114, 194);






        ctx.moveTo(114, 210);
        ctx.lineTo(114, 226);






        ctx.moveTo(114, 258);
        ctx.lineTo(114, 274);






        ctx.moveTo(114, 306);
        ctx.lineTo(114, 322);






        ctx.moveTo(114, 338);
        ctx.lineTo(114, 402);






        ctx.moveTo(114, 418);
        ctx.lineTo(114, 434);






        ctx.moveTo(130, 18);
        ctx.lineTo(130, 98);






        ctx.moveTo(130, 130);
        ctx.lineTo(130, 162);






        ctx.moveTo(130, 194);
        ctx.lineTo(130, 242);






        ctx.moveTo(130, 274);
        ctx.lineTo(130, 338);






        ctx.moveTo(130, 370);
        ctx.lineTo(130, 386);






        ctx.moveTo(130, 434);
        ctx.lineTo(130, 450);






        ctx.moveTo(146, 98);
        ctx.lineTo(146, 114);






        ctx.moveTo(146, 162);
        ctx.lineTo(146, 178);






        ctx.moveTo(146, 210);
        ctx.lineTo(146, 258);






        ctx.moveTo(146, 322);
        ctx.lineTo(146, 338);






        ctx.moveTo(146, 354);
        ctx.lineTo(146, 370);






        ctx.moveTo(146, 386);
        ctx.lineTo(146, 402);






        ctx.moveTo(146, 418);
        ctx.lineTo(146, 434);






        ctx.moveTo(146, 450);
        ctx.lineTo(146, 466);






        ctx.moveTo(162, 18);
        ctx.lineTo(162, 50);






        ctx.moveTo(162, 66);
        ctx.lineTo(162, 82);






        ctx.moveTo(162, 114);
        ctx.lineTo(162, 130);






        ctx.moveTo(162, 146);
        ctx.lineTo(162, 210);






        ctx.moveTo(162, 258);
        ctx.lineTo(162, 274);






        ctx.moveTo(162, 290);
        ctx.lineTo(162, 322);






        ctx.moveTo(162, 338);
        ctx.lineTo(162, 354);






        ctx.moveTo(162, 402);
        ctx.lineTo(162, 418);






        ctx.moveTo(162, 434);
        ctx.lineTo(162, 450);






        ctx.moveTo(178, 18);
        ctx.lineTo(178, 34);






        ctx.moveTo(178, 130);
        ctx.lineTo(178, 146);






        ctx.moveTo(178, 210);
        ctx.lineTo(178, 226);






        ctx.moveTo(178, 242);
        ctx.lineTo(178, 258);






        ctx.moveTo(178, 274);
        ctx.lineTo(178, 290);






        ctx.moveTo(178, 370);
        ctx.lineTo(178, 402);






        ctx.moveTo(178, 418);
        ctx.lineTo(178, 450);






        ctx.moveTo(178, 466);
        ctx.lineTo(178, 482);






        ctx.moveTo(194, 34);
        ctx.lineTo(194, 66);






        ctx.moveTo(194, 114);
        ctx.lineTo(194, 130);






        ctx.moveTo(194, 146);
        ctx.lineTo(194, 162);






        ctx.moveTo(194, 178);
        ctx.lineTo(194, 242);






        ctx.moveTo(194, 258);
        ctx.lineTo(194, 274);






        ctx.moveTo(194, 290);
        ctx.lineTo(194, 322);






        ctx.moveTo(194, 370);
        ctx.lineTo(194, 386);






        ctx.moveTo(194, 402);
        ctx.lineTo(194, 418);






        ctx.moveTo(194, 450);
        ctx.lineTo(194, 466);






        ctx.moveTo(210, 18);
        ctx.lineTo(210, 34);






        ctx.moveTo(210, 66);
        ctx.lineTo(210, 114);






        ctx.moveTo(210, 130);
        ctx.lineTo(210, 178);






        ctx.moveTo(210, 210);
        ctx.lineTo(210, 226);






        ctx.moveTo(210, 242);
        ctx.lineTo(210, 258);






        ctx.moveTo(210, 274);
        ctx.lineTo(210, 290);






        ctx.moveTo(210, 322);
        ctx.lineTo(210, 370);






        ctx.moveTo(210, 386);
        ctx.lineTo(210, 466);






        ctx.moveTo(226, 18);
        ctx.lineTo(226, 50);






        ctx.moveTo(226, 82);
        ctx.lineTo(226, 130);






        ctx.moveTo(226, 178);
        ctx.lineTo(226, 194);






        ctx.moveTo(226, 258);
        ctx.lineTo(226, 322);






        ctx.moveTo(226, 370);
        ctx.lineTo(226, 386);






        ctx.moveTo(242, 2);
        ctx.lineTo(242, 18);






        ctx.moveTo(242, 34);
        ctx.lineTo(242, 98);






        ctx.moveTo(242, 162);
        ctx.lineTo(242, 178);






        ctx.moveTo(242, 194);
        ctx.lineTo(242, 242);






        ctx.moveTo(242, 274);
        ctx.lineTo(242, 290);






        ctx.moveTo(242, 306);
        ctx.lineTo(242, 402);






        ctx.moveTo(242, 450);
        ctx.lineTo(242, 482);






        ctx.moveTo(258, 18);
        ctx.lineTo(258, 34);






        ctx.moveTo(258, 50);
        ctx.lineTo(258, 82);






        ctx.moveTo(258, 98);
        ctx.lineTo(258, 130);






        ctx.moveTo(258, 178);
        ctx.lineTo(258, 194);






        ctx.moveTo(258, 242);
        ctx.lineTo(258, 258);






        ctx.moveTo(258, 274);
        ctx.lineTo(258, 306);






        ctx.moveTo(258, 322);
        ctx.lineTo(258, 370);






        ctx.moveTo(258, 386);
        ctx.lineTo(258, 418);






        ctx.moveTo(258, 434);
        ctx.lineTo(258, 450);






        ctx.moveTo(258, 466);
        ctx.lineTo(258, 482);






        ctx.moveTo(274, 2);
        ctx.lineTo(274, 18);






        ctx.moveTo(274, 50);
        ctx.lineTo(274, 66);






        ctx.moveTo(274, 82);
        ctx.lineTo(274, 98);






        ctx.moveTo(274, 114);
        ctx.lineTo(274, 178);






        ctx.moveTo(274, 258);
        ctx.lineTo(274, 274);






        ctx.moveTo(274, 306);
        ctx.lineTo(274, 338);






        ctx.moveTo(274, 370);
        ctx.lineTo(274, 402);






        ctx.moveTo(274, 418);
        ctx.lineTo(274, 434);






        ctx.moveTo(274, 450);
        ctx.lineTo(274, 466);






        ctx.moveTo(290, 18);
        ctx.lineTo(290, 82);






        ctx.moveTo(290, 130);
        ctx.lineTo(290, 146);






        ctx.moveTo(290, 226);
        ctx.lineTo(290, 242);






        ctx.moveTo(290, 274);
        ctx.lineTo(290, 290);






        ctx.moveTo(290, 306);
        ctx.lineTo(290, 354);






        ctx.moveTo(290, 386);
        ctx.lineTo(290, 418);






        ctx.moveTo(290, 434);
        ctx.lineTo(290, 450);






        ctx.moveTo(306, 2);
        ctx.lineTo(306, 50);






        ctx.moveTo(306, 82);
        ctx.lineTo(306, 130);






        ctx.moveTo(306, 178);
        ctx.lineTo(306, 210);






        ctx.moveTo(306, 226);
        ctx.lineTo(306, 258);






        ctx.moveTo(306, 290);
        ctx.lineTo(306, 306);






        ctx.moveTo(306, 322);
        ctx.lineTo(306, 370);






        ctx.moveTo(306, 402);
        ctx.lineTo(306, 434);






        ctx.moveTo(306, 450);
        ctx.lineTo(306, 466);






        ctx.moveTo(322, 18);
        ctx.lineTo(322, 34);






        ctx.moveTo(322, 50);
        ctx.lineTo(322, 98);






        ctx.moveTo(322, 162);
        ctx.lineTo(322, 178);






        ctx.moveTo(322, 210);
        ctx.lineTo(322, 226);






        ctx.moveTo(322, 258);
        ctx.lineTo(322, 290);






        ctx.moveTo(322, 338);
        ctx.lineTo(322, 354);






        ctx.moveTo(322, 370);
        ctx.lineTo(322, 418);






        ctx.moveTo(338, 66);
        ctx.lineTo(338, 130);






        ctx.moveTo(338, 146);
        ctx.lineTo(338, 162);

        ctx.moveTo(338, 194);
        ctx.lineTo(338, 242);

        ctx.moveTo(338, 258);
        ctx.lineTo(338, 274);

        ctx.moveTo(338, 290);
        ctx.lineTo(338, 338);

        ctx.moveTo(338, 354);
        ctx.lineTo(338, 370);

        ctx.moveTo(338, 402);
        ctx.lineTo(338, 418);

        ctx.moveTo(338, 434);
        ctx.lineTo(338, 482);

        ctx.moveTo(354, 82);
        ctx.lineTo(354, 162);

        ctx.moveTo(354, 178);
        ctx.lineTo(354, 194);

        ctx.moveTo(354, 210);
        ctx.lineTo(354, 226);

        ctx.moveTo(354, 258);
        ctx.lineTo(354, 290);

        ctx.moveTo(354, 322);
        ctx.lineTo(354, 338);

        ctx.moveTo(354, 370);
        ctx.lineTo(354, 386);

        ctx.moveTo(354, 418);
        ctx.lineTo(354, 450);

        ctx.moveTo(370, 18);
        ctx.lineTo(370, 98);

        ctx.moveTo(370, 114);
        ctx.lineTo(370, 146);

        ctx.moveTo(370, 162);
        ctx.lineTo(370, 178);

        ctx.moveTo(370, 194);
        ctx.lineTo(370, 210);

        ctx.moveTo(370, 226);
        ctx.lineTo(370, 242);

        ctx.moveTo(370, 258);
        ctx.lineTo(370, 274);

        ctx.moveTo(370, 290);
        ctx.lineTo(370, 306);

        ctx.moveTo(370, 338);
        ctx.lineTo(370, 354);

        ctx.moveTo(370, 466);
        ctx.lineTo(370, 482);

        ctx.moveTo(386, 2);
        ctx.lineTo(386, 50);

        ctx.moveTo(386, 98);
        ctx.lineTo(386, 114);

        ctx.moveTo(386, 178);
        ctx.lineTo(386, 194);

        ctx.moveTo(386, 210);
        ctx.lineTo(386, 226);

        ctx.moveTo(386, 242);
        ctx.lineTo(386, 258);

        ctx.moveTo(386, 274);
        ctx.lineTo(386, 290);

        ctx.moveTo(386, 322);
        ctx.lineTo(386, 338);

        ctx.moveTo(386, 354);
        ctx.lineTo(386, 370);

        ctx.moveTo(386, 402);
        ctx.lineTo(386, 418);

        ctx.moveTo(386, 450);
        ctx.lineTo(386, 466);

        ctx.moveTo(402, 2);
        ctx.lineTo(402, 18);

        ctx.moveTo(402, 34);
        ctx.lineTo(402, 50);

        ctx.moveTo(402, 66);
        ctx.lineTo(402, 82);

        ctx.moveTo(402, 114);
        ctx.lineTo(402, 130);

        ctx.moveTo(402, 146);
        ctx.lineTo(402, 178);

        ctx.moveTo(402, 226);
        ctx.lineTo(402, 242);

        ctx.moveTo(402, 258);
        ctx.lineTo(402, 274);

        ctx.moveTo(402, 290);
        ctx.lineTo(402, 322);

        ctx.moveTo(402, 338);
        ctx.lineTo(402, 354);

        ctx.moveTo(402, 386);
        ctx.lineTo(402, 418);

        ctx.moveTo(402, 434);
        ctx.lineTo(402, 466);

        ctx.moveTo(418, 18);
        ctx.lineTo(418, 34);

        ctx.moveTo(418, 98);
        ctx.lineTo(418, 114);

        ctx.moveTo(418, 210);
        ctx.lineTo(418, 258);

        ctx.moveTo(418, 274);
        ctx.lineTo(418, 370);

        ctx.moveTo(418, 418);
        ctx.lineTo(418, 434);

        ctx.moveTo(418, 450);
        ctx.lineTo(418, 482);

        ctx.moveTo(434, 50);
        ctx.lineTo(434, 98);

        ctx.moveTo(434, 114);
        ctx.lineTo(434, 194);

        ctx.moveTo(434, 210);
        ctx.lineTo(434, 226);

        ctx.moveTo(434, 242);
        ctx.lineTo(434, 290);

        ctx.moveTo(434, 306);
        ctx.lineTo(434, 322);

        ctx.moveTo(434, 386);
        ctx.lineTo(434, 450);

        ctx.moveTo(450, 18);
        ctx.lineTo(450, 50);

        ctx.moveTo(450, 82);
        ctx.lineTo(450, 114);

        ctx.moveTo(450, 130);
        ctx.lineTo(450, 194);

        ctx.moveTo(450, 226);
        ctx.lineTo(450, 242);

        ctx.moveTo(450, 290);
        ctx.lineTo(450, 338);

        ctx.moveTo(450, 354);
        ctx.lineTo(450, 386);

        ctx.moveTo(450, 402);
        ctx.lineTo(450, 466);

        ctx.moveTo(466, 18);
        ctx.lineTo(466, 34);

        ctx.moveTo(466, 66);
        ctx.lineTo(466, 82);

        ctx.moveTo(466, 114);
        ctx.lineTo(466, 130);

        ctx.moveTo(466, 162);
        ctx.lineTo(466, 178);

        ctx.moveTo(466, 338);
        ctx.lineTo(466, 354);

        ctx.moveTo(466, 402);
        ctx.lineTo(466, 418);

        ctx.moveTo(466, 450);
        ctx.lineTo(466, 466);

        ctx.moveTo(482, 2);
        ctx.lineTo(482, 482);

        ctx.stroke();


        //==resitev==
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;

        ctx.moveTo(234, 2);
        ctx.lineTo(234, 10);
        ctx.lineTo(154, 10);
        ctx.lineTo(154, 26);
        ctx.lineTo(138, 26);
        ctx.lineTo(138, 42);
        ctx.lineTo(154, 42);
        ctx.lineTo(154, 58);
        ctx.lineTo(138, 58);
        ctx.lineTo(138, 90);
        ctx.lineTo(202, 90);
        ctx.lineTo(202, 106);
        ctx.lineTo(154, 106);
        ctx.lineTo(154, 122);
        ctx.lineTo(122, 122);
        ctx.lineTo(122, 138);
        ctx.lineTo(74, 138);
        ctx.lineTo(74, 154);
        ctx.lineTo(90, 154);
        ctx.lineTo(90, 186);
        ctx.lineTo(106, 186);
        ctx.lineTo(106, 170);
        ctx.lineTo(138, 170);
        ctx.lineTo(138, 186);
        ctx.lineTo(154, 186);
        ctx.lineTo(154, 202);
        ctx.lineTo(138, 202);
        ctx.lineTo(138, 250);
        ctx.lineTo(106, 250);
        ctx.lineTo(106, 234);
        ctx.lineTo(122, 234);
        ctx.lineTo(122, 202);
        ctx.lineTo(74, 202);
        ctx.lineTo(74, 170);
        ctx.lineTo(58, 170);
        ctx.lineTo(58, 138);
        ctx.lineTo(26, 138);
        ctx.lineTo(26, 154);
        ctx.lineTo(10, 154);
        ctx.lineTo(10, 186);
        ctx.lineTo(26, 186);
        ctx.lineTo(26, 170);
        ctx.lineTo(42, 170);
        ctx.lineTo(42, 186);
        ctx.lineTo(58, 186);
        ctx.lineTo(58, 202);
        ctx.lineTo(26, 202);
        ctx.lineTo(26, 218);
        ctx.lineTo(42, 218);
        ctx.lineTo(42, 234);
        ctx.lineTo(58, 234);
        ctx.lineTo(58, 218);
        ctx.lineTo(90, 218);
        ctx.lineTo(90, 234);
        ctx.lineTo(74, 234);
        ctx.lineTo(74, 250);
        ctx.lineTo(90, 250);
        ctx.lineTo(90, 266);
        ctx.lineTo(106, 266);
        ctx.lineTo(106, 282);
        ctx.lineTo(122, 282);
        ctx.lineTo(122, 266);
        ctx.lineTo(154, 266);
        ctx.lineTo(154, 234);
        ctx.lineTo(186, 234);
        ctx.lineTo(186, 202);
        ctx.lineTo(170, 202);
        ctx.lineTo(170, 186);
        ctx.lineTo(186, 186);
        ctx.lineTo(186, 170);
        ctx.lineTo(170, 170);
        ctx.lineTo(170, 154);
        ctx.lineTo(186, 154);
        ctx.lineTo(186, 138);
        ctx.lineTo(202, 138);
        ctx.lineTo(202, 122);
        ctx.lineTo(218, 122);
        ctx.lineTo(218, 74);
        ctx.lineTo(234, 74);
        ctx.lineTo(234, 106);
        ctx.lineTo(250, 106);
        ctx.lineTo(250, 42);
        ctx.lineTo(282, 42);
        ctx.lineTo(282, 90);
        ctx.lineTo(298, 90);
        ctx.lineTo(298, 74);
        ctx.lineTo(314, 74);
        ctx.lineTo(314, 106);
        ctx.lineTo(330, 106);
        ctx.lineTo(330, 58);
        ctx.lineTo(346, 58);
        ctx.lineTo(346, 74);
        ctx.lineTo(362, 74);
        ctx.lineTo(362, 106);
        ctx.lineTo(378, 106);
        ctx.lineTo(378, 90);
        ctx.lineTo(394, 90);
        ctx.lineTo(394, 106);
        ctx.lineTo(410, 106);
        ctx.lineTo(410, 122);
        ctx.lineTo(426, 122);
        ctx.lineTo(426, 106);
        ctx.lineTo(442, 106);
        ctx.lineTo(442, 74);
        ctx.lineTo(458, 74);
        ctx.lineTo(458, 58);
        ctx.lineTo(474, 58);
        ctx.lineTo(474, 90);
        ctx.lineTo(458, 90);
        ctx.lineTo(458, 106);
        ctx.lineTo(474, 106);
        ctx.lineTo(474, 138);
        ctx.lineTo(458, 138);
        ctx.lineTo(458, 122);
        ctx.lineTo(442, 122);
        ctx.lineTo(442, 202);
        ctx.lineTo(378, 202);
        ctx.lineTo(378, 186);
        ctx.lineTo(362, 186);
        ctx.lineTo(362, 202);
        ctx.lineTo(346, 202);
        ctx.lineTo(346, 234);
        ctx.lineTo(362, 234);
        ctx.lineTo(362, 218);
        ctx.lineTo(378, 218);
        ctx.lineTo(378, 234);
        ctx.lineTo(394, 234);
        ctx.lineTo(394, 218);
        ctx.lineTo(410, 218);
        ctx.lineTo(410, 250);
        ctx.lineTo(394, 250);
        ctx.lineTo(394, 266);
        ctx.lineTo(378, 266);
        ctx.lineTo(378, 282);
        ctx.lineTo(362, 282);
        ctx.lineTo(362, 250);
        ctx.lineTo(314, 250);
        ctx.lineTo(314, 266);
        ctx.lineTo(282, 266);
        ctx.lineTo(282, 282);
        ctx.lineTo(266, 282);
        ctx.lineTo(266, 298);
        ctx.lineTo(298, 298);
        ctx.lineTo(298, 282);
        ctx.lineTo(314, 282);
        ctx.lineTo(314, 298);
        ctx.lineTo(330, 298);
        ctx.lineTo(330, 314);
        ctx.lineTo(298, 314);
        ctx.lineTo(298, 362);
        ctx.lineTo(282, 362);
        ctx.lineTo(282, 346);
        ctx.lineTo(266, 346);
        ctx.lineTo(266, 314);
        ctx.lineTo(250, 314);
        ctx.lineTo(250, 378);
        ctx.lineTo(266, 378);
        ctx.lineTo(266, 410);
        ctx.lineTo(282, 410);
        ctx.lineTo(282, 378);
        ctx.lineTo(314, 378);
        ctx.lineTo(314, 362);
        ctx.lineTo(330, 362);
        ctx.lineTo(330, 378);
        ctx.lineTo(346, 378);
        ctx.lineTo(346, 362);
        ctx.lineTo(378, 362);
        ctx.lineTo(378, 346);
        ctx.lineTo(394, 346);
        ctx.lineTo(394, 362);
        ctx.lineTo(410, 362);
        ctx.lineTo(410, 378);
        ctx.lineTo(426, 378);
        ctx.lineTo(426, 394);
        ctx.lineTo(410, 394);
        ctx.lineTo(410, 410);
        ctx.lineTo(426, 410);
        ctx.lineTo(426, 442);
        ctx.lineTo(410, 442);
        ctx.lineTo(410, 426);
        ctx.lineTo(378, 426);
        ctx.lineTo(378, 410);
        ctx.lineTo(346, 410);
        ctx.lineTo(346, 426);
        ctx.lineTo(314, 426);
        ctx.lineTo(314, 394);
        ctx.lineTo(298, 394);
        ctx.lineTo(298, 426);
        ctx.lineTo(282, 426);
        ctx.lineTo(282, 442);
        ctx.lineTo(266, 442);
        ctx.lineTo(266, 458);
        ctx.lineTo(250, 458);
        ctx.lineTo(250, 482);

        ctx.stroke();

    }
    drawPath();*/

 