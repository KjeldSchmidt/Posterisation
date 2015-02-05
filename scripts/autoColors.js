var AutoColors = {
	commonColorsButton: document.getElementById("commonColorsButton"),
	commonColorsLevels: null,
	commonColorsRadius: null,
	neighbourColorsButton: document.getElementById("neighbourColorsButton"),
	densityColorsButton: document.getElementById("densityColorsButton"),

	init: function() {
		this.bindUIActions();
		this.commonColorsLevels = this.commonColorsButton.querySelector('[name=levels]');
		this.commonColorsRadius = this.commonColorsButton.querySelector('[name=radius]');
	},

	bindUIActions: function() {
		this.commonColorsButton.onclick = this.commonColors;
		this.neighbourColorsButton.onclick = this.neighbourColors;
		this.densityColorsButton.onclick = this.densityColors;
	},

	commonColors: function() {
		Canvas.resetImage();
		var levels = AutoColors.commonColorsLevels.value;
		var radius = AutoColors.commonColorsRadius.value;
		var originalColors = Canvas.getOriginalColors();
		var reducedColors = originalColors.map( AutoColors.getColorReductionMap( radius ) );
		var colorCount = AutoColors.countColorOccurences( reducedColors );

		colorCount = sortAssociativeArray( colorCount );
		colorCount = colorCount.slice( 0, levels );

		for ( var i = 0; i < colorCount.length; i++ ) {
			Canvas.applyColor( colorCount[i][0] );
		}
	},

	neighbourColors: function() {
		var originalColors = Canvas.getOriginalColors();
		console.log(originalColors);
	},

	densityColors: function() {
		var originalColors = Canvas.getOriginalColors();
		console.log(originalColors);
	},

	countColorOccurences: function(colorArray) {
		var counts = [];
		colorArray.forEach( function(color) { counts[ color.getRGBString() ] = (counts[ color.getRGBString() ] || 0 ) + 1; });


		return counts;
	},

	getColorReductionMap: function( radius ) {
		var fn = function( color ) {
			color.reduce( radius );
			return color;
		};

		return fn;
	}

};

AutoColors.init();