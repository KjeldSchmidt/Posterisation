function Palette(domElement) {
	var palette = {
		domElement: null,
		colors: [],
		
		bindUIActions: function() {
			// All this is necessary to pass the this.colors to the canvas.
			this.domElement.addEventListener(
				'click',
				function(colors) {
					var fn = function() {
						Canvas.applyColorArray(colors);
					} 
					return fn;
				}(this.colors)
			);
		}
	};
	
	palette.domElement = domElement;
	palette.bindUIActions();
	
	// Pushes all colors on the array.
	var colorDivs = domElement.childNodes;
	for (var i = 0; i < colorDivs.length; i++) {
		if( colorDivs[i].localName == "div" ) {
			palette.colors.push(colorDivs[i].dataset.color);
			colorDivs[i].style.background = colorDivs[i].dataset.color;
			
			// Computes the width that all individual colors need, so that they have equal width and fill the parent container precisely.
			parentTotalWidth = colorDivs[i].parentNode.offsetWidth;
			parentBorderWidth = parseInt(
				getComputedStyle(colorDivs[i].parentNode).getPropertyValue('border-left-width'),
				10
			);
			colorDivs[i].style.width =
				(parentTotalWidth - parentBorderWidth*2) / ((colorDivs.length -1)/2) + "px";
		}
	}
	
	return palette;  
}

var palettes = [];
var paletteNodes = document.querySelectorAll('.palette');

for (var i = 0; i < paletteNodes.length; i++){
	palettes.push(new Palette(paletteNodes[i]));
}