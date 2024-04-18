const mongoose = require('mongoose');

// Define Company schema
const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    industry: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    }
});

// Create Company model
const Company = mongoose.model('Company', companySchema);

module.exports = Company;
