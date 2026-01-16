"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var analyticsController_1 = require("../controllers/analyticsController");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var router = express_1.default.Router();
// Only Super Admins can access analytics
router.use(authMiddleware_1.protect, (0, authMiddleware_1.restrictTo)("ADMIN"));
router.get("/hospitals", analyticsController_1.getHospitalVisitsAnalytics);
router.get("/diseases", analyticsController_1.getDiseaseAnalytics);
router.get("/treatments", analyticsController_1.getTreatmentAnalytics);
exports.default = router;
