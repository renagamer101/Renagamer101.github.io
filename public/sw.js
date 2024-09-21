/*global UVServiceWorker,__uv$config*/
/*
 * Stock service worker script.
 * Users can provide their own sw.js if they need to extend the functionality of the service worker.
 * Ideally, this will be registered under the scope in uv.config.js so it will not need to be modified.
 * However, if a user changes the location of uv.bundle.js/uv.config.js or sw.js is not relative to them, they will need to modify this script locally.
 */
importScripts('uv/uv.bundle.js');
importScripts('uv/uv.config.js');
importScripts(__uv$config.sw || 'uv/uv.sw.js');
importScripts('./api/filter.js');

const UV = new UVServiceWorker();

self.addEventListener('fetch', (event) => {
	if (event.request.url.startsWith(location.origin + __uv$config.prefix)) {
		const req = __uv$config.decodeUrl(event.request.url.split(__uv$config.prefix)[1]);
		if (self.__filter.includes(new URL(req).host))
			event.respondWith(new Response("", {
				status: 404,
				statusText: "Not Found"
			}))
		else 
			event.respondWith(UV.fetch(event));	
	}
});