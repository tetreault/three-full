//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
#if NUM_CLIPPING_PLANES > 0

	#if ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )
		varying vec3 vViewPosition;
	#endif

	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];

#endif
