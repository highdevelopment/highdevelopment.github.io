// jQuery(document).ready(function($)
// {
// 	$('#main-area').hide();
// 	$('#3d-area').show();

// 	var main = new C3DMain();
// });

function C3DMain()
{
	var main = this;

	this.texture;
	meshCubes = null;
	this.font = null;
	var groupScene = null;
	var light = null;
	var targetRotation = 0;
	var targetRotationOnMouseDown = 0;
	var scene;
	var camera;
	var controls;
	this.materialGround = null;

	this.init = function()
	{
	    scene = new THREE.Scene();

	    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.set( 0, 200, 900 );
		// camera.lookAt(new THREE.Vector3(0, 0, 0));
		scene.add( camera );

		controls = new THREE.OrbitControls( camera, $('#preview_3d')[0] );
		controls.addEventListener( 'change', this.render );

		light = new THREE.PointLight( 0xffffff, 0.8 );
		scene.add( light );

		group = new THREE.Group();
		scene.add( group );

	    renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setClearColor( 0xf0f0f0 );
		renderer.setPixelRatio( window.devicePixelRatio );
	    renderer.setSize( window.innerWidth, window.innerHeight );

	    $('#preview_3d').append( renderer.domElement );

	    this.initEvent();

	    this.animate();
	    this.loadTexture();
	    // this.onLoad3DFile();

	 	groupScene = new THREE.Group();
		groupScene.rotation.set(-Math.PI * 0.5, 0, 0);
		meshCubes = new THREE.Group();
		groupScene.add( meshCubes );
		scene.add(groupScene);
	    this.render();
	}

	this.loadFont = function(callback)
	{
		var loader = new THREE.FontLoader();
		loader.load( 'fonts/' + "helvetiker" + '_' + "bold" + '.typeface.json', function ( response )
		{
			main.font = response;
			callback.call();
		});
	}

	this.dispose = function()
	{
		controls.dispose();
	}

	this.initCamera = function()
	{
		camera.position.set( 0, 600, 1200 );
		light.position.set(0, 1000, 1200);
	}

	this.loadTexture = function()
	{
		// var textureLoader = new THREE.TextureLoader();
		// // var maxAnisotropy = renderer.getMaxAnisotropy();
		// var texture1 = textureLoader.load( "images/green.jpg" );
		this.materialGround = new THREE.MeshLambertMaterial( { color: 0xffffff } );
		// // texture1.anisotropy = maxAnisotropy;
		// texture1.wrapS = texture1.wrapT = THREE.RepeatWrapping;
		// texture1.repeat.set( 5, 5 );
	}

	this.create3DPlane	= function(width, height, zHeight, color, opacity)
	{
		var geometry = new THREE.PlaneBufferGeometry( width, height );
		var material = new THREE.MeshLambertMaterial({ color: color });
		material.side = THREE.DoubleSide;
		if(opacity)
		{
			material.transparent = true;
			material.opacity = opacity;
		}
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.z = zHeight;
		groupScene.add(mesh);
	}

	this.setCubeHeight = function(height)
	{
		for(var i = 0; i < meshCubes.children.length; i++)
		{
			var mesh = meshCubes.children[i];
			mesh.scale.z = height / 200;
			// mesh.rotation.x = height;
			// mesh.geometry.vertices[4].z = height;
			// mesh.geometry.vertices[5].z = height;
			// mesh.geometry.vertices[6].z = height;
			// mesh.geometry.vertices[7].z = height;
		}
		// this.animate();
		this.render();
	}

	this.addCube = function(points, baseheight, height, color, opacity)
	{
		var shape = new THREE.Shape(points);

		var extrudeSettings = { amount: height, bevelEnabled: false };
		var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

		var material = new THREE.MeshPhongMaterial({ color: color });
		if(opacity)
		{
			material.transparent = true;
			material.opacity = opacity;
		}
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set( 0, 0, baseheight );
		meshCubes.add(mesh);
	}

	this.addText = function(text, fontSize, position, color, angle)
	{
		var gTextNumber = new THREE.Group();
		// var californiaPts = [];
		// californiaPts.push( new THREE.Vector2(-size, -size) );
		// californiaPts.push( new THREE.Vector2(size, -size) );
		// californiaPts.push( new THREE.Vector2(size, size) );
		// californiaPts.push( new THREE.Vector2(-size, size) );
		var circleShape = new THREE.Shape(  );
		var circleRadius = fontSize * 0.5;
		circleShape.moveTo( 0, circleRadius );
		circleShape.quadraticCurveTo( circleRadius, circleRadius, circleRadius, 0 );
		circleShape.quadraticCurveTo( circleRadius, -circleRadius, 0, -circleRadius );
		circleShape.quadraticCurveTo( -circleRadius, -circleRadius, -circleRadius, 0 );
		circleShape.quadraticCurveTo( -circleRadius, circleRadius, 0, circleRadius );
		// var extrudeSettings = { amount: 0.1, bevelEnabled: false };
		// var geometry = new THREE.ExtrudeGeometry( californiaShape, extrudeSettings );
		var geometry = new THREE.ShapeBufferGeometry( circleShape );
		var meshBg = new THREE.Mesh(geometry, new THREE.LineBasicMaterial({ color: color }));

		gTextNumber.add( meshBg );

		curveSegments = 4;
		bevelThickness = 2;
		bevelSize = 1.5;
		var textGeo = new THREE.TextGeometry(text,
		{
			font: this.font,
			size: fontSize * 0.4,
			height: 0.01,
			curveSegments: curveSegments,
			bevelThickness: bevelThickness,
			bevelSize: bevelSize,
			bevelEnabled: false,
			material: 0,
			extrudeMaterial: 0
		});
		textGeo.computeBoundingBox();
		textGeo.computeVertexNormals();
		var centerOffsetX = -0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		var centerOffsetY = -0.5 * ( textGeo.boundingBox.max.y - textGeo.boundingBox.min.y );

		textMesh1 = new THREE.Mesh( textGeo, this.materialText );
		textMesh1.position.x = centerOffsetX;
		textMesh1.position.y = centerOffsetY;
		// textMesh1.position.z = z;
		// textMesh1.rotation.x = 0;
		// textMesh1.rotation.y = Math.PI * 2;
		// textMesh1.rotation.z = 0;
		gTextNumber.add( textMesh1 );

		gTextNumber.position.set(position.x, position.y, position.z + fontSize * 0.7);
		// gTextNumber.rotation.z = aspect;
		// gTextNumber.rotation.x = 3.14 * 0.5;
		gTextNumber.rotation.set(Math.PI * 0.5, angle, 0);

		groupScene.add(gTextNumber);
		return gTextNumber;
	}

	this.addLine = function(p1, p2, height, color)
	{
		var californiaPts = [];
		californiaPts.push( p1 );
		californiaPts.push( p2 );
		var californiaShape = new THREE.Shape( californiaPts );
		var extrudeSettings = { amount: height, bevelEnabled: false };
		var points = shape.createPointsGeometry();
		var line = new THREE.Line( spacedPoints, new THREE.LineBasicMaterial( { color: color, linewidth: 3 } ) );
		group.add(line);
	}

	this.animate = function()
	{
		requestAnimationFrame( main.animate );
		controls.update();
	}

	this.render = function()
	{
		// group.rotation.z += ( targetRotation - group.rotation.z ) * 0.05;
		renderer.render( scene, camera );
	}

	this.initEvent = function()
	{
		var mouseX = 0;
		var mouseXOnMouseDown = 0;

		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;

		window.addEventListener( 'resize', onWindowResize, false );

		function onWindowResize()
		{
			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize( window.innerWidth, window.innerHeight );
			controls.handleResize();

			main.render();
		}
	}

	this.removeObjects = function()
	{
		for ( var i = scene.children.length - 1; i >= 0 ; i -- ) {
			var obj = scene.children[ i ];
			if ( obj !== group && obj !== camera) {
				scene.remove(obj);
				obj = null;
			}
		}

		for ( var i = group.children.length - 1; i >= 0 ; i -- ) {
			var obj = group.children[ i ];
			scene.remove(obj);
			group.remove(obj);
			obj = null;
		}
	}

	this.init();
}