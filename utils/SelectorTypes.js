export const SelectorTypes = {
    CLASS: 'class',
    ID: 'id',
    TAG: 'tag',
    ATTRIBUTE: 'attribute',
    XPATH: 'xpath',
    CSS_SELECTOR: 'css-selector',
    COMPLEX: 'complex'
};

// Make the enum object immutable to prevent modifications
Object.freeze(SelectorTypes);