// eslint-disable-next-line import/no-extraneous-dependencies
import * as fs from 'fs';
import { join } from 'path';
import { getLists } from './common';

const fromDirname = (...p) => join(__dirname, ...p);
const fromDist = (...p) => join(__dirname, '../dist', ...p);

const lists = getLists();

const [parser, detector, special] = lists;

// Generate index.d.ts
const typesTemplate = fs.readFileSync(fromDirname('../index.d.tmpl'), 'utf-8');
fs.writeFileSync(
  fromDist('index.d.ts'),
  typesTemplate.replace(
    '«Components»',
    [
      [parser, 'parser', 'Parser'],
      [detector, 'detector', 'Detector'],
      [special, 'special', 'Parser'],
    ]
      .flatMap(
        ([items, itemName, itemType]) => `
  const ${itemName}: {
${items.map((item) => `    '${item}': ${itemType}`).join('\n')};
  };
`,
      )
      .join('\n'),
  ),
  'utf-8',
);

// Writing components.json
fs.writeFileSync(
  fromDist('component.json'),
  JSON.stringify(
    {
      parser,
      detector,
      special,
    },
    null,
    2,
  ),
  'utf-8',
);
