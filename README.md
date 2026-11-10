# lysbth.com

Personal site of lysbth, graphic designer in Rotterdam. For now it is a "coming soon" postcard: an opening animation of the L/Z mark, then a card you can flip over for contact details. The full portfolio will be built on top of this.

Built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com) and [Motion](https://motion.dev), hosted on [Vercel](https://vercel.com) with Vercel Web Analytics.

## Working on it

```sh
npm install      # once
npm run dev      # local preview on http://localhost:3000
npm run build    # production build
```

Every push to `main` deploys to Vercel automatically. Other branches get a preview URL.
You can also edit the site in [v0](https://v0.app) by importing this repository.

## Structure

```
app/
  layout.tsx       <head> (title, description, fonts), analytics
  page.tsx         the home page — the text on the card lives here
  globals.css      Tailwind + colour and font tokens
  icon.svg         favicon (the L/Z mark)
components/
  home.tsx         loader + postcard together
  loader.tsx       opening animation (canvas + SVG, drawn frame by frame)
  postcard.tsx     the flipping card (Motion)
  mark.tsx         the L/Z logo
lib/mark.ts        the L/Z logo path, shared by all components
public/            static files served as-is (robots.txt)
```

Changing the text on the card: edit `app/page.tsx`.
Changing colours: edit the tokens in `@theme` at the top of `app/globals.css` (`brick` is the front, `cobalt` the back).
