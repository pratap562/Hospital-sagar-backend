"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var metadataController_1 = require("../controllers/metadataController");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var router = (0, express_1.Router)();
// Publicly available for doctor form selectors
router.get("/", metadataController_1.getMetadata);
// Only admin can update metadata
router.patch("/", authMiddleware_1.protect, (0, authMiddleware_1.restrictTo)("SUPER_ADMIN"), metadataController_1.updateMetadata);
exports.default = router;
