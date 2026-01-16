"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hospital = void 0;
var mongoose_1 = require("mongoose");
var hospitalSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
}, { timestamps: true });
exports.Hospital = (0, mongoose_1.model)('Hospital', hospitalSchema);
