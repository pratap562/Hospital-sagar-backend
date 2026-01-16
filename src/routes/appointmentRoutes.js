"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var appointmentController_1 = require("../controllers/appointmentController");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var roleMiddleware_1 = require("../middlewares/roleMiddleware");
var router = (0, express_1.Router)();
// Receptionist and Admin access
router.get("/today", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.requireRole)(["receptionist", "admin"]), appointmentController_1.getTodaysAppointments);
router.get("/:appointmentId", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.requireRole)(["receptionist", "admin"]), appointmentController_1.getAppointmentById);
router.patch("/:appointmentId/check-in", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.requireRole)(["receptionist", "admin"]), appointmentController_1.checkInAppointment);
exports.default = router;
