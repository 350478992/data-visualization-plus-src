import delPath from '../utils/delpath';
import { series, parallel, src, dest } from 'gulp';
import { pkgPath, componentPath, componentName } from '../utils/paths';
import less from 'gulp-less';
// import sass from 'gulp-sass';
const sass = require('gulp-sass')(require('sass'));
import autoprefixer from 'gulp-autoprefixer';
import run from '../utils/run';
//删除dist

export const removeDist = () => {
  console.log(`##########删除旧组件库中的相关文件，路径为：${pkgPath}/${componentName}，保留package.json##############`)
  return delPath(`${pkgPath}/${componentName}`);
};

//打包样式
export const buildLessStyle = () => {
  return src(`${componentPath}/src/**/style/**.less`)
      .pipe(less())
      .pipe(autoprefixer())
      .pipe(dest(`${pkgPath}/${componentName}/lib/src`))
      .pipe(dest(`${pkgPath}/${componentName}/es/src`));
};
//打包样式
export const buildSassStyle = () => {
  return src(`${componentPath}/src/**/style/**.scss`)
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(dest(`${pkgPath}/${componentName}/lib/src`))
      .pipe(dest(`${pkgPath}/${componentName}/es/src`));
};

//打包组件
export const buildComponent = async () => {
  run('pnpm run build', componentPath);
};
export default series(
  async () => removeDist(),
  parallel(
    async () => buildLessStyle(),
    async () => buildSassStyle(),
    async () => buildComponent()
  )
);
