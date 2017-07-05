
var Render = function ()
{
	var main 		 	= this;
	main.canvID     	= "";
	main.scene 			= null;
	main.camera 		= null;
	main.sWidth			= 0;
	main.sHeight		= 0;
	main.fWidth			= $(document).width();
	main.fHeight		= $(document).height();
	main.renderer 		= null;
	main.container 		= null;
	main.sPos        	= {x : 0, y : 0};

	main.isDrag			= 0;
	main.minPolarAngle  = -Math.PI / 2;
	main.maxPolarAngle  =  Math.PI / 2;

	main.clock 			= new THREE.Clock();

	main.floor 			= null;
	main.bathRoom 		= null;
	main.animations 	= null;

	main.cssScene 		= null;
	main.rendererCSS 	= null;

	main.control_stop = false;

	// var controls;

	main.init			= function(param) 
	{
		main.canvID		= "canvas_view";
		main.sWidth		= $(window).width();
		main.sHeight	= $(window).height();

		//init 3d environment
		main.init3DEnv();
		main.initHtmlScene();
		main.animate();
	    main.render();
		$('.background').hide();
	}

	main.initHtmlScene 	= function ()
	{
		main.cssScene 	= new THREE.Scene();
		var element 	= document.getElementById('main_view');
		console.log(element);

		var cssObject 			= new THREE.CSS3DObject(element);
		cssObject.position.x 	= 0;
		cssObject.position.y 	= 0;
		cssObject.position.z 	= 0; 

		main.cssScene.add(cssObject);

		main.rendererCSS 		= new THREE.CSS3DRenderer();

		main.rendererCSS.setSize(window.innerWidth, window.innerHeight);
		main.rendererCSS.domElement.style.position 	= 'absolute';
		main.rendererCSS.domElement.style.top 		= 0;
		main.rendererCSS.domElement.style.margin		= 0;
		main.rendererCSS.domElement.style.padding	= 0;

		console.log(main.rendererCSS.domElement);

		document.body.appendChild( main.rendererCSS.domElement );
	}

	main.init3DEnv		= function ()
	{
		main.scene  	= new THREE.Scene();

	    main.initCamera();
	    main.initLights();
	    main.initControls();
	    main.initEvent();
	    main.initRenderer();
	}

	main.onWindowResize = function () 
	{
		if (main.camera != undefined && main.renderer != undefined) 
		{
			main.camera.aspect = window.innerWidth / window.innerHeight;
			main.camera.updateProjectionMatrix();

			main.renderer.setSize( window.innerWidth, window.innerHeight );
			// controls.handleResize();
			main.render();
		}
	}

	main.initEvent 		= function()
	{
	    document.addEventListener( 'mousedown', main.onMouseDown, false );
	    document.addEventListener( 'mouseup', main.onMouseUp, false );
	    document.addEventListener( 'mousemove', main.onMouseMove, false );
	    document.addEventListener( 'mousewheel', main.onDocumentMouseWheel, false );
	    
	    window.addEventListener( 'resize', main.onWindowResize, false );
	}
	
	var t = 0;
	var progress = 0;
	var lastTimestamp = 0;

	main.animate		= function ()
	{
	    requestAnimationFrame( main.animate );
		// controls.update();
	}

	main.render 		= function ()
	{
		// THREE.AnimationHandler.update( main.clock.getDelta() );
		// if (main.mixer)
		// {
		// 	main.mixer.update(main.clock.getDelta())
		// }
	    main.renderer.render( main.scene, main.camera );
	    main.rendererCSS.render( main.cssScene, main.camera );
	}

	main.initCamera 	= function ()
	{
	    var angle   = 75;
	    var near    = 1;
	    var far     = 100000;
	    var aspect  = main.sWidth / main.sHeight;

	    main.camera = new THREE.PerspectiveCamera( angle, aspect, near, far);
		main.camera.position.set (0, 0, main.sHeight * 0.7);
		main.camera.lookAt(new THREE.Vector3(0, 0, 0));
	    main.scene.add(main.camera);


		// controls = new THREE.TrackballControls( main.camera );
		// controls.rotateSpeed = 1.0;
		// controls.zoomSpeed = 1.2;
		// controls.panSpeed = 0.8;
		// controls.noZoom = false;
		// controls.noPan = false;
		// controls.staticMoving = true;
		// controls.dynamicDampingFactor = 0.3;
		// controls.keys = [ 65, 83, 68 ];
		// controls.addEventListener( 'change', main.render );
	}

	main.initLights 	= function ()
	{
	    var ambient = new THREE.AmbientLight( 0x221100 );
		main.scene.add( ambient );

	    main.addLight( 0, -70, 100, 0xffeedd, 1.5 );
	}

	main.addLight 			= function(x, y, z, color, intensity) 
	{
		var directionalLight 	= new THREE.DirectionalLight( color, intensity );
	    directionalLight.position.set( x, y, z ).normalize();

	    directionalLight.castShadow = false;

	    main.scene.add( directionalLight );

	    // main.scene.add( new THREE.DirectionalLightHelper( directionalLight, 50 ) );

	}

	main.addShadowedLight	= function ( x, y, z, color, intensity ) 
	{
	    var directionalLight 	= new THREE.DirectionalLight( color, intensity );
	    directionalLight.position.set( x, y, z );
	    
	    directionalLight.castShadow = true;
	    directionalLight.shadowCameraVisible = true;

	    var d = 150;
	    directionalLight.shadowCameraLeft = -d;
	    directionalLight.shadowCameraRight = d;
	    directionalLight.shadowCameraTop = d;
	    directionalLight.shadowCameraBottom = -d;
	    directionalLight.shadowCameraNear = 10;
	    directionalLight.shadowCameraFar = 500;
	    directionalLight.shadow.mapSize.width = 4096;
	    directionalLight.shadow.mapSize.height = 4096;
	    directionalLight.shadowBias = -0.00000000015;

	    main.scene.add( directionalLight );

	    main.scene.add( new THREE.DirectionalLightHelper( directionalLight, 50 ) );
	    main.scene.add( new THREE.CameraHelper( directionalLight.shadow.camera ) );
	    // directionalLight
	}

	main.initRenderer 	= function ()
	{
	    // if ( !Detector.webgl )
	    // {
	    //     alert("Your browser doesn't support webgl!");
	    // }
	    // if ( Detector.webgl )
	    // {
	    //     main.renderer = new THREE.WebGLRenderer({antialias:true, preserveDrawingBuffer : true});
	    // }
	    // else
	    //     main.renderer = new THREE.CanvasRenderer({antialias:true, preserveDrawingBuffer : true}); 

		main.renderer = new THREE.WebGLRenderer({antialias:true, preserveDrawingBuffer : true});
	    main.renderer.setSize(main.sWidth, main.sHeight);

	    // main.renderer.gammaInput = true;
	    // main.renderer.gammaOutput = true;
	    // main.renderer.shadowMapEnabled = true;
	    // main.renderer.shadowMapCascade = true;
	    // main.renderer.shadowMapType = THREE.PCFSoftShadowMap;
	    main.renderer.setClearColor( 0xFFFFFF);

	    // main.container = document.getElementById(main.canvID);
	    // main.container.appendChild(main.renderer.domElement);
	}

	main.initControls 	= function ()
	{
	    // controls.initEvent();
	}


	main.onWindowResize = function () 
	{
		if (main.camera != undefined && main.renderer != undefined) 
		{
			main.camera.aspect = window.innerWidth / window.innerHeight;
			main.camera.updateProjectionMatrix();

			main.renderer.setSize( window.innerWidth, window.innerHeight );
		}
	}

	main.onMouseDown 	= function (event) 
	{
		main.isDrag = 1;
	    main.sPos   = {x : event.screenX, y : event.screenY};
	}

	main.onMouseMove 	= function (event) 
	{
		if(!main.isDrag) return;

	    var angle_y = (event.screenX - main.sPos.x) / $(window).width()  * Math.PI;
	    var angle_x = (event.screenY - main.sPos.y) / $(window).height() * Math.PI;
	    var raycaster   = new THREE.Raycaster();
	    var mouse   = {x : 0, y : 0};

	    mouse.x     =  ((event.clientX - main.renderer.domElement.offsetLeft) / main.renderer.domElement.width) * 2 - 1;
	    mouse.y     = -((event.clientY - main.renderer.domElement.offsetTop) / main.renderer.domElement.height) * 2 + 1;

	    main.camera.rotation.order = 'YXZ';
	    main.camera.rotation.x = Math.max(main.minPolarAngle, Math.min(main.maxPolarAngle, angle_x + main.camera.rotation.x));
	    main.camera.rotation.y += angle_y;

	    main.cameraTrackPosition();

	    main.sPos = {x : event.screenX, y : event.screenY};

	}

	main.onMouseUp 		= function (event)
	{
	    main.isDrag = 0;
	}

	main.onDocumentMouseWheel 	= function (event) 
	{
	    var direction = main.camera.getWorldDirection();
	    main.camera.position.add( direction.multiplyScalar(event.wheelDeltaY * 0.05) );
	    main.cameraTrackPosition();
	}

	main.cameraTrackPosition 	= function () 
	{
	    if (main.camera != undefined) {
	        console.log("Camera Position ");
	        console.log(main.camera.position);
	        console.log("Camera Rotation ");
	        console.log(main.camera.rotation);
	   		main.render();
	    }
	}
}