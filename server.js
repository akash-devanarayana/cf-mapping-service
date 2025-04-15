const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mappingService = require('./src');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json({limit: '10mb'}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('cf-mapping-service is running!');
});

app.get('/api/mappings', async (req, res) => {
    try {
        const {version} = req.query;
        const mappings = await mappingService.getMappings(version);
        res.json(mappings);
    } catch (error) {
        console.error('Error fetching mappings:', error);
        res.status(500).json({error: 'Failed to get mappings'});
    }
});

app.post('/api/mappings', async (req, res) => {
    try {
        const mapping = req.body;
        const newMapping = await mappingService.addMapping(mapping);
        res.status(201).json(newMapping);
    } catch (error) {
        console.error('Error adding mapping:', error);
        res.status(500).json({error: 'Failed to add mapping'});
    }
})

app.listen(PORT, () => {
    console.log(`Selector Healing Service running on port ${PORT}`);
});
