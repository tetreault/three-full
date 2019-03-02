//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Object3D } from './../../core/Object3D';
import { Material } from './../../materials/Material';
// export class WireframeHelper extends LineSegments {
//   constructor(object: Object3D, hex?: number);
// }

// Extras / Objects /////////////////////////////////////////////////////////////////////

export class ImmediateRenderObject extends Object3D {
  constructor(material: Material);

  material: Material;
  render(renderCallback: Function): void;
}