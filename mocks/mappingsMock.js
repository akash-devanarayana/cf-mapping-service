export function generateMockMappings(mappings) {
    mappings.push({
        id: '1',
        originalSelector: '.submit-button',
        newSelector: '.btn-primary',
        selectorType: 'class',
        appVersion: 'v1.0',
        createdAt: new Date().getTime(),
        confidence: 1.0,
    });

    mappings.push({
        id: '2',
        originalSelector: '.product-item',
        newSelector: '.catalog-item',
        selectorType: 'class',
        appVersion: 'v1.0',
        createdAt: new Date().getTime(),
        confidence: 1.0,
    });

    mappings.push({
        id: '3',
        originalSelector: '.nav-menu',
        newSelector: '.navigation-bar',
        selectorType: 'class',
        appVersion: 'v1.1',
        createdAt: new Date().getTime(),
        confidence: 0.95,
    });

    mappings.push({
        id: '4',
        originalSelector: '#login-form',
        newSelector: '#user-auth-form',
        selectorType: 'id',
        appVersion: 'v1.2',
        createdAt: new Date().getTime(),
        confidence: 0.98,
    });

    mappings.push({
        id: '5',
        originalSelector: '.error-message',
        newSelector: '.alert-danger',
        selectorType: 'class',
        appVersion: 'v1.0',
        createdAt: new Date().getTime(),
        confidence: 0.92,
    });

    mappings.push({
        id: '6',
        originalSelector: '.user-profile',
        newSelector: '.account-details',
        selectorType: 'class',
        appVersion: 'v1.3',
        createdAt: new Date().getTime(),
        confidence: 0.88,
    });

    mappings.push({
        id: '7',
        originalSelector: '#search-box',
        newSelector: '#quick-search',
        selectorType: 'id',
        appVersion: 'v1.2',
        createdAt: new Date().getTime(),
        confidence: 1.0,
    });
}