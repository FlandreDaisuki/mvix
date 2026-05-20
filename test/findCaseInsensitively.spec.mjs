import path from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, test } from 'vitest';
import { findFileCaseInsensitively, findPathCaseInsensitively } from '../utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// cSpell:ignore kaleid
describe('findPathCaseInsensitively', () => {
  const p = (s) => path.resolve(__dirname, s);

  test('exactly same path', async () => {
    expect(await findPathCaseInsensitively(p('Fate/Zero'))).toBe(p('Fate/Zero'));
    expect(await findPathCaseInsensitively(p('Fate/stay night'))).toBe(p('Fate/stay night'));
    expect(await findPathCaseInsensitively(p('Fate/kaleid liner プリズマ☆イリヤ'))).toBe(p('Fate/kaleid liner プリズマ☆イリヤ'));
    expect(await findPathCaseInsensitively(p('劇場版Fate/stay night [Heaven\'s Feel]'))).toBe(p('劇場版Fate/stay night [Heaven\'s Feel]'));
    expect(await findPathCaseInsensitively(p('劇場版Fate/stay night UNLIMITED BLADE WORKS'))).toBe(p('劇場版Fate/stay night UNLIMITED BLADE WORKS'));
  });

  test('encoded URI components', async () => {
    expect(await findPathCaseInsensitively(p('Fate/Zero'))).toBe(p('Fate/Zero'));
    expect(await findPathCaseInsensitively(p('Fate/stay%20night'))).toBe(p('Fate/stay night'));
    expect(await findPathCaseInsensitively(p('Fate/kaleid%20liner%20%E3%83%97%E3%83%AA%E3%82%BA%E3%83%9E%E2%98%86%E3%82%A4%E3%83%AA%E3%83%A4'))).toBe(p('Fate/kaleid liner プリズマ☆イリヤ'));
    expect(await findPathCaseInsensitively(p('%E5%8A%87%E5%A0%B4%E7%89%88Fate/stay%20night%20[Heaven\'s%20Feel]'))).toBe(p('劇場版Fate/stay night [Heaven\'s Feel]'));
    expect(await findPathCaseInsensitively(p('%E5%8A%87%E5%A0%B4%E7%89%88Fate/stay%20night%20UNLIMITED%20BLADE%20WORKS'))).toBe(p('劇場版Fate/stay night UNLIMITED BLADE WORKS'));
  });

  test('toUpperCase', async () => {
    const q = (s) => p(s).toUpperCase();

    expect(await findPathCaseInsensitively(q('Fate/Zero'))).toBe(p('Fate/Zero'));
    expect(await findPathCaseInsensitively(q('Fate/stay night'))).toBe(p('Fate/stay night'));
    expect(await findPathCaseInsensitively(q('Fate/kaleid liner プリズマ☆イリヤ'))).toBe(p('Fate/kaleid liner プリズマ☆イリヤ'));
    expect(await findPathCaseInsensitively(q('劇場版Fate/stay night [Heaven\'s Feel]'))).toBe(p('劇場版Fate/stay night [Heaven\'s Feel]'));
    expect(await findPathCaseInsensitively(q('劇場版Fate/stay night UNLIMITED BLADE WORKS'))).toBe(p('劇場版Fate/stay night UNLIMITED BLADE WORKS'));
  });

  test('path only', async () => {
    expect(await findPathCaseInsensitively(p('Fate'))).toBe(p('Fate'));
    expect(await findPathCaseInsensitively(p('fate'))).toBe(p('Fate'));
    expect(await findPathCaseInsensitively(p('劇場版Fate'))).toBe(p('劇場版Fate'));
    expect(await findPathCaseInsensitively(p('%E5%8A%87%E5%A0%B4%E7%89%88fate'))).toBe(p('劇場版Fate'));
  });

  test('not found', async () => {
    expect(await findPathCaseInsensitively(p('Fake'))).toBeNull();
    expect(await findPathCaseInsensitively(p('Fate/Zer0'))).toBeNull();
  });
});

describe('findFileCaseInsensitively', async () => {
  const p = (s) => path.resolve(__dirname, s);

  test('exactly same path', async () => {
    expect(await findFileCaseInsensitively(p('Fate/Zero'))).toBe(p('Fate/Zero'));
    expect(await findFileCaseInsensitively(p('Fate/stay night'))).toBe(p('Fate/stay night'));
    expect(await findFileCaseInsensitively(p('Fate/kaleid liner プリズマ☆イリヤ'))).toBe(p('Fate/kaleid liner プリズマ☆イリヤ'));
    expect(await findFileCaseInsensitively(p('劇場版Fate/stay night [Heaven\'s Feel]'))).toBe(p('劇場版Fate/stay night [Heaven\'s Feel]'));
    expect(await findFileCaseInsensitively(p('劇場版Fate/stay night UNLIMITED BLADE WORKS'))).toBe(p('劇場版Fate/stay night UNLIMITED BLADE WORKS'));
  });

  test('encoded URI components', async () => {
    expect(await findFileCaseInsensitively(p('Fate/Zero'))).toBe(p('Fate/Zero'));
    expect(await findFileCaseInsensitively(p('Fate/stay%20night'))).toBe(p('Fate/stay night'));
    expect(await findFileCaseInsensitively(p('Fate/kaleid%20liner%20%E3%83%97%E3%83%AA%E3%82%BA%E3%83%9E%E2%98%86%E3%82%A4%E3%83%AA%E3%83%A4'))).toBe(p('Fate/kaleid liner プリズマ☆イリヤ'));
    expect(await findFileCaseInsensitively(p('%E5%8A%87%E5%A0%B4%E7%89%88Fate/stay%20night%20[Heaven\'s%20Feel]'))).toBe(p('劇場版Fate/stay night [Heaven\'s Feel]'));
    expect(await findFileCaseInsensitively(p('%E5%8A%87%E5%A0%B4%E7%89%88Fate/stay%20night%20UNLIMITED%20BLADE%20WORKS'))).toBe(p('劇場版Fate/stay night UNLIMITED BLADE WORKS'));
  });

  test('toUpperCase', async () => {
    const q = (s) => p(s).toUpperCase();

    expect(await findFileCaseInsensitively(q('Fate/Zero'))).toBe(p('Fate/Zero'));
    expect(await findFileCaseInsensitively(q('Fate/stay night'))).toBe(p('Fate/stay night'));
    expect(await findFileCaseInsensitively(q('Fate/kaleid liner プリズマ☆イリヤ'))).toBe(p('Fate/kaleid liner プリズマ☆イリヤ'));
    expect(await findFileCaseInsensitively(q('劇場版Fate/stay night [Heaven\'s Feel]'))).toBe(p('劇場版Fate/stay night [Heaven\'s Feel]'));
    expect(await findFileCaseInsensitively(q('劇場版Fate/stay night UNLIMITED BLADE WORKS'))).toBe(p('劇場版Fate/stay night UNLIMITED BLADE WORKS'));
  });

  test('path only', async () => {
    expect(await findFileCaseInsensitively(p('Fate'))).toBeNull();
    expect(await findFileCaseInsensitively(p('fate'))).toBeNull();
    expect(await findFileCaseInsensitively(p('劇場版Fate'))).toBeNull();
    expect(await findFileCaseInsensitively(p('%E5%8A%87%E5%A0%B4%E7%89%88fate'))).toBeNull();
  });

  test('not found', async () => {
    expect(await findFileCaseInsensitively(p('Fake'))).toBeNull();
    expect(await findFileCaseInsensitively(p('Fate/Zer0'))).toBeNull();
  });
});
