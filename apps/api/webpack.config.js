module.exports = (config, _context) => {
	const tsLoader = config.module.rules.find((r) => r.loader.includes('ts-loader'));

	if (tsLoader) {
		tsLoader.options.transpileOnly = false;
		tsLoader.options.getCustomTransformers = (program) => {
			return {
				before: [
					require('@nestjs/swagger/plugin').before(
						{
							classValidatorShim: true,
							introspectComments: true,
							dtoFileNameSuffix: ['.dto.ts', '.entity.ts', 'interface.ts'],
						},
						program,
					),
				],
			};
		};
	}

	return config;
};
