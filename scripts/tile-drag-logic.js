var tileID = -1

for( const el of tiles = document.querySelectorAll('#tile-row>.tile') )
    el.setAttribute("onmousedown", `tileID = ${Array.from(tiles).indexOf(el)};`)    

var timer;
document.addEventListener("mousedown", function(){

    if(tileID!=-1){ 

        document.querySelector("#edit-area").classList.add("active")
        document.querySelector("#delete-area").classList.add("active")
        
        document.querySelector('#tile-row').innerHTML+= "<div class='tile dummy'>DUMMY</div>"
        tileMargin = window.getComputedStyle(document.querySelectorAll('#tile-row>.tile')[tileID]).getPropertyValue('margin')
        tileMargin = tileMargin.substring(0, tileMargin.length - 2)
        mouseOffSetX = mouseX - (document.querySelectorAll('#tile-row>.tile')[tileID].getBoundingClientRect().left - tileMargin)
        mouseOffSetY = mouseY - (document.querySelectorAll('#tile-row>.tile')[tileID].getBoundingClientRect().top  - tileMargin)        
        document.querySelector('#tile-row>.tile.dummy').style.left= (document.querySelectorAll('#tile-row>.tile')[tileID].getBoundingClientRect().left - tileMargin) + "px"
        document.querySelector('#tile-row>.tile.dummy').style.top = (document.querySelectorAll('#tile-row>.tile')[tileID].getBoundingClientRect().top - tileMargin) + "px"

        timer=setInterval(function(){  
            console.log(`mouse is %cDOWN %cand on tile%c[${tileID}]`,"color: lightblue","color: none;","color: lightblue")
            //console.log(`x: ${mouseX}|${mouseOffSetX}   y: ${mouseY}|${mouseOffSetY}`)
            document.querySelector('#tile-row>.tile.dummy').style.left= mouseX - mouseOffSetX + "px"
            document.querySelector('#tile-row>.tile.dummy').style.top = mouseY - mouseOffSetY + "px"

        }, 10); }        
    else 
        console.log(`mouse is %cDOWN`,"color: lightblue")  
    
});
document.addEventListener("mouseup", function(){
    console.log("mouse is %cUP","color: lightblue")
    if (timer) clearInterval(timer)
    document.querySelector("#edit-area").classList.remove("active")
    document.querySelector("#delete-area").classList.remove("active")
    if(tileID!=-1){
        posY = window.getComputedStyle(document.querySelector('#tile-row>.tile.dummy')).getPropertyValue('top')
        posY = posY.substring(0, posY.length - 2)
        if(posY <= 100)
            console.log("EDIT TILE")
        document.querySelector('#tile-row>.tile.dummy').outerHTML = "" 
    }   
    tileID = -1
});
onmousemove = function(e){mouseX = e.clientX, mouseY = e.clientY}
