const themes = [
    'default',
]

window.loadTheme = (theme = "default", level = document) => {
    const setTheme = elm => {
        elm.setAttribute("data-theme", theme);
        if (elm.children) for (let child of elm.children) setTheme(child);
    }

    setTheme(level.body);
    for (let frame of top.document.querySelectorAll("iframe")) {
        setTheme(frame.contentWindow.document.body);
    }
}

addEventListener("DOMContentLoaded", () => {
    let theme = localStorage.getItem("theme");
    if (theme == null)
        theme = themes[Math.floor(Math.random() * themes.length)];
    
    window.loadTheme(theme);
    localStorage.setItem("theme", theme);
})
