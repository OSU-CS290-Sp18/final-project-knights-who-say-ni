function handleGenerateClick(){
    var rand1 = getRandom();
    var rand2 = getRandom();
    var rand3 = getRandom();
    var rand4 = getRandom();
    var rand5 = getRandom();

}

function getRandom() {
    return (Math.random()%4);
}

window.addEventListener('DOMContent"Loaded', function() {

    var generateButton =  document.getElementById('generateButton');
    generateButton.addEventListener('click', handleGenerateClick);

    var yuckButton = document.getElementsByClassName('yuck');
    yuckButton.addEventListener('click', handleGenerateClick);



});

function changeActive() {
   var urlPath = window.location.pathname.toLowerCase();
   var navItems = document.querySelectorAll('.navitem');
   
   navItems.forEach(function(item) {
      item.classList.remove('active');
      if(item.childNodes[0].getAttribute("href").toLowerCase() === urlPath){
         item.classList.add('active');
      };
   });
}

window.onload = function() {
   changeActive();
};
