"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visit = void 0;
var mongoose_1 = require("mongoose");
var visitSchema = new mongoose_1.Schema({
    visitToken: { type: Number, required: true },
    patientId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Patient", required: true },
    hospitalId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Hospital", required: true, index: true },
    doctorId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["waiting", "done"], required: true },
    disease: [{ type: String, required: true }],
    diseaseDuration: { type: String },
    presentSymptoms: [{ type: String }],
    previousTreatment: [{ type: String }],
    treatmentGiven: [{ type: String }],
    vitals: {
        pulse: { type: Number },
        bp: { type: String },
        temperature: { type: Number },
    },
    otherProblems: {
        acidity: { type: Boolean },
        diabetes: { type: Boolean },
        constipation: { type: Boolean },
        amebiasis: { type: Boolean },
        bp: { type: Boolean },
        heartProblems: { type: Boolean },
        other: { type: String },
    },
    medicinesGiven: [{ type: String }],
    advice: { type: String },
    followUpDate: { type: String },
}, { timestamps: true });
exports.Visit = (0, mongoose_1.model)("Visit", visitSchema);
