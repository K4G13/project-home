function switchDevMode(){

    if( !document.querySelector('#dev-switch').classList.contains('on') ){
        document.querySelector('#dev-switch').classList.add('on')
        console.log("%cdev mode: %cON","color: yellow","color: lime;")
        
        document.querySelector('body').classList.add('dev')
                
        for( const el of tiles = document.querySelectorAll('#tile-row>.tile') )
            el.innerHTML = Array.from(tiles).indexOf(el)
            
    }
    else{
        document.querySelector('#dev-switch').classList.remove('on')
        console.log("%cdev mode: %cOFF","color: yellow;","color: red;")
        
        document.querySelector('body').classList.remove('dev')

        for( const el of tiles = document.querySelectorAll('#tile-row>.tile') )
            el.innerHTML = ""

    }  

}   switchDevMode()