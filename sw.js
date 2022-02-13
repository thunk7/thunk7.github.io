self.addEventListener('install', function (event) {
    console.log('The service worker is being installed.');
    event.waitUntil(
        caches.open('assets').then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/uomTrack.js',
                '/uomTrack.css',
                '/manifest.json'
            ]);
        })
    );
});

// Runs whenever there is a fetch request
self.addEventListener("fetch", (event) => {
    // Checks the cache to find matching request. 
    // If there is a cached version of the request, it returns the cached version, otherwise it makes a new request.
    event.respondWith(
        caches.match(event.request).then((res) => {
            return res || fetch(event.request);
        })
    );
});
