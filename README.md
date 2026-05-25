# directus-extension-deepl

Directus endpoint extension that proxies translation requests to the [DeepL API](https://www.deepl.com/docs-api).

## Requirements

- Directus `^11.15.0`
- Environment variable `DEEPL_KEY` (DeepL API auth key)

## Install

**Local extension folder** (route `/deepl/`):

```bash
git clone https://github.com/tsopany/directus-extension-deepl.git extensions/deepl
cd extensions/deepl
pnpm i
pnpm build
```

**From GitHub** (package name `deepl`; install into Directus `extensions/deepl` or link per your setup):

```bash
pnpm add github:tsopany/directus-extension-deepl
```

Restart Directus after install.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/deepl/` | API info (authenticated) |
| POST | `/deepl/translate` | Translate text via DeepL |

**POST `/deepl/translate` body:**

```json
{
	"sourceLanguage": "EN",
	"targetLanguage": "SR",
	"text": "Hello"
}
```

Uses `https://api-free.deepl.com/v2/translate` by default.

## Development

```bash
pnpm i
pnpm dev
pnpm build
pnpm validate
```

## License

Unlicense — see [LICENSE](LICENSE).
