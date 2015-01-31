function Color(red, green, blue) {
	this.red = red;
	this.green = green;
	this.blue = blue;
}


Color.prototype.getRGBString = function() {
	var red = hexNormalizeNumber( this.red );
	var green = hexNormalizeNumber( this.green );
	var blue = hexNormalizeNumber( this.blue );

	return "#" + red + green +  blue;
};

Color.prototype.reduce = function (radius) {
	if ( typeof radius === "number" ) {
		this.red -= this.red % radius;
		this.green -= this.green % radius;
		this.blue -= this.blue % radius;
	} else {
		throw new Error("Reduction-radius is NaN");
	}
}

Color.validateHexColor = function(color) {
	var isValidColorRegex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
	return ( isValidColorRegex.test( color ) );
};

Color.fullHexFromShort = function(shortHex) {
	if (shortHex.length ===	 3) {
		return shortHex.substring(0, 1) + shortHex.substring(0, 1) +
			shortHex.substring(1, 2) + shortHex.substring(1, 2) +
			shortHex.substring(2, 3) + shortHex.substring(2, 3);	
	} 

	throw new Error("Invalid short hex notation");
};

function hexNormalizeNumber( number ) {
	if ( number < 0 ) { number = 0; } 
	if ( number > 255 ) { number = 255; }
	number = number.toString ( 16 ).toUpperCase();
	if ( number.length === 1 ) { number = "0" + number;	}

	return number;
}