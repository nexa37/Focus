// FocusFlow Notification Handler for Service Worker
// Enables notifications when installed to Home Screen (iOS & Android PWAs)

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || '/app.html';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // If a FocusFlow tab or standalone PWA window is already open, focus it
      for (const client of windowClients) {
        if (client.url.includes('/app.html') || client.url.includes('/dashboard') || client.url.includes(targetUrl)) {
          if ('focus' in client) {
            return client.focus();
          }
        }
      }
      // Otherwise open the app window
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

// Handle messages sent from FocusFlow client (e.g., test alerts or scheduled reminders)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'TRIGGER_NOTIFICATION') {
    const { title, options, delay } = event.data;
    const notificationOptions = {
      body: options?.body || 'FocusFlow reminder',
      icon: options?.icon || '/pwa-192x192.png',
      badge: options?.badge || '/icon.svg',
      tag: options?.tag || 'focusflow-reminder',
      renotify: true,
      vibrate: [100, 50, 100],
      data: {
        url: options?.url || '/app.html',
        timestamp: Date.now(),
      },
      ...options,
    };

    const show = () => {
      self.registration.showNotification(title || 'FocusFlow', notificationOptions);
    };

    if (delay && delay > 0) {
      setTimeout(show, delay);
    } else {
      event.waitUntil(show());
    }
  }
});

// Handle incoming Web Push events if push service is connected
self.addEventListener('push', (event) => {
  let payload = { title: 'FocusFlow', body: 'You have a scheduled reminder.' };
  if (event.data) {
    try {
      payload = event.data.json();
    } catch {
      payload = { title: 'FocusFlow', body: event.data.text() };
    }
  }

  const options = {
    body: payload.body || 'Time to focus!',
    icon: '/pwa-192x192.png',
    badge: '/icon.svg',
    tag: payload.tag || 'focusflow-push',
    renotify: true,
    data: {
      url: payload.url || '/app.html',
    },
  };

  event.waitUntil(
    self.registration.showNotification(payload.title || 'FocusFlow', options)
  );
});
