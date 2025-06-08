fetch("/endpoint").then(lol => {
    lol = lol.json().then(lol => {

        lol.body.sort((a,b) => b[1]-a[1])
        
        for (var i = 0; i < lol.body.length; i++) {

            document.getElementById("LeaderboardT").innerHTML += `<tr><td>${i+1}</td><td>${lol.body[i][0]}</td><td>${lol.body[i][1]}</td></tr>`

        }

        


    })
    
    
})

var MouseX = 0;
var MouseY = 0;
function updatePos(ev) {
    MouseX = ev.pageX
    MouseY = ev.pageY

}
document.onmousemove = updatePos
var menu = document.getElementById("menu")
var rocket = document.getElementById("tennis")
var rocket_x = menu.getBoundingClientRect().left + menu.getBoundingClientRect().width/2
var rocket_y = window.screen.height * 0.75

var p1x = rocket_x
var p1y = rocket_y + 40
var p2x = rocket_x
var p2y = rocket_y - 30


var rocket_dx = 0
var rocket_dy = 0
var speed = 5
a = Date.now();
rocket.style.left = `${500}px`
rocket.style.top = `${500}px`


var Ball = document.getElementById("ball")
var BallX = menu.getBoundingClientRect().left + menu.getBoundingClientRect().width/2
var BallY = window.screen.height * 0.25
var randomL = menu.getBoundingClientRect().left+32
var randomR = menu.getBoundingClientRect().right-32
var randomU1 = menu.getBoundingClientRect().bottom/2+32
var randomD1 = menu.getBoundingClientRect().bottom-32
var randomU2 = menu.getBoundingClientRect().top+32
var randomD2 = menu.getBoundingClientRect().bottom/2-32
var BallSize = 75
var BallRot = 0
var mode = 0
var DestX = randomL+Math.random()*(randomR-randomL)
var DestY = randomU1+Math.random()*(randomD1-randomU1)
var dst = DestX-BallX
var playing = true
var score = 0

function Tick() {
    var dt = (Date.now()-a)/1000
    
    var tmpdx = MouseX - rocket_x
    var tmpdy = MouseY - rocket_y

    rocket_dx += tmpdx * speed* dt
    rocket_dy += tmpdy * speed* dt

    mgtd = Math.sqrt(rocket_dx*rocket_dx+rocket_dy*rocket_dy)
    if (mgtd > 1000) {
        rocket_dx = 1000*(rocket_dx/mgtd)
        rocket_dy = 1000*(rocket_dy/mgtd)
    }

    if (rocket.getBoundingClientRect().right+rocket_dx*dt > menu.getBoundingClientRect().right+40 && rocket_dx > 0) {
        rocket_dx = 0
    }
    if (rocket.getBoundingClientRect().left+rocket_dx*dt < menu.getBoundingClientRect().left-40 && rocket_dx < 0) {
        rocket_dx = 0
    }
    if (rocket.getBoundingClientRect().bottom+rocket_dy*dt > menu.getBoundingClientRect().bottom+40 && rocket_dy > 0) {
        rocket_dy = 0
    }
    if (rocket.getBoundingClientRect().top+rocket_dy*dt < menu.getBoundingClientRect().bottom/2-40 && rocket_dy < 0) {
        rocket_dy = 0
    }
    p1x += rocket_dx*dt
    p1y += rocket_dy*dt
    mgtd2 = Math.sqrt((p1x-p2x)*(p1x-p2x) + (p1y-p2y)*(p1y-p2y))
    p2x = 70*(p2x-p1x)/mgtd2 + p1x
    p2y = 70*(p2y-p1y)/mgtd2 + p1y
    




    rocket_x+=rocket_dx*dt
    rocket_y+=rocket_dy*dt
    rocket.style.transform = `rotate(${Math.atan2((p1y-p2y),(p1x-p2x))-Math.PI/2}rad)`
    rocket.style.left = `${rocket_x - rocket.clientWidth/2}px`
    rocket.style.top = `${rocket_y-rocket.clientHeight/2}px`




    //Ball
    
    if (playing) {
        BallRot += 5*dt
        var dx = DestX-BallX
        var dy = DestY-BallY
        var mgtd3 = Math.sqrt(dx*dx+dy*dy)
        if (mgtd3 > 300*dt) {
            BallX += 300*dt*dx/mgtd3
            BallY += 300*dt*dy/mgtd3
        }
        else {
            BallX = DestX
            BallY = DestY

            var xTEMP = ((p1x+(p2x-p1x)*0.8)-BallX)
            var yTEMP = ((p1y+(p2y-p1y)*0.8)-BallY)

            if (Math.sqrt(xTEMP*xTEMP+yTEMP*yTEMP) < 70) {
                if (mode == 0) {
                    score += 1
                    DestX = randomL+Math.random()*(randomR-randomL)
                    DestY = randomU2+Math.random()*(randomD2-randomU2)
                    dst = DestX - BallX
                }
                else {
                    DestX = randomL+Math.random()*(randomR-randomL)
                    DestY = randomU1+Math.random()*(randomD1-randomU1)
                    dst = DestX - BallX
                }
            }
            else {
                if (mode == 0) {
                    playing = false
                    
                    Ball.style.visibility = "hidden"
                    var name = prompt(`Ваш рахунок: ${score}! Залишіть ім'я, яке відображатиметься на таблиці лідерів`)
                    
                    if (name != null && name != "") {
                        fetch("/submit",{
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                user: name,
                                score: `${score}`
                            }),
                            
                        })
                    }
                    score = 0
                }
                else {
                    DestX = randomL+Math.random()*(randomR-randomL)
                    DestY = randomU1+Math.random()*(randomD1-randomU1)
                    dst = DestX-BallX
                }
            }
            mode = 1-mode
            
        }
        Ball.style.width = `${(1.5-Math.abs((DestX-BallX)/dst-0.5))*75}px`
        Ball.style.height = `${(1.5-Math.abs((DestX-BallX)/dst-0.5))*75}px`
        Ball.style.top = `${BallY-Ball.clientHeight/2}px`
        Ball.style.left = `${BallX-Ball.clientWidth/2}px`
        Ball.style.transform = `rotate(${BallRot}rad)`
    }
    




    a = Date.now()
    setTimeout(Tick,16)
}
Tick()