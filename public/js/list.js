
document.addEventListener('DOMContentLoaded', () => {
   const fullUrl = document.getElementById('_fullUrl').value;

   document.getElementById('create').addEventListener('click', function() {
      window.location.replace(fullUrl+'/create');
   }, true);

});