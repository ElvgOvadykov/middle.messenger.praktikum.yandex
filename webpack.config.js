const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: {
		path: path.resolve(__dirname, "src", "index.ts"),
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "main.[contenthash:8].js",
		clean: true,
	},
	devServer: {
		static: path.resolve(__dirname, "./dist"),
		port: 3000,
		open: true,
		hot: true,
		compress: true,
		historyApiFallback: true,
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx", "json"],
		fallback: {
			fs: false,
		},
	},
	module: {
		rules: [
			{
				test: /\.hbs$/,
				use: ["handlebars-loader"],
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "",
						},
					},
					"css-loader",
					"sass-loader",
				],
			},
			{
				test: /\.ts$/,
				include: [path.resolve(__dirname, "src")],
				exclude: /node_modules/,
				use: [
					{
						loader: "ts-loader",
						options: {
							configFile: path.resolve(__dirname, "tsconfig.json"),
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./static/index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "style.[contenthash:8].css",
		}),
		new webpack.ProvidePlugin({
			process: "process/browser",
		}),
		new Dotenv(),
	],
	cache: {
		type: "filesystem",
	},
	resolve: {
		modules: ["node_modules"],
		extensions: [".ts", ".js"],
		alias: {
			"@components": path.resolve(__dirname, "./src/components/"),
			"@pages": path.resolve(__dirname, "./src/pages/"),
			"@utils": path.resolve(__dirname, "./src/utils/"),
			"@styles": path.resolve(__dirname, "./src/styles/"),
			"@icons": path.resolve(__dirname, "./static/icons/"),
			"@images": path.resolve(__dirname, "./static/image/"),
			"@router": path.resolve(__dirname, "./src/router/"),
			"@store": path.resolve(__dirname, "./src/store/"),
			"@controllers": path.resolve(__dirname, "./src/controllers/"),
		},
	},
};
