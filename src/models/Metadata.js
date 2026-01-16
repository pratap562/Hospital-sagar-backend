"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metadata = void 0;
var mongoose_1 = require("mongoose");
var metadataSchema = new mongoose_1.Schema({
    treatments: [{ type: String }],
    medicines: [{ type: String }],
    diseases: [{ type: String }],
    symptoms: [{ type: String }],
}, { timestamps: true });
exports.Metadata = (0, mongoose_1.model)("Metadata", metadataSchema);
