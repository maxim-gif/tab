/* eslint-disable no-restricted-globals */
self.addEventListener('push', function(event) {
    const options = {
      body: 'Здесь ваше сообщение.',
      icon: 'icon.png',
      badge: 'badge.png'
    };
    event.waitUntil(self.registration.showNotification('Заголовок уведомления', options));
  });