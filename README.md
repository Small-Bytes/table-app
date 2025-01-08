# Development

Start the development server with HMR:

```bash
npm run dev
```

## Production

When you are ready to build a production version of your app, `npm run build` will generate your assets and an `index.html` for the SPA.

```shellscript
npm run build
```

### Preview

You can preview the build locally with [vite preview](https://vitejs.dev/guide/cli#vite-preview) to serve all routes via the single `index.html` file:

```shellscript
npm run preview
```

> [!IMPORTANT]
>
> `vite preview` is not designed for use as a production server

### Deployment

Using [flyctl](https://fly.io/docs/getting-started/launch/):

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
