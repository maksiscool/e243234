fetch("/endpoint").then(lol => {
    lol = lol.json().then(lol => {

        lol.body.sort((a,b) => b[1]-a[1])
        
        for (var i = 0; i < lol.body.length; i++) {

            document.getElementById("LeaderboardT").innerHTML += `<tr><td>${i+1}</td><td>${lol.body[i][0]}</td><td>${lol.body[i][1]}</td></tr>`

        }

        


    })
    
    
})
fetch("/submit",{
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        user: "Hitler",
        score: "19391939"
    }),
    
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

    a = Date.now()
    setTimeout(Tick,16)
}
Tick()