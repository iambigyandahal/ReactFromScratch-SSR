const path = require('path')
const nodeExternals = require('webpack-node-externals')

const clientConfig = {
	entry: './src/index.js',
	mode: 'production',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'public')
	},
	module: {
		rules: [{
			loader: 'babel-loader',
			test: /\.js$/,
			exclude: /node_modules/
		}]
	}
}

const serverConfig = {
	entry: './server/index.js',
	target: 'node',
	mode: 'production',
	output: {
		filename: 'index.js',
		path: path.join(__dirname, 'build')
	},
	module: {
		rules: [{
			loader: 'babel-loader',
			test: /\.js$/,
			exclude: /node_modules/
		}]
	},
	externals: [nodeExternals()]
}

module.exports = [serverConfig, clientConfig]