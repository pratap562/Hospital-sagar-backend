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
exports.deleteSlotsByDate = exports.deleteSlot = exports.getSlotById = exports.getSlotsByHospital = exports.createSlots = exports.generateTimeSlots = void 0;
var SlotWindow_1 = require("../models/SlotWindow");
var Appointment_1 = require("../models/Appointment");
var mongoose_1 = require("mongoose");
/**
 * Generate time slots from given start time to end time
 */
var generateTimeSlots = function (startTimeStr, endTimeStr, durationMinutes) {
    var slots = [];
    var _a = startTimeStr.split(':').map(Number), startHour = _a[0], startMinute = _a[1];
    var _b = endTimeStr.split(':').map(Number), endHour = _b[0], endMinute = _b[1];
    var currentHour = startHour;
    var currentMinute = startMinute;
    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
        var startTime = "".concat(String(currentHour).padStart(2, '0'), ":").concat(String(currentMinute).padStart(2, '0'));
        // Calculate end time
        var tempMinute = currentMinute + durationMinutes;
        var tempHour = currentHour;
        while (tempMinute >= 60) {
            tempMinute -= 60;
            tempHour += 1;
        }
        // Stop if end time exceeds specified end time
        if (tempHour > endHour || (tempHour === endHour && tempMinute > endMinute)) {
            break;
        }
        var endTime = "".concat(String(tempHour).padStart(2, '0'), ":").concat(String(tempMinute).padStart(2, '0'));
        slots.push({ startTime: startTime, endTime: endTime });
        // Move to next slot start time
        currentMinute += durationMinutes;
        while (currentMinute >= 60) {
            currentMinute -= 60;
            currentHour += 1;
        }
    }
    return slots;
};
exports.generateTimeSlots = generateTimeSlots;
/**
 * Create slots for a hospital
 */
var createSlots = function (slotData, hospitalObjectId) { return __awaiter(void 0, void 0, void 0, function () {
    var slotDuration, maxCapacity, startDate, endDate, startTime, endTime, start, end, today, numberOfDays, thirtyDaysFromNow, timeSlots, slotsToCreate, day, slotDate, slotNumber, _i, timeSlots_1, timeSlot, _a, startH, startM, _b, endH, endM, startTimeDate, endTimeDate, createdSlots;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                slotDuration = slotData.slotDuration, maxCapacity = slotData.maxCapacity, startDate = slotData.startDate, endDate = slotData.endDate, startTime = slotData.startTime, endTime = slotData.endTime;
                start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                end = new Date(endDate);
                end.setHours(0, 0, 0, 0);
                if (start > end) {
                    throw new Error('Start date cannot be after end date');
                }
                today = new Date();
                today.setHours(0, 0, 0, 0);
                if (start < today) {
                    throw new Error('Start date cannot be in the past');
                }
                numberOfDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                if (numberOfDays > 30) {
                    throw new Error('Cannot create slots for more than 30 days at once');
                }
                thirtyDaysFromNow = new Date(today);
                thirtyDaysFromNow.setDate(today.getDate() + 30);
                if (end > thirtyDaysFromNow) {
                    throw new Error('Cannot create slots more than 30 days into the future');
                }
                timeSlots = (0, exports.generateTimeSlots)(startTime, endTime, slotDuration);
                if (timeSlots.length === 0) {
                    throw new Error('Invalid parameters: No slots can be created with given times and duration');
                }
                slotsToCreate = [];
                for (day = 0; day < numberOfDays; day++) {
                    slotDate = new Date(start);
                    slotDate.setDate(start.getDate() + day);
                    slotDate.setHours(0, 0, 0, 0);
                    slotNumber = 1;
                    for (_i = 0, timeSlots_1 = timeSlots; _i < timeSlots_1.length; _i++) {
                        timeSlot = timeSlots_1[_i];
                        _a = timeSlot.startTime.split(':').map(Number), startH = _a[0], startM = _a[1];
                        _b = timeSlot.endTime.split(':').map(Number), endH = _b[0], endM = _b[1];
                        startTimeDate = new Date(slotDate);
                        startTimeDate.setHours(startH, startM, 0, 0);
                        endTimeDate = new Date(slotDate);
                        endTimeDate.setHours(endH, endM, 0, 0);
                        slotsToCreate.push({
                            hospitalId: hospitalObjectId,
                            startTime: startTimeDate,
                            endTime: endTimeDate,
                            slotDate: slotDate,
                            maxCapacity: maxCapacity,
                            bookedCount: 0,
                            slotNumber: slotNumber++, // Use incrementing slot number
                        });
                    }
                }
                return [4 /*yield*/, SlotWindow_1.SlotWindow.insertMany(slotsToCreate)];
            case 1:
                createdSlots = _c.sent();
                return [2 /*return*/, {
                        slotsCreated: createdSlots.length,
                        days: numberOfDays,
                        slotsPerDay: timeSlots.length,
                    }];
        }
    });
}); };
exports.createSlots = createSlots;
/**
 * Get slots by hospital with pagination
 */
var getSlotsByHospital = function (hospitalObjectId, options) { return __awaiter(void 0, void 0, void 0, function () {
    var page, limit, skip, slots, total;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                page = options.page, limit = options.limit;
                skip = (page - 1) * limit;
                return [4 /*yield*/, SlotWindow_1.SlotWindow.find({ hospitalId: hospitalObjectId })
                        .sort({ slotDate: 1, startTime: 1 })
                        .skip(skip)
                        .limit(limit)
                        .select('-__v')
                        .populate('hospitalId', 'name city')];
            case 1:
                slots = _a.sent();
                return [4 /*yield*/, SlotWindow_1.SlotWindow.countDocuments({ hospitalId: hospitalObjectId })];
            case 2:
                total = _a.sent();
                return [2 /*return*/, {
                        data: slots,
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
exports.getSlotsByHospital = getSlotsByHospital;
/**
 * Get slot by ID
 */
var getSlotById = function (slotId) { return __awaiter(void 0, void 0, void 0, function () {
    var slot;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1.Types.ObjectId.isValid(slotId)) {
                    throw new Error('Invalid slot ID');
                }
                return [4 /*yield*/, SlotWindow_1.SlotWindow.findById(slotId)
                        .select('-__v')
                        .populate('hospitalId', 'name city')];
            case 1:
                slot = _a.sent();
                if (!slot) {
                    throw new Error('Slot not found');
                }
                return [2 /*return*/, slot];
        }
    });
}); };
exports.getSlotById = getSlotById;
/**
 * Delete slot (only if no bookings)
 */
var deleteSlot = function (slotId) { return __awaiter(void 0, void 0, void 0, function () {
    var slot, appointments;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1.Types.ObjectId.isValid(slotId)) {
                    throw new Error('Invalid slot ID');
                }
                return [4 /*yield*/, SlotWindow_1.SlotWindow.findById(slotId)];
            case 1:
                slot = _a.sent();
                if (!slot) {
                    throw new Error('Slot not found');
                }
                return [4 /*yield*/, Appointment_1.Appointment.find({
                        slotWindowId: slot._id,
                        status: { $ne: 'cancelled' },
                    })];
            case 2:
                appointments = _a.sent();
                if (appointments.length > 0) {
                    throw new Error("Cannot delete slot: Slot has ".concat(appointments.length, " active booking(s)"));
                }
                // Delete the slot
                return [4 /*yield*/, SlotWindow_1.SlotWindow.findByIdAndDelete(slotId)];
            case 3:
                // Delete the slot
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.deleteSlot = deleteSlot;
/**
 * Delete all slots for a specific date (only if no bookings)
 */
var deleteSlotsByDate = function (hospitalObjectId, dateStr) { return __awaiter(void 0, void 0, void 0, function () {
    var date, slots, bookedSlots;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                date = new Date(dateStr);
                date.setHours(0, 0, 0, 0);
                return [4 /*yield*/, SlotWindow_1.SlotWindow.find({
                        hospitalId: hospitalObjectId,
                        slotDate: date
                    })];
            case 1:
                slots = _a.sent();
                if (slots.length === 0) {
                    throw new Error('No slots found for the specified date');
                }
                bookedSlots = slots.filter(function (s) { return s.bookedCount > 0; });
                if (bookedSlots.length > 0) {
                    throw new Error("Cannot delete slots: ".concat(bookedSlots.length, " slots already have bookings"));
                }
                // Delete all slots for this date
                return [4 /*yield*/, SlotWindow_1.SlotWindow.deleteMany({
                        hospitalId: hospitalObjectId,
                        slotDate: date
                    })];
            case 2:
                // Delete all slots for this date
                _a.sent();
                return [2 /*return*/, { deletedCount: slots.length }];
        }
    });
}); };
exports.deleteSlotsByDate = deleteSlotsByDate;
