document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('save').addEventListener('click', function() {
        saveData();
    }, true);

    document.getElementById('saveClose').addEventListener('click', function() {
        document.getElementById('_close').value = 1;
        saveData();
    }, true);

   document.getElementById('cancel').addEventListener('click', function() {
       window.location.replace(document.getElementById('_cancel').value);
   }, true);

   document.getElementById('destroy').addEventListener('click', function() {
       document.getElementById('deleteForm').submit();
   }, true);
});

function resetValidation() {
    // Reset all the alerts.
    const alerts = document.querySelectorAll('.alert');

    Array.from(alerts).forEach(alert => {
        alert.style.display = 'none';
    });

    // Reset the possible errors.
    const fields = document.querySelectorAll('._validation');

    Array.from(fields).forEach(field => {
        field.classList.remove('is-invalid');
        document.querySelector('.'+field.name+'.error').textContent = '';
    });
}

function saveData() {
    resetValidation();

    const form = document.getElementById('itemForm');

    const body = {};
    [...form.elements].forEach(element => {
        body[element.name] = element.value.trim();
    });

    fetch(form.action, { 
        method: 'POST', 
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    }).then((response) => response.json())
      .then((data) => {
           if (data.errors !== undefined) {
               console.log(data.errors);
               for (let key in data.errors) {
                   document.querySelector('.'+key+'.error').textContent = data.errors[key].message;
                   document.getElementsByName(key)[0].classList.add('is-invalid');
               }
            }
            else if (data.success !== undefined) {
                const message = data.success.message;

                if (document.getElementById('_close').value) {
                    // Redirect to the item list.
                    location.assign(document.getElementById('_listUrl').value);
                }
                else {
                    const alert = document.querySelector('.alert.alert-success');
                    alert.style.display = 'block';
                    alert.textContent = message;
                }
            }
    }).catch((error) => {
        console.log(error);
        //location.assign('/404');
    });
}