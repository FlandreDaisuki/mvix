import fs from 'fs/promises';
import path from 'path';

export const isExistingFile = async (pathLike) => {
  try {
    return (await fs.lstat(pathLike)).isFile();
  }
  catch {
    return false;
  }
};

export const isExistingDir = async (pathLike) => {
  try {
    return (await fs.lstat(pathLike)).isDirectory();
  }
  catch {
    return false;
  }
};

export const isExisting = async (pathLike) => Promise.all([
  isExistingFile(pathLike),
  isExistingDir(pathLike),
]).then((boolList) => boolList.some(Boolean));

export const findPathCaseInsensitively = async (targetPath) => {
  const np = path.resolve(decodeURIComponent(targetPath));
  const { dir, root } = path.parse(np);

  if (await isExisting(np)) { return np; }
  if (np === root) { return null; }

  const found = await findPathCaseInsensitively(dir);
  if (!found) { return null; }

  const underFoundEls = await fs.readdir(found);
  for (const el of underFoundEls) {
    const tp = path.join(found, el);
    if (np.toLowerCase() === tp.toLowerCase()) {
      return tp;
    }
  }

  return null;
};

/** @param {string} targetPath */
export const findFileCaseInsensitively = ((PATH_CACHE) => {
  return async (targetPath) => {
    if (PATH_CACHE.has(targetPath)) { return PATH_CACHE.get(targetPath); }

    const foundPath = await findPathCaseInsensitively(targetPath);
    if (!foundPath) { return null; }
    if (!await isExistingFile(foundPath)) { return null; }

    PATH_CACHE.set(targetPath, foundPath);
    return foundPath;
  };
})(new Map());
