const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const base = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'json'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[path][name]__[local]'
                            },
                        }
                    },
                    { loader: 'less-loader' },
                ]
            }
        ]
    },
    optimization: {
        // 开启代码压缩
        minimize: true,
    }
};

let temConfig = {};

function config(mode) {
    return {
        ...base,
        entry: mode === 'development' ? path.join(__dirname, 'example/src/index.tsx') : './src/index.ts',
        output: {
            filename: mode === 'development' ? 'bundle.js' : 'index.js',
            path: mode === 'development' ? path.join(__dirname, 'example/build') : path.resolve(__dirname, 'build'),
            library: 'superid-components-test',
            libraryTarget: 'umd',
        },
        // external 从外部获取扩展依赖包
        externals: mode === 'development' ? {} : {
            'react': 'react',
            'react-dom': 'react-dom'
        },
        devtool: mode === 'development' ? 'cheap-module-source-map' : 'none',
        plugins: [
            mode === 'development' ? new HtmlWebpackPlugin({
                template: path.join(__dirname, './example/src/index.html'),
                filename: 'index.html',
            }) : new CleanWebpackPlugin()
        ]
    }
};

if (process.env.NODE_ENV === 'production') {
    temConfig = config('production');
} else {
    temConfig = config('development');
}

module.exports = temConfig;