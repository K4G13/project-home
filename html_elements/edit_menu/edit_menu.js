const $edit_menu = $('<div>').attr('id',"edit_menu").addClass('glass').load('html_elements/edit_menu/edit_menu.html')    

function open_edit_menu(el){

    if( $('#edit_menu').length ){
        $edit_menu.remove()
        $edit_menu.get(0).style.animationName = ""
    }
    else{
        $edit_menu.get(0).style.animationDuration = "500ms"
        $edit_menu.get(0).style.animationName = "inLeft"
    }
        
    $('body').append($edit_menu)

    //mock elemnt logic
    $('#edit_menu #a_mock').html( $(el).html() )
    $('#edit_menu #a_mock').css('height', $(el).css('height'))
    $('#edit_menu #a_mock').css('width', $(el).css('width'))

    $('#edit_menu ul input').eq(0).val($(el).attr('href'))
    $('#edit_menu ul input').eq(1).val($(el).attr('title'))
    $('#edit_menu ul input').eq(2).val($(el).find('img').attr('src'))

    $('#edit_menu ul input').eq(0).on('input',function(){
        $('#edit_menu #a_mock').attr('href',$(this).val())
        checkIfLinkInDB($(this).val()) 
    })
    $('#edit_menu ul input').eq(1).on('input',function(){
        $('#edit_menu #a_mock').attr('title',$(this).val()) 
        set_link_string()
    })
    $('#edit_menu ul input').eq(2).on('input',function(){
        set_link_img( $(this).val() ) 
    })

    //buttons logic
    $('#edit_menu #cancel').on('click', function() {  close_edit_menu()  })
    $('#edit_menu #save').on('click', function() {  edit_link(el); close_edit_menu() })

}

function close_edit_menu(){
    $edit_menu.get(0).style.animationDuration = "500ms"
    $edit_menu.get(0).style.animationName = "outLeft"
    setTimeout(()=>{  $edit_menu.remove()  },450)    
}

function edit_link(el){
    let body = $('#edit_menu #a_mock').html()
    let href = $('#edit_menu ul input').eq(0).val()
    let title = $('#edit_menu ul input').eq(1).val()
    let imgSrc = $('#edit_menu ul input').eq(2).val()

    $(el).html(body)
    $(el).attr('href',href)
    $(el).attr('title',title)
    $(el).find('img').attr('src',imgSrc)

    saveLocaly()
}

function set_link_img(src){
    if( src == "" )
        set_link_string()
    else{
        $('#edit_menu #a_mock').html("<img/>")
        $('#edit_menu #a_mock img').attr('src',src)
    }
}

function set_link_string(){
    if( $('#edit_menu ul input').eq(2).val() == "" ){
        let title = $('#edit_menu ul input').eq(1).val()
        $('#edit_menu #a_mock').html( title )
    }
}

function checkIfLinkInDB(href){
    for( el of URL_DB ){
        let key = Object.keys(el)[0]
        if( href.includes(key) ){
            $('#edit_menu ul input').eq(2).val( Object.values(el)[0] )
            set_link_img( Object.values(el)[0] )
        }
    }
}