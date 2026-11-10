# lysbth.com

Personal site of lysbth, graphic designer in Rotterdam. For now it is a "coming soon" postcard: an opening animation of the L/Z mark, then a card you can flip over for contact details. The full portfolio will be built on top of this.

Built with [Astro](https://astro.build), hosted on [Vercel](https://vercel.com).

## Working on it

```sh
npm install      # once
npm run dev      # local preview on http://localhost:4321
npm run build    # production build in dist/
```

Every push to `main` deploys to Vercel automatically.

## Structure

```
public/            static files served as-is (favicon, robots.txt)
src/
  pages/           one file per page; index.astro is the home page
  layouts/         the <head> and page shell
  components/      Loader (opening animation), Postcard, Mark (the L/Z logo)
  lib/mark.ts      the L/Z logo path, shared by all components
  styles/          global.css with the colour and type tokens
```

Changing the text on the card: edit the props in `src/pages/index.astro`.
Changing colours: edit the tokens at the top of `src/styles/global.css`.
