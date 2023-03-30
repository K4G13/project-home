$(document).on('contextmenu', function(e) {
    if( $(e.target).is("a") || $(e.target).is("a *") ){
        if( $(e.target).is("a *") ) e.target = $(e.target).parents("a:first").get(0);
        open_contextmenu(e.target,e)
        return false
    }    
    else{  
        close_contextmenu() 
    }
})
$(document).on('click', function() { 
    close_contextmenu()  
})

const $context_menu = $('<div>').attr('id',"context_menu").addClass('glass').load('html_elements/context_menu/context_menu.html')
function close_contextmenu(){ 
    $context_menu.remove() 
}
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

    $('#context_menu #openTT').on('click', function() {
        openLinkInCurrentTab(el)
    })

    $('#context_menu #openNT').on('click', function() {
        openLinkInNewTab(el)
    })

    $('#context_menu #edit').on('click', function() {
        console.log("EDIT",el)
    })
    
    $('#context_menu #del').on('click', function() {
        deleteLink(el)
    })    

}

function openLinkInCurrentTab(el){
    window.location.href = $(el).attr('href')
}
function openLinkInNewTab(el){
    window.open($(el).attr('href'), '_blank')
}
function deleteLink(el){

    $(el).animate({
            width: 0,
            marginLeft: 0,
            marginRight: 0
        }, 500, function() { el.remove() })
    
}
function editLink(el){

    

}