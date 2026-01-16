"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var roleMiddleware_1 = require("../middlewares/roleMiddleware");
var hospitalController_1 = require("../controllers/hospitalController");
var router = (0, express_1.Router)();
// ============================================
// ADMIN ONLY ROUTES
// ============================================
router.use(authMiddleware_1.authMiddleware);
// Get all hospitals (paginated) - Admin only
router.get('/', (0, roleMiddleware_1.requireRole)(['admin']), hospitalController_1.getAllHospitals);
// Create hospital - Admin only
router.post('/', (0, roleMiddleware_1.requireRole)(['admin']), hospitalController_1.createHospital);
// Get hospital by ID - Admin only
router.get('/:hospitalId', (0, roleMiddleware_1.requireRole)(['admin']), hospitalController_1.getHospitalById);
// Update hospital - Admin only
router.put('/:hospitalId', (0, roleMiddleware_1.requireRole)(['admin']), hospitalController_1.updateHospital);
// ============================================
// Add other user role routes here (doctor, receptionist, etc.)
// ============================================
exports.default = router;
