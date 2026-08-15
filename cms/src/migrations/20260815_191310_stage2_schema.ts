import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`leads\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`phone\` text NOT NULL,
  	\`source\` text NOT NULL,
  	\`status\` text DEFAULT 'new' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`leads_updated_at_idx\` ON \`leads\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`leads_created_at_idx\` ON \`leads\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`leads_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`leads_id\`) REFERENCES \`leads\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_leads_id_idx\` ON \`payload_locked_documents_rels\` (\`leads_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_schedule\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`days\` text NOT NULL,
  	\`time\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_schedule_order_idx\` ON \`site_settings_schedule\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_schedule_parent_id_idx\` ON \`site_settings_schedule\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`email\` text DEFAULT 'manager@domtrik.ru' NOT NULL,
  	\`phone_primary\` text DEFAULT '8 800 550 95 35' NOT NULL,
  	\`phone_secondary\` text DEFAULT '8 920 368 50 50' NOT NULL,
  	\`address\` text DEFAULT 'г. Иваново, ул.Шестернина д.9',
  	\`max_url\` text DEFAULT 'https://web.max.ru/',
  	\`vk_url\` text DEFAULT 'https://vk.ru/domtrik1',
  	\`ok_url\` text DEFAULT 'https://ok.ru/domtrikdo',
  	\`rutube_url\` text DEFAULT 'https://rutube.ru/channel/42081373/',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`home_page_hero_badges\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_hero_badges_order_idx\` ON \`home_page_hero_badges\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_hero_badges_parent_id_idx\` ON \`home_page_hero_badges\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_categories_order_idx\` ON \`home_page_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_categories_parent_id_idx\` ON \`home_page_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_categories_image_idx\` ON \`home_page_categories\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_hits\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`price\` numeric NOT NULL,
  	\`color\` text,
  	\`badge\` text DEFAULT 'Хит продаж',
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_hits_order_idx\` ON \`home_page_hits\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_hits_parent_id_idx\` ON \`home_page_hits\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_hits_image_idx\` ON \`home_page_hits\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_benefits\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`chip\` text NOT NULL,
  	\`prefix\` text,
  	\`value\` text NOT NULL,
  	\`suffix\` text,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_benefits_order_idx\` ON \`home_page_benefits\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_benefits_parent_id_idx\` ON \`home_page_benefits\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_reasons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_reasons_order_idx\` ON \`home_page_reasons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_reasons_parent_id_idx\` ON \`home_page_reasons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_faq_order_idx\` ON \`home_page_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_faq_parent_id_idx\` ON \`home_page_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_certificates\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_certificates_order_idx\` ON \`home_page_certificates\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_certificates_parent_id_idx\` ON \`home_page_certificates\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_certificates_image_idx\` ON \`home_page_certificates\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_accent_first\` text DEFAULT 'одежда,',
  	\`hero_light_first\` text DEFAULT 'которая',
  	\`hero_accent_second\` text DEFAULT 'точно понравится',
  	\`hero_light_third\` text DEFAULT 'вашим покупателям!',
  	\`hero_subtitle\` text DEFAULT 'Домашний трикотаж оптом от производителя',
  	\`hero_button_label\` text DEFAULT 'Стать партнером',
  	\`hero_side_button_label\` text DEFAULT 'Получить оптовый прайс',
  	\`hero_image_id\` integer,
  	\`reasons_call_to_action_text\` text DEFAULT 'Получите оптовые условия и каталог моделей',
  	\`reasons_call_to_action_button_label\` text DEFAULT 'Стать партнером',
  	\`assortment_call_to_action_title_start\` text DEFAULT 'Подберем',
  	\`assortment_call_to_action_title_accent\` text DEFAULT 'востребованный',
  	\`assortment_call_to_action_title_end\` text DEFAULT 'ассортимент в вашем регионе',
  	\`assortment_call_to_action_note\` text DEFAULT 'У нас есть статистика продаж по всем регионам',
  	\`assortment_call_to_action_button_label\` text DEFAULT 'Подобрать ассортимент',
  	\`assortment_call_to_action_image_id\` integer,
  	\`about_title\` text DEFAULT 'О компании',
  	\`about_text\` text DEFAULT 'Швейное предприятие «ДомТрик» основано в 2006 году в Иваново — текстильной столице России. Мы специализируемся на производстве качественной одежды для дома, офиса, сна и отдыха. В каталоге представлено более 700 моделей и ассортимент регулярно пополняется трендовыми новинками.
  Располагаем собственным производством, оснащенным передовым техническим оборудованием. Наша команда дизайнеров, технологов и конструкторов контролирует каждый этап создания одежды. Вся продукция сертифицирована. Мы гарантируем высокое качество швов и посадки в соответствии с российскими размерной сеткой.
  Компания регулярно обновляет коллекции и сотрудничает с оптовыми покупателями по всей стране.',
  	\`about_experience_value\` text DEFAULT '20+',
  	\`about_experience_label\` text DEFAULT 'Лет опыта',
  	\`about_models_value\` text DEFAULT '700+',
  	\`about_models_label\` text DEFAULT 'Моделей в ассортименте',
  	\`about_poster_id\` integer,
  	\`about_video_webm_id\` integer,
  	\`about_video_mp4_id\` integer,
  	\`delivery_start\` text DEFAULT 'Первая',
  	\`delivery_strong\` text DEFAULT 'доставка в подарок',
  	\`delivery_middle\` text DEFAULT 'при заказе от',
  	\`delivery_amount\` text DEFAULT '70 000',
  	\`delivery_terms\` text DEFAULT 'В любой регион в течение 3-х дней с момента заказа',
  	\`delivery_button_label\` text DEFAULT 'Рассчитать заказ',
  	\`geography_accent\` text DEFAULT 'География',
  	\`geography_title\` text DEFAULT 'поставок',
  	\`geography_note\` text DEFAULT 'Работаем с розничными магазинами и оптовыми покупателями по всей России',
  	\`geography_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`assortment_call_to_action_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_video_webm_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_video_mp4_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`geography_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_hero_hero_image_idx\` ON \`home_page\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_assortment_call_to_action_assortment_call_to_a_idx\` ON \`home_page\` (\`assortment_call_to_action_image_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_about_about_poster_idx\` ON \`home_page\` (\`about_poster_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_about_about_video_webm_idx\` ON \`home_page\` (\`about_video_webm_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_about_about_video_mp4_idx\` ON \`home_page\` (\`about_video_mp4_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_geography_geography_image_idx\` ON \`home_page\` (\`geography_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`leads\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`site_settings_schedule\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`home_page_hero_badges\`;`)
  await db.run(sql`DROP TABLE \`home_page_categories\`;`)
  await db.run(sql`DROP TABLE \`home_page_hits\`;`)
  await db.run(sql`DROP TABLE \`home_page_benefits\`;`)
  await db.run(sql`DROP TABLE \`home_page_reasons\`;`)
  await db.run(sql`DROP TABLE \`home_page_faq\`;`)
  await db.run(sql`DROP TABLE \`home_page_certificates\`;`)
  await db.run(sql`DROP TABLE \`home_page\`;`)
}
