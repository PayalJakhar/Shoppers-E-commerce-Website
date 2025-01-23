// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     hmr: {
//       overlay: false, // Disable the error overlay in the browser
//     },
//   },
// })

import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    middlewareMode: true,
  },
  plugins: [
    {
      name: 'debug-malformed-uri',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          try {
            decodeURI(req.url); // Attempt to decode the URI
          } catch (err) {
            console.error('Malformed URI:', req.url); // Log the issue
            res.statusCode = 400;
            res.end('Malformed URI detected');
            return;
          }
          next();
        });
      },
    },
  ],
});
