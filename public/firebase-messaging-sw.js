/* eslint-disable no-restricted-globals */
self.addEventListener('push', function(event) {
    const options = {
      body: 'У вас новое проклятие.',
      icon: 'icon.png',
      badge: 'badge.png'
    };
    event.waitUntil(self.registration.showNotification('Мастер Игорей1', options));
  });


  