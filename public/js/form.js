document.addEventListener('DOMContentLoaded', () => {
   const fullUrl = document.getElementById('fullUrl').value;
   //const actions = ['save', 'saveClose', 'cancel', 'destroy'];

   document.getElementById('save').addEventListener('click', function() {
        document.getElementById('itemForm').submit();
   }, true);

   document.getElementById('saveClose').addEventListener('click', function() {
       document.getElementById('itemForm').submit();
   }, true);

   document.getElementById('cancel').addEventListener('click', function() {
       window.location.replace(document.getElementById('_cancel').value);
   }, true);

   document.getElementById('destroy').addEventListener('click', function() {
       document.getElementById('deleteForm').submit();
   }, true);

});
