const $settings_menu = $('<div>').attr('id',"settings_menu").addClass('glass').load('html_elements/settings_menu/settings_menu.html')    
$('#settings-btt').on('click',function(){ open_settings_menu() })

function open_settings_menu(){

    $settings_menu.get(0).style.animationDuration = "500ms"
    $settings_menu.get(0).style.animationName = "inRight"
    $('body').append($settings_menu)

    $('#settings_menu button#close').on('click',function(){ close_settings_menu() })
    $('#settings_menu .category:first img').on('click',function(){ 
        let imgSrc = $(this).attr('src')
        $('body').get(0).style.backgroundImage = `url(${imgSrc})`
        saveLocaly()
    })

}

function close_settings_menu(){
    $settings_menu.get(0).style.animationDuration = "500ms"
    $settings_menu.get(0).style.animationName = "outRight"
    setTimeout(()=>{  $settings_menu.remove()  },450)    
}