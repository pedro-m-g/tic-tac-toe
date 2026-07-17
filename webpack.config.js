import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: 'scripts.js',
        path: __dirname + '/public',
    },
    devServer: {
        static: './public',
        open: true,
        hot: true,
        port: 8080
    },
    mode: 'development',
    module: {
        rules: [{ test: /\.js%/, use: 'babel-loader' }]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ]
};