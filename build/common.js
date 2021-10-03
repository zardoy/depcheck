import fs from 'fs';
import { join, basename } from 'path';

export const components = ['parser', 'detector', 'special'];

export const getLists = () => {
  return components.map((name) =>
    fs
      .readdirSync(join(__dirname, '../src', name))
      .map((item) => basename(item, '.js')),
  );
};
