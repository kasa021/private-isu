USE isuconp;
ALTER TABLE comments DROP INDEX post_id_idx, ADD INDEX post_id_idx(post_id,created_at);
ALTER TABLE comments ADD INDEX user_id_idx(user_id);