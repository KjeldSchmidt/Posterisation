QUnit.test( 'hello test', function( assert ) {
	assert.ok( 1 == '1', 'Passed!' );
});

QUnit.test( 'Hex Color Validation Test', function( assert ) {
	assert.expect( 5 );
	assert.ok( !Color.validateHexColor(''), 'Correctly validated');
	assert.ok( !Color.validateHexColor('ffffff'), 'Correctly validated');
	assert.ok( Color.validateHexColor('#abc'), 'Correctly validated');
	assert.ok( Color.validateHexColor('#A0bc9D'), 'Correctly validated');
	assert.ok( !Color.validateHexColor('abcde'), 'Correctly validated');
});

QUnit.test ( 'ShortHex to Long Hex conversion', function( assert ) {
	assert.expect(0);
});

QUnit.test ( 'Color Class RGB Return Test', function( assert ) {
	assert.expect(2);

	var color1 = new Color(100, 20, 30);
	var color2 = new Color(5, 12, 124);

	assert.equal( color1.getRGBString(), '#64141E', 'Color (100, 20, 30) correctly represented as #64141E');
	assert.equal( color2.getRGBString(), '#050C7C', 'Color (5, 12, 124) correctly represented as #050C7C');
	

});