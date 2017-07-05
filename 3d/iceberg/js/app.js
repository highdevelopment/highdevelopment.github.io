/**
 * @author mrdoob / http://mrdoob.com/
 */

var APP = {

	Player: function () {
		var main = this;
		var scope = this;

		var loader = new THREE.ObjectLoader();
		var camera, scene, renderer;

		var controls, effect, cameraVR, isVR;

		var events = {};
		var camera_width = 16;
		var camera_height = 16;

		this.dom = document.createElement( 'div' );

		this.width = 500;
		this.height = 500;

		this.isLoad = false;
		this.isPlaying = false;

		this.load = function ( json ) {

			isVR = json.project.vr;

			renderer = new THREE.WebGLRenderer( { antialias: true } );
			renderer.setClearColor( 0x000000 );
			renderer.setPixelRatio( window.devicePixelRatio );

			if ( json.project.gammaInput ) renderer.gammaInput = true;
			if ( json.project.gammaOutput ) renderer.gammaOutput = true;

			if ( json.project.shadows ) {

				renderer.shadowMap.enabled = true;
				// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

			}

			this.dom.appendChild( renderer.domElement );

			this.setScene( loader.parse( json.scene ) );
			this.setCamera( loader.parse( json.camera ) );

			events = {
				init: [],
				start: [],
				stop: [],
				// keydown: [],
				// keyup: [],
				// mousedown: [],
				// mouseup: [],
				// mousemove: [],
				// mousewheel: [],
				scroll: [
					function(e) {
						if(camera)
						{
							// var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
							
							main.refreshCameraPos();
							// var delta = camera.position.y - camPos;
							// var count = 10;
							// var step = 0;
							// function animateCamPos()
							// {
							// 	camera.position.y = - camPos;
							// 	renderer.render( scene, camera );
							// 	step++;
							// 	if(step >= count)
							// 		return;
							// 	setTimeout(function()
							// 	{
							// 		animateCamPos();
							// 	}, 15);
							// }
							// animateCamPos();
						}
					}
				],
				// touchstart: [],
				// touchend: [],
				// touchmove: [],
				update: []
			};

			var scriptWrapParams = 'player,renderer,scene,camera';
			var scriptWrapResultObj = {};

			for ( var eventKey in events ) {

				scriptWrapParams += ',' + eventKey;
				scriptWrapResultObj[ eventKey ] = eventKey;

			}

			var scriptWrapResult = JSON.stringify( scriptWrapResultObj ).replace( /\"/g, '' );

			for ( var uuid in json.scripts ) {

				var object = scene.getObjectByProperty( 'uuid', uuid, true );

				if ( object === undefined ) {

					console.warn( 'APP.Player: Script without object.', uuid );
					continue;

				}

				var scripts = json.scripts[ uuid ];

				for ( var i = 0; i < scripts.length; i ++ ) {

					var script = scripts[ i ];

					var functions = ( new Function( scriptWrapParams, script.source + '\nreturn ' + scriptWrapResult + ';' ).bind( object ) )( this, renderer, scene, camera );

					for ( var name in functions ) {

						if ( functions[ name ] === undefined ) continue;

						if ( events[ name ] === undefined ) {

							console.warn( 'APP.Player: Event type not supported (', name, ')' );
							continue;

						}

						events[ name ].push( functions[ name ].bind( object ) );

					}

				}

			}

			dispatch( events.init, arguments );
		};

		this.setCamera = function ( value ) {

			// camera = value;
			// camera.aspect = this.width / this.height;
			// camera.updateProjectionMatrix();

			camera_height = camera_width * window.innerHeight / window.innerWidth;
			camera = new THREE.OrthographicCamera(-camera_width, camera_width, camera_height, -camera_height, - 100, 100);
			camera.position.x = 0;
			camera.position.y = 0;
			camera.position.z = 60;
			this.refreshCameraPos();
			if ( isVR === true ) {

				cameraVR = new THREE.PerspectiveCamera();
				cameraVR.projectionMatrix = camera.projectionMatrix;
				camera.add( cameraVR );

				controls = new THREE.VRControls( cameraVR );
				effect = new THREE.VREffect( renderer );

				if ( WEBVR.isAvailable() === true ) {

					this.dom.appendChild( WEBVR.getButton( effect ) );

				}

				if ( WEBVR.isLatestAvailable() === false ) {

					this.dom.appendChild( WEBVR.getMessage() );

				}

			}

		};

		this.refreshCameraPos = function()
		{
			var scrollTop = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
			var div_height = $('.main_content').height();
			var camPos = scrollTop / div_height  * camera_height * 2; // offset by original camera position
			console.log(camPos);
			camera.position.y = -camPos;
			renderer.render( scene, camera );
		}

		this.setScene = function ( value ) {
			scene = value;
		};

		this.setSize = function ( width, height ) {
			this.width = width;
			this.height = height;
			if ( camera ) {
				// camera.aspect = this.width / this.height;
				camera_height = camera_width * window.innerHeight / window.innerWidth;
				camera.left = -camera_width;
				camera.right = camera_width;
				camera.top = camera_height;
				camera.bottom = -camera_height;
				camera.updateProjectionMatrix();
			}

			if ( renderer ) {
				renderer.setSize( width, height );
			}
		};

		function dispatch( array, event ) {

			for ( var i = 0, l = array.length; i < l; i ++ ) {

				array[ i ]( event );

			}

		}

		var prevTime, request;

		function animate( time ) {

			request = requestAnimationFrame( animate );

			try {

				dispatch( events.update, { time: time, delta: time - prevTime } );

			} catch ( e ) {

				console.error( ( e.message || e ), ( e.stack || "" ) );

			}

			if ( isVR === true ) {

				camera.updateMatrixWorld();

				controls.update();
				effect.render( scene, cameraVR );

			} else {

				renderer.render( scene, camera );

			}

			prevTime = time;

		}

		this.play = function () {
			if(this.isPlaying)
				return;
			// document.addEventListener( 'keydown', onDocumentKeyDown );
			// document.addEventListener( 'keyup', onDocumentKeyUp );
			// document.addEventListener( 'mousedown', onDocumentMouseDown );
			// document.addEventListener( 'mouseup', onDocumentMouseUp );
			// document.addEventListener( 'mousemove', onDocumentMouseMove );
			// document.addEventListener( 'touchstart', onDocumentTouchStart );
			// document.addEventListener( 'touchend', onDocumentTouchEnd );
			// document.addEventListener( 'touchmove', onDocumentTouchMove );
			// document.addEventListener( 'wheel', onDocumentMouseWheel );
			document.addEventListener( 'scroll', onDocumentScroll );


			dispatch( events.start, arguments );

			request = requestAnimationFrame( animate );
			prevTime = performance.now();
			this.isPlaying = true;

		};

		this.stop = function () {
			if(!this.isPlaying)
				return;

			// document.removeEventListener( 'keydown', onDocumentKeyDown );
			// document.removeEventListener( 'keyup', onDocumentKeyUp );
			// document.removeEventListener( 'mousedown', onDocumentMouseDown );
			// document.removeEventListener( 'mouseup', onDocumentMouseUp );
			// document.removeEventListener( 'mousemove', onDocumentMouseMove );
			// document.removeEventListener( 'touchstart', onDocumentTouchStart );
			// document.removeEventListener( 'touchend', onDocumentTouchEnd );
			// document.removeEventListener( 'touchmove', onDocumentTouchMove );
			document.removeEventListener( 'scroll', onDocumentScroll );

			dispatch( events.stop, arguments );

			cancelAnimationFrame( request );
			this.isPlaying = false;
		};

		this.dispose = function () {

			while ( this.dom.children.length ) {

				this.dom.removeChild( this.dom.firstChild );

			}

			renderer.dispose();

			camera = undefined;
			scene = undefined;
			renderer = undefined;
		};

		//

		function onDocumentKeyDown( event ) {

			dispatch( events.keydown, event );

		}

		function onDocumentKeyUp( event ) {

			dispatch( events.keyup, event );

		}

		function onDocumentMouseDown( event ) {

			dispatch( events.mousedown, event );

		}

		function onDocumentMouseUp( event ) {

			dispatch( events.mouseup, event );

		}

		function onDocumentMouseWheel( event ) {

			dispatch( events.mousewheel, event);
		}

		function onDocumentScroll( event ) {

			dispatch( events.scroll, event);
		}

		function onDocumentMouseMove( event ) {

			dispatch( events.mousemove, event );

		}

		function onDocumentTouchStart( event ) {

			dispatch( events.touchstart, event );

		}

		function onDocumentTouchEnd( event ) {

			dispatch( events.touchend, event );

		}

		function onDocumentTouchMove( event ) {

			dispatch( events.touchmove, event );

		}

	}

};
