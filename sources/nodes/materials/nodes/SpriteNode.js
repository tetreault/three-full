//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Node } from '../../core/Node.js'
import { ColorNode } from '../../inputs/ColorNode.js'
import { UniformsUtils } from '../../../renderers/shaders/UniformsUtils.js'
import { UniformsLib } from '../../../renderers/shaders/UniformsLib.js'
function SpriteNode() {

	Node.call( this );

	this.color = new ColorNode( 0xEEEEEE );
	this.spherical = true;

}

SpriteNode.prototype = Object.create( Node.prototype );
SpriteNode.prototype.constructor = SpriteNode;
SpriteNode.prototype.nodeType = "Sprite";

SpriteNode.prototype.build = function ( builder ) {

	var output, code;

	builder.define( 'SPRITE' );

	builder.requires.lights = false;
	builder.requires.transparent = this.alpha !== undefined;

	if ( builder.isShader( 'vertex' ) ) {

		var position = this.position ? this.position.parseAndBuildCode( builder, 'v3', { cache: 'position' } ) : undefined;

		builder.mergeUniform( UniformsUtils.merge( [
			UniformsLib.fog
		] ) );

		builder.addParsCode( [
			"#include <fog_pars_vertex>",
			"#include <logdepthbuf_pars_vertex>",
			"#include <clipping_planes_pars_vertex>"
		].join( "\n" ) );

		output = [
			"#include <clipping_planes_fragment>",
			"#include <begin_vertex>"
		];

		if ( position ) {

			output.push(
				position.code,
				position.result ? "transformed = " + position.result + ";" : ''
			);

		}

		output.push(
			"#include <project_vertex>",
			"#include <fog_vertex>",

			'mat4 modelViewMtx = modelViewMatrix;',
			'mat4 modelMtx = modelMatrix;',

			// ignore position from modelMatrix (use vary position)
			'modelMtx[3][0] = 0.0;',
			'modelMtx[3][1] = 0.0;',
			'modelMtx[3][2] = 0.0;'
		);

		if ( ! this.spherical ) {

			output.push(
				'modelMtx[1][1] = 1.0;'
			);

		}

		output.push(
			// http://www.geeks3d.com/20140807/billboarding-vertex-shader-glsl/
			// First colunm.
			'modelViewMtx[0][0] = 1.0;',
			'modelViewMtx[0][1] = 0.0;',
			'modelViewMtx[0][2] = 0.0;'
		);

		if ( this.spherical ) {

			output.push(
				// Second colunm.
				'modelViewMtx[1][0] = 0.0;',
				'modelViewMtx[1][1] = 1.0;',
				'modelViewMtx[1][2] = 0.0;'
			);

		}

		output.push(
			// Thrid colunm.
			'modelViewMtx[2][0] = 0.0;',
			'modelViewMtx[2][1] = 0.0;',
			'modelViewMtx[2][2] = 1.0;',

			"gl_Position = projectionMatrix * modelViewMtx * modelMtx * vec4( transformed, 1.0 );",

			"#include <logdepthbuf_vertex>",
			"#include <clipping_planes_vertex>",
			"#include <fog_vertex>"
		);

	} else {

		builder.addParsCode( [
			"#include <fog_pars_fragment>",
			"#include <logdepthbuf_pars_fragment>",
			"#include <clipping_planes_pars_fragment>"
		].join( "\n" ) );

		builder.addCode( [
			"#include <clipping_planes_fragment>",
			"#include <logdepthbuf_fragment>"
		].join( "\n" ) );

		// parse all nodes to reuse generate codes

		if ( this.alpha ) this.alpha.parse( builder );

		this.color.parse( builder, { slot: 'color' } );

		// build code

		var alpha = this.alpha ? this.alpha.buildCode( builder, 'f' ) : undefined,
			color = this.color.buildCode( builder, 'c', { slot: 'color' } );

		if ( alpha ) {

			output = [
				alpha.code,
				'#ifdef ALPHATEST',

				'if ( ' + alpha.result + ' <= ALPHATEST ) discard;',

				'#endif',
				color.code,
				"gl_FragColor = vec4( " + color.result + ", " + alpha.result + " );"
			];

		} else {

			output = [
				color.code,
				"gl_FragColor = vec4( " + color.result + ", 1.0 );"
			];

		}

		output.push(
			"#include <tonemapping_fragment>",
			"#include <encodings_fragment>",
			"#include <fog_fragment>"
		);

	}

	return output.join( "\n" );

};

SpriteNode.prototype.copy = function ( source ) {

	Node.prototype.copy.call( this, source );

	// vertex

	if ( source.position ) this.position = source.position;

	// fragment

	this.color = source.color;

	if ( source.spherical !== undefined ) this.spherical = source.spherical;

	if ( source.alpha ) this.alpha = source.alpha;

};

SpriteNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		// vertex

		if ( this.position ) data.position = this.position.toJSON( meta ).uuid;

		// fragment

		data.color = this.color.toJSON( meta ).uuid;

		if ( this.spherical === false ) data.spherical = false;

		if ( this.alpha ) data.alpha = this.alpha.toJSON( meta ).uuid;

	}

	return data;

};

export { SpriteNode }
