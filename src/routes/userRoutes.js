"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var roleMiddleware_1 = require("../middlewares/roleMiddleware");
var userController_1 = require("../controllers/userController");
var router = (0, express_1.Router)();
// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================
// User login
router.post('/login', userController_1.login);
// User logout
router.post('/logout', userController_1.logout);
// ============================================
// PROTECTED ROUTES (Authentication required)
// ============================================
router.use(authMiddleware_1.authMiddleware);
// Get current user (from JWT token)
router.get('/me', userController_1.getCurrentUser);
// ============================================
// ADMIN ONLY ROUTES
// ============================================
// Get all users (paginated) - Admin only
router.get('/', (0, roleMiddleware_1.requireRole)(['admin']), userController_1.getAllUsers);
// Create user - Admin only
router.post('/', (0, roleMiddleware_1.requireRole)(['admin']), userController_1.createUser);
// Change user password - Admin only (must come before /:userId)
router.post('/:userId/change-password', (0, roleMiddleware_1.requireRole)(['admin']), userController_1.changeUserPassword);
// Get user by ID - Admin only
router.get('/:userId', (0, roleMiddleware_1.requireRole)(['admin']), userController_1.getUserById);
// Update user - Admin only
router.put('/:userId', (0, roleMiddleware_1.requireRole)(['admin']), userController_1.updateUser);
// ============================================
// Add other user role routes here (doctor, receptionist, etc.)
// ============================================
exports.default = router;
