

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import sourceMaps from 'rollup-plugin-sourcemaps'
import ts from 'rollup-plugin-typescript2';
const packages = require('./package.json');


 
const ENV = process.env.NODE_ENV;


const extensions = [
  '.js',
  '.ts',
  '.tsx'
]


// ts
const tsPlugin = ts({
  useTsconfigDeclarationDir: true,
  tsconfig: './tsconfig.json', // 导入本地ts配置
  extensions
})

const configList = [
  {
    input: `./src/bfsdk.ts`,
    output: {
      file: `./dist/${packages.name}.js`,
      format: 'umd',
      name: 'bfsdk',
      sourcemap: false
    },
    uglify: false
  },
  {
    input: `./src/bfsdk.ts`,
    output: {
      file: `./dist/${packages.name}.min.js`,
      format: 'umd',
      name: 'bfsdk',
      sourcemap: false
    },
    uglify: true
  }
];

function RollupConfig(config) {
  return {
    input: config.input,
    output: config.output,
    plugins: [
      resolve(extensions),
      commonjs(),
      // eslint({
      //   include: ['src/**'],
      //   exclude: ['node_modules/**']
      // }),
      tsPlugin,
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true,
      }),
      replace({
        exclude: 'node_modules/**',
        ENV: JSON.stringify(process.env.NODE_ENV),
      }),
      (config.output.sourcemap && sourceMaps()),
      (config.uglify && uglify()),
    ]
  }
};

export default configList.map(config => RollupConfig(config));