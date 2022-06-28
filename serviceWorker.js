const saveTheOcean = "save-the-ocean-v1"
const assets = [
  "/",
  "/index.html",
  "/game/game.css",
  "/game/game.html",
  "/game/game.js",
  "/game/howtoplay.html",
  "/game/index.css",
  "/game/index.js",
  "/game/links.html",
  "/game/whatcanbedone.html",
  "/game/whatistheissue.html",
  "/game/whyisitimportant.html",
  "/game/assets/backgrounds/background0.jpg",
  "/game/assets/backgrounds/background1.jpg",
  "/game/assets/backgrounds/background2.jpg",
  "/game/assets/backgrounds/index.jpg",
  "/game/assets/images/bubble.png",
  "/game/assets/images/mealworm.png",
  "/game/assets/sounds/eat1.ogg",
  "/game/assets/sounds/eat2.wav",
  "/game/assets/spritesheets/enemy1.png",
  "/game/assets/spritesheets/enemy2.png",
  "/game/assets/spritesheets/enemy3.png",
  "/game/assets/spritesheets/fish_swim_left.png",
  "/game/assets/spritesheets/fish_swim_right.png",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(saveTheOcean).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })
