var s, Canvas = {
	settings: {
		height: 500,
		width: 500
	},
	canvas: document.getElementById('imageCanvas'),
	context: null,
	canvasContainer: document.querySelector('.canvasContainer'),
	imageLoader: document.getElementById('imageLoader'),
	originalCanvas: document.getElementById('originalCanvas'),
	originalContext: null,
	state: {
		isColorApplied: false
	},
	
	init: function() {
		s = this.settings;
		this.context = this.canvas.getContext('2d');
		this.originalContext = this.originalCanvas.getContext("2d");
		this.bindUIActions();
	},
	
	bindUIActions: function() {
		this.imageLoader.addEventListener('change', this.imageUpload, false);
	},
	
	imageUpload: function(e) {
		var reader = new FileReader();
		reader.onload = function(event){
			var img = new Image();
			img.onload = function(){
				img = Canvas.scaleImageToBoundingBox(img);
				Canvas.context.drawImage( img, 0, 0, img.width, img.height);
				Canvas.originalContext.drawImage( img, 0, 0, img.width, img.height);
				Canvas.state.isColorApplied = false;
			}
			img.src = event.target.result;
		}
		reader.readAsDataURL(e.target.files[0]);
	},
	
	scaleImageToBoundingBox: function(img) {
		var scale = img.width / img.height;
		if (scale > 1) {
			img.width = s.width;
			img.height = img.width / scale;
		} else {
			img.height = s.height;
			img.width = img.height * scale;
		}
		
		Canvas.canvas.width = img.width;
		Canvas.canvas.height = img.height;
		Canvas.originalCanvas.width = img.width;
		Canvas.originalCanvas.height = img.height;
		Canvas.canvasContainer.style.width = img.width + "px";
		Canvas.canvasContainer.style.height = img.height + "px";
				
		return img;
	},
	
	resetImage: function() {
		var originalData = this.originalContext.getImageData(0, 0, s.width, s.height);
		this.context.putImageData(originalData, 0, 0);
		this.state.isColorApplied = false;
	},
	
	applyColor: function(color) {
		if (!Color.validateHexColor(color)) {
			alert('#' + color + ' is not a valid hex color, please try again.');
			return;
		}
		
		var imageData = this.context.getImageData(0, 0, s.width, s.height);
		var pixels = imageData.data;

		if (color.length == 3) {
			color = Color.fullHexFromShort(color);
			console.log(color);
		}
		
		var red = parseInt(color.substring(0, 2), 16);
		var green = parseInt(color.substring(2, 4), 16);
		var blue = parseInt(color.substring(4, 6), 16);  
		
		
		if (!this.state.isColorApplied) {
			this.state.isColorApplied = true;
			
			for (var i = 0, n = pixels.length; i < n; i += 4) {
				pixels[ i ] = red;
				pixels[i+1] = green;
				pixels[i+2] = blue; 
			}
		} else {
			
			var originalData = this.originalContext.getImageData(0, 0, s.width, s.height);
			var originalPixels = originalData.data;
			
			var nextDistanceToOriginal = 0;
			var prevDistanceToOriginal = 0;
			for (var i = 0, n = pixels.length; i < n; i += 4) {
				prevDistanceToOriginal = Math.sqrt(
					Math.pow(pixels[i] - originalPixels[i], 2) +
					Math.pow(pixels[i+1] - originalPixels[i+1], 2) +
					Math.pow(pixels[i+2] - originalPixels[i+2], 2)
				);
				
				nextDistanceToOriginal = Math.sqrt(
					Math.pow(red - originalPixels[i], 2) +
					Math.pow(green - originalPixels[i+1], 2) +
					Math.pow(blue - originalPixels[i+2], 2)
				);
				if (nextDistanceToOriginal < prevDistanceToOriginal) {
					pixels[ i ] = red;
					pixels[i+1] = green;
					pixels[i+2] = blue;
				}
			}
		}
		this.context.putImageData(imageData, 0, 0);
	},
	
	applyColorArray: function(colors) {
		console.dir(colors);
		for (var i = 0; i < colors.length; i++) {
			this.applyColor(colors[i]);
		}
	},
	
	invertImage: function() {
		var imageData = this.context.getImageData(0, 0, s.width, s.height);
		var pixels = imageData.data;

		// Loop over each pixel and invert the color.
		for (var i = 0, n = pixels.length; i < n; i += 4) {
				pixels[ i ] = 255 - pixels[ i ];
				pixels[i+1] = 255 - pixels[i+1];
				pixels[i+2] = 255 - pixels[i+2]; 
		}

		// Draw the ImageData at the given (x,y) coordinates.
		this.context.putImageData(imageData, 0, 0);
	}
}
Canvas.init();








var Controls = {
	resetButton: document.getElementById('reset'),
	invertButton: document.getElementById('invert'),
	applyColorButton: document.getElementById('applyColor'),
	saveButton: document.getElementById('save'),
	colorInput: document.getElementById('colorInput'),
	colorPreview: document.getElementById('colorPreview'),
	
	init: function() {
		this.bindUIActions();
	},
	
	bindUIActions: function() {
		this.resetButton.onclick = function() {
			Canvas.resetImage();
		};
		
		this.invertButton.onclick = function() {
			Canvas.invertImage();
		};
		
		this.applyColorButton.onclick = function() {
			Canvas.applyColor(Controls.colorInput.value);
		};
		
		this.colorInput.addEventListener('input', this.colorUpdate);

		this.saveButton.addEventListener('click', function (e) {
			var dataURL = Canvas.canvas.toDataURL('image/png');
			Controls.saveButton.href = dataURL;
		});
	},
	
	colorUpdate: function() {
		var inputColor = Controls.colorInput.value;
		if (Color.validateHexColor(inputColor)) {
			Controls.colorPreview.style.background = '#' + inputColor;
		}
	}
}
Controls.init();










var paletteNodes = document.querySelectorAll('.palette');

var palettes = [];
for (var i = 0; i < paletteNodes.length; i++){
	palettes.push(new Palette(paletteNodes[i]));
}

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
			colorDivs[i].style.background = '#' + colorDivs[i].dataset.color;
			
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