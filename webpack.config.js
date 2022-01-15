const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { default: MiniCssExtractPlugin } = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) =>
	isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: './js/main.js',
	output: {
		filename: `js/${filename('js')}`,
		path: path.resolve(__dirname, 'app'),
		clean: true,
	},
	devServer: {
		historyApiFallback: true,
		static: {
			directory: path.resolve(__dirname, 'app'),
		},
		open: true,
		compress: true,
		hot: true,
		port: 3000,
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			filename: 'index.html',
			minify: {
				collapseWhitespace: isProd,
			},
		}),
		new MiniCssExtractPlugin({
			filename: `css/${filename('css')}`,
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/assets'),
					to: path.resolve(__dirname, 'app/assets'),
				},
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.html$/,
				loader: 'html-loader',
			},
			{
				test: /\.css$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: isDev,
						},
					},
					'css-loader',
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				type: 'asset/resource',
				generator: {
					filename: () => {
						return isDev
							? 'img/[name][ext]'
							: 'img/[name].[contenthash][ext]';
					},
				},
			},
		],
	},
};
