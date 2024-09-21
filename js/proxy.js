navigator.serviceWorker.register("/sw.js", {scope:__uv$config.prefix})

Object.defineProperty(window, "toProxy", {
    value: url => {
        let loc = __uv$config.prefix + __uv$config.encodeUrl(url);
        location.replace(loc);
    }
})