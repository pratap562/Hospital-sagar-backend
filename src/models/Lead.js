"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var leadSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    city: { type: String, required: true },
    healthIssue: { type: String, required: true },
    isConverted: { type: Boolean, default: false },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Lead', leadSchema);
