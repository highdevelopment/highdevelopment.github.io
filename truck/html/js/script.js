vhes = document.querySelectorAll('.drag-item');

elems = [];

for (var i = 0; i < vhes.length; i++) {
    elems.push(vhes[i]);
}

dragula(elems);

$(document).ready(function() {
	var section = document.getElementById('main-body-section');
	section.style.height = (window.innerHeight - 152) + 'px';

	$('.background').hide();
});