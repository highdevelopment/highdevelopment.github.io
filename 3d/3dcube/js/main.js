
var m3dview = null;
$(document).ready(function()
{
	m3dview = new C3DMain();
	m3dview.initCamera();

	m3dview.loadFont(function()
	{
		init3DView();
		m3dview.render();
	});
	// m3dview.initEvent();

})

function init3DView()
{
	m3dview.create3DPlane(600, 300, 0, 0xeeffff, 0.8);
	var points1 = [
		new THREE.Vector2(50, 30),
		new THREE.Vector2(100, 30),
		new THREE.Vector2(100, 60),
		new THREE.Vector2(50, 60),
	]
	m3dview.addCube(points1, 0, 200, 0xff0000, 0.8);
	m3dview.addText('1ST FLOOR', 30, new THREE.Vector3(0, -150, 50), 0xffffff, 0);

	m3dview.create3DPlane(600, 300, 200, 0xeeffff, 0.8);
	var points2 = [
		new THREE.Vector2(-50, -30),
		new THREE.Vector2(-100, -30),
		new THREE.Vector2(-100, -60),
		new THREE.Vector2(-50, -60),
	]
	m3dview.addCube(points2, 200, 200, 0x00ff00, 0.8);

	m3dview.create3DPlane(600, 300, 400, 0xeeffff, 0.8);
	var points3 = [
		new THREE.Vector2(50, 30),
		new THREE.Vector2(100, 30),
		new THREE.Vector2(100, 60),
		new THREE.Vector2(50, 60),
	]
	m3dview.addCube(points3, 400, 200, 0x0000ff, 0.8);

	animationCubes();
	// m3dview.setCubeHeight(30);
}

function animationCubes()
{
	// m3dview.setCubeHeight(30);
	function animation(height)
	{
		if(height >= 200)
			return;
		setTimeout(function()
		{
			m3dview.setCubeHeight(height);
			animation(height + 3);
		}, 25);
	}
	animation(1);
}