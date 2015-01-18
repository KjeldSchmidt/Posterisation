function Color(red, green, blue) {
	this.red = red;
	this.green = green;
	this.blue = blue;
}


Color.prototype.sayColor = function() {
	console.log(this.red + " " + this.green + " " + this.blue);
}

Color.validateHexColor = function(color) {
	var isValidColorRegex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
	return (isValidColorRegex.test(color));
}

Color.fullHexFromShort = function(shortHex) {
	if (shortHex.length == 3) {
		return "" +
		shortHex.substring(0, 1) + shortHex.substring(0, 1) +
		shortHex.substring(1, 2) + shortHex.substring(1, 2) +
		shortHex.substring(2, 3) + shortHex.substring(2, 3);	
	} else {
		throw new Error("Invalid short hex notation");
	}
	
}