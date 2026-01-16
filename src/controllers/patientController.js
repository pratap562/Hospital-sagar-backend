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
exports.listPatients = exports.createPatient = exports.getPatientById = void 0;
var patientService_1 = require("../services/patientService");
var getPatientById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var patientId, patient, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                patientId = req.params.patientId;
                if (!patientId) {
                    res.status(400).json({ success: false, message: 'Patient ID is required' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, patientService_1.getPatientById)(patientId)];
            case 1:
                patient = _a.sent();
                res.status(200).json({
                    success: true,
                    data: patient,
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                if (error_1.message === 'Patient not found') {
                    res.status(404).json({ success: false, message: error_1.message });
                    return [2 /*return*/];
                }
                res.status(500).json({ success: false, message: 'Error fetching patient', error: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPatientById = getPatientById;
var createPatient = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var patientData, patient, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                patientData = req.body;
                if (!patientData.name) {
                    res.status(400).json({ success: false, message: 'Patient name is required' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, patientService_1.createPatient)(patientData)];
            case 1:
                patient = _a.sent();
                res.status(201).json({
                    success: true,
                    message: 'Patient created successfully',
                    data: patient,
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ success: false, message: 'Error creating patient', error: error_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createPatient = createPatient;
var listPatients = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, limit, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                page = parseInt(req.query.page) || 1;
                limit = parseInt(req.query.limit) || 10;
                return [4 /*yield*/, (0, patientService_1.listPatients)(page, limit)];
            case 1:
                result = _a.sent();
                res.status(200).json({
                    success: true,
                    data: result.data,
                    total: result.total,
                    page: result.page,
                    limit: result.limit
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({ success: false, message: 'Error listing patients', error: error_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.listPatients = listPatients;
