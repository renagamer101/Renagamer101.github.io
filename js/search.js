function proxySafeUrl(url) {
    if (/https?:\/\//.test(url)) return url;
    else return `https://www.google.com/search?q=${encodeURIComponent(url)}`;
}

function initSearch() {
    const search = document.querySelector(".searchbox .search input");

    search.addEventListener("keypress", e => {
        if (e.key == "Enter") toProxy(proxySafeUrl(search.value));
    })
}

addEventListener("DOMContentLoaded", () => {
    initSearch();
})