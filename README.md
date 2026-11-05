# WeGolden — Online Brochure

A single-page, long-form HTML brochure for [wegolden.com](https://www.wegolden.com), built in the Black / Gold / White brand theme.

No framework, no build step, no dependencies. Plain HTML, CSS and JavaScript.

---

## Contents

```
.
├── index.html      # the entire brochure (14 sections)
├── styles.css      # design system + responsive + print styles
├── script.js       # sticky header, mobile menu, scroll reveal, counters
├── assets/         # logos, product icons and section imagery
├── render.yaml     # Render static-site blueprint
└── .gitignore
```

---

## Run locally

Because everything is static, any web server works. From the project root:

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

> Opening `index.html` directly via `file://` will work for layout, but a local
> server is recommended so relative asset paths and anchor scrolling behave
> exactly as they do in production.

---

## Deploy to Render

### Option A — Blueprint (recommended, uses `render.yaml`)

1. Push this folder to a GitHub repository (see below).
2. In the Render dashboard, click **New → Blueprint**.
3. Connect the repository. Render reads `render.yaml` automatically.
4. Click **Apply**. The site deploys with no build command.

### Option B — Manual static site

1. In the Render dashboard, click **New → Static Site**.
2. Connect your GitHub repository and branch (`main`).
3. Fill in the settings:

   | Setting | Value |
   | --- | --- |
   | **Name** | `wegolden-brochure` |
   | **Branch** | `main` |
   | **Root Directory** | *(leave blank)* |
   | **Build Command** | *(leave blank)* |
   | **Publish Directory** | `.` |

4. Click **Create Static Site**.

Render serves `index.html` at the root automatically. Every push to `main`
triggers a new deploy.

> **Important:** the Publish Directory must be `.` because `index.html` sits at
> the repository root. If you ever move the files into a subfolder such as
> `public/`, change this setting to match.

---

## Push to GitHub

If the repository does not exist yet, create an empty one on GitHub first
(**no** README, **no** .gitignore — this project already has one), then:

```bash
cd path/to/this/folder

git init
git add .
git commit -m "WeGolden online brochure — Black/Gold/White"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Replace `<your-username>` and `<your-repo>` with your own values.

If you use SSH instead of HTTPS:

```bash
git remote add origin git@github.com:<your-username>/<your-repo>.git
```

---

## Custom domain

In Render: **your service → Settings → Custom Domains → Add Custom Domain**.

Add the domain Render gives you as a `CNAME` record at your DNS provider, then
wait for the certificate to be issued. Render provisions TLS automatically.

---

## Editing the brochure

**Colours** live in the `:root` block at the top of `styles.css`:

```css
--ink:       #0e0e0e;  /* dark sections        */
--ink-deep:  #000000;  /* deepest backgrounds  */
--gold:      #cf9b21;  /* primary accent       */
--gold-3:    #e7d1a4;  /* light gold on dark   */
--gold-ink:  #9a6f0e;  /* gold text on white   */
--cream:     #ffffff;  /* page surface         */
--cream-2:   #faf8f2;  /* alternate surface    */
```

Change a token once and it updates everywhere.

**Sign-up links** point to `https://my.wegolden.com/en/auth/sign-up` and appear in
the header, hero, promotions, contact card and the floating button. Search for
that URL in `index.html` to update them all.

**Chapter index** is the `.contents` section in `index.html`. Each tile is an
anchor link (`#about`, `#why`, …) that matches a section `id`.

---

## Notes on accuracy

All figures, licence numbers and product details in the brochure are taken from
WeGolden's official website: FSCA FSP 53890 / Reg. 2022/892357/07, FinCEN MSB
31000318885103, MISA BFX2024121 / Co. Reg. HT00524061, 1:1000 leverage,
90+ instruments, $5,000 cash bonus, and the supported payment channels shown in
the site's own payment graphic. Update the content if these change.

---

## Licence

Marketing material for WeGolden. All trademarks and imagery belong to their
respective owners.
