vhes = document.querySelectorAll('.drag-item');

elems = [];

for (var i = 0; i < vhes.length; i++) {
    elems.push(vhes[i]);
}

dragula(elems).on('drag', function(e)
{
	mRender.isDrag = 0;
});

var mRender = null;

$(document).ready(function() {
	var section = document.getElementById('main-body-section');
	section.style.height = (window.innerHeight - 152) + 'px';

	// $('#main-body-section').height($(window).height - 152);
	mRender = new Render();
	mRender.init();
});