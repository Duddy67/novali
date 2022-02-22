document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    // 
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');

    form.addEventListener('submit', async (e) => {
        // Prevent the form to be refreshed.
        e.preventDefault();

        // reset errors
        emailError.textContent = '';
        passwordError.textContent = '';

        // get values
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);
        try {
            const res = await fetch('/login', { 
                method: 'POST', 
                body: JSON.stringify({ email, password }),
                headers: {'Content-Type': 'application/json'}
            });

            const data = await res.json();
            console.log(data);
            if (data.errors) {
                emailError.textContent = data.errors.email;
                passwordError.textContent = data.errors.password;
            }

            if (data.user) {
                location.assign('/dashboard');
            }
        }
        catch {

        }
    });

});
