import { Router } from "express";
import {
  createActivity,
  deleteActivity,
  getActivityById,
  getAllActivities,
  updateActivity,
} from "../controller/activityControler.js";

const router = Router();

router.get("/", getAllActivities);
router.get("/:id", getActivityById);
router.post("/", createActivity);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

export default router;
