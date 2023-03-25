document.oncontextmenu = function() {return false;};
  
$('#container a').mousedown(function(e){ 
    if( e.button == 2 ) { 
        let tile_index =$.inArray(this, $('#container a'))
        log(`right click on tile[${tile_index}] `)
        return false; 
    } 
        return true; 
}); 
