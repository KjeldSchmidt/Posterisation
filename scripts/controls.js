var Controls = {
	resetButton: document.getElementById( 'reset' ),
	applyColorButton: document.getElementById( 'applyColor' ),
	saveButton: document.getElementById( 'save' ),
	colorInput: document.getElementById( 'colorInput' ),
	colorPreview: document.getElementById( 'colorPreview' ),

	palettes: [],
	activePalette: null,
	
	init: function() {
		this.bindUIActions();

		this.activePalette = new Palette( document.getElementById( 'activePalette' ) );
		var paletteNodes = document.querySelectorAll( '.palette' );

		for (var i = 0; i < paletteNodes.length; i++){
			this.palettes.push(new Palette(paletteNodes[i]));
		}
	},
	
	bindUIActions: function() {
		this.resetButton.onclick = function() {
			Canvas.resetImage();
		};
		
		this.applyColorButton.onclick = function() {
			Canvas.applyColor( Controls.colorInput.value );
			activePalette.updatePalette( Controls.colorInput.value );
		};
		
		this.colorInput.addEventListener( 'input', this.colorUpdate );

		this.saveButton.addEventListener( 'click', function (e) {
			var dataURL = Canvas.canvas.toDataURL( 'image/png' );
			Controls.saveButton.href = dataURL;
		});
	},
	
	colorUpdate: function() {
		var inputColor = Controls.colorInput.value;
		if ( Color.validateHexColor( inputColor ) ) {
			Controls.colorPreview.style.background = inputColor;
		}
	}
}
Controls.init();