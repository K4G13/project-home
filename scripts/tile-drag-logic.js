for( const el of tiles = document.querySelectorAll('#tile-row .tile') )
    el.style.order = Array.from(tiles).indexOf(el)

var mousePos = {x:0, y:0}
onmousemove = function(e){mousePos.x = e.clientX, mousePos.y = e.clientY}

var tileID = -1
for( const el of tiles = document.querySelectorAll('#tile-row .tile') )
    el.setAttribute("onmousedown", `tileID = ${Array.from(tiles).indexOf(el)};`)    
var MOVETILES = true
var mouseDownInterval 
document.addEventListener("mousedown", function(){
    mouseDownInterval = setInterval(function(){  
        if( MOVETILES && tileID>=0 ) pickUpTile()
    }, 10 )    
})
document.addEventListener("mouseup", function(){
    if (mouseDownInterval) clearInterval(mouseDownInterval)
    if( MOVETILES && tileID>=0 ) putDownTile()
    tileID=-1
})
// document.addEventListener("mouseout", function(){
//     if (mouseDownInterval ) clearInterval(mouseDownInterval)
//     if( MOVETILES && tileID>=0 ) putDownTile()
//     tileID=-1
// })

var deltaPos = {x:0, y:0}
var tileMargin = window.getComputedStyle(document.querySelector("#tile-row .tile")).marginTop; tileMargin = Number(tileMargin.substring(0,tileMargin.length - 2))
function pickUpTile(){
    if(document.querySelector('body').classList.contains('dev'))
        console.log("mouse is %cUP","color: cyan")
    /// DO ONCE
    if( !document.querySelector("#tile-row .tile.dummy") ){
        let dummyTile = document.querySelectorAll("#tile-row .tile")[tileID].cloneNode(true)
        dummyTile.classList.add('dummy')
        document.querySelector("#tile-row").innerHTML += dummyTile.outerHTML
        deltaPos.x = mousePos.x - (document.querySelectorAll("#tile-row .tile")[tileID].getBoundingClientRect().left - tileMargin)
        deltaPos.y = mousePos.y - (document.querySelectorAll("#tile-row .tile")[tileID].getBoundingClientRect().top - tileMargin)
        document.querySelector('#edit-area').classList.add('active')
        document.querySelector('#delete-area').classList.add('active')
    }
    /// LOOP
    else{ 
        document.querySelector("#tile-row .tile.dummy").style.left = (mousePos.x - deltaPos.x) + "px"
        document.querySelector("#tile-row .tile.dummy").style.top = (mousePos.y - deltaPos.y) + "px"
    }
}

function putDownTile(){
    if(document.querySelector('body').classList.contains('dev'))
        console.log("mouse is %cDOWN","color: crimson")
    document.querySelector("#tile-row .tile.dummy").outerHTML = ""    
    document.querySelector('#edit-area').classList.remove('active')
    document.querySelector('#delete-area').classList.remove('active')

    var editArea = document.querySelector('#edit-area').getBoundingClientRect()
    if( mousePos.x >= editArea.left && mousePos.x <= editArea.left + editArea.width &&
        mousePos.y >= editArea.top  && mousePos.y <= editArea.top  + editArea.height )
        console.log("EDIT TILE")

    var deleteArea = document.querySelector('#delete-area').getBoundingClientRect()
    if( mousePos.x >= deleteArea.left && deleteArea.x <= deleteArea.left + deleteArea.width &&
        mousePos.y >= deleteArea.top  && deleteArea.y <= deleteArea.top  + deleteArea.height )
        deleteTile(tileID)    
}

function deleteTile(tileID){
    if(document.querySelector('body').classList.contains('dev'))
        console.log(`%cdelete tile in row: ${tileID}`,"color: crimson")
    document.querySelectorAll('#tile-row .tile')[tileID].classList.add('squish')
    setTimeout(() => {
        document.querySelectorAll('#tile-row .tile')[tileID].remove()
        for( const el of tiles = document.querySelectorAll('#tile-row .tile') ){
            el.style.order = Array.from(tiles).indexOf(el)
            el.setAttribute("onmousedown", `tileID = ${Array.from(tiles).indexOf(el)};`) 
        }
    }, 200);
}

function addTile(){
    document.querySelector("#tile-row").innerHTML += "<div class='tile squish'></div>"
    let el = document.querySelector("#tile-row .tile:last-of-type")
    el.style.order = document.querySelectorAll('#tile-row .tile').length - 1
    el.setAttribute("onmousedown", `tileID = ${ document.querySelectorAll('#tile-row .tile').length - 1 };`) 
    /*TEMP FOR DEV*/el.style.setProperty("--devIndex", '"'+( maxDevIndex )+'"');    
    /*TEMP FOR DEV*/maxDevIndex++
    setTimeout(() => {
        el.classList.remove('squish')
    }, 1);
}