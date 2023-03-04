document.querySelector('body').innerHTML += "<div id='dev-switch' onclick='switchDevMode()'>dev</div>"

function switchDevMode(){

    if( !document.querySelector('#dev-switch').classList.contains('on') ){
        document.querySelector('#dev-switch').classList.add('on')
        console.log("%cdev mode: %cON","color: yellow","color: lime;")
        
        document.querySelector('body').classList.add('dev')
                
        for( const el of tiles = document.querySelectorAll('#tile-row .tile') )
            el.style.setProperty("--devIndex", '"'+Array.from(tiles).indexOf(el)+'"');     
        /*TEMP FOR DEV*/maxDevIndex = document.querySelectorAll('#tile-row .tile').length     
    }
    else{
        document.querySelector('#dev-switch').classList.remove('on')
        console.log("%cdev mode: %cOFF","color: yellow;","color: red;")
        
        document.querySelector('body').classList.remove('dev')
    }  

}   switchDevMode()