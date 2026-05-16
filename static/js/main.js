function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    document.cookie.split(';').forEach(cookie => {
      const trimmed = cookie.trim();
      if (trimmed.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(trimmed.slice(name.length + 1));
      }
    });
  }
  return cookieValue;
}

document.addEventListener('DOMContentLoaded', () => {

  // Like tugmasi
  document.querySelectorAll('.like-tugma').forEach(tugma => {
    tugma.addEventListener('click', () => {
      const isLoggedIn = tugma.dataset.loggedin === 'true';
      if (!isLoggedIn) {
        window.location.href = '/login/?next=' + window.location.pathname;
        return;
      }
      const url = tugma.dataset.url;
      fetch(url, {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
          'Content-Type': 'application/json',
        },
      })
        .then(r => r.json())
        .then(data => {
          const sanoq = tugma.querySelector('.like-sanoq');
          if (sanoq) sanoq.textContent = data.count;
          tugma.classList.toggle('liked', data.liked);
        });
    });
  });

  // Kartalar animatsiyasi
  document.querySelectorAll('.xabar-karta').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 60 + i * 60);
  });

  // Mobil menyu
  const menuBtn = document.getElementById('mobilMenuBtn');
  const menyu = document.getElementById('mobilMenuyu');
  if (menuBtn && menyu) {
    menuBtn.addEventListener('click', () => {
      menyu.classList.toggle('ochiq');
    });
  }

});
