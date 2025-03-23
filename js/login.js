// Obrada registracije
function handleRegisterFormSubmit() {
    const registerForm = document.querySelector('#registerModal .form-container');
    if (!registerForm) return;
    
    // Prikupljanje podataka iz forme
    const firstName = registerForm.querySelector('input[placeholder="Vnesite ime"]').value.trim();
    const lastName = registerForm.querySelector('input[placeholder="Vnesite priimek"]').value.trim();
    const email = registerForm.querySelector('input[type="email"]').value.trim();
    const username = registerForm.querySelector('input[placeholder="Vnesite uporabniško ime"]').value.trim();
    const password = registerForm.querySelector('input[placeholder="Vnesite geslo"]').value.trim();
    const confirmPassword = registerForm.querySelector('input[placeholder="Ponovno vnesite geslo"]').value.trim();
    
    // Validacija
    if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
        alert('Prosimo, izpolnite vsa polja.');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Gesli se ne ujemata!');
        return;
    }
    
    // Simuliraj uspešnu registraciju
    setLoggedIn(true, username);
    localStorage.setItem('furaFullName', `${firstName} ${lastName}`);
    localStorage.setItem('furaEmail', email);
    
    closeModal('registerModal');
    alert('Uspešna registracija!');
}