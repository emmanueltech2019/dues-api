const Company = require('../models/company.model');

// Controller to create a new company
exports.createCompany = async (req, res) => {
    try {
        const { name, industry, address, city, country, employees, revenue, founded, website } = req.body;
        
        // Create a new company instance
        const newCompany = new Company({
            name,
            industry,
            address,
            city,
            country,
            employees,
            revenue,
            founded,
            website
        });

        // Save the new company to the database
        const savedCompany = await newCompany.save();

        // Return success response with the saved company details
        res.status(201).json({
            success: true,
            message: "Company created successfully",
            company: savedCompany
        });
    } catch (error) {
        // Return error response if there's an error during creation
        res.status(400).json({
            success: false,
            message: "Failed to create company",
            error: error.message
        });
    }
};

// Controller to get all companies
exports.getAllCompanies = async (req, res) => {
    try {
        // Retrieve all companies from the database
        const companies = await Company.find();

        // Return success response with the list of companies
        res.status(200).json({
            success: true,
            companies
        });
    } catch (error) {
        // Return error response if there's an error during retrieval
        res.status(500).json({
            success: false,
            message: "Failed to retrieve companies",
            error: error.message
        });
    }
};

// Controller to get a single company by ID
exports.getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        // Retrieve the company by ID from the database
        const company = await Company.findById(companyId);

        // If company is not found, return 404 Not Found
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        // Return success response with the company details
        res.status(200).json({
            success: true,
            company
        });
    } catch (error) {
        // Return error response if there's an error during retrieval
        res.status(500).json({
            success: false,
            message: "Failed to retrieve company",
            error: error.message
        });
    }
};

// Controller to update a company by ID
exports.updateCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const updates = req.body;

        // Find the company by ID and update its details
        const updatedCompany = await Company.findByIdAndUpdate(companyId, updates, { new: true });

        // If company is not found, return 404 Not Found
        if (!updatedCompany) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        // Return success response with the updated company details
        res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company: updatedCompany
        });
    } catch (error) {
        // Return error response if there's an error during update
        res.status(400).json({
            success: false,
            message: "Failed to update company",
            error: error.message
        });
    }
};

// Controller to delete a company by ID
exports.deleteCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        // Find the company by ID and delete it
        const deletedCompany = await Company.findByIdAndDelete(companyId);

        // If company is not found, return 404 Not Found
        if (!deletedCompany) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        // Return success response with the deleted company details
        res.status(200).json({
            success: true,
            message: "Company deleted successfully",
            company: deletedCompany
        });
    } catch (error) {
        // Return error response if there's an error during deletion
        res.status(500).json({
            success: false,
            message: "Failed to delete company",
            error: error.message
        });
    }
};
