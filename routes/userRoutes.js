import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  registerUser,
  updateUser,
} from "../controller/userController.js";
// import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);

// router.get("/getMostMatchUsers/:id", getMostMatchUsers);

router.put("/:id", updateUser);

// Rout to delete a movie
router.delete("/:id", deleteUser);

// router.use(protect);
// private routes

export default router;
