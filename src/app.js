"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var cookie_parser_1 = require("cookie-parser");
var userRoutes_1 = require("./routes/userRoutes");
var hospitalRoutes_1 = require("./routes/hospitalRoutes");
var slotRoutes_1 = require("./routes/slotRoutes");
var patientRoutes_1 = require("./routes/patientRoutes");
var visitRoutes_1 = require("./routes/visitRoutes");
var pharmacistRoutes_1 = require("./routes/pharmacistRoutes");
var appointmentRoutes_1 = require("./routes/appointmentRoutes");
var metadataRoutes_1 = require("./routes/metadataRoutes");
var leadRoutes_1 = require("./routes/leadRoutes");
var bookingRoutes_1 = require("./routes/bookingRoutes");
var analyticsRoutes_1 = require("./routes/analyticsRoutes");
var db_1 = require("./config/db");
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
// Global middlewares
app.use((0, cors_1.default)({
    origin: true, // In production, replace with actual allowed origins
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// Route mounting
app.use("/api/users", userRoutes_1.default);
app.use("/api/hospitals", hospitalRoutes_1.default);
app.use("/api/slots", slotRoutes_1.default);
app.use("/api/patients", patientRoutes_1.default);
app.use("/api/visits", visitRoutes_1.default);
app.use("/api/pharmacists", pharmacistRoutes_1.default);
app.use("/api/appointments", appointmentRoutes_1.default);
app.use("/api/metadata", metadataRoutes_1.default);
app.use("/api/public/booking", bookingRoutes_1.default); // Public booking routes (no auth)
app.use("/api/analytics", analyticsRoutes_1.default);
app.use("/api/leads", leadRoutes_1.default);
(0, db_1.connectDB)();
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
