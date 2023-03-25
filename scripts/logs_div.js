$('body').append('<div id="logs"></div>')
$('#logs').addClass("dotted outline")
$('#logs').css('top',`${grid_offset_y + grid_unit/2}px`)
$('#logs').css('left',`${grid_offset_x + grid_unit/2}px`)
function log(text="Hello log 🌴",color="white"){
    $('#logs').append(`<div style="color:#aaa"> >&nbsp <p style="color:${color}">${text}</p> </div>`)
    $('#logs').scrollTop( $("#logs").height() + $("#logs").scrollTop() );
    return text
}
log()