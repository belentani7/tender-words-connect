import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

test('el repositorio tiene index.html de producto', () => {
  assert.ok(existsSync(new URL('../index.html', import.meta.url)), 'index.html debe existir');
});

test('index.html contiene secciones de producto', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /<title>/);
  assert.match(html, /<nav>/);
  assert.match(html, /<footer>/);
});
