import { getConfigInfo } from '@repo/shared-config';

export async function GET() {
	return Response.json({
		...getConfigInfo(),
		runtime: 'next-backend-app',
	});
}
