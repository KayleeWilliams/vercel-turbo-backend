import { getDatabaseInfo } from '@repo/shared-db';

export interface ConfigInfo {
	service: string;
	dbProvider: string;
	packageSource: string;
}

export function getConfigInfo(): ConfigInfo {
	const db = getDatabaseInfo();

	return {
		service: 'shared-config-service',
		dbProvider: db.provider,
		packageSource: '@repo/shared-config/src/index.ts',
	};
}
