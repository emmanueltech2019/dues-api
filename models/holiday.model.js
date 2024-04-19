const mongoose = require('mongoose');

// Define HolidayRecord schema
const holidayRecordSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    holidayName: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }
});

// Create HolidayRecord model
const HolidayRecord = mongoose.model('HolidayRecord', holidayRecordSchema);

module.exports = HolidayRecord;
