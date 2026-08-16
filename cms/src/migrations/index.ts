import * as migration_20260815_191310_stage2_schema from './20260815_191310_stage2_schema';
import * as migration_20260816_090740_legal_pages from './20260816_090740_legal_pages';

export const migrations = [
  {
    up: migration_20260815_191310_stage2_schema.up,
    down: migration_20260815_191310_stage2_schema.down,
    name: '20260815_191310_stage2_schema',
  },
  {
    up: migration_20260816_090740_legal_pages.up,
    down: migration_20260816_090740_legal_pages.down,
    name: '20260816_090740_legal_pages'
  },
];
