// Bản cũ của game cài service worker giữ file lại trong máy. File này thay thế nó: xoá bộ nhớ đệm, tự gỡ, tải lại trang.
self.addEventListener('install', function(e){ self.skipWaiting(); });
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.map(function(k){ return caches.delete(k); })); })
    .then(function(){ return self.registration.unregister(); })
    .then(function(){ return self.clients.matchAll(); })
    .then(function(cs){ cs.forEach(function(c){ c.navigate(c.url); }); }));
});
