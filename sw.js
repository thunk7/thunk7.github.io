self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/Kavvadias_Project_3/uomTrack.html',
                '/Kavvadias_Project_3/uomTrack.css',
                '/Kavvadias_Project_3/uomTrack.js',
                '/ServiceWorkers/assets/close.svg',
                '/ServiceWorkers/assets/complete.svg',
                '/ServiceWorkers/assets/delete.svg',
                '/ServiceWorkers/assets/downArrow.svg',
                '/ServiceWorkers/assets/edit.svg',
                '/ServiceWorkers/assets/logo.svg',
                '/ServiceWorkers/assets/reactivate.svg',
                '/ServiceWorkers/assets/SourceSansPro.ttf',
                '/ServiceWorkers/assets/upArrow.svg'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request));
});