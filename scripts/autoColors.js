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
		var colorCount = AutoColors.countColorOccurences( originalColors );
		colorCount = sortAssociativeArray( colorCount );
		colorCount.splice( 0, colorCount.length - 10 );
		console.dir( colorCount );
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