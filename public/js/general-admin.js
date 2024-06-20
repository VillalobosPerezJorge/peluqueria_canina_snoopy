if(!localStorage.role || localStorage.role !== 'role-admin'){
  window.location.href = '/'
}


document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
        document.getElementById('btn-logout').addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('role');
        window.location.href = '/';
      });
    }
});