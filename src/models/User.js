"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    fullName: { type: String, required: true },
    departments: [{ type: String }],
    specializations: [{ type: String }],
    extraLine: { type: String },
    userRoles: {
        type: [{ type: String, enum: ['admin', 'doctor', 'receptionist', 'pharmacist'] }],
        default: [],
    },
    consultationFee: { type: Number },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
