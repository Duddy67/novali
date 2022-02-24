document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    // 
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');

    form.addEventListener('submit', async (e) => {
        // Prevent the form to be refreshed.
        e.preventDefault();

        // Reset errors
        emailError.textContent = '';
        passwordError.textContent = '';

        // Get values
        const email = form.email.value;
        const password = form.password.value;

        try {
            // Check the user exists and the password is valid.
            const res = await fetch('/login', { 
                method: 'POST', 
                body: JSON.stringify({ email, password }),
                headers: {'Content-Type': 'application/json'}
            });

            // Get the result.
            const data = await res.json();
            //console.log(data);
            if (data.errors) {
                emailError.textContent = data.errors.email;
                passwordError.textContent = data.errors.password;
            }

            if (data.user) {
                // NB. The jwt token is checked first. If the token is invalid the user is redirected to the login page.
                location.assign('/dashboard');
            }
        }
        catch {

        }
    });

});
