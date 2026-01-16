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
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmBooking = exports.releaseSlotLock = exports.createSlotLock = exports.getPublicSlots = void 0;
var SlotWindow_1 = require("../models/SlotWindow");
var SlotLock_1 = require("../models/SlotLock");
var Appointment_1 = require("../models/Appointment");
var Patient_1 = require("../models/Patient");
var mongoose_1 = require("mongoose");
var uuid_1 = require("uuid");
/**
 * Get available slots for a hospital (public endpoint)
 * Returns slots with real-time availability accounting for both bookedCount and active locks
 */
var getPublicSlots = function (hospitalId, date) { return __awaiter(void 0, void 0, void 0, function () {
    var hospitalObjectId, query, targetDate, nextDay, today, slots, slotsWithAvailability;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1.Types.ObjectId.isValid(hospitalId)) {
                    throw new Error('Invalid hospital ID');
                }
                hospitalObjectId = new mongoose_1.Types.ObjectId(hospitalId);
                query = { hospitalId: hospitalObjectId };
                // Filter by date if provided, otherwise get future slots
                if (date) {
                    targetDate = new Date(date);
                    targetDate.setHours(0, 0, 0, 0);
                    nextDay = new Date(targetDate);
                    nextDay.setDate(nextDay.getDate() + 1);
                    query.slotDate = { $gte: targetDate, $lt: nextDay };
                }
                else {
                    today = new Date();
                    today.setHours(0, 0, 0, 0);
                    query.slotDate = { $gte: today };
                }
                return [4 /*yield*/, SlotWindow_1.SlotWindow.find(query)
                        .sort({ slotDate: 1, startTime: 1 })
                        .select('-__v')
                        .lean()];
            case 1:
                slots = _a.sent();
                return [4 /*yield*/, Promise.all(slots.map(function (slot) { return __awaiter(void 0, void 0, void 0, function () {
                        var activeLocksCount, available;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, SlotLock_1.SlotLock.countDocuments({
                                        slotWindowId: slot._id,
                                        isBooked: false,
                                        expiresAt: { $gt: new Date() },
                                    })];
                                case 1:
                                    activeLocksCount = _a.sent();
                                    available = slot.maxCapacity - slot.bookedCount - activeLocksCount;
                                    return [2 /*return*/, __assign(__assign({}, slot), { id: slot._id.toString(), activeLocksCount: activeLocksCount, availableCount: Math.max(0, available), isFull: available <= 0 })];
                            }
                        });
                    }); }))];
            case 2:
                slotsWithAvailability = _a.sent();
                return [2 /*return*/, slotsWithAvailability];
        }
    });
}); };
exports.getPublicSlots = getPublicSlots;
/**
 * Create a slot lock when user proceeds to payment
 * Atomically checks capacity before creating lock
 */
var createSlotLock = function (slotId) { return __awaiter(void 0, void 0, void 0, function () {
    var slotObjectId, slot, activeLocksCount, available, bookingAttemptId, expiresAt, slotLock, updatedActiveLocksCount, currentAvailable;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1.Types.ObjectId.isValid(slotId)) {
                    throw new Error('Invalid slot ID');
                }
                slotObjectId = new mongoose_1.Types.ObjectId(slotId);
                return [4 /*yield*/, SlotWindow_1.SlotWindow.findById(slotObjectId)];
            case 1:
                slot = _a.sent();
                if (!slot) {
                    throw new Error('Slot not found');
                }
                return [4 /*yield*/, SlotLock_1.SlotLock.countDocuments({
                        slotWindowId: slotObjectId,
                        isBooked: false,
                        expiresAt: { $gt: new Date() },
                    })];
            case 2:
                activeLocksCount = _a.sent();
                available = slot.maxCapacity - slot.bookedCount - activeLocksCount;
                if (available <= 0) {
                    throw new Error('Slot is no longer available. Please select another slot.');
                }
                bookingAttemptId = (0, uuid_1.v4)();
                expiresAt = new Date();
                expiresAt.setMinutes(expiresAt.getMinutes() + 10);
                slotLock = new SlotLock_1.SlotLock({
                    slotWindowId: slotObjectId,
                    bookingAttemptId: bookingAttemptId,
                    isBooked: false,
                    expiresAt: expiresAt,
                });
                return [4 /*yield*/, slotLock.save()];
            case 3:
                _a.sent();
                return [4 /*yield*/, SlotLock_1.SlotLock.countDocuments({
                        slotWindowId: slotObjectId,
                        isBooked: false,
                        expiresAt: { $gt: new Date() },
                    })];
            case 4:
                updatedActiveLocksCount = _a.sent();
                currentAvailable = slot.maxCapacity - slot.bookedCount - updatedActiveLocksCount;
                if (!(currentAvailable < 0)) return [3 /*break*/, 6];
                return [4 /*yield*/, SlotLock_1.SlotLock.findByIdAndDelete(slotLock._id)];
            case 5:
                _a.sent();
                throw new Error('Slot is no longer available. Please select another slot.');
            case 6: return [2 /*return*/, {
                    lockId: slotLock._id.toString(),
                    bookingAttemptId: bookingAttemptId,
                    expiresAt: expiresAt,
                    slot: {
                        id: slot._id.toString(),
                        startTime: slot.startTime,
                        endTime: slot.endTime,
                        slotNumber: slot.slotNumber,
                    },
                }];
        }
    });
}); };
exports.createSlotLock = createSlotLock;
/**
 * Release a slot lock (when user cancels payment)
 */
var releaseSlotLock = function (lockId) { return __awaiter(void 0, void 0, void 0, function () {
    var lock;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1.Types.ObjectId.isValid(lockId)) {
                    throw new Error('Invalid lock ID');
                }
                return [4 /*yield*/, SlotLock_1.SlotLock.findById(lockId)];
            case 1:
                lock = _a.sent();
                if (!lock) {
                    throw new Error('Lock not found');
                }
                // Only delete if not already booked
                if (lock.isBooked) {
                    throw new Error('Cannot release a confirmed booking');
                }
                return [4 /*yield*/, SlotLock_1.SlotLock.findByIdAndDelete(lockId)];
            case 2:
                _a.sent();
                return [2 /*return*/, { success: true, message: 'Lock released successfully' }];
        }
    });
}); };
exports.releaseSlotLock = releaseSlotLock;
var confirmBooking = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var lockId, name, email, phoneNo, healthIssue, doctorId, doctorName, duration, amount, lock, slot, patient, generateAppointmentId, retries, appointment, saved, appointmentId, err_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                lockId = data.lockId, name = data.name, email = data.email, phoneNo = data.phoneNo, healthIssue = data.healthIssue, doctorId = data.doctorId, doctorName = data.doctorName, duration = data.duration, amount = data.amount;
                if (!mongoose_1.Types.ObjectId.isValid(lockId)) {
                    throw new Error('Invalid lock ID');
                }
                return [4 /*yield*/, SlotLock_1.SlotLock.findOneAndUpdate({
                        _id: lockId,
                        isBooked: false,
                        expiresAt: { $gt: new Date() }
                    }, { isBooked: true }, { new: true })];
            case 1:
                lock = _a.sent();
                if (!lock) {
                    throw new Error('Lock not found, expired, or already booked. Please try booking again.');
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 14, , 16]);
                return [4 /*yield*/, SlotWindow_1.SlotWindow.findById(lock.slotWindowId)];
            case 3:
                slot = _a.sent();
                if (!slot) {
                    throw new Error('Slot not found');
                }
                return [4 /*yield*/, Patient_1.Patient.findOne({ phoneNo: phoneNo })];
            case 4:
                patient = _a.sent();
                if (!!patient) return [3 /*break*/, 6];
                patient = new Patient_1.Patient({ name: name, email: email, phoneNo: phoneNo });
                return [4 /*yield*/, patient.save()];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                generateAppointmentId = function () {
                    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    var randomLetters = Array(3).fill(null).map(function () { return letters.charAt(Math.floor(Math.random() * letters.length)); }).join('');
                    var randomDigits = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
                    return "".concat(randomLetters).concat(randomDigits);
                };
                retries = 3;
                appointment = void 0;
                saved = false;
                _a.label = 7;
            case 7:
                if (!(retries > 0 && !saved)) return [3 /*break*/, 12];
                _a.label = 8;
            case 8:
                _a.trys.push([8, 10, , 11]);
                appointmentId = generateAppointmentId();
                appointment = new Appointment_1.Appointment({
                    appointmentId: appointmentId,
                    name: name,
                    email: email,
                    phoneNo: phoneNo,
                    healthIssue: healthIssue,
                    hospitalId: slot.hospitalId,
                    mode: 'offline', // Default to offline for slot bookings
                    status: 'booked',
                    amountPaid: amount,
                    duration: duration,
                    appointmentDate: slot.slotDate,
                    doctorId: new mongoose_1.Types.ObjectId(doctorId),
                    doctorName: doctorName,
                    patientId: patient._id,
                    slotWindowId: slot._id,
                    slotNumber: slot.slotNumber,
                    slotStartTime: slot.startTime,
                    slotEndTime: slot.endTime,
                });
                return [4 /*yield*/, appointment.save()];
            case 9:
                _a.sent();
                saved = true;
                return [3 /*break*/, 11];
            case 10:
                err_1 = _a.sent();
                // Check for duplicate key error (code 11000)
                if (err_1.code === 11000 && retries > 1) {
                    console.warn("Duplicate appointment ID generated, retrying... (".concat(retries - 1, " retries left)"));
                    retries--;
                    return [3 /*break*/, 7];
                }
                // If other error or no retries left, throw
                throw err_1;
            case 11: return [3 /*break*/, 7];
            case 12: 
            // Increment bookedCount on the slot
            return [4 /*yield*/, SlotWindow_1.SlotWindow.findByIdAndUpdate(slot._id, { $inc: { bookedCount: 1 } })];
            case 13:
                // Increment bookedCount on the slot
                _a.sent();
                // Note: Lock is already marked as booked.
                return [2 /*return*/, {
                        success: true,
                        appointmentId: appointment.appointmentId,
                        appointment: {
                            id: appointment._id.toString(),
                            appointmentId: appointment.appointmentId,
                            slotNumber: slot.slotNumber,
                            slotStartTime: slot.startTime,
                            slotEndTime: slot.endTime,
                            hospitalId: slot.hospitalId.toString(),
                        },
                    }];
            case 14:
                error_1 = _a.sent();
                // ROLLBACK: If appointment creation fails, revert the lock status
                return [4 /*yield*/, SlotLock_1.SlotLock.findByIdAndUpdate(lockId, { isBooked: false })];
            case 15:
                // ROLLBACK: If appointment creation fails, revert the lock status
                _a.sent();
                throw error_1;
            case 16: return [2 /*return*/];
        }
    });
}); };
exports.confirmBooking = confirmBooking;
