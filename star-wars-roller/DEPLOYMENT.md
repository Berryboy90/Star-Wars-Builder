# Deployment

This app is a pure static site. No build step is required.

## Recommended: Netlify

1. Create a free Netlify account.
2. Choose `Add new site` -> `Deploy manually`.
3. Drag the project folder contents, or a zip of this folder, into Netlify.
4. Netlify will publish the site immediately.

Future updates:

1. Edit files locally.
2. Re-upload the updated folder or zip to Netlify.

## Alternative: Cloudflare Pages

1. Create a Cloudflare account.
2. Create a new Pages project.
3. Upload the project as a static site.
4. Set:
   - Build command: none
   - Output directory: `.`

## Notes

- `index.html` is the site entry point.
- All assets use relative paths.
- The site is production-ready as a static host deployment.
