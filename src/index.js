const {generateMockMappings} = require("../mocks/mappingsMock");

let mappings = [];

generateMockMappings(mappings);

const getMappings = async (version) => {
    if (version) {
        return mappings.filter(mapping => mapping.version === version);
    } else {
        return mappings;
    }
};

const addMapping = async (mapping) => {
    mappings.push(mapping);
    return mapping;
};

const updateMapping = async (mapping) => {
    const mappingIndex = mappings.findIndex(m => m.id === mapping.id);

    if (mappingIndex >= 0) {
        mappings[mappingIndex] = {
            ...mappings[mappingIndex],
            ...mapping,
            updatedAt: new Date().getTime()
        };
        return mappings[mappingIndex];
    }

    throw new Error(`Mapping with ID ${mapping.id} not found`);
}

const updateMappingStatus = async (id, status) => {
    const mappingIndex = mappings.findIndex(m => m.id === id);

    if (mappingIndex >= 0) {
        mappings[mappingIndex].status = status;
        mappings[mappingIndex].updatedAt = new Date().getTime();
        return mappings[mappingIndex];
    }

    throw new Error(`Mapping with ID ${id} not found`);
};

module.exports = {
    getMappings,
    addMapping,
    updateMappingStatus
};