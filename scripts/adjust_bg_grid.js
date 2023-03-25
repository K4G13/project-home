var grid_unit = window.getComputedStyle(document.body).getPropertyValue('--unit');
grid_unit = grid_unit.substring(1,grid_unit.length-2)
if(!grid_unit) grid_unit = 50
if($('body').hasClass('dotted')) $('body').css('background-size',`${grid_unit}px ${grid_unit}px`)
var grid_offset_x = (window.innerWidth%grid_unit)/2
var grid_offset_y = (window.innerHeight%grid_unit)/2
if($('body').hasClass('dotted')) $('body').css('background-position',`${grid_offset_x}px ${grid_offset_y}px`)
