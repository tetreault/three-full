//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { LoadingManager } from './LoadingManager';

export class AudioLoader {
  constructor(manager?: LoadingManager);

  load(
    url: string,
    onLoad: Function,
    onPrgress: Function,
    onError: Function
  ): void;
}
