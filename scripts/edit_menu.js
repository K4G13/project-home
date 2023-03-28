const $edit_menu = $('<div>').attr('id',"edit_menu").load('html_elements/edit_menu.html')    

function open_edit_menu(el, isNewElement=false){

    if( !$('#edit_menu').length ){
        $('body').append($edit_menu)
        $edit_menu.get(0).style.animationName = "in"
    }

    $edit_menu.find("#cancel").click(function() { close_edit_menu(el) })
    $edit_menu.find("#save").click(function() { apply_edits(el) })

    if( isNewElement ){
        $edit_menu.find("#link").val("")
        $edit_menu.find("#title").val("")
    }
    else{
        $edit_menu.find("#link").val(el.attr("href"))
        $edit_menu.find("#title").val(el.attr("title"))  
    }

}

function close_edit_menu(el){
    if( !el.attr("href") ) el.remove()
    $edit_menu.get(0).style.animationName = "out"
    setTimeout(()=>{$('#edit_menu').remove(),saveLocaly()},500)
}

function apply_edits(el){
    var url = $edit_menu.find("#link").val()
    el.attr("href",url)
    var title = $edit_menu.find("#title").val()
    el.attr("title",title)    

    el.html("")
    if(      url.indexOf('youtube') >= 0 )  el.get(0).style.backgroundImage = "url(resorces/icons/youtube.png)"
    else if( url.indexOf('facebook') >= 0 ) el.get(0).style.backgroundImage = "url(resorces/icons/facebook.png)"
    else if( url.indexOf('glovo') >= 0 )    el.get(0).style.backgroundImage = "url(resorces/icons/glovo.png)"
    else if( url.indexOf('mail') >= 0 )     el.get(0).style.backgroundImage = "url(resorces/icons/gmail.png)"
    else if( url.indexOf('netflix') >= 0 )  el.get(0).style.backgroundImage = "url(resorces/icons/netflix.png)"
    else if( url.indexOf('twitch') >= 0 )   el.get(0).style.backgroundImage = "url(resorces/icons/twitch.png)"
    else if( url.indexOf('instagram') >= 0 )   el.get(0).style.backgroundImage = "url(resorces/icons/instagram.png)"
    else if( url.indexOf('messenger') >= 0 )   el.get(0).style.backgroundImage = "url(resorces/icons/messenger.png)"
    else if( url.indexOf('outlook') >= 0 )   el.get(0).style.backgroundImage = "url(resorces/icons/outlook.png)"
    else{
        el.get(0).style.backgroundImage = "none"
        if( title.split(' ').length >= 3 ){
            var short = title.split(' ')[0][0].toUpperCase() + title.split(' ')[1][0].toUpperCase() + title.split(' ')[2][0].toUpperCase()
        }
        else if( title.split(' ').length == 2 ) {
            var short = title.split(' ')[0][0].toUpperCase() + title.split(' ')[0][1].toLowerCase() + title.split(' ')[1][0].toUpperCase()
        }
        else if(title.length>=3){
            var short = title[0].toUpperCase() + title[1].toLowerCase() + title[2].toLowerCase()
        }
        else{
            var short = title
        }
    }
    el.html(short)

    saveLocaly()

    close_edit_menu(el)
}
