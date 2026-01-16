"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotLock = void 0;
var mongoose_1 = require("mongoose");
var slotLockSchema = new mongoose_1.Schema({
    slotWindowId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'SlotWindow', required: true, index: true },
    bookingAttemptId: { type: String, required: true, unique: true },
    isBooked: { type: Boolean, default: false },
    expiresAt: { type: Date, required: true },
}, { timestamps: { createdAt: true, updatedAt: false } });
slotLockSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 600 });
exports.SlotLock = (0, mongoose_1.model)('SlotLock', slotLockSchema);
