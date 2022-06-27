this.addEventListener('install', function(event) {
    console.log('The service worker is being installed.');
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/index.js',
                '/index.css',
                '/game.html',
                '/game.css',
                '/game.js',
                '/links.html',
                '/howtoplay.html',
                '/whatistheissue.html',
                '/whyisitimportant.html',
                '/whatcanbedone.html',
                '/manifest.json',
                '/assets',
                '/assets/icons/icon128.png',
                '/assets/icons/icon512.png'
            ]);
        })
    );
});

this.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        if (response !== undefined) {
            return response;
        } else {
            return fetch(event.request).then(function(response) {
                let responseClone = response.clone();
                caches.open('v1').then(function(cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            }).catch(function() {
                return caches.match();
            });
        }
    }));
});
