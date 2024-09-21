const gameList = [
    {
        name: "Minecraft",
        url: "https://minecraft.net/",

    },
    {
        name: "Roblox",
        url: "https://roblox.com/",

    },
    {
        name: "CrazyGames",
        url: "https://crazygames.com/",

    },
]

const appsList = [
    {
        name: "SFlix",
        url: "https://sflix.to/",

    },
    {
        name: "TikTok",
        url: "https://tiktok.com/",

    },
    {
        name: "YouTube",
        url: "https://youtube.com/",

    },
]

async function parseThroughProxy(url) {
    const bareClient = await createBareClient(new URL(__uv$config.bare, location.origin));

    const favicon = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${new URL(url).href}/64&size=64`;
	const fRes = await bareClient.fetch(favicon);
	const blob = await fRes.blob();

    return URL.createObjectURL(blob);
}

async function initGames() {
    const games = document.querySelector(".games .gamelist");

    for (let game of gameList) {
        let elm = document.createElement("div");
        if (!game.img) game.img = await parseThroughProxy(game.url);
        elm.className = "game";
        elm.innerHTML = `<img src="${game.img}"></img>
        <p>${game.name}</p>`;
        elm.addEventListener("click", e => {
            toProxy(game.url);
        })
        games.appendChild(elm);
    }
}

async function initApps() {
    const games = document.querySelector(".games .gamelist");

    for (let game of appsList) {
        let elm = document.createElement("div");
        if (!game.img) game.img = await parseThroughProxy(game.url);
        elm.className = "game";
        elm.innerHTML = `<img src="${game.img}"></img>
        <p>${game.name}</p>`;
        elm.addEventListener("click", e => {
            toProxy(game.url);
        })
        games.appendChild(elm);
    }
}

addEventListener("DOMContentLoaded", () => {
    if (location.pathname.includes("apps")) initApps();
    else initGames();
})