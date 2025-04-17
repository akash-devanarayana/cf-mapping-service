const { generateMockMappings } = require("../mocks/mappingsMock");
const { SelectorTypes } = require("../utils/SelectorTypes");
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');
const queries = require('./db/queries');

// Database connection
let db;

// Initialize database
async function initializeDb() {
    try {
        // Use DB_PATH from environment variables or default to './mappings.db'
        const dbPath = process.env.DB_PATH || './mappings.db';

        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        // Create mappings table if it doesn't exist
        await db.exec(queries.CREATE_MAPPINGS_TABLE);

        // Check if the table is empty and seed with mock data if needed
        const count = await db.get(queries.COUNT_MAPPINGS);
        if (count.count === 0) {
            const mockMappings = [];
            generateMockMappings(mockMappings);

            // Insert mock mappings into the database
            const stmt = await db.prepare(queries.INSERT_MAPPING);

            for (const mapping of mockMappings) {
                await stmt.run(
                    mapping.id,
                    mapping.originalSelector,
                    mapping.newSelector,
                    mapping.selectorType,
                    mapping.appVersion,
                    mapping.createdAt,
                    mapping.confidence
                );
            }

            await stmt.finalize();
            logger.info('Database seeded with mock data');
        }
    } catch (error) {
        logger.error('Database initialization error:', error);
        throw error;
    }
}

// Initialize the database when the module is loaded
initializeDb().catch(err => {
    logger.error('Failed to initialize database:', err);
    process.exit(1);
});

// Validate mapping object
const validateMapping = (mapping) => {
    if (!mapping) {
        throw new Error('Mapping object is required');
    }

    if (!mapping.originalSelector) {
        throw new Error('Original selector is required');
    }

    if (!mapping.newSelector) {
        throw new Error('New selector is required');
    }

    if (!mapping.selectorType) {
        throw new Error('Selector type is required');
    }

    // Validate selector type
    const validTypes = Object.values(SelectorTypes);
    if (!validTypes.includes(mapping.selectorType)) {
        throw new Error(`Invalid selector type. Must be one of: ${validTypes.join(', ')}`);
    }

    return true;
};

/**
 * Get all mappings or filter by version
 * @param {string} version - Optional version to filter by
 * @returns {Promise<Array>} - Array of mappings
 */
const getMappings = async (version) => {
    try {
        if (version) {
            return await db.all(queries.SELECT_MAPPINGS_BY_VERSION, version);
        } else {
            return await db.all(queries.SELECT_ALL_MAPPINGS);
        }
    } catch (error) {
        logger.error('Error getting mappings:', error);
        throw new Error('Failed to retrieve mappings from database');
    }
};

/**
 * Add a new mapping
 * @param {Object} mapping - The mapping object to add
 * @returns {Promise<Object>} - The added mapping
 */
const addMapping = async (mapping) => {
    try {
        // Validate mapping
        validateMapping(mapping);

        // Generate ID if not provided
        const id = mapping.id || uuidv4();
        const timestamp = new Date().getTime();

        // Insert mapping into database
        await db.run(
            queries.INSERT_MAPPING,
            id,
            mapping.originalSelector,
            mapping.newSelector,
            mapping.selectorType,
            mapping.appVersion,
            timestamp,
            mapping.confidence || 1.0
        );

        // Return the newly created mapping
        return await db.get(queries.SELECT_MAPPING_BY_ID, id);
    } catch (error) {
        logger.error('Error adding mapping:', error);
        throw error;
    }
};

/**
 * Update an existing mapping
 * @param {Object} mapping - The mapping object with updated values
 * @returns {Promise<Object>} - The updated mapping
 */
const updateMapping = async (mapping) => {
    try {
        // Validate mapping
        if (!mapping.id) {
            throw new Error('Mapping ID is required for updates');
        }

        // Check if mapping exists
        const existingMapping = await db.get(queries.SELECT_MAPPING_BY_ID, mapping.id);
        if (!existingMapping) {
            throw new Error(`Mapping with ID ${mapping.id} not found`);
        }

        const timestamp = new Date().getTime();

        // Update mapping in database
        await db.run(
            queries.UPDATE_MAPPING,
            mapping.originalSelector,
            mapping.newSelector,
            mapping.selectorType,
            mapping.appVersion,
            mapping.confidence,
            timestamp,
            mapping.id
        );

        // Return the updated mapping
        return await db.get(queries.SELECT_MAPPING_BY_ID, mapping.id);
    } catch (error) {
        logger.error('Error updating mapping:', error);
        throw error;
    }
};

/**
 * Update the status of a mapping
 * @param {string} id - The ID of the mapping to update
 * @param {string} status - The new status
 * @returns {Promise<Object>} - The updated mapping
 */
const updateMappingStatus = async (id, status) => {
    try {
        if (!id) {
            throw new Error('Mapping ID is required');
        }

        if (!status) {
            throw new Error('Status is required');
        }

        // Check if mapping exists
        const existingMapping = await db.get(queries.SELECT_MAPPING_BY_ID, id);
        if (!existingMapping) {
            throw new Error(`Mapping with ID ${id} not found`);
        }

        const timestamp = new Date().getTime();

        // Update status in database
        await db.run(queries.UPDATE_MAPPING_STATUS, status, timestamp, id);

        // Return the updated mapping
        return await db.get(queries.SELECT_MAPPING_BY_ID, id);
    } catch (error) {
        logger.error('Error updating mapping status:', error);
        throw error;
    }
};

module.exports = {
    getMappings,
    addMapping,
    updateMapping,
    updateMappingStatus
};

