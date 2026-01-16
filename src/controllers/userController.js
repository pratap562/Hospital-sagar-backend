"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getCurrentUser = exports.getUserById = exports.changeUserPassword = exports.updateUser = exports.createUser = exports.getAllUsers = exports.login = void 0;
var userService_1 = require("../services/userService");
var authService_1 = require("../services/authService");
// ============================================
// AUTHENTICATION ROUTES
// ============================================
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, loginData, result, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password;
                // Input validation
                if (!email || !password) {
                    res.status(400).json({
                        success: false,
                        message: 'Email and password are required',
                    });
                    return [2 /*return*/];
                }
                loginData = { email: email, password: password };
                return [4 /*yield*/, (0, authService_1.login)(loginData)];
            case 1:
                result = _b.sent();
                // Set JWT token in HTTP-only cookie
                res.cookie('token', result.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                    sameSite: 'lax',
                    maxAge: 24 * 60 * 60 * 1000, // 24 hours
                });
                // Return only user object with name and email (no token in response)
                res.status(200).json({
                    success: true,
                    message: 'Login successful',
                    data: {
                        user: result.user,
                    },
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                if (error_1.message === 'Invalid email or password') {
                    res.status(401).json({
                        success: false,
                        message: error_1.message,
                    });
                    return [2 /*return*/];
                }
                res.status(500).json({
                    success: false,
                    message: 'Error during login',
                    error: error_1.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
// ============================================
// ADMIN USER MANAGEMENT ROUTES
// ============================================
var getAllUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, limit, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                page = parseInt(req.query.page) || 1;
                limit = parseInt(req.query.limit) || 10;
                return [4 /*yield*/, (0, userService_1.getAllUsers)({ page: page, limit: limit })];
            case 1:
                result = _a.sent();
                res.status(200).json({
                    success: true,
                    data: result,
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ success: false, message: 'Error fetching users', error: error_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, fullName, email, password, userRoles, departments, specializations, consultationFee, extraLine, userData, user, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, fullName = _a.fullName, email = _a.email, password = _a.password, userRoles = _a.userRoles, departments = _a.departments, specializations = _a.specializations, consultationFee = _a.consultationFee, extraLine = _a.extraLine;
                // Input validation
                if (!fullName || !email || !password || !userRoles || userRoles.length === 0) {
                    res.status(400).json({
                        success: false,
                        message: 'Full name, email, password, and at least one user role are required',
                    });
                    return [2 /*return*/];
                }
                userData = {
                    fullName: fullName,
                    email: email,
                    password: password,
                    userRoles: userRoles,
                    departments: departments,
                    specializations: specializations,
                    consultationFee: consultationFee,
                    extraLine: extraLine,
                };
                return [4 /*yield*/, (0, userService_1.createUser)(userData)];
            case 1:
                user = _b.sent();
                res.status(201).json({
                    success: true,
                    message: 'User created successfully',
                    data: user,
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                if (error_3.message.includes('Email already exists') || error_3.code === 11000) {
                    res.status(400).json({ success: false, message: 'Email already exists' });
                    return [2 /*return*/];
                }
                if (error_3.message.includes('Password validation failed')) {
                    res.status(400).json({
                        success: false,
                        message: error_3.message,
                    });
                    return [2 /*return*/];
                }
                res.status(500).json({ success: false, message: 'Error creating user', error: error_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, fullName, email, password, userRoles, departments, specializations, consultationFee, extraLine, updateData, updatedUser, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                _a = req.body, fullName = _a.fullName, email = _a.email, password = _a.password, userRoles = _a.userRoles, departments = _a.departments, specializations = _a.specializations, consultationFee = _a.consultationFee, extraLine = _a.extraLine;
                updateData = {
                    fullName: fullName,
                    email: email,
                    password: password,
                    userRoles: userRoles,
                    departments: departments,
                    specializations: specializations,
                    consultationFee: consultationFee,
                    extraLine: extraLine,
                };
                return [4 /*yield*/, (0, userService_1.updateUser)(userId, updateData)];
            case 1:
                updatedUser = _b.sent();
                res.status(200).json({
                    success: true,
                    message: 'User updated successfully',
                    data: updatedUser,
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                if (error_4.message === 'User not found') {
                    res.status(404).json({ success: false, message: error_4.message });
                    return [2 /*return*/];
                }
                if (error_4.message.includes('Email already exists') || error_4.code === 11000) {
                    res.status(400).json({ success: false, message: 'Email already exists' });
                    return [2 /*return*/];
                }
                if (error_4.message.includes('Password validation failed')) {
                    res.status(400).json({
                        success: false,
                        message: error_4.message,
                    });
                    return [2 /*return*/];
                }
                res.status(500).json({ success: false, message: 'Error updating user', error: error_4.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var changeUserPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, newPassword, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                newPassword = req.body.newPassword;
                if (!newPassword) {
                    res.status(400).json({ success: false, message: 'New password is required' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, userService_1.changeUserPassword)(userId, newPassword)];
            case 1:
                _a.sent();
                res.status(200).json({
                    success: true,
                    message: 'Password changed successfully',
                });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                if (error_5.message === 'User not found') {
                    res.status(404).json({ success: false, message: error_5.message });
                    return [2 /*return*/];
                }
                if (error_5.message.includes('Password validation failed')) {
                    res.status(400).json({
                        success: false,
                        message: error_5.message,
                    });
                    return [2 /*return*/];
                }
                res.status(500).json({ success: false, message: 'Error changing password', error: error_5.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.changeUserPassword = changeUserPassword;
var getUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                return [4 /*yield*/, (0, userService_1.getUserById)(userId)];
            case 1:
                user = _a.sent();
                res.status(200).json({
                    success: true,
                    data: user,
                });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                if (error_6.message === 'User not found') {
                    res.status(404).json({ success: false, message: error_6.message });
                    return [2 /*return*/];
                }
                res.status(500).json({ success: false, message: 'Error fetching user', error: error_6.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
// ============================================
// USER PROFILE ROUTES
// ============================================
var getCurrentUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Unauthorized: No user found' });
                return [2 /*return*/];
            }
            // Return user data from JWT token (no database call needed)
            res.status(200).json({
                success: true,
                data: {
                    user: {
                        name: req.user.name,
                        email: req.user.email,
                        roles: req.user.roles,
                    },
                },
            });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error fetching user', error: error.message });
        }
        return [2 /*return*/];
    });
}); };
exports.getCurrentUser = getCurrentUser;
var logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            // Clear the JWT token cookie
            res.cookie('token', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 0, // Immediately expire the cookie
            });
            res.status(200).json({
                success: true,
                message: 'Logout successful',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error during logout',
                error: error.message,
            });
        }
        return [2 /*return*/];
    });
}); };
exports.logout = logout;
// ============================================
// Add other user role routes here (doctor, receptionist, etc.)
// ============================================
