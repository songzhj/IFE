/**
 * Created by songzhj on 2016/8/10.
 */
var webpack = require('webpack'),
    path = require('path'),
    rucksack = require("rucksack-css");

module.exports = {
    context: path.resolve(__dirname, "app"),
    entry: {
        jsx: "./index.jsx",
        html: "./index.html",
        vendor: [
            "react",
            "react-dom",
            "react-redux",
            "redux",
            "redux-actions",
            "react-router",
            "react-router-redux",
            "react-addons-css-transition-group",
            "recharts"
        ]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            },
            {
                test: /\.s?css$/,
                exclude: path.resolve(__dirname, "app/styles"),
                loaders: [
                    "style",
                    "css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]",
                    "sass?sourceMap",
                    "postcss"
                ]
            },
            {
                test: /\.s?css$/,
                include: path.resolve(__dirname, "app/styles"),
                loader: "style!css!sass?sourceMap"
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: [
                    "react-hot",
                    "babel"
                ]
            },
        ],
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    postcss: [
        rucksack({
            autoprefixer: true
        })
    ],
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            "process.env": {NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")}
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "app"),
        hot: true
    }
}