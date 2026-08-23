CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  surface TEXT NOT NULL,
  target_id TEXT NOT NULL,
  target_title TEXT NOT NULL,
  page_path TEXT NOT NULL,
  specimen_id TEXT,
  specimen_name TEXT,
  name TEXT,
  email TEXT,
  message TEXT NOT NULL,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_submissions_created_at
  ON submissions (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_submissions_target
  ON submissions (target_id);
