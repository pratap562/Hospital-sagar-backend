"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var leadController_1 = require("../controllers/leadController");
var router = express_1.default.Router();
router.post('/', leadController_1.createLead);
router.get('/:id', leadController_1.getLead);
router.patch('/:id/status', leadController_1.updateLeadStatus);
exports.default = router;
