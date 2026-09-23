# Muthuvel Lifestyle

Children’s apparel design and manufacturing site for [www.muthuvel.lifestyle](https://www.muthuvel.lifestyle). Static pages, ready for free hosting on GitHub Pages.

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| About Us | `about.html` |
| Products | `products.html` |
| Contact Us | `contact.html` |
| Privacy Policy | `privacy-policy.html` |

## Free hosting (GitHub Pages + Dynadot)

### 1. Push to GitHub

```bash
cd "/Volumes/T7 Shield/Software Projects/Muthuvel Lifestyle Website"
git init
git add .
git commit -m "Initial Muthuvel Lifestyle website"
git branch -M main
git remote add origin https://github.com/soori26-coder/muthuvel-lifestyle.git
git push -u origin main
```

Create the empty `muthuvel-lifestyle` repository on GitHub first. Do not push this site into the Kandavel repository.

### 2. Enable GitHub Pages

1. Repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / folder: **/ (root)**
4. Custom domain: `www.muthuvel.lifestyle`
5. Enable **Enforce HTTPS** after DNS settles

`CNAME` already contains `www.muthuvel.lifestyle`.

### 3. DNS at Dynadot

The domain registration is the only paid part. Hosting stays free.

| Type | Host | Value |
|------|------|-------|
| CNAME | www | `soori26-coder.github.io` |
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |

### 4. Contact form

The form opens an email to `suresh@muthuvel.lifestyle` until Formspree is connected.

1. Create a form at [formspree.io](https://formspree.io)
2. Put the form ID in `js/config.js` as `formspreeFormId`
3. Restrict the form to `www.muthuvel.lifestyle`

## Local preview

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080
