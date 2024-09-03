const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Resolve the absolute path to the uploads directory
const uploadsDir = path.resolve(__dirname, '../uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Define storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Use the uploads directory
    },
    filename: (req, file, cb) => {
        const originalFilename = file.originalname;
        const filePath = path.join(uploadsDir, originalFilename);

       
        if (fs.existsSync(filePath)) {
            req.fileExists = true; // Set a flag to indicate the file exists
            cb(null, originalFilename); // Return the existing filename
        } else {
            req.fileExists = false; // Flag that the file is new
            cb(null, originalFilename); // Save the file with its original name
        }
    }
});

// Create Multer instance
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type, only images are allowed!'), false);
        }
    }
});

module.exports = upload;
