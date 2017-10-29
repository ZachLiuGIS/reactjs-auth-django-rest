const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PROD = process.env.NODE_ENV === 'production';
const DEV = !PROD;
const DevToolPlugin = PROD
    ? webpack.SourceMapDevToolPlugin
    : webpack.EvalSourceMapDevToolPlugin;

const config = {
    entry: ["./src/index"],
    output: {
        filename: DEV ? "bundle.js" : "bundle.[hash].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader'
                    }]
                }),
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 20000
                        }
                    },
                    "image-webpack-loader"
                ]
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: DEV ? 'styles.css' : 'styles.[contenthash:6].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
            filename: 'index.html'
        }),
        new DevToolPlugin({
            filename: "[file].map"
        })
    ], devServer: {
        historyApiFallback: true,
    }
};

!PROD && (config.devtool = 'source-map');

PROD && config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compressor: {
            warnings: false,
        }
    })
);

PROD && config.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    })
);

module.exports = config;