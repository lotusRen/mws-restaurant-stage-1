var restaurantCacheName='restaurant-static-v7';
self.addEventListener('install',function(event){
	event.waitUntil(
		caches.open(restaurantCacheName).then(function(cache){
			return cache.addAll([
				'index.html'	,
				'restaurant.html'
			]);
		}).catch(function(err){
			console.log(err+5)
		})
	);
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName != restaurantCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
self.addEventListener('fetch',function(event){
	event.respondWith(
		caches.match(event.request).then(function(response){
			return response || fetch(event.request);
		}).catch(function(err){
			console.log(err+'fetch')
		})
	);
	
});



