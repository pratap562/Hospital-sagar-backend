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
exports.deleteSlotsByDate = exports.getSlotById = exports.deleteSlot = exports.getSlotsByHospital = exports.createSlots = void 0;
var slotService_1 = require("../services/slotService");
var hospitalService_1 = require("../services/hospitalService");
// ============================================
// ADMIN SLOT MANAGEMENT ROUTES
// ============================================
var createSlots = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hospitalId, slotDuration, maxCapacity, startDate, endDate, startTime, endTime, hospital, slotData, result, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, hospitalId = _a.hospitalId, slotDuration = _a.slotDuration, maxCapacity = _a.maxCapacity, startDate = _a.startDate, endDate = _a.endDate, startTime = _a.startTime, endTime = _a.endTime;
                // Input validation
                if (!hospitalId || !slotDuration || !maxCapacity || !startDate || !endDate || !startTime || !endTime) {
                    res.status(400).json({
                        success: false,
                        message: 'All parameters are required',
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, hospitalService_1.findHospitalObjectId)(hospitalId)];
            case 1:
                hospital = _b.sent();
                slotData = {
                    hospitalId: hospitalId,
                    slotDuration: slotDuration,
                    maxCapacity: maxCapacity,
                    startDate: startDate,
                    endDate: endDate,
                    startTime: startTime,
                    endTime: endTime,
                };
                return [4 /*yield*/, (0, slotService_1.createSlots)(slotData, hospital._id)];
            case 2:
                result = _b.sent();
                res.status(201).json({
                    success: true,
                    message: "Successfully created ".concat(result.slotsCreated, " slots"),
                    data: result,
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                if (error_1.message === 'Hospital not found') {
                    res.status(404).json({ success: false, message: error_1.message });
                    return [2 /*return*/];
                }
                if (error_1.message.includes('exceed 30 days limit')) {
                    res.status(400).json({
                        success: false,
                        message: error_1.message,
                    });
                    return [2 /*return*/];
                }
                res.status(500).json({ success: false, message: 'Error creating slots', error: error_1.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createSlots = createSlots;
var getSlotsByHospital = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var hospitalId, page, limit, hospital, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                hospitalId = req.params.hospitalId;
                page = parseInt(req.query.page) || 1;
                limit = parseInt(req.query.limit) || 10;
                return [4 /*yield*/, (0, hospitalService_1.findHospitalObjectId)(hospitalId)];
            case 1:
                hospital = _a.sent();
                return [4 /*yield*/, (0, slotService_1.getSlotsByHospital)(hospital._id, { page: page, limit: limit })];
            case 2:
                result = _a.sent();
                res.status(200).json({
                    success: true,
                    data: result.data,
                    pagination: result.pagination
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                if (error_2.message === 'Hospital not found') {
                    res.status(404).json({ success: false, message: error_2.message });
                    return [2 /*return*/];
                }
                res.status(500).json({ success: false, message: 'Error fetching slots', error: error_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getSlotsByHospital = getSlotsByHospital;
var deleteSlot = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var slotId, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                slotId = req.params.slotId;
                return [4 /*yield*/, (0, slotService_1.deleteSlot)(slotId)];
            case 1:
                _a.sent();
                res.status(200).json({
                    success: true,
                    message: 'Slot deleted successfully',
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                if (error_3.message === 'Invalid slot ID') {
                    res.status(400).json({ success: false, message: error_3.message });
                    return [2 /*return*/];
                }
                if (error_3.message === 'Slot not found') {
                    res.status(404).json({ success: false, message: error_3.message });
                    return [2 /*return*/];
                }
                if (error_3.message.includes('active booking')) {
                    res.status(400).json({
                        success: false,
                        message: error_3.message,
                    });
                    return [2 /*return*/];
                }
                res.status(500).json({ success: false, message: 'Error deleting slot', error: error_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteSlot = deleteSlot;
var getSlotById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var slotId, slot, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                slotId = req.params.slotId;
                return [4 /*yield*/, (0, slotService_1.getSlotById)(slotId)];
            case 1:
                slot = _a.sent();
                res.status(200).json({
                    success: true,
                    data: slot,
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                if (error_4.message === 'Invalid slot ID') {
                    res.status(400).json({ success: false, message: error_4.message });
                    return [2 /*return*/];
                }
                if (error_4.message === 'Slot not found') {
                    res.status(404).json({ success: false, message: error_4.message });
                    return [2 /*return*/];
                }
                res.status(500).json({ success: false, message: 'Error fetching slot', error: error_4.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSlotById = getSlotById;
var deleteSlotsByDate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var hospitalId, date, hospital, result, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                hospitalId = req.params.hospitalId;
                date = req.query.date;
                if (!hospitalId || !date) {
                    res.status(400).json({ success: false, message: 'Hospital ID and date are required' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, hospitalService_1.findHospitalObjectId)(hospitalId)];
            case 1:
                hospital = _a.sent();
                return [4 /*yield*/, (0, slotService_1.deleteSlotsByDate)(hospital._id, date)];
            case 2:
                result = _a.sent();
                res.status(200).json({
                    success: true,
                    message: "Successfully deleted ".concat(result.deletedCount, " slots for ").concat(date),
                    data: result,
                });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                if (error_5.message === 'Hospital not found') {
                    res.status(404).json({ success: false, message: error_5.message });
                    return [2 /*return*/];
                }
                if (error_5.message === 'No slots found for the specified date') {
                    res.status(404).json({ success: false, message: error_5.message });
                    return [2 /*return*/];
                }
                res.status(500).json({ success: false, message: 'Error deleting slots', error: error_5.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteSlotsByDate = deleteSlotsByDate;
