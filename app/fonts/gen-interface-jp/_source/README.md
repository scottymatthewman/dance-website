# Font sources (gitignored)

Full Gen Interface JP TTF files live here for local regeneration only.
The site ships subsetted WOFF2 files in the parent directory.

To regenerate after copy changes:

```bash
npm run subset-fonts
```

If sources are missing, restore the `.ttf` files from git history into this folder.
