document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    console.log(elems.values);
    var instances = M.Modal.init(elems);
    console.log(instances);    
  });