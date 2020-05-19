module.exports = {
	presets: [
		[
			"@babel/preset-env",
			{
				useBuiltIns: "entry",
				corejs: 3,
				debug: false,
				targets: {
					ie: 11
				}
			}
		]
	],
	plugins: [
		
	]
};
