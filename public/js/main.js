import stealthTab from './util/stealth.js';

addEventListener('DOMContentLoaded', () => {
    let input = document.querySelector('main .search input');

    input.addEventListener('keypress', e => {
        if (e.key == "Enter") {
            let url = e.target.value;

            if (/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/g.test(url)) {
				if (!/http[s]?:\/\//g.test(url))
					url = "https://" + url;
			} else
				url = "https://www.google.com/search?q=" + encodeURIComponent(url);

            let proxied = location.origin + __uv$config.prefix + __uv$config.encodeUrl(url);

            if (localStorage.getItem('stealth') != 'true')
                location.replace(proxied);
            else stealthTab(proxied);
        }
    })
})