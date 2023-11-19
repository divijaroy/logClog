const express = require('express');
const router = express.Router();

const Log = require('../models/logfiles');

router.post('/ingest', async (req, res) => {
    try {
        // Assuming req.body is an array of log objects
        const logsData = req.body;

        // Create an array of Log instances
        const newLogs = logsData.map(logData => new Log(logData));

        // Use insertMany to insert the array of logs into the database
        await Log.insertMany(newLogs);

        res.json({ status: 'success' });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

router.get('/alllogs', async (req, res) => {
    try {
        const logs = await Log.find();
        res.json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/filtertime', async (req, res) => {
    try {
        // Assuming req.body is an array of log objects
        const fromTime = new Date(req.body.fromTime);
        const toTime = new Date(req.body.toTime);

        // Ensure fromTime is before toTime
        if (fromTime >= toTime) {
            return res.status(400).json({ status: 'error', error: 'Invalid time range' });
        }

        // Find logs that lie between fromTime to toTime
        const filteredLogs = await Log.find({
            timestamp: { $gte: fromTime, $lte: toTime },
        });

        res.json({ status: 'success', logs: filteredLogs });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

router.get('/search', async (req, res) => {
    try {
        const searchCriteria = {};
        const filters = req.query;

        // Iterate through the filters and dynamically create the search criteria
        Object.keys(filters).forEach((key) => {
            const query = filters[key];

            if (key === 'parentResourceId') {
                searchCriteria['metadata.parentResourceId'] = { $regex: query, $options: 'i' };
            } else if (key === 'fromTime' || key === 'toTime') {
                // Skip timestamp filters here since they are handled separately
            } else {
                searchCriteria[key] = { $regex: query, $options: 'i' };
            }
        });

        // Add timestamp filtering if fromTime and toTime are present
        if (filters.fromTime && filters.toTime) {
            const fromTime = new Date(filters.fromTime);
            const toTime = new Date(filters.toTime);

            // Ensure fromTime is before toTime
            if (fromTime >= toTime) {
                return res.status(400).json({ status: 'error', error: 'Invalid time range' });
            }

            searchCriteria.timestamp = { $gte: fromTime, $lte: toTime };
        }

        const logs = await Log.find(searchCriteria);
        res.json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// Define other routes as needed

module.exports = router;
