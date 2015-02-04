var AutoColors = {
	commonColorsButton: document.getElementById("commonColorsButton"),
	neighbourColorsButton: document.getElementById("neighbourColorsButton"),
	densityColorsButton: document.getElementById("densityColorsButton"),

	init: function() {
		this.bindUIActions();
	},

	bindUIActions: function() {
		this.commonColorsButton.onclick = this.commonColors;
		this.neighbourColorsButton.onclick = this.neighbourColors;
		this.densityColorsButton.onclick = this.densityColors;
	},

	commonColors: function() {
		var originalColors = Canvas.getOriginalColors();
		
		reducedColors = originalColors.map( function( color ) {
			color.reduce(32);
			return color;
		});

		var colorCount = AutoColors.countColorOccurences( reducedColors );
		colorCount = sortAssociativeArray( colorCount );

		colorCount = colorCount.slice( 0, 10 );

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
	}

};

AutoColors.init();