"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
var mongoose_1 = require("mongoose");
var patientSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String },
    phoneNo: { type: String },
    age: { type: Number },
    sex: { type: String, enum: ['male', 'female', 'other'] },
    dob: { type: Date },
    address: {
        city: { type: String },
        state: { type: String },
        street: { type: String },
    },
}, { timestamps: true });
exports.Patient = (0, mongoose_1.model)('Patient', patientSchema);
