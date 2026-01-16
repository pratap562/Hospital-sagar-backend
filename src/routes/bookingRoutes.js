"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bookingController_1 = require("../controllers/bookingController");
var router = (0, express_1.Router)();
// ============================================
// PUBLIC BOOKING ROUTES (No Auth Required)
// ============================================
// Get available slots for a hospital
router.get('/slots/:hospitalId', bookingController_1.getPublicSlots);
// Lock a slot when proceeding to payment
router.post('/slots/lock', bookingController_1.lockSlot);
// Release a slot lock (when user cancels payment)
router.delete('/slots/lock/:lockId', bookingController_1.releaseSlotLock);
// Confirm booking after payment
router.post('/confirm', bookingController_1.confirmBooking);
exports.default = router;
