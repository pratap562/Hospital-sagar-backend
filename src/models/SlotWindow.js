"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotWindow = void 0;
var mongoose_1 = require("mongoose");
var slotWindowSchema = new mongoose_1.Schema({
    hospitalId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true,
        index: true,
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    slotDate: { type: Date, required: true },
    slotNumber: { type: Number, required: true }, // this got added
    maxCapacity: { type: Number, required: true },
    bookedCount: { type: Number, default: 0 },
}, { timestamps: true });
exports.SlotWindow = (0, mongoose_1.model)("SlotWindow", slotWindowSchema);
