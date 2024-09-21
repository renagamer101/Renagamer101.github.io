import config from './config/games.config.js';
import stealthTab from './util/stealth.js';

function createGame(data) {
	// let evt = data.name == "Add" ? "window.toggleAddGame();" : "window.__openApp('"+data.data.url+"')";
	let gameElm = document.createElement("div");
    gameElm.className = "widget game";
	gameElm.innerHTML = `<p>${data.name}</p><img src="${data.image}"/>`;
	document.querySelector("main .catalog").appendChild(gameElm);
    return gameElm;
}


window.onload = () => {
    const games = document.querySelector('.catalog');

    config.forEach(game => {
        let elm = createGame(game);

        elm.addEventListener("click", e => {
            if (localStorage.getItem('tabcloak') != "true")
                parent.document.querySelector('link[rel="icon"]').setAttribute('href', game.image);

            if (!/https?:\/\//g.test(game.source)) document.location.replace(game.source);
            else {
                let proxied = location.origin + __uv$config.prefix + __uv$config.encodeUrl(game.source);
                if (localStorage.getItem('stealth') != 'true') document.location.replace(proxied);
                else stealthTab(proxied);
            }
        })
    })
}