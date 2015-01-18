QUnit.test( "hello test", function( assert ) {
	assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "Hex Color Validation Test", function( assert ) {
	assert.expect( 5 );
	assert.ok( !Color.validateHexColor(''), 'Correctly validated');
	assert.ok( !Color.validateHexColor('ffffff'), 'Correctly validated');
	assert.ok( Color.validateHexColor('#abc'), 'Correctly validated');
	assert.ok( Color.validateHexColor('#A0bc9D'), 'Correctly validated');
	assert.ok( !Color.validateHexColor('abcde'), 'Correctly validated');
});

QUnit.test ( "ShortHex to Long Hex conversion", function( assert ) {
	assert.expect(0);
});