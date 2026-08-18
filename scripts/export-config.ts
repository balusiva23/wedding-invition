import fs from 'fs';
import path from 'path';
import { defaultWeddingConfig, initialGuestWishes, initialRSVPRecords } from '../src/data/defaultWeddingConfig';

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const data = {
  version: '1.0',
  exportedAt: new Date().toISOString(),
  config: defaultWeddingConfig,
  wishes: initialGuestWishes,
  rsvps: initialRSVPRecords
};

const targetPath = path.resolve(publicDir, 'wedding-config.json');
fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf-8');
console.log('Successfully written wedding-config.json to:', targetPath);
