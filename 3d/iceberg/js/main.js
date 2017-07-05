

$(document).ready(function()
{
	new ClassMain();
})

function ClassMain()
{
	var main = this;
	var obj3DLoader = new THREE.FileLoader();
	var player3D = new APP.Player();

	this.init = function()
	{
		var height = $('.second_content ul').height();
		var h = $('#mark_image').height();
		$('#mark_image').css('padding-top', (height - h) * 0.5);
		document.body.appendChild( player3D.dom ).setAttribute("id", "threeD");
		window.addEventListener('resize', function()
		{
			var height = $('.second_content ul').height();
			var h = $('#mark_image').height();
			$('#mark_image').css('padding-top', (height - h) * 0.5);
			player3D.setSize(window.innerWidth, window.innerHeight);
		});

		this.load3Dview();

		this.initEvent();
	}

	this.load3Dview = function()
	{
		if(player3D.isLoad)
			return;

		obj3DLoader.load( 'app.json', function ( text ) {
			var json = JSON.parse( text );
			player3D.load( json );
			player3D.setSize( window.innerWidth, window.innerHeight );
			// player3D.play();

			$('#threeD').css('opacity', 0);

			obj3DLoader.manager.onProgress = function(progress, result)
			{
				var bar = 100,
				total = progress.totalModels + progress.totalTextures,
				loaded = progress.loadedModels + progress.loadedTextures;
				if(total)
					bar = Math.floor( bar * loaded / total );
				$('#uploadprogressbar').css('width', bar + "%");
			};

			obj3DLoader.manager.onLoad = function(result)
			{
				$('#sm_progressModal').css('display', 'none');
				var view3D = $('#threeD');
				main.animateFadeIn(0);
				player3D.isLoad = true;
				player3D.play();
			};
		});
	}

	this.unLoad3Dview = function()
	{
		if(player3D.isLoad)
		{
			player3D.stop();
			player3D.dispose();
			player3D.isLoad = false;
		}
	}

	this.animateFadeIn = function(opacity)
	{
		if(opacity > 1)
			return;
		setTimeout(function()
		{
			$('#threeD').css('opacity', opacity);
			main.animateFadeIn(opacity + 0.02);
		}, 25);
	}

	this.initEvent = function()
	{
		var div_top = $('.second_content').offset().top;
		$(document).scroll(function()
		{
			if (div_top <= $(document).scrollTop()) {
				player3D.stop();
			}
			else
			{
				if(!player3D.isPlaying && player3D.isLoad)
				{
					player3D.play();
					main.animateFadeIn(0);
				}
			}
		})
	}

	this.init();
}
