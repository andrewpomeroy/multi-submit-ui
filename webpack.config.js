const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "development",
	devtool: "inline-source-map",
	entry: {
		main: "./src/index.js"
	},
	// output: {
	//   path: path.join(__dirname, "../build"),
	//   filename: "[name].bundle.js"
	// },
	optimization: {
		splitChunks: {
			chunks: "all"
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader" // transpiling our JavaScript files using Babel and webpack
				}
			},
			// {
			// 	test: /\.(sa|sc|c)ss$/,
			// 	use: [
			// 		"style-loader", // creates style nodes from JS strings
			// 		"css-loader", // translates CSS into CommonJS
			// 		// "postcss-loader", // Loader for webpack to process CSS with PostCSS
			// 		"sass-loader" // compiles Sass to CSS, using Node Sass by default
			// 	]
			// },
			{
				test: /\.scss$/,
				use: [
					{
						"loader": MiniCssExtractPlugin.loader
					},
					{
						"loader": "css-loader",
						options: {
							"sourceMap": true
						}
					},
					{
						loader: "resolve-url-loader",
						options: {
							engine: "postcss",
							sourceMap: true
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.(svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "svg-inline-loader"
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				use: [
					{
						loader: "file-loader", // This will resolves import/require() on a file into a url and emits the file into the output directory.
						options: {
							name: "[name].[ext]",
							outputPath: "assets/"
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: Infinity
						}
					}
				]
			},
			{
				test: /\.html$/,
				use: {
					loader: "html-loader",
					options: {
						interpolate: true,
						// attrs: ["img:src", ":data-src"],
						// minimize: true
					}
				}
			}
		]
	},
	plugins: [
		// CleanWebpackPlugin will do some clean up/remove folder before build
		// In this case, this plugin will remove 'dist' and 'build' folder before re-build again
		new CleanWebpackPlugin(),
		// The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
		new HtmlWebpackPlugin({
			hash: true,
			template: "./index.html", // Load a custom template (ejs by default see the FAQ for details)
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css"
		}),
	],
	devServer: {
		// contentBase: path.join(__dirname, 'dist'),
		// compress: true,
		// port: 9000
		historyApiFallback: true,
	}
};
