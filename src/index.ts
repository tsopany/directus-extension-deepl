import {defineEndpoint} from '@directus/extensions-sdk';

import translate from './functions/translate';

// http://localhost:8065/deepl
// https://api-free.deepl.com/v2/translate
export default defineEndpoint((router: any, {database}: any): void => {
	// GET /deepl - endpoint info
	router.get('/', async (req: any, res: any): Promise<void> => {
		const userRoleID: any = req.accountability?.role;
		if (!userRoleID) return res.status(401).send('Not authenticated');

		const {rows}: any = await database.raw('SELECT id, name, description FROM directus_roles where id = ?', [userRoleID]);
		if (rows.length === 0) return res.status(401).send('Not authenticated');
		const userRole: any = rows[0];

		res.send({
			description: 'This API performs one DeepL translation request per call.',
			routes: {
				welcome: '/deepl/',
				translate: '/deepl/translate'
			},
			role: userRole.name,
			admin: 'Administrator' === userRole.name
		});
	});

	// POST /deepl/translate
	router.post('/translate', async (req: any, res: any): Promise<void> => {
		try {
			const sourceLanguage: string = req.body?.sourceLanguage || '';
			const targetLanguage: string = req.body?.targetLanguage || '';
			const text: string = req.body?.text || '';
			const deeplKey: string = process.env.DEEPL_KEY || '';
			const deeplApiUrl: string = 'https://api-free.deepl.com/v2/translate';

			const translatedText: string = await translate({
				sourceLanguage,
				targetLanguage,
				text,
				deeplKey,
				deeplApiUrl
			});
			res.send(translatedText);
		} catch (error: any) {
			res.status(500).json({
				error: 'Failed to translate',
				details: error.message
			});
		}
	});
});
