function showNetworkNotification(message, color) {
  let notification = document.getElementById('network-notification');
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'network-notification';
    document.body.appendChild(notification);
  }

  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.left = '20px';
  notification.style.backgroundColor = color;
  notification.style.color = 'white';
  notification.style.padding = '10px';
  notification.style.borderRadius = '5px';
  notification.style.zIndex = '1000';
  notification.style.fontSize = '14px';
  notification.style.display = 'block';
  notification.innerText = message;

  
  setTimeout(() => {
    notification.style.display = 'none';
  }, 5000);
}


function showOnlineNotification() {
  showNetworkNotification('You are back online!', 'green');

  setTimeout(updateConnectionInfo, 2000); // Delay by 2 seconds for a smoother experience
}

// Function for network speed-related notifications
function updateConnectionInfo() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  if (connection) {
    const speed = connection.downlink * 1000;  // Convert to Kbps for comparison
    let message = '';
    let color = '';

    if (speed > 100000) {
      message = 'Excellent network speed. Enjoy HD/4K streaming and gaming.';
      color = 'green';
    } else if (speed > 50000) {
      message = 'Good speed for streaming, gaming, and video calls.';
      color = 'limegreen';
    } else if (speed > 25000) {
      message = 'Acceptable speed for HD streaming and video calls.';
      color = 'yellow';
    } else if (speed > 10000) {
      message = 'Below average speed, suitable for basic streaming and browsing.';
      color = 'orange';
    } else if (speed > 5000) {
      message = 'Poor speed, expect buffering during streaming and slow browsing.';
      color = 'orangered';
    } else if (speed > 1000) {
      message = 'Bad speed. Unusable for HD streaming and smooth browsing.';
      color = 'red';
    } else {
      message = 'Very bad speed. Almost no web activity possible.';
      color = 'darkred';
    }

    showNetworkNotification(message, color);
  }
}

// Function to handle offline notification
function showOfflineNotification() {
  showNetworkNotification('Connection failed. You are offline.', 'red');
}

// Monitor network changes for online and offline states
function monitorNetworkChange() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  if (connection) connection.addEventListener('change', updateConnectionInfo);
  window.addEventListener('online', showOnlineNotification);
  window.addEventListener('offline', showOfflineNotification);
}

// Initial setup
updateConnectionInfo();
monitorNetworkChange();
