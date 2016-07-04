INSERT INTO Songs
(id, title, author, scripture, keyLyric, notes, quarantined, createdAt, updatedAt)
SELECT id, Title, Artist, Scripture, LyricsExcerpt, Notes, Quarantined, NOW(), NOW()
FROM musictable_php.songs;

INSERT INTO Attachments
(id, name, location, SongId, createdAt, updatedAt)
SELECT a.id, a.name, a.url, s.song_id, NOW(), NOW()
FROM musictable_php.attachments a
JOIN musictable_php.attachments_songs s
	ON a.id = s.attachment_id;
	
INSERT INTO TagTypes
(id, name, createdAt, updatedAt)
SELECT id, Name, NOW(), NOW()
FROM musictable_php.tagtypes;


INSERT INTO Tags
(id, name, TagTypeId, createdAt, updatedAt)
SELECT t.id, t.name, tt.tagtype_id, NOW(), NOW()
FROM musictable_php.tags t
JOIN musictable_php.tags_tagtypes tt
	ON t.id = tt.tag_id; /* no quarnatine tag */
	
INSERT INTO SongTags
(SongId, TagId, createdAt, updatedAt)
SELECT song_id, tag_id, NOW(), NOW()
FROM musictable_php.songs_tags
WHERE tag_id != 92; /* no quarantine tag */