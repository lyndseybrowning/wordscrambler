import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const SRC_PATH = "./src";
const HTML_ENTRY = "index.html";
const entry = `${SRC_PATH}/js/index.js`;
const env = process.env.NODE_ENV;
const production = env === "production";

const config = {
    entry,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: production }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, "css-loader", {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${SRC_PATH}/${HTML_ENTRY}`,
            filename: `./${HTML_ENTRY}`
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};

if (!production) {
    config.devtool = "source-map";
}

export default config;
