(function (exports) {
	'use strict';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var Pass = function () {

		// if set to true, the pass is processed by the composer
		this.enabled = true;

		// if set to true, the pass indicates to swap read and write buffer after rendering
		this.needsSwap = true;

		// if set to true, the pass clears its buffer before rendering
		this.clear = false;

		// if set to true, the result of the pass is rendered to screen
		this.renderToScreen = false;

	};

	Object.assign( Pass.prototype, {

		setSize: function ( width, height ) {},

		render: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {

			console.error( 'Pass: .render() must be implemented in derived pass.' );

		}

	} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var MaskPass = function ( scene, camera ) {

		Pass.call( this );

		this.scene = scene;
		this.camera = camera;

		this.clear = true;
		this.needsSwap = false;

		this.inverse = false;

	};

	MaskPass.prototype = Object.assign( Object.create( Pass.prototype ), {

		constructor: MaskPass,

		render: function ( renderer, writeBuffer, readBuffer, deltaTime, maskActive ) {

			var context = renderer.context;
			var state = renderer.state;

			// don't update color or depth

			state.buffers.color.setMask( false );
			state.buffers.depth.setMask( false );

			// lock buffers

			state.buffers.color.setLocked( true );
			state.buffers.depth.setLocked( true );

			// set up stencil

			var writeValue, clearValue;

			if ( this.inverse ) {

				writeValue = 0;
				clearValue = 1;

			} else {

				writeValue = 1;
				clearValue = 0;

			}

			state.buffers.stencil.setTest( true );
			state.buffers.stencil.setOp( context.REPLACE, context.REPLACE, context.REPLACE );
			state.buffers.stencil.setFunc( context.ALWAYS, writeValue, 0xffffffff );
			state.buffers.stencil.setClear( clearValue );

			// draw into the stencil buffer

			renderer.setRenderTarget( readBuffer );
			if ( this.clear ) renderer.clear();
			renderer.render( this.scene, this.camera );

			renderer.setRenderTarget( writeBuffer );
			if ( this.clear ) renderer.clear();
			renderer.render( this.scene, this.camera );

			// unlock color and depth buffer for subsequent rendering

			state.buffers.color.setLocked( false );
			state.buffers.depth.setLocked( false );

			// only render where stencil is set to 1

			state.buffers.stencil.setFunc( context.EQUAL, 1, 0xffffffff ); // draw if == 1
			state.buffers.stencil.setOp( context.KEEP, context.KEEP, context.KEEP );

		}

	} );
	var ClearMaskPass = function () {

		Pass.call( this );

		this.needsSwap = false;

	};

	ClearMaskPass.prototype = Object.create( Pass.prototype );

	Object.assign( ClearMaskPass.prototype, {

		render: function ( renderer, writeBuffer, readBuffer, deltaTime, maskActive ) {

			renderer.state.buffers.stencil.setTest( false );

		}

	} );

	exports.MaskPass = MaskPass;
	exports.ClearMaskPass = ClearMaskPass;

}((this.Three = this.Three || {})));
