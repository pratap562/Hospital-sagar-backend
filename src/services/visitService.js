"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countPatientDoneVisits = exports.getPatientVisitsHistory = exports.updateVisitMedicalDetails = exports.getTodayVisitsForHospital = exports.searchVisitByTokenToday = exports.createVisit = exports.getNextToken = void 0;
var Visit_1 = require("../models/Visit");
var Token_1 = require("../models/Token");
var appointmentService_1 = require("./appointmentService");
var patientService_1 = require("./patientService");
var mongoose_1 = require("mongoose");
/**
 * Atomic token generation for a hospital on a specific date
 */
var getNextToken = function (hospitalId, date) { return __awaiter(void 0, void 0, void 0, function () {
    var startOfDay, tokenRecord;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                startOfDay = new Date(date);
                startOfDay.setHours(0, 0, 0, 0);
                return [4 /*yield*/, Token_1.Token.findOneAndUpdate({ hospitalId: hospitalId, date: startOfDay }, { $inc: { currentToken: 1 } }, { upsert: true, new: true, setDefaultsOnInsert: true })];
            case 1:
                tokenRecord = _a.sent();
                return [2 /*return*/, tokenRecord.currentToken];
        }
    });
}); };
exports.getNextToken = getNextToken;
var createVisit = function (appointmentId, patientId) { return __awaiter(void 0, void 0, void 0, function () {
    var appointment, patient, hospitalId, visitToken, visit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, appointmentService_1.getAppointmentByPublicId)(appointmentId)];
            case 1:
                appointment = _a.sent();
                return [4 /*yield*/, (0, patientService_1.getPatientById)(patientId)];
            case 2:
                patient = _a.sent();
                hospitalId = appointment.hospitalId;
                return [4 /*yield*/, (0, exports.getNextToken)(hospitalId, new Date())];
            case 3:
                visitToken = _a.sent();
                visit = new Visit_1.Visit({
                    visitToken: visitToken,
                    patientId: patient._id,
                    hospitalId: hospitalId,
                    doctorId: appointment.doctorId,
                    status: 'waiting',
                });
                return [4 /*yield*/, visit.save()];
            case 4:
                _a.sent();
                return [2 /*return*/, visit];
        }
    });
}); };
exports.createVisit = createVisit;
var searchVisitByTokenToday = function (tokenNumber, hospitalId) { return __awaiter(void 0, void 0, void 0, function () {
    var startOfDay, endOfDay, visits;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                startOfDay = new Date();
                startOfDay.setHours(0, 0, 0, 0);
                endOfDay = new Date();
                endOfDay.setHours(23, 59, 59, 999);
                return [4 /*yield*/, Visit_1.Visit.aggregate([
                        {
                            $match: {
                                visitToken: tokenNumber,
                                hospitalId: new mongoose_1.Types.ObjectId(hospitalId),
                                createdAt: { $gte: startOfDay, $lte: endOfDay }
                            }
                        },
                        {
                            $lookup: {
                                from: 'patients',
                                localField: 'patientId',
                                foreignField: '_id',
                                as: 'patient'
                            }
                        },
                        {
                            $unwind: '$patient'
                        },
                        {
                            $project: {
                                __v: 0,
                                'patient.__v': 0
                            }
                        }
                    ])];
            case 1:
                visits = _a.sent();
                return [2 /*return*/, visits[0] || null];
        }
    });
}); };
exports.searchVisitByTokenToday = searchVisitByTokenToday;
var getTodayVisitsForHospital = function (hospitalId_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([hospitalId_1], args_1, true), void 0, function (hospitalId, page, limit) {
        var startOfDay, endOfDay, skip, visits, total;
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startOfDay = new Date();
                    startOfDay.setHours(0, 0, 0, 0);
                    endOfDay = new Date();
                    endOfDay.setHours(23, 59, 59, 999);
                    skip = (page - 1) * limit;
                    return [4 /*yield*/, Visit_1.Visit.aggregate([
                            {
                                $match: {
                                    hospitalId: new mongoose_1.Types.ObjectId(hospitalId),
                                    createdAt: { $gte: startOfDay, $lte: endOfDay }
                                }
                            },
                            {
                                $lookup: {
                                    from: 'patients',
                                    localField: 'patientId',
                                    foreignField: '_id',
                                    as: 'patient'
                                }
                            },
                            {
                                $unwind: '$patient'
                            },
                            { $sort: { visitToken: 1 } },
                            { $skip: skip },
                            { $limit: limit },
                            {
                                $project: {
                                    __v: 0,
                                    'patient.__v': 0
                                }
                            }
                        ])];
                case 1:
                    visits = _a.sent();
                    return [4 /*yield*/, Visit_1.Visit.countDocuments({
                            hospitalId: new mongoose_1.Types.ObjectId(hospitalId),
                            createdAt: { $gte: startOfDay, $lte: endOfDay }
                        })];
                case 2:
                    total = _a.sent();
                    return [2 /*return*/, {
                            data: visits,
                            total: total,
                            page: page,
                            limit: limit
                        }];
            }
        });
    });
};
exports.getTodayVisitsForHospital = getTodayVisitsForHospital;
var updateVisitMedicalDetails = function (visitId, medicalDetails) { return __awaiter(void 0, void 0, void 0, function () {
    var visit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Visit_1.Visit.findByIdAndUpdate(visitId, __assign(__assign({}, medicalDetails), { status: 'done' }), { new: true }).select('-__v')];
            case 1:
                visit = _a.sent();
                if (!visit) {
                    throw new Error('Visit not found');
                }
                return [2 /*return*/, visit];
        }
    });
}); };
exports.updateVisitMedicalDetails = updateVisitMedicalDetails;
var getPatientVisitsHistory = function (patientId) { return __awaiter(void 0, void 0, void 0, function () {
    var visits;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1.Types.ObjectId.isValid(patientId)) {
                    throw new Error('Invalid patient ID');
                }
                return [4 /*yield*/, Visit_1.Visit.find({
                        patientId: new mongoose_1.Types.ObjectId(patientId),
                        status: 'done'
                    })
                        .sort({ createdAt: -1 })
                        .select('-__v')];
            case 1:
                visits = _a.sent();
                return [2 /*return*/, visits];
        }
    });
}); };
exports.getPatientVisitsHistory = getPatientVisitsHistory;
var countPatientDoneVisits = function (patientId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!mongoose_1.Types.ObjectId.isValid(patientId)) {
            return [2 /*return*/, 0];
        }
        return [2 /*return*/, Visit_1.Visit.countDocuments({
                patientId: new mongoose_1.Types.ObjectId(patientId),
                status: 'done'
            })];
    });
}); };
exports.countPatientDoneVisits = countPatientDoneVisits;
