"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var visitController_1 = require("../controllers/visitController");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var roleMiddleware_1 = require("../middlewares/roleMiddleware");
var router = (0, express_1.Router)();
// Universal Check-in access (Receptionist/Admin)
router.post("/", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.requireRole)(["receptionist", "admin"]), visitController_1.createVisit);
// Doctor Dashboard features
router.get("/search", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.requireRole)(["doctor", "admin"]), visitController_1.searchVisitByToken);
router.get("/today", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.requireRole)(["doctor", "admin"]), visitController_1.getHospitalTodayVisits);
router.put("/:visitId", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.requireRole)(["doctor", "admin"]), visitController_1.updateVisitDetails);
router.get("/patient/:patientId/history", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.requireRole)(["doctor", "admin"]), visitController_1.getPatientHistory);
exports.default = router;
