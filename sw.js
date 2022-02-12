self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/thunk7.github.io/uomTrack.html',
                '/thunk7.github.io/uomTrack.css',
                '/thunk7.github.io/uomTrack.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request));
});
