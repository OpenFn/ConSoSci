CREATE TABLE public.kobo_forms (
	form_name varchar(100) NULL,
	date_created date NULL,
	date_modified date NULL,
	form_owner varchar(100) NULL,
	languages varchar(100) NULL,
	form_id varchar(100) NULL,
	form_group varchar(100) NULL,
	table_id varchar(100) NULL,
	CONSTRAINT kobo_forms_form_id_key UNIQUE (form_id)
);
CREATE TABLE public.kobo_questions (
	question_id varchar(100) NULL,
	form_id varchar(100) NULL,
	analytics_label text NULL,
	question_name text NULL,
	label_en text NULL,
	label_fr text NULL,
	question_type varchar(100) NULL,
	select_from_list_name varchar(100) NULL,
	question_constraint varchar(100) NULL,
	CONSTRAINT kobo_questions_question_id_key UNIQUE (question_id)
);
CREATE TABLE public.kobo_choices (
	list_id varchar(100) NULL,
	list_name varchar(100) NULL,
	choice_name varchar(100) NULL,
	choice_label text NULL,
	formuid varchar(100) NULL,
	CONSTRAINT kobo_choices_list_id_key UNIQUE (list_id)
);