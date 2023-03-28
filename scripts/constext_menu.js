// event listeners for right click on element 'a'
$('#container a').mousedown(function(event){ 
    if( event.button == 2 ) { 
        open_contextmenu(this,event)
        return false; 
    }
    return true; 
}); 
// disable right click default contxtmenu
document.oncontextmenu = () => { return false }
// close contextmenu when not rightclicked on 'a'
$('body').mousedown( () => { close_contextmenu() })

// load context_menu ui
const $context_menu = $('<div>').attr('id',"context_menu").load('html_elements/context_menu.html')

// on right click on 'a' element event
function open_contextmenu(el,event){
    
    close_contextmenu()

    $('body').append( $context_menu )
    $context_menu.css({
        'top':  `${event.pageY}px`,
        'left': `${event.pageX}px`
    })
    
    if( event.pageX + $context_menu.width()  >= $('body').width() )
        $context_menu.css('left',`${event.pageX - $context_menu.width()}px`)
    if( event.pageY + $context_menu.height() >= $('body').height() )
        $context_menu.css('top',`${event.pageY - $context_menu.height()}px`)

    $('#context_menu #edit').mousedown( (event) => { 
        if( event.button == 0 ){
            edit_tile(el)
        }
    })

    $('#context_menu #delete').mousedown( (event) => { 
        if( event.button == 0 ){
            delete_tile(el)
        }
    })

}

function close_contextmenu(){ $context_menu.remove() }

function delete_tile(el){
    if(!$('#edit_menu').length){
        let tile_index =$.inArray(el, $('#container a'))
        console.log(`%cdeleting %ctile[${tile_index}]`,"color:red","color: normal")
        el.style.overflow = "hidden"
        el.style.transition = "all 500ms"
        el.style.width = 0
        el.style.marginLeft = 0
        el.style.marginRight = 0
        setTimeout(()=>{el.remove(),saveLocaly()},500)
    }
}

function edit_tile(el){
    if(!$('#edit_menu').length){
        let tile_index = $.inArray(el, $('#container a'))
        console.log(`%cediting %ctile[${tile_index}]`,"color:lightblue","color: normal")
        open_edit_menu($(el))
    }
}

$('#add-btt').click(()=>add_new_tile())
function add_new_tile(){
    if (!$('#edit_menu').length){
        console.log(`%cadding %cnew tile`,"color:lightgreen","color: normal")
        $("#container").append("<a></a>")
        $('#container a:last').mousedown(function(event){ 
            if( event.button == 2 ) { 
                open_contextmenu(this,event)
                return false; 
            }
            return true; 
        }); 
        open_edit_menu($('#container a:last'),isNewElement=true)
    }
}