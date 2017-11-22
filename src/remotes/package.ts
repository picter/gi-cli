import { readFile } from 'fs';
import { join } from 'path';

export const getRemoteUrl = () =>
  new Promise((resolve, reject) =>
    readFile(
      join(process.cwd(), 'package.json'),
      { encoding: 'utf-8' },
      (err, data) => {
        if (err) {
          return reject(err);
        }
        const json = JSON.parse(data);
        if (json && json.repository && json.repository.url) {
          return resolve(json.repository.url);
        }
        return reject('Remote url not defined in package.json.');
      },
    ),
  );
