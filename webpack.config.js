const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        src: './client/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.bundle.js',
        publicPath: '/',
    },
    mode : "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-flow', // Add this line for Flowtype
                        ],
                    },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './client/index.html'
        }),
    ],
    devServer: {
        static: {
            publicPath: '/',
            directory: path.join(__dirname, '/dist')
        },
        proxy: {
            '/': 'http://localhost:3000',
        },
        port: 8080,
        historyApiFallback: true
    },
    devtool: 'source-map'
};
