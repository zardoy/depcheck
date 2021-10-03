// Generate index file for every component

import fs from 'fs';
import { join } from 'path';
import { components, getLists } from './common';

const lists = getLists();

components.forEach((component, index) => {
  // something like this also does `create-index` package
  const list = lists[index];
  const code = list
    .map(
      (itemName) => `export { default as "${itemName}" } from './${itemName}';`,
    )
    .join('\n');
  fs.writeFileSync(
    join(__dirname, '../src', component, 'index.js'),
    code,
    'utf-8',
  );
});
