"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
var mongoose_1 = require("mongoose");
var appointmentSchema = new mongoose_1.Schema({
    appointmentId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true }, // these got added
    email: { type: String, required: true }, // these got added
    phoneNo: { type: String, required: true }, // these got added
    mode: { type: String, enum: ["online", "offline"], required: true },
    hospitalId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Hospital", required: true },
    status: {
        type: String,
        enum: ["booked", "cancelled", "checked_in"],
        required: true,
    },
    healthIssue: {
        type: String,
        enum: [
            "diabetes",
            "thyroid",
            "joint disorder",
            "skin disorder",
            "hypertension",
            "digestive problems",
            "gynecological problems",
            "hairfall problems",
            "other",
        ],
        required: true,
    },
    amountPaid: { type: Number },
    // tokenNumber: { type: Number },                     // these got removed
    appointmentDate: { type: Date, required: true },
    doctorId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    doctorName: { type: String, required: true },
    patientId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Patient", required: true },
    duration: { type: Number }, // Duration in minutes
    slotWindowId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "SlotWindow",
        required: true,
    },
    slotNumber: { type: Number, required: true }, // this got added
    slotStartTime: { type: Date, required: true }, // this got added
    slotEndTime: { type: Date, required: true }, // this got added
}, { timestamps: true });
exports.Appointment = (0, mongoose_1.model)("Appointment", appointmentSchema);
