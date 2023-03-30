function saveLocaly(){

    let data = { html:"", wallpaper:"" }
    data.html = $('main').html()
    data.wallpaper = $('body').css('backgroundImage')
    let json = JSON.stringify(data);    
    localStorage.setItem('data420', json)

}

function loadFromLocal(){

    let data = JSON.parse(localStorage.getItem('data420'))

    let defaultData = { html:"", wallpaper:"" }
    defaultData.html = `
        <button id="add-btt">+</button>
        <a href="https://www.youtube.com" title="youtube"><img src="resorces/link-icons/youtube.svg"/></a>
        <a href="https://www.facebook.com" title="facebook"><img src="resorces/link-icons/facebook.svg"/></a>
        <a href="https://www.instagram.com" title="instagram"><img src="resorces/link-icons/instagram.svg"/></a>
        <a href="https://mail.google.com/mail/u/0/#inbox" title="gmail"><img src="resorces/link-icons/gmail.svg"/></a>
        <a href="https://github.com/K4G13/" title="github"><img src="resorces/link-icons/github.svg"/></a>
    `;
    defaultData.wallpaper = "url(resorces/wallpapers/wallpaper0.png)"
    if( !data ) {
        console.log("LOCALSTORAGE ERROR - loading default data")
        data = defaultData
    }

    $('main').html(data.html)

    $('body').css('background',data.wallpaper)
    $('body').css('backgroundPosition','center')
    $('body').css('backgroundSize','cover')
    
}

loadFromLocal()