importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js')

if (workbox)
    console.log(`Workbox berhasil dimuat`)
else
    console.log(`Workbox gagal dimuat`)

workbox.precaching.precacheAndRoute([{
        url: '/',
        revision: '1'
    },
    {
        url: '/index.html',
        revision: '1'
    },
    {
        url: '/manifest.json',
        revision: '1'
    },
    {
        url: '/nav.html',
        revision: '1'
    },
    {
        url: '/pages/home.html',
        revision: '1'
    },
    {
        url: '/pages/match.html',
        revision: '1'
    },
    {
        url: '/pages/favorite.html',
        revision: '1'
    },
    {
        url: '/css/materialize.min.css',
        revision: '1'
    },
    {
        url: '/js/materialize.min.js',
        revision: '1'
    },
    {
        url: '/js/main.js',
        revision: '1'
    },
    {
        url: '/js/helper.js',
        revision: '1'
    },
    {
        url: '/js/init.js',
        revision: '1'
    },
    {
        url: '/js/component.js',
        revision: '1'
    },
    {
        url: '/js/nav.js',
        revision: '1'
    },
    {
        url: '/js/api.js',
        revision: '1'
    },
    {
        url: '/js/route.js',
        revision: '1'
    },
    {
        url: '/js/db_operation.js',
        revision: '1'
    },
    {
        url: '/js/connection.js',
        revision: '1'
    },
    {
        url: '/js/idb.js',
        revision: '1'
    },
])

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.cacheFirst()
);



self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});