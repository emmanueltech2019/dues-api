const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company');

// Route to create a new company
router.post('/companies', companyController.createCompany);

// Route to get all companies
router.get('/companies', companyController.getAllCompanies);

// Route to get a single company by ID
router.get('/companies/:id', companyController.getCompanyById);

// Route to update a company by ID
router.put('/companies/:id', companyController.updateCompanyById);

// Route to delete a company by ID
router.delete('/companies/:id', companyController.deleteCompanyById);

module.exports = router;
