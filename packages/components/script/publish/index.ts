import run from '../utils/run';
import {componentName, pkgPath} from '../utils/paths';
import { series } from 'gulp';
export const publishComponent = async () => {
  run('release-it', `${pkgPath}/${componentName}`);
};
export default series(async () => publishComponent());
