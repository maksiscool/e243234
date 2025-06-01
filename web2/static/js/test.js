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
var rocket = document.getElementById("tennis")
var rocket_x = 500
var rocket_y = 500
var rocket_dx = 0
var rocket_dy = 0
var speed = 5
a = Date.now();
function Tick() {
    var dt = (Date.now()-a)/1000
    
    var tmpdx = MouseX - rocket_x
    var tmpdy = MouseY - rocket_y

    rocket_dx += tmpdx * speed* dt
    rocket_dy += tmpdy * speed* dt
    rocket_dx *= 0.97
    rocket_dy *= 0.97

    
    rocket_x+=rocket_dx*dt
    rocket_y+=rocket_dy*dt
    rocket.style.transform = `rotate(${Math.atan2(rocket_dy,Math.abs(rocket_dx))}rad)`
    rocket.style.left = `${rocket_x - rocket.clientWidth/4}px`
    rocket.style.top = `${rocket_y-rocket.clientHeight*0.7}px`
    a = Date.now()
    setTimeout(Tick,16)
}
Tick()