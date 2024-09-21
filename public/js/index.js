import { fetchDocument } from './util/cloak.js';
import iframeURLChange from './util/iframe.js'
import stealthTab from './util/stealth.js';

const frame = document.querySelector('iframe#frame');
const credits = document.querySelector('.infobar');
const gui = document.querySelector('.topnav');
const settings = document.querySelector('.settingbar');
const clickOff = document.querySelector('.clickOff');

addEventListener('DOMContentLoaded', () => {
    navigator.serviceWorker.register('sw.js');

    iframeURLChange(frame, async (url) => {
        if (new URL(url).pathname.startsWith(__uv$config.prefix) || new URL(url).pathname.startsWith("/gfiles/")) {
            frame.style = `display: block; width: 100%; height: 100%; position: absolute; top: 0px; left: 0px; overflow-x: hidden`;
            gui.id = 'active';
            credits.id = 'active';
            document.title = 'Zypher';
        } else {
            if (new URL(url).pathname.endsWith('/games.html')) {
                frame.style = `overflow: hidden; display: block; position: absolute; top: 10%; left: 0px; width: 100%; height: 90%; user-select: none; overflow-x: hidden;`
            } else {
                frame.style = `display: block; position: absolute; top: 15%; left: 0px; width: 100%; height: 70%; user-select: none; overflow-x: hidden;`
            }
            
            document.title = 'Zypher | ' + (await fetchDocument(url)).title;
            document.querySelector('link[rel="icon"]').setAttribute('href', 'img/logo.png');

            gui.id = '';
            credits.id = '';
        }
    })

    // settings.querySelector('.privacy').addEventListener('click', () => {
    //     frame.contentWindow.document.location.replace(location.origin + "/privacy.html");
    // })

    credits.querySelector('.github').addEventListener('click', () => {
        let proxied = location.origin + __uv$config.prefix + __uv$config.encodeUrl("https://github.com/renagamer101/");
        if (localStorage.getItem('stealth') != 'true')
            frame.contentWindow.document.location.replace(proxied);
        else stealthTab(proxied);
    })

    gui.querySelector('.home').addEventListener('click', () => {
        frame.contentWindow.document.location.replace(location.origin + "/main.html");
    })

    gui.querySelector('.games').addEventListener('click', () => {
        frame.contentWindow.document.location.replace(location.origin + "/games.html");
    })

    credits.querySelectorAll('div')[0].addEventListener('click', () => {
        let x = settings.id == '' ? 'active' : '';

        clickOff.id = x;
        settings.id = x;
        gui.id = x;

        clickOff.addEventListener('click', e => {
            if (clickOff.id == "active") {
                let y = document.querySelector('.settingbar') == '' ? 'active' : '';

                clickOff.id = y;
                settings.id = y;
                gui.id = y;

                settings.querySelectorAll('.option').forEach(element => {
                    const dropdown = element.querySelector('.dropdown');

                    if (dropdown) {
                        dropdown.addEventListener('click', () => element.id = '');
                    }
                })
            }
        });
    })

    settings.querySelectorAll('.option').forEach(element => {
        const toggle = element.querySelector('.toggle');
        const dropdown = element.querySelector('.dropdown');
        const type = element.getAttribute('data-setting');

        if (toggle) {
            if (type == "stealth") {
                element.id = localStorage.getItem('stealth') == "true" ? "on" : "";
            }

            toggle.addEventListener('click', () => {
                let on = element.id == 'on';

                element.id = on ? '' : 'on';

                switch (type) {
                    case 'stealth':
                        localStorage.setItem('stealth', !on);
                        break;
                }
            })
        } else if (dropdown) {
            dropdown
            dropdown.addEventListener('click', e => {
                let main = dropdown.querySelector('#default p').innerText.trim().toLowerCase();
                let selected = e.target.innerText.trim().toLowerCase();

                if (main != selected) {
                    let dropnew = ([...dropdown.querySelectorAll('.dropped')].find(el => el.textContent.toLowerCase().includes(selected)));

                    dropnew.querySelector('p').innerText = selected;

                    dropdown.querySelector('#default p').innerText = main;
                    dropdown.querySelector('#default').id = '';

                    dropnew.id = 'default';

                    document.body.classList.add(`data-theme-${selected}`);

                    localStorage.setItem('theme', selected);
                }

                let on = element.id == 'on';

                element.id = element.id == 'on' ? '' : 'on';

                if (!on) {
                    const listener = e2 => {
                        if (!dropdown.contains(e2.target)) {
                            element.id = '';
                        }
                    };

                    document.addEventListener('click', listener);
                }
            })
        }
    })
})