# Birthday Love Site ❤️

A responsive birthday surprise website built with React + Vite + TypeScript and served with Nginx in Docker.

## Sections

1. Animated birthday opening
2. Hero photo + birthday message
3. Things I love about you
4. Relationship timeline
5. Polaroid photo gallery
6. “Open when...” letters
7. Couple memory matching game
8. Final birthday letter + secret heart surprise

## Start with Docker

```bash
docker compose up --build
```

Open:

```text
http://localhost:8080
```

Stop it with:

```bash
docker compose down
```

## Start without Docker

```bash
npm install
npm run dev
```

Vite normally runs at `http://localhost:5173`.

## Personalize the website

### 1. Change names, date, messages and captions

Edit:

```text
src/data.ts
```

At the top you will see:

```ts
export const siteConfig = {
  herName: 'My Love',
  yourName: 'Your Name',
  birthdayDate: 'September 9, 2026',
  heroMessage: '...',
}
```

The same file also contains:
- love reasons
- timeline memories
- photo captions
- “Open when...” letters

### 2. Replace the placeholder photos

The sample images are in:

```text
public/photos/
```

The easiest option is to replace them while keeping the same filenames:

```text
hero.svg
memory-1.svg
memory-2.svg
memory-3.svg
memory-4.svg
photo-1.svg
photo-2.svg
photo-3.svg
photo-4.svg
photo-5.svg
photo-6.svg
```

You can also use `.jpg`, `.png`, or `.webp`. If you change the extension, update the matching path in `src/data.ts` or `src/components/Hero.tsx`.

For example:

```text
public/photos/hero.jpg
```

Then change `Hero.tsx` from:

```tsx
src="/photos/hero.svg"
```

to:

```tsx
src="/photos/hero.jpg"
```

### 3. Customize the final letter

Edit:

```text
src/components/FinalLetter.tsx
```

### 4. Change the colors

Edit the variables near the top of:

```text
src/styles.css
```

## Production structure

Docker uses a multi-stage build:

```text
React/Vite -> npm run build -> Nginx -> port 80 in container -> localhost:8080
```

The included Nginx configuration supports SPA routing and static asset caching.
