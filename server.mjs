#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import open from 'open';
import Fastify from 'fastify';
import { findFileCaseInsensitively, isExistingFile } from './utils.mjs';

/* eslint-disable no-console */

if (!(await isExistingFile('index.html'))) {
  console.error('Please run mvix in the game folder.');
  process.exit(1);
}

const PWD = process.cwd();
const DEBUG_MODE = Boolean(process.env.DEBUG);
const HOST = process.env.HOST ?? '0.0.0.0';
const PORT = Number(process.env.PORT ?? 3000);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SAVE_DATA_PATH = path.join(PWD, 'mvix.json');

const server = Fastify({ logger: DEBUG_MODE });

await server.register(import('@fastify/static'), {
  root: PWD,
  index: false,
  prefix: '/static/', // FIXME: workaround to FastifyError: Method 'HEAD' already declared for route '/*'
});

server.post('/mvix/save', async(req, reply) => {
  if (req.body){
    await fs.writeFile(SAVE_DATA_PATH, req.body, 'utf8');
  }
  return reply.send();
});

server.post('/mvix/load', async(req, reply) => {
  if (!await isExistingFile(SAVE_DATA_PATH)) {
    return reply.send('null');
  }

  const data = await fs.readFile(SAVE_DATA_PATH, 'utf8');
  return reply.send(data);
});

server.get('/*', async(req, reply) => {
  const found = await findFileCaseInsensitively(path.join(PWD, req.url));
  if (found) {
    const { dir, base } = path.parse(found);

    if (base === 'main.js') {
      return reply.sendFile(base, path.join(__dirname, 'patches'));
    }

    return reply.sendFile(base, dir);
  }

  const foundIndex = await findFileCaseInsensitively(path.join(PWD, req.url, 'index.html'));
  if (foundIndex) {
    const { dir, base } = path.parse(foundIndex);
    return reply.sendFile(base, dir);
  }

  reply.status(404);
});

try {
  const url = await server.listen({ port: PORT, host: HOST });

  console.log(`Listening on ${url}`);
  open(url);

} catch (err) {
  server.log.error(err);
  process.exit(1);
}
