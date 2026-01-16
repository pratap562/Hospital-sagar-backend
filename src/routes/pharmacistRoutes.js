"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
// TODO: add pharmacist routes
router.get("/", function (_req, res) {
    res.send("Pharmacist routes not implemented yet");
});
exports.default = router;
