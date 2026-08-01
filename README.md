# Stacey Vincent Professional Portfolio — Version 2

A responsive, editorial-style portfolio for GitHub Pages.

## Brand system

- Headings: Playfair Display
- Body: Glacial Indifference, with Montserrat as the fallback
- Blue Noir: `#011627`
- Hawthorne Green: `#283038`
- Royal Scepter: `#795663`
- Thistle: `#9AA99B`
- Dusky Rose: `#D9BCAF`
- Ivory: `#FAF8F3`

## Important font note

The CSS references Glacial Indifference, but no font file is distributed with this project. Add your properly licensed `.woff2` files under `assets/fonts/` and define them in `styles.css`. Until then, Montserrat displays as the fallback.

## Password protection

The portfolio gate accepts the password selected in the notebook. The password itself is not written into the site; only its SHA-256 hash is used.

GitHub Pages is static hosting, so this is a deterrent rather than true server-side security. Do not place confidential, proprietary or legally restricted files in a public GitHub repository. Use redacted samples or a genuinely private document service for sensitive work.

## Updating the site

### Replace text
Edit `index.html`, commit the change and push it to the `main` branch.

### Replace the headshot
Overwrite `assets/stacey-vincent.jpg` using the same filename.

### Add work samples
1. Add redacted PDFs or images to `assets/work/`.
2. Add the relevant link to the corresponding gallery entry in `script.js` or regenerate the site through the notebook.
3. Commit and push.

Example link:

```html
<a href="assets/work/sample.pdf" target="_blank" rel="noopener">View sample</a>
```

### Update portfolio categories
Edit the `PORTFOLIO_DATA` variable in the Colab notebook and rerun the generation cells.

### Republish
Once GitHub Pages is enabled, every push to the selected publishing branch triggers an automatic rebuild. Changes usually appear within a few minutes.

## GitHub Pages setup

1. Create a GitHub repository.
2. Upload the contents of the generated ZIP to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select `main` and `/root`.
6. Save and wait for the published URL.
