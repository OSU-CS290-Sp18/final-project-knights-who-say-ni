function handleGenerateClick(){
    var rand1 = getRandom();
    var rand2 = getRandom();
    var rand3 = getRandom();
    var rand4 = getRandom();
    var rand5 = getRandom();

}

function getRandom() {
    return ( Math.floor(Math.random() * 3 + 1));
}

window.addEventListener('DOMContent"Loaded', function() {

    var generateButton =  document.getElementById('generateButton');
    generateButton = addEventListener('click', handleGenerateClick);

    var yuckButton = document.getElementsByClassName('yuck');
    yuckButton = addEventListener('click', handleGenerateClick);



});
