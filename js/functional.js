var d = document;

function removeActive() {
    var a = d.getElementsByClassName('shoesPic');
    for (var i = 0; i < a.length; i++) {
        a[i].classList.remove('active')
    }
}

function addedActive() {
    d.getElementById('butBuy').style.border = 'none';
    d.getElementById('selectVal').style.backgroundColor = 'white';
}

function closeModal() {
    d.getElementById('modal-window').style.visibility = 'hidden';
}

function modalActive() {
    d.getElementById('modal-window').style.visibility = 'visible';
};

function testChange() {
    var num = +d.getElementsByClassName('value-shop')[0].innerHTML+1;
    d.getElementsByClassName('value-shop')[0].innerHTML = num;


}

function videoManipulate() {
    var video = document.getElementById("videoTag");
    video.pause();
    video.currentTime = 0;
}