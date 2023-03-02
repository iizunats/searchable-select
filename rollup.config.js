// rollup.config.js
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';


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
	],
}
