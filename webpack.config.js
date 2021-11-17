const path = require('path')
const nodeExternals = require('webpack-node-externals')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const clientConfig = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'public')
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', ['@babel/preset-react', {runtime: 'automatic'}]],
						plugins: ['@babel/plugin-transform-runtime']
					}
				}
			},
			{
				test: /\.s?css$/,
				exclude: /node_modules/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: 'body',
			minify: true,
			publicPath: '/static',
			template: path.resolve(__dirname, 'src/index.html')
		}),
		new MiniCssExtractPlugin()
	]
}

const serverConfig = {
	entry: './server/index.js',
	target: 'node',
	output: {
		filename: 'server.js',
		path: path.join(__dirname, 'server')
	},
	module: {
		rules: [{
			loader: 'babel-loader',
			test: /\.jsx?$/,
			exclude: /node_modules/
		}]
	},
	externals: [nodeExternals()]
}

module.exports = [serverConfig, clientConfig]