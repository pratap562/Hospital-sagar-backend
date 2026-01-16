import { Router } from "express";
import {
  createVisit,
  searchVisitByToken,
  getHospitalTodayVisits,
  updateVisitDetails,
  getPatientHistory,
} from "../controllers/visitController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { requireRole } from "../middlewares/roleMiddleware";

const router = Router();

// Universal Check-in access (Receptionist/Admin)
router.post(
  "/",
  authMiddleware,
  requireRole(["receptionist", "admin"]),
  createVisit
);

// Doctor Dashboard features
router.get(
  "/search",
  authMiddleware,
  requireRole(["doctor", "admin"]),
  searchVisitByToken
);
router.get(
  "/today",
  authMiddleware,
  requireRole(["doctor", "admin"]),
  getHospitalTodayVisits
);
router.put(
  "/:visitId",
  authMiddleware,
  requireRole(["doctor", "admin"]),
  updateVisitDetails
);
router.get(
  "/patient/:patientId/history",
  authMiddleware,
  requireRole(["doctor", "admin"]),
  getPatientHistory
);

export default router;
