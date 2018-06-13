function handleGenerateClick(){
	window.location.href = '/generate';
}

function getRandom() {
    return ( Math.floor(Math.random() * 3 + 1));
}

window.addEventListener('DOMContent"Loaded', function() {

    var generateButton =  document.getElementById('generateButton');
    generateButton = addEventListener('click', handleGenerateClick);

    var yuckButton = document.querySelector('.yuck');
    yuckButton = addEventListener('click', handleGenerateClick);



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
}
