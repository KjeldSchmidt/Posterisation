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
	
	imageUpload: function( e ) {
		var reader = new FileReader();
		reader.onload = function( event ) {
			var img = new Image();
			img.onload = function() {
				img = Canvas.scaleImageToBoundingBox(img);
				Canvas.context.drawImage( img, 0, 0, img.width, img.height);
				Canvas.originalContext.drawImage( img, 0, 0, img.width, img.height);
				Canvas.state.isColorApplied = false;
			}
			img.src = event.target.result;
		}
		reader.readAsDataURL( e.target.files[0] );
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

	getOriginalColors: function() {
		var colors = [];
		var originalData = this.originalContext.getImageData(0, 0, s.width, s.height);
		var originalPixels = originalData.data;

		for (var i = 0, n = originalPixels.length; i < n; i += 4) {
			colors.push(new Color(
				originalPixels[i],
				originalPixels[i+1],
				originalPixels[i+2]
			));
		}

		return colors;

	},
	
	applyColor: function(color) {
		if (!Color.validateHexColor(color)) {
			alert(color + ' is not a valid hex color, please try again.');
			return;
		}
		
		var imageData = this.context.getImageData(0, 0, s.width, s.height);
		var pixels = imageData.data;

		if (color.length == 3) {
			color = Color.fullHexFromShort(color);
		}
		
		var red = parseInt(color.substring(1, 3), 16);
		var green = parseInt(color.substring(3, 5), 16);
		var blue = parseInt(color.substring(5, 7), 16);  
		
		
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
			
			// Distances are euclidean, see http://en.wikipedia.org/wiki/Euclidean_distance
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
		for (var i = 0; i < colors.length; i++) {
			this.applyColor(colors[i]);
		}
	}
}


Canvas.init();