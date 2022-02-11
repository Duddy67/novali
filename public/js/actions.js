
const fullUrl = document.getElementById('fullUrl').value;

document.getElementById('create').addEventListener('click', function() {
   window.location.replace(fullUrl+'/create');
}, true);
