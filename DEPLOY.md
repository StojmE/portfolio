# Putting the portfolio on your own domain

These steps need your own accounts, so they are written for you to follow. Each takes a few minutes.

## 1. Put the code on GitHub

1. Create a free account at github.com and a new **private** repository called `portfolio`.
2. In this folder run:
   ```
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
   (The folder is already a Git repository with a first commit.)

## 2. Host it (free)

Netlify is the simplest:

1. Sign in at app.netlify.com with GitHub → **Add new site → Import an existing project** → pick `portfolio`.
2. Leave build command empty and publish directory as `/`. Click **Deploy**.
3. Every `git push` now updates the live site automatically.

(Vercel or GitHub Pages work the same way if you prefer them.)

## 3. Your own domain

1. Buy a domain (for example `emche.design` or `emilijastojmenovska.com`) from Namecheap, Porkbun or Cloudflare, about €10–30 a year.
2. In Netlify: **Domain management → Add a domain**, then follow the DNS records it shows you. HTTPS is set up automatically.

## 4. Link previews on LinkedIn and Slack

Once the domain works, open `index.html` and make two values absolute:

```html
<meta property="og:image" content="https://YOUR-DOMAIN/assets/og-image.jpg" />
```

and add:

```html
<meta property="og:url" content="https://YOUR-DOMAIN/" /> <link rel="canonical" href="https://YOUR-DOMAIN/" />
```

Check the result with LinkedIn's Post Inspector (linkedin.com/post-inspector).

## 5. Analytics (see which case studies people open)

GoatCounter is free for personal sites and doesn't need a cookie banner.

1. Sign up at goatcounter.com and choose a code, e.g. `emche`.
2. Add this line just before `</body>` in `index.html`:
   ```html
   <script
     data-goatcounter="https://emche.goatcounter.com/count"
     async
     src="https://gc.zgo.at/count.js"
   ></script>
   ```
3. Case-study links (`#widex` and so on) appear as separate entries if you also add, at the end of `js/main.js`:
   ```js
   addEventListener("hashchange", () =>
     window.goatcounter?.count({ path: location.pathname + location.hash }),
   );
   ```

Note: the claude.ai preview blocks outside scripts, so analytics only work on your own domain.
