"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var roleMiddleware_1 = require("../middlewares/roleMiddleware");
var slotController_1 = require("../controllers/slotController");
var router = (0, express_1.Router)();
// ============================================
// ADMIN ONLY ROUTES
// ============================================
router.use(authMiddleware_1.authMiddleware);
// Create slots for a hospital - Admin only
router.post('/', (0, roleMiddleware_1.requireRole)(['admin']), slotController_1.createSlots);
// Get slots by hospital (paginated) - Admin only (must come before /:slotId)
router.get('/hospital/:hospitalId', (0, roleMiddleware_1.requireRole)(['admin']), slotController_1.getSlotsByHospital);
// Get slot by ID - Admin only
router.get('/:slotId', (0, roleMiddleware_1.requireRole)(['admin']), slotController_1.getSlotById);
// Delete slot - Admin only
router.delete('/:slotId', (0, roleMiddleware_1.requireRole)(['admin']), slotController_1.deleteSlot);
// Bulk delete slots by date - Admin only
router.delete('/hospital/:hospitalId', (0, roleMiddleware_1.requireRole)(['admin']), slotController_1.deleteSlotsByDate);
// ============================================
// Add other user role routes here (doctor, receptionist, etc.)
// ============================================
exports.default = router;
