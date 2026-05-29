import { createQwikCity } from '@builder.io/qwik-city/middleware/node';
import express from 'express';
import { manifest } from '@qwik-client-manifest';
import render from './entry.ssr';
import qwikCityPlan from '@qwik-city-plan';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, '..', 'dist')));

const { router, notFound } = createQwikCity({ render, qwikCityPlan, manifest });
app.use(router);
app.use(notFound);

const port = parseInt(process.env['PORT'] || '3000');
app.listen(port, () => console.log(`http://localhost:${port}/`));
