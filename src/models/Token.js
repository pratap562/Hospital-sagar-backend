"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
var mongoose_1 = require("mongoose");
var tokenSchema = new mongoose_1.Schema({
    hospitalId: { type: mongoose_1.Schema.Types.ObjectId, required: true, index: true },
    date: { type: Date, required: true },
    currentToken: { type: Number, required: true, default: 0 },
}, { timestamps: true });
exports.Token = (0, mongoose_1.model)("Token", tokenSchema);
