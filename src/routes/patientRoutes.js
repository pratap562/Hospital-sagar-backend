"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var patientController_1 = require("../controllers/patientController");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var roleMiddleware_1 = require("../middlewares/roleMiddleware");
var router = (0, express_1.Router)();
// Receptionist and Admin access
router.get("/:patientId", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.requireRole)(["receptionist", "admin"]), patientController_1.getPatientById);
router.post("/", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.requireRole)(["receptionist", "admin"]), patientController_1.createPatient);
router.get("/", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.requireRole)(["doctor", "admin"]), patientController_1.listPatients);
exports.default = router;
