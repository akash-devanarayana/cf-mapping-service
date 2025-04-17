const CREATE_MAPPINGS_TABLE = `
    CREATE TABLE IF NOT EXISTS mappings (
        id TEXT PRIMARY KEY,
        originalSelector TEXT NOT NULL,
        newSelector TEXT NOT NULL,
        selectorType TEXT NOT NULL,
        appVersion TEXT,
        createdAt INTEGER NOT NULL,
        updatedAt INTEGER,
        confidence REAL DEFAULT 1.0
    )
`;

const COUNT_MAPPINGS = 'SELECT COUNT(*) as count FROM mappings';

const INSERT_MAPPING = `
    INSERT INTO mappings (
        id, originalSelector, newSelector, selectorType, 
        appVersion, createdAt, confidence
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
`;

const SELECT_ALL_MAPPINGS = 'SELECT * FROM mappings';
const SELECT_MAPPINGS_BY_VERSION = 'SELECT * FROM mappings WHERE appVersion = ?';
const SELECT_MAPPING_BY_ID = 'SELECT * FROM mappings WHERE id = ?';

const UPDATE_MAPPING = `
    UPDATE mappings SET 
        originalSelector = COALESCE(?, originalSelector),
        newSelector = COALESCE(?, newSelector),
        selectorType = COALESCE(?, selectorType),
        appVersion = COALESCE(?, appVersion),
        confidence = COALESCE(?, confidence),
        updatedAt = ?
    WHERE id = ?
`;

const UPDATE_MAPPING_STATUS = 'UPDATE mappings SET status = ?, updatedAt = ? WHERE id = ?';

module.exports = {
    CREATE_MAPPINGS_TABLE,
    COUNT_MAPPINGS,
    INSERT_MAPPING,
    SELECT_ALL_MAPPINGS,
    SELECT_MAPPINGS_BY_VERSION,
    SELECT_MAPPING_BY_ID,
    UPDATE_MAPPING,
    UPDATE_MAPPING_STATUS
};
