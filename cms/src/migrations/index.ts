import * as migration_20260815_191310_stage2_schema from './20260815_191310_stage2_schema';

export const migrations = [
  {
    up: migration_20260815_191310_stage2_schema.up,
    down: migration_20260815_191310_stage2_schema.down,
    name: '20260815_191310_stage2_schema'
  },
];
