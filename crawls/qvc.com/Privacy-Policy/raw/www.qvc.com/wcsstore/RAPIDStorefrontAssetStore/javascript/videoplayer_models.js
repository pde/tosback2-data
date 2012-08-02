/*global QVC, $, $$, Configurations, Controls, Hash, Implements, button, $extend */

Configurations = {
	'Controls': {
		'base': function () {
			var o = {
				
				'RewindCommand': $extend({}, Controls.RewindCommand()),
				'PlayPauseToggle': $extend({}, Controls.PlayPauseToggle()),
				'MuteUnmuteToggle': $extend({}, Controls.MuteUnmuteToggle()),
				'FullScreenContractToggle': $extend({}, Controls.FullScreenContractToggle()),
				'StartButtonToggle': $extend({}, Controls.StartButtonToggle()),
				'VolumeSliderControl': $extend({}, Controls.VolumeSliderControl()),
				'ProgressSliderControl': $extend({}, Controls.ProgressSliderControl()),
				'ExpandCommand' : $extend({}, Controls.ExpandCommand()),
				'ContractCommand' : $extend({}, Controls.ContractCommand()),
				'ExpandContractToggle': $extend({}, Controls.ExpandContractToggle())
			};
			
			return o;
		},
		'standard': function () {
			var o = {
				'type': 'controls',
				'controls': []
			};

			var base = $extend({}, Configurations.Controls.base());
			base.RewindCommand.location = new QVC.Helpers.Location({
				'top': 10,
				'left': 37
			});
			base.MuteUnmuteToggle.location = new QVC.Helpers.Location({
				'top': 10,
				'left': 142
			});
			base.VolumeSliderControl.location = new QVC.Helpers.Location({
				'top': 16,
				'left': 70
			});
			delete base.FullScreenContractToggle;
			delete base.ExpandCommand;
			delete base.ContractCommand;

			base = new Hash(base);
			base.each(function (item, key) {
				o.controls.push(item);
			});

			return o;
		},
		'no_expand': function () {
			var o = {
				'type': 'controls',
				'controls': []
			};

			var base = $extend({}, Configurations.Controls.base());
			base.RewindCommand.location = new QVC.Helpers.Location({
				'top': 10,
				'left': 37
			});
			base.MuteUnmuteToggle.location = new QVC.Helpers.Location({
				'top': 10,
				'left': 142
			});
			base.VolumeSliderControl.location = new QVC.Helpers.Location({
				'top': 16,
				'left': 70
			});
			delete base.FullScreenContractToggle;
			delete base.ExpandCommand;
			delete base.ContractCommand;
			delete base.ExpandContractToggle;

			base = new Hash(base);
			base.each(function (item, key) {
				o.controls.push(item);
			});

			return o;
		},
		'overlay': function () {
			var o = {
				'type': 'controls',
				'controls': []
			};

			var base = $extend({}, Configurations.Controls.base());
			base.RewindCommand.location = new QVC.Helpers.Location({
				'top': 10,
				'left': 37
			});
			base.MuteUnmuteToggle.location = new QVC.Helpers.Location({
				'top': 10,
				'left': 142
			});
			base.VolumeSliderControl.location = new QVC.Helpers.Location({
				'top': 16,
				'left': 70
			});
			delete base.ExpandContractToggle;
			delete base.FullScreenContractToggle;
			delete base.ExpandCommand;

			base = new Hash(base);
			base.each(function (item, key) {
				o.controls.push(item);
			});

			return o;
		},
		'underlay': function () {
			var o = {
				'type': 'controls',
				'controls': []
			};

			var base = $extend({}, Configurations.Controls.base());
			base.RewindCommand.location = new QVC.Helpers.Location({
				'top': 10,
				'left': 37
			});
			base.MuteUnmuteToggle.location = new QVC.Helpers.Location({
				'top': 10,
				'left': 142
			});
			base.VolumeSliderControl.location = new QVC.Helpers.Location({
				'top': 16,
				'left': 70
			});
			delete base.ExpandContractToggle;
			delete base.ContractCommand;
			delete base.FullScreenContractToggle;

			base = new Hash(base);
			base.each(function (item, key) {
				o.controls.push(item);
			});

			return o;
		},
		'item_on_air': function () {
			var o = {
				'type': 'controls',
				'controls': []
			};
			var base = $extend({}, Configurations.Controls.base());
			base.MuteUnmuteToggle.location = new QVC.Helpers.Location({
				'top': 10,
				'left': 113
			});
			base.VolumeSliderControl.location = new QVC.Helpers.Location({
				'top': 16,
				'left': 40
			});
			delete base.FullScreenContractToggle;
			delete base.RewindCommand;
			delete base.ExpandCommand;
			delete base.ContractCommand;
			delete base.ProgressSliderControl;
			base = new Hash(base);
			base.each(function (item, key) {
				o.controls.push(item);
			});
			return o;
		},
		'live_player': function () {
			var o = {
				'type': 'controls',
				'controls': []
			};
			var base = $extend({}, Configurations.Controls.base());
			base.MuteUnmuteToggle.location = new QVC.Helpers.Location({
				'top': 10,
				'left': 113
			});
			base.VolumeSliderControl.location = new QVC.Helpers.Location({
				'top': 16,
				'left': 40
			});
			delete base.ExpandContractToggle;
			delete base.RewindCommand;
			delete base.ExpandCommand;
			delete base.ContractCommand;
			delete base.ProgressSliderControl;
			base = new Hash(base);
			base.each(function (item, key) {
				o.controls.push(item);
			});
			return o;
		},
		'fmv': function () {
			var o = {
				'type': 'controls',
				'controls': []
			};
			var base = $extend({}, Configurations.Controls.base());
			delete base.RewindCommand;
			delete base.ExpandCommand;
			delete base.ContractCommand;
			delete base.PlayPauseToggle;
			delete base.MuteUnmuteToggle;
			delete base.ExpandContractToggle;
			delete base.FullScreenContractToggle;
			delete base.ProgressSliderControl;
			delete base.VolumeSliderControl;
			base = new Hash(base);
			base.each(function (item, key) {
				o.controls.push(item);
			});
			return o;
		}
	},
	'Stages' : {
		'small' : function () {
			var o = {
				'type': 'configuration',
				'configuration': {
					'width': 208,
					'height': 156,
					'point': new QVC.Helpers.Point(0, 0),
					'border': new QVC.Helpers.Border(),
					'animate': false,
					'hidden': false
				}
			};
			return o;
		},
		'small_no_border' : function () {
			var o = $extend({}, Configurations.Stages.small());
			o.configuration.border = false;
			return o;
		},
		'small_liquid' : function () {
			var o = $extend({}, Configurations.Stages.small_no_border());
			o.configuration.point = new QVC.Helpers.Point(472, 7);
			o.configuration.animate = true;
			return o;
		},
		'small_liquid_init' : function () {
			var o = $extend({}, Configurations.Stages.small_no_border());
			o.configuration.point = new QVC.Helpers.Point(472, 7);
			return o;
		},
		'small_liquid2' : function () {
			var o = $extend({}, Configurations.Stages.small_no_border());
			o.configuration.point = new QVC.Helpers.Point(472, 22);
			o.configuration.animate = true;
			return o;
		},
		'small_liquid2_init' : function () {
			var o = $extend({}, Configurations.Stages.small_no_border());
			o.configuration.point = new QVC.Helpers.Point(472, 22);
			return o;
		},
		'less_small' : function() {
			var o = $extend({}, Configurations.Stages.small());
			o.configuration.width = 360;
			o.configuration.height = 270;
			o.configuration.border = false;
			return o;
		},
		'medium' : function () {
			var o = $extend({}, Configurations.Stages.small());
			o.configuration.width = 442;
			o.configuration.height = 333;
			o.configuration.border = false;
			return o;
		},
		'medium_liquid' : function () {
			var o = $extend({}, Configurations.Stages.medium());
			o.configuration.point = new QVC.Helpers.Point(7, 7);
			o.configuration.animate = true;
			return o;
		},
		'large' : function () {
			var o = $extend({}, Configurations.Stages.medium());
			o.configuration.width = 535;
			o.configuration.height = 400;
			o.configuration.point = new QVC.Helpers.Point(0, 0);
			return o;
		},
		'largeLive' : function () {
			var o = $extend({}, Configurations.Stages.medium());
			o.configuration.width = 640;
			o.configuration.height = 480;
			o.configuration.point = new QVC.Helpers.Point(0, 0);
			return o;
		},
		'empty' : function () {
			var o = $extend({}, Configurations.Stages.small());
			o.configuration.hidden = true;
			return o;
		},
		'NTLlargeLive' : function () {
			var o = $extend({}, Configurations.Stages.medium());
			o.configuration.width = 960;
			o.configuration.height = 540;
			o.configuration.point = new QVC.Helpers.Point(0, 0);
			return o;
		},
		'DE_small' : function () {
			var o = {
				'type': 'configuration',
				'configuration': {
					'width': 216,
					'height': 162,
					'point': new QVC.Helpers.Point(0, 0),
					'border': new QVC.Helpers.Border(),
					'animate': false,
					'hidden': false
				}
			};
			return o;
		},
		'DE_small_no_border' : function () {
			var o = $extend({}, Configurations.Stages.DE_small());
			o.configuration.border = false;
			return o;
		}
	}
};
Controls = {
	'ExpandCommand': function () {
		var o = $extend({}, Implements.CommandControl());
		o.modelEvent = 'EXPAND_STATE_CHANGED';
		o.location = new QVC.Helpers.Location({
			'top': 7,
			'right': 7
		});
		o.button = button = new QVC.Modules.VideoPlayer.Controls.SimpleButton('ExpandButtonUpState', 'ExpandButtonOrange', 'ExpandButtonOrange', 'ExpandButtonGray');
		o.command = 'expand';
		o.tooltip = 'expand';
		return o;
	},
	'ContractCommand': function () {
		var o = $extend({}, Implements.CommandControl());
		o.modelEvent = 'EXPAND_STATE_CHANGED';
		o.location = new QVC.Helpers.Location({
			'top': 7,
			'right': 7
		});
		o.button = button = new QVC.Modules.VideoPlayer.Controls.SimpleButton('ExpandButtonGray', 'ExpandButtonOrange', 'ExpandButtonOrange', 'ExpandButtonGray');
		o.command = 'contract';
		o.tooltip = 'collapse';
		return o;
	},
	'RewindCommand': function () {
		var o = $extend({}, Implements.CommandControl());
		o.button = new QVC.Modules.VideoPlayer.Controls.SimpleButton('RewindButton', 'RewindButton', 'RewindButtonOver', 'RewindButton');
		o.command = 'rewind';
		return o;
	},
	'PlayPauseToggle': function () {
		var o = $extend({}, Implements.ToggleCommandControl());
		o.modelEvent = 'PLAY_STATE_CHANGED';
		o.location = new QVC.Helpers.Location({
			'top': 10,
			'left': 7
		});
		o.command1.command = 'play';
		o.command1.button = new QVC.Modules.VideoPlayer.Controls.SimpleButton('PlayButton', 'PlayButton', 'PlayButton', 'PlayButton');
		o.command2.command = 'pause';
		o.command2.button = new QVC.Modules.VideoPlayer.Controls.SimpleButton('PauseButton', 'PauseButton', 'PauseButton', 'PauseButton');
		return o;
	},
	'MuteUnmuteToggle': function () {
		var o = $extend({}, Implements.ToggleCommandControl());
		o.modelEvent = 'MUTE_STATE_CHANGED';
		o.command1.command = 'unmute';
		o.command1.button = new QVC.Modules.VideoPlayer.Controls.SimpleButton('SoundOffButton', 'SoundOffButton', 'SoundOffButton', 'SoundOffButton');
		o.command2.command = 'mute';
		o.command2.button = new QVC.Modules.VideoPlayer.Controls.SimpleButton('SoundOnButton', 'SoundOnButton', 'SoundOnButton', 'SoundOnButton');
		return o;
	},
	'ExpandContractToggle': function () {
		var o = $extend({}, Implements.ToggleCommandControl());
		o.modelEvent = 'EXPAND_STATE_CHANGED';
		o.location = new QVC.Helpers.Location({
			'top': 7,
			'right': 7
		});
		o.command1.command = 'expand';
		o.command1.button = new QVC.Modules.VideoPlayer.Controls.SimpleButton('ExpandButtonUpState', 'ExpandButtonOrange', 'ExpandButtonOrange', 'ExpandButtonGray');
		o.command1.tooltip = 'expand';
		o.command2.command = 'contract';
		o.command2.button = new QVC.Modules.VideoPlayer.Controls.SimpleButton('ExpandButtonGray', 'ExpandButtonOrange', 'ExpandButtonOrange', 'ExpandButtonGray');
		o.command2.tooltip = 'collapse';
		return o;
	},
	'FullScreenContractToggle': function () {
		var o = $extend({}, Controls.ExpandContractToggle());
		o.modelEvent = 'FULL_SCREEN_CHANGED';
		o.command1.command = 'fullScreen';
		o.command1.tooltip = 'enter full screen';
		o.command2.tooltip = 'exit full screen';
		o.command2.command = 'fullScreenClosed';
		o.command1.internal = true;
		return o;
	},
	'StartButtonToggle': function () {
		var o = $extend({}, Implements.ToggleCommandControl());
		o.modelEvent = 'ON_START';
		o.container = 'VideoPlayerContainer';
		o.location = new QVC.Helpers.Location({
			'center': true
		});
		o.command1.command = 'play';
		o.command1.button = new QVC.Modules.VideoPlayer.Controls.SimpleButton('StartButton', 'StartButton', 'StartButton', 'StartButton');
		o.command2.button = new QVC.Modules.VideoPlayer.Controls.SimpleButton('Blank', 'Blank', 'Blank', 'Blank');
		o.removeOnEvent = 'ON_START';
		return o;
	},
	'VolumeSliderControl': function () {
		var o = $extend({}, Implements.SliderControl());
		o.modelEvent = 'VOLUME_CHANGED';
		o.width = 67;
		o.commandControl.button = new QVC.Modules.VideoPlayer.Controls.SimpleButton('VolumeSliderButton', 'VolumeSliderButtonOver', 'VolumeSliderButtonOver', 'MuteSliderButton');
		o.commandControl.command = 'setVolume';
		o.defaultValue = 75;
		return o;
	},
	'ProgressSliderControl': function () {
		var o = $extend({}, Implements.SliderControl());
		o.modelEvent = 'SEEK';
		o.track = 'SliderTrack';
		o.progressTrack = 'SliderProgressTrack';
		o.location = new QVC.Helpers.Location({
			'top': 0,
			'left': 7,
			'right': 7
		});
		o.commandControl.button = new QVC.Modules.VideoPlayer.Controls.SimpleButton('SliderButton', 'SliderButton', 'SliderButton', 'SliderButton');
		o.commandControl.command = 'seek';
		return o;
	}
};
Implements = {
	'CommandControl': function () {
		var o = new QVC.Modules.VideoPlayer.Controls.Control({
			'type': 'CommandControl',
			'modelEvent': '',
			'location': new QVC.Helpers.Location({
				'top': 0,
				'left': 0
			}),
			'addOnEvent': '',
			'container': 'ControlContainer',
			'removeOnEvent': '',
			'internal': false,
			'command': '',
			'button': {},
			'tooltip': '',
			'autoExecute': false,
			'height': -1,
			'width': -1
		});
		return o;
	},
	'ToggleCommandControl': function () {
		var o = $extend({}, Implements.CommandControl());
		o.type = 'ToggleCommandControl';
		o.command1 = $extend({}, Implements.CommandControl());
		o.command2 = $extend({}, Implements.CommandControl());
		return o;
	},
	'SliderControl': function () {
		var o = $extend({}, Implements.CommandControl());
		o.type = 'SliderControl';
		o.commandControl = $extend({}, Implements.CommandControl());
		o.track = 'SliderTrack';
		o.progressTrack = 'SliderProgressTrack';
		o.minimum = 0;
		o.maximum = 100;
		o.defaultValue = 0;
		o.percentage = true;
		o.width = -1;
		o.height = -1;
		return o;
	}
};
//playerPaused used to toggle the player pause and play modes based on the user selection
var playerPaused = false;

function pausePlayer()
{
	if(video)
	{
		playerPaused = true;
		video.pause();				
	}
}
function resumePlayer()
{
	if(video)
	{		
		video.play();
		playerPaused = false;
	}
}