"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var env_1 = require("../config/env");
var JWT_SECRET = env_1.env.JWT_SECRET;
var JWT_EXPIRES_IN = env_1.env.JWT_EXPIRES_IN; // 24 hour expiry
var generateToken = function (payload) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
exports.generateToken = generateToken;
var verifyToken = function (token) {
    try {
        var decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return decoded;
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
