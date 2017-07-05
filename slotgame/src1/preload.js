/*****************************************************
	Description 	: PreLoading, Lobby Resource Loading
	Created 		: 2016/08/01
	Copyright		: 2016
******************************************************/


var preload = function(game) {
}

preload.prototype = {
	preload: function() {
		var loadingBar = new CLoadingView(this.game);

		loadRes_ToolBar(this.game, true);
		loadingResource(this.game, loadingBar, arr_Resource);
	},

	create: function() {
		this.game.state.start("Lobby");
		g_gameEnv.initToolBar(true);
		g_gameSound.init(this.game, 'lobby_audio');
	}

}