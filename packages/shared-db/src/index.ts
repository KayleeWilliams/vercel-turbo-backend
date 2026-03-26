export interface DatabaseInfo {
	provider: string;
	source: string;
}

export function getDatabaseInfo(): DatabaseInfo {
	return {
		provider: 'mock-postgres',
		source: '@repo/shared-db/src/index.ts',
	};
}
