interface TranslateInput {
	sourceLanguage: string;
	targetLanguage: string;
	text: string;
	deeplKey: string;
	deeplApiUrl?: string;
}

const translate = async ({sourceLanguage, targetLanguage, text, deeplKey, deeplApiUrl}: TranslateInput): Promise<string> => {
	const endpoint: string = deeplApiUrl || 'https://api-free.deepl.com/v2/translate';
	const normalizedText: string = text?.trim() || '';
	const normalizedSourceLanguage: string = (sourceLanguage || '').trim().toUpperCase();
	const normalizedTargetLanguage: string = (targetLanguage || '').trim().toUpperCase();

	if (!normalizedText) throw new Error('text is required');
	if (!normalizedSourceLanguage) throw new Error('sourceLanguage is required');
	if (!normalizedTargetLanguage) throw new Error('targetLanguage is required');
	if (!deeplKey?.trim()) throw new Error('DEEPL_KEY is missing');
	const body: URLSearchParams = new URLSearchParams();
	body.set('text', normalizedText);
	body.set('source_lang', normalizedSourceLanguage);
	body.set('target_lang', normalizedTargetLanguage);

	const response: Response = await fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `DeepL-Auth-Key ${deeplKey}`
		},
		body: body.toString()
	});

	if (!response.ok) {
		const details = await response.text();
		throw new Error(`DeepL failed (${response.status}): ${details}`);
	}

	const payload: any = await response.json();
	const translatedText: string | undefined = payload?.translations?.[0]?.text;
	if (!translatedText) throw new Error('DeepL returned empty translation');
	return translatedText;
};

export default translate;
