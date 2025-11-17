const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;
        const errorMsg = document.getElementById('error-msg');

        if (usernameInput === appConfig.adminUsername && 
            passwordInput === appConfig.adminPassword) {
            
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('currentUser', usernameInput);
            
            window.location.href = appConfig.redirectUrl;
        } else {
            errorMsg.style.display = 'block';
            errorMsg.style.color = 'red';
            errorMsg.textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
        }
    });
}

function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}