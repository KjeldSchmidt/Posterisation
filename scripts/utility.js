function sortAssociativeArray(array) {
	var tuples = [];

	for (var key in array) {
		tuples.push([key, array[key]]);
	}

	tuples.sort( function(a, b) { 
		return a[1] - b[1] }
	);

	return tuples;
}

function minTwoDigits(n) {
	return (n < 10 ? '0' : '') + n;
}