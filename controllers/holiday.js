const HolidayRecord = require('../models/holiday.model');

// Controller to create a new holiday record
exports.createHolidayRecord = async (req, res) => {
    // console.log("jjj")
    try {
        const { startDate, endDate, holidayName, company } = req.body;

        // Create a new holiday record instance
        const newHolidayRecord = new HolidayRecord({
            startDate,
            endDate,
            holidayName,
            company
        });

        // Save the new holiday record to the database
        const savedHolidayRecord = await newHolidayRecord.save();

        // Return success response with the saved holiday record details
        res.status(201).json({
            success: true,
            message: "Holiday record created successfully",
            holidayRecord: savedHolidayRecord
        });
    } catch (error) {
        // Return error response if there's an error during creation
        res.status(400).json({
            success: false,
            message: "Failed to create holiday record",
            error: error.message
        });
    }
};

// Controller to get all holiday records
exports.getAllHolidayRecords = async (req, res) => {
    try {
        // Retrieve all holiday records from the database
        const holidayRecords = await HolidayRecord.find({company:req.body.company});

        // Return success response with the list of holiday records
        res.status(200).json({
            success: true,
            holidayRecords
        });
    } catch (error) {
        // Return error response if there's an error during retrieval
        res.status(500).json({
            success: false,
            message: "Failed to retrieve holiday records",
            error: error.message
        });
    }
};

// Controller to get a single holiday record by ID
exports.getHolidayRecordById = async (req, res) => {
    try {
        const holidayRecordId = req.params.id;

        // Retrieve the holiday record by ID from the database
        const holidayRecord = await HolidayRecord.findById(holidayRecordId);

        // If holiday record is not found, return 404 Not Found
        if (!holidayRecord) {
            return res.status(404).json({
                success: false,
                message: "Holiday record not found"
            });
        }

        // Return success response with the holiday record details
        res.status(200).json({
            success: true,
            holidayRecord
        });
    } catch (error) {
        // Return error response if there's an error during retrieval
        res.status(500).json({
            success: false,
            message: "Failed to retrieve holiday record",
            error: error.message
        });
    }
};

// Controller to update a holiday record by ID
exports.updateHolidayRecordById = async (req, res) => {
    try {
        const holidayRecordId = req.params.id;
        const updates = req.body;

        // Find the holiday record by ID and update its details
        const updatedHolidayRecord = await HolidayRecord.findByIdAndUpdate(holidayRecordId, updates, { new: true });

        // If holiday record is not found, return 404 Not Found
        if (!updatedHolidayRecord) {
            return res.status(404).json({
                success: false,
                message: "Holiday record not found"
            });
        }

        // Return success response with the updated holiday record details
        res.status(200).json({
            success: true,
            message: "Holiday record updated successfully",
            holidayRecord: updatedHolidayRecord
        });
    } catch (error) {
        // Return error response if there's an error during update
        res.status(400).json({
            success: false,
            message: "Failed to update holiday record",
            error: error.message
        });
    }
};

// Controller to delete a holiday record by ID
exports.deleteHolidayRecordById = async (req, res) => {
    try {
        const holidayRecordId = req.params.id;

        // Find the holiday record by ID and delete it
        const deletedHolidayRecord = await HolidayRecord.findByIdAndDelete(holidayRecordId);

        // If holiday record is not found, return 404 Not Found
        if (!deletedHolidayRecord) {
            return res.status(404).json({
                success: false,
                message: "Holiday record not found"
            });
        }

        // Return success response with the deleted holiday record details
        res.status(200).json({
            success: true,
            message: "Holiday record deleted successfully",
            holidayRecord: deletedHolidayRecord
        });
    } catch (error) {
        // Return error response if there's an error during deletion
        res.status(500).json({
            success: false,
            message: "Failed to delete holiday record",
            error: error.message
        });
    }
};
