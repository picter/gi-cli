import { readFile } from 'fs';
import { join } from 'path';

export const getRemoteUrl = (): Promise<string> =>
  new Promise((resolve, reject) =>
    readFile(
      join(process.cwd(), 'package.json'),
      { encoding: 'utf-8' },
      (err, data) => {
        if (err) {
          return reject(err);
        }
        const json = JSON.parse(data);
        if (!json.hasOwnProperty('repository')) {
          return reject('Repository remote url not defined in package.json.');
        }
        if (typeof json.repository === 'object') {
          return resolve(json.repository.url);
        }
        return resolve(json.repository);
      },
    ),
  );
