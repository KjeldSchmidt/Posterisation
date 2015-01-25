function Color(red, green, blue) {
	this.red = red;
	this.green = green;
	this.blue = blue;
}


Color.prototype.getRGBString = function() {
	var red = this.red.toString( 16 );
	var green = this.green.toString( 16 );
	var blue = this.blue.toString( 16 );

	if (red.length === 1) { red = "0" + red; }
	if (green.length === 1) { green = "0" + green; }
	if (blue.length === 1) { blue = "0" + blue; }

	return "#" + red + green +  blue;
};

Color.validateHexColor = function(color) {
	var isValidColorRegex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
	return ( isValidColorRegex.test( color ) );
};

Color.fullHexFromShort = function(shortHex) {
	if (shortHex.length === 3) {
		return shortHex.substring(0, 1) + shortHex.substring(0, 1) +
			shortHex.substring(1, 2) + shortHex.substring(1, 2) +
			shortHex.substring(2, 3) + shortHex.substring(2, 3);	
	} else {
		throw new Error("Invalid short hex notation");
	}
	
};