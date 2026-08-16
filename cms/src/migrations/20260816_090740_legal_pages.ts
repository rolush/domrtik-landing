import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`legal_pages\` (
	\`id\` integer PRIMARY KEY NOT NULL,
	\`privacy_title\` text DEFAULT 'Политика конфиденциальности' NOT NULL,
	\`privacy_content\` text NOT NULL,
	\`privacy_h_t_m_l\` text,
	\`consent_title\` text DEFAULT 'Согласие субъекта на обработку персональных данных' NOT NULL,
	\`consent_content\` text NOT NULL,
	\`consent_h_t_m_l\` text,
	\`updated_at\` text,
	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`legal_pages\`;`)
}
