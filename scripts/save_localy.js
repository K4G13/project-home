var DB

function saveLocaly(){

    var data = { html: $('#container').html() }
    var json = JSON.stringify(data);    
    localStorage.setItem('data', json);

}

function loadFromLocal(){

    var data = JSON.parse(localStorage.getItem('data'))
    // console.log(data)

    var defaultData = { html: "\n\n        <button id=\"add-btt\">+</button>\n      \n        <a href=\"https://www.youtube.com/\" target=\"_blank\" title=\"youtube\">youtube</a>\n        <a href=\"https://www.facebook.com/\" target=\"_blank\" title=\"facebook\">facebook</a>\n        <a href=\"https://www.twitch.tv/directory/following\" target=\"_blank\" title=\"twitch\">twitch</a>\n        <a href=\"https://www.netflix.com/\" target=\"_blank\" title=\"netflix\">netflix</a>\n        <a href=\"https://mail.google.com/mail/u/0/#inbox\" target=\"_blank\" title=\"gmail\">gmail</a>\n        <a href=\"https://glovoapp.com/pl/pl/poznan/\" target=\"_blank\" title=\"glovo\">glovo</a>\n\n    "}

    if( !data ) {
        console.log("LOCALSTORAGE ERROR - loading default data")
        data = defaultData
    }

    $('#container').html(data.html)

    $('#add-btt').click(()=>add_new_tile())
    $('#container a').mousedown(function(event){ 
        if( event.button == 2 ) { 
            open_contextmenu(this,event)
            return false; 
        }
        return true; 
    }); 

    for( let i=0; i<$('#container a').length; i++ ){
        let el = $('#container a')[i]
        el = $(el)
        let url = el.attr("href")
        let title = el.attr("title")
        el.html("")
        var short = ""
        if(      url.indexOf('youtube') >= 0 )  el.get(0).style.backgroundImage = "url(resorces/icons/youtube.png)"
        else if( url.indexOf('facebook') >= 0 ) el.get(0).style.backgroundImage = "url(resorces/icons/facebook.png)"
        else if( url.indexOf('glovo') >= 0 )    el.get(0).style.backgroundImage = "url(resorces/icons/glovo.png)"
        else if( url.indexOf('mail') >= 0 )     el.get(0).style.backgroundImage = "url(resorces/icons/gmail.png)"
        else if( url.indexOf('netflix') >= 0 )  el.get(0).style.backgroundImage = "url(resorces/icons/netflix.png)"
        else if( url.indexOf('twitch') >= 0 )   el.get(0).style.backgroundImage = "url(resorces/icons/twitch.png)"
        else if( url.indexOf('instagram') >= 0 )el.get(0).style.backgroundImage = "url(resorces/icons/instagram.png)"
        else if( url.indexOf('messenger') >= 0 )el.get(0).style.backgroundImage = "url(resorces/icons/messenger.png)"
        else if( url.indexOf('outlook') >= 0 )  el.get(0).style.backgroundImage = "url(resorces/icons/outlook.png)"
        else{
            el.get(0).style.backgroundImage = "none"
            if( title.split(' ').length >= 3 ){
                short = title.split(' ')[0][0].toUpperCase() + title.split(' ')[1][0].toUpperCase() + title.split(' ')[2][0].toUpperCase()
            }
            else if( title.split(' ').length == 2 ) {
                short = title.split(' ')[0][0].toUpperCase() + title.split(' ')[0][1].toLowerCase() + title.split(' ')[1][0].toUpperCase()
            }
            else if(title.length>=3){
                short = title[0].toUpperCase() + title[1].toLowerCase() + title[2].toLowerCase()
            }
            else{
                short = title
            }
        }
        el.html(short)
    }

}

loadFromLocal()