const { errorResponse } = require("../helper");
const path = require('path');
const fs = require('fs');

const fileUploader = async ({ file = null, location = "/upload", allowedExtensions }, res) => {
    try {
        console.log("File details:", { file, location, allowedExtensions });

        // Ensure location path ends with a slash
        location = location.endsWith('/') ? location : location + '/';

        // Check if file exists
        if (!file || (!Array.isArray(file)) || Object.keys(file).length === 0) {
            console.error("No file uploaded.");
            return {
                status: false,
                message: null
            };
        }

        let uploadedFilePath;
        const uploadDir = path.join(process.cwd(), 'public', location);

        // Ensure the directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Single file upload
        if (!Array.isArray(file)) {

            console.log("file.name", file.name);
            const extensionCheck = path.extname(file.name).toLowerCase();
            console.log("extensionCheck", extensionCheck);
            
            if (!allowedExtensions.includes(extensionCheck)) {
                console.error(`Invalid file extension: ${extensionCheck}`);
                return {
                    status: false,
                    message: null
                };
            }

            const extension = path.extname(file.name);
            const uniqueName = `${new Date().toISOString().replace(/:/g, '-')}${extension}`;
            const filePath = path.join(location, uniqueName);
            uploadedFilePath = path.join(uploadDir, uniqueName);

            // Move file to designated path
            await file.mv(uploadedFilePath);
            console.log("File uploaded to:", uploadedFilePath);
            return filePath
        }

        // Multiple file upload
        if (Array.isArray(file)) {
            uploadedFilePath = [];

            for (let i = 0; i < file.length; i++) {
                const extensionCheck = path.extname(file[i].name).toLowerCase();
                if (!allowedExtensions.includes(extensionCheck)) {
                    console.error(`Invalid file extension: ${extensionCheck}`);
                    return {
                        status: false,
                        message: null
                    };
                }

                const extension = path.extname(file[i].name);
                const uniqueName = `${new Date().toISOString().replace(/:/g, '-')}-${i}${extension}`;
                const filePath = path.join(location, uniqueName);
                const fullPath = path.join(uploadDir, uniqueName);

                await file[i].mv(fullPath);
                uploadedFilePath.push(filePath);
            }
            console.log("Multiple files uploaded to:", uploadedFilePath);
            return {
                status: true,
                message: uploadedFilePath
            };
        }

        return {
            status: false,
            message: null
        };

    } catch (error) {
        console.error("Error during file upload:", error);
        return {
            status: false,
            message: null
        };
    }
};

module.exports = fileUploader;
