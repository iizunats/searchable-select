// rollup.config.js
import typescript from 'rollup-plugin-typescript';
import {uglify} from "rollup-plugin-uglify";
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';


export default {
    input: './src/main.ts',
    output: {
        format: 'umd',
        file: 'bundle.js',
    },
    plugins: [
        commonjs(),
        nodeResolve(),
        typescript(),
        uglify()
    ]
}
