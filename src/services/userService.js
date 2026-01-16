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
exports.findByEmail = exports.changeUserPassword = exports.updateUser = exports.createUser = exports.emailExists = exports.validateUserPassword = exports.getUserById = exports.getAllUsers = void 0;
var User_1 = require("../models/User");
var passwordHash_1 = require("../utils/passwordHash");
var passwordValidator_1 = require("../utils/passwordValidator");
var mongoose_1 = require("mongoose");
/**
 * Get all users with pagination
 */
var getAllUsers = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var page, limit, skip, users, total;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                page = options.page, limit = options.limit;
                skip = (page - 1) * limit;
                return [4 /*yield*/, User_1.User.find()
                        .sort({ createdAt: -1 })
                        .skip(skip)
                        .limit(limit)
                        .select('-passwordHash -__v')];
            case 1:
                users = _a.sent();
                return [4 /*yield*/, User_1.User.countDocuments()];
            case 2:
                total = _a.sent();
                return [2 /*return*/, {
                        data: users,
                        pagination: {
                            page: page,
                            limit: limit,
                            total: total,
                            totalPages: Math.ceil(total / limit),
                        },
                    }];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
/**
 * Get user by ID
 */
var getUserById = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.User.findById(userId).select('-passwordHash -__v')];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new Error('User not found');
                }
                return [2 /*return*/, user];
        }
    });
}); };
exports.getUserById = getUserById;
/**
 * Validate password (wrapper for utility function)
 */
var validateUserPassword = function (password) {
    return (0, passwordValidator_1.validatePassword)(password);
};
exports.validateUserPassword = validateUserPassword;
/**
 * Check if email exists
 */
var emailExists = function (email, excludeUserId) { return __awaiter(void 0, void 0, void 0, function () {
    var query, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = { email: email.toLowerCase().trim() };
                if (excludeUserId) {
                    query._id = { $ne: new mongoose_1.Types.ObjectId(excludeUserId) };
                }
                return [4 /*yield*/, User_1.User.findOne(query)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, !!user];
        }
    });
}); };
exports.emailExists = emailExists;
/**
 * Create a new user
 */
var createUser = function (userData) { return __awaiter(void 0, void 0, void 0, function () {
    var passwordValidation, emailAlreadyExists, passwordHash, newUserData, user, userResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                passwordValidation = (0, passwordValidator_1.validatePassword)(userData.password);
                if (!passwordValidation.isValid) {
                    throw new Error("Password validation failed: ".concat(passwordValidation.errors.join(', ')));
                }
                return [4 /*yield*/, (0, exports.emailExists)(userData.email)];
            case 1:
                emailAlreadyExists = _a.sent();
                if (emailAlreadyExists) {
                    throw new Error('Email already exists');
                }
                return [4 /*yield*/, (0, passwordHash_1.hashPassword)(userData.password)];
            case 2:
                passwordHash = _a.sent();
                newUserData = {
                    fullName: userData.fullName.trim(),
                    email: userData.email.toLowerCase().trim(),
                    passwordHash: passwordHash,
                    userRoles: userData.userRoles,
                };
                // Add doctor-specific fields if user is a doctor
                if (userData.userRoles.includes('doctor')) {
                    if (userData.departments)
                        newUserData.departments = userData.departments;
                    if (userData.specializations)
                        newUserData.specializations = userData.specializations;
                    if (userData.consultationFee !== undefined)
                        newUserData.consultationFee = userData.consultationFee;
                    if (userData.extraLine)
                        newUserData.extraLine = userData.extraLine.trim();
                }
                user = new User_1.User(newUserData);
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                userResponse = user.toObject();
                delete userResponse.passwordHash;
                delete userResponse.__v;
                return [2 /*return*/, userResponse];
        }
    });
}); };
exports.createUser = createUser;
/**
 * Update user
 */
var updateUser = function (userId, updateData) { return __awaiter(void 0, void 0, void 0, function () {
    var user, updateFields, emailAlreadyExists, passwordValidation, _a, updatedUser;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, User_1.User.findById(userId)];
            case 1:
                user = _c.sent();
                if (!user) {
                    throw new Error('User not found');
                }
                updateFields = {};
                if (updateData.fullName)
                    updateFields.fullName = updateData.fullName.trim();
                if (!updateData.email) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, exports.emailExists)(updateData.email, userId)];
            case 2:
                emailAlreadyExists = _c.sent();
                if (emailAlreadyExists) {
                    throw new Error('Email already exists');
                }
                updateFields.email = updateData.email.toLowerCase().trim();
                _c.label = 3;
            case 3:
                if (!updateData.password) return [3 /*break*/, 5];
                passwordValidation = (0, passwordValidator_1.validatePassword)(updateData.password);
                if (!passwordValidation.isValid) {
                    throw new Error("Password validation failed: ".concat(passwordValidation.errors.join(', ')));
                }
                _a = updateFields;
                return [4 /*yield*/, (0, passwordHash_1.hashPassword)(updateData.password)];
            case 4:
                _a.passwordHash = _c.sent();
                _c.label = 5;
            case 5:
                if (updateData.userRoles !== undefined)
                    updateFields.userRoles = updateData.userRoles;
                if (updateData.departments !== undefined)
                    updateFields.departments = updateData.departments;
                if (updateData.specializations !== undefined)
                    updateFields.specializations = updateData.specializations;
                if (updateData.consultationFee !== undefined)
                    updateFields.consultationFee = updateData.consultationFee;
                if (updateData.extraLine !== undefined)
                    updateFields.extraLine = (_b = updateData.extraLine) === null || _b === void 0 ? void 0 : _b.trim();
                return [4 /*yield*/, User_1.User.findByIdAndUpdate(userId, updateFields, {
                        new: true,
                        runValidators: true,
                    }).select('-passwordHash -__v')];
            case 6:
                updatedUser = _c.sent();
                return [2 /*return*/, updatedUser];
        }
    });
}); };
exports.updateUser = updateUser;
/**
 * Change user password
 */
var changeUserPassword = function (userId, newPassword) { return __awaiter(void 0, void 0, void 0, function () {
    var user, passwordValidation, passwordHash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.User.findById(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new Error('User not found');
                }
                passwordValidation = (0, passwordValidator_1.validatePassword)(newPassword);
                if (!passwordValidation.isValid) {
                    throw new Error("Password validation failed: ".concat(passwordValidation.errors.join(', ')));
                }
                return [4 /*yield*/, (0, passwordHash_1.hashPassword)(newPassword)];
            case 2:
                passwordHash = _a.sent();
                return [4 /*yield*/, User_1.User.findByIdAndUpdate(userId, { passwordHash: passwordHash }, { new: true })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.changeUserPassword = changeUserPassword;
/**
 * Find user by email (for login)
 */
var findByEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.User.findOne({ email: email.toLowerCase().trim() })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.findByEmail = findByEmail;
