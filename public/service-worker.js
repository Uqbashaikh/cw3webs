var cacheName = 'shaddi-v1';
var cacheFiles = [
    'index.html',
    'asusstudymania.webmanifest',
    'images/boxing.jpg',
    'images/camping.jpg',
    'images/coding.jpg',
    'images/dancing.jpg',
    'images/fashion.jpg',
    'images/icon-store-512.png',
    'images/film.jpg',
    'images/photography.jpg',
    'images/robotics.jpg',
    'images/soccer.jpg',
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            // console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});