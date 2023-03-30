$('main #add-btt').on('click',function(){ add_new_link() })
function add_new_link(){

    $('main').append('<a></a>')
    saveLocaly()
    open_edit_menu($('main a:last'))

}