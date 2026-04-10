import {Router} from "express";
import {validate} from "../../middlewares/validatemiddleware.js";
import {registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema} from "./authvalidators.js";
import {register, login, refresh, logout, forgotPasswordController, resetPasswordController} from "./authcontroller.js";
import authLimiter from "../../middlewares/ratelimitmiddleware.js";
const router = Router();

router.use(authLimiter); // Apply rate limiting to all auth routes

router.post('/register',validate(registerSchema),register);
router.post('/login',validate(loginSchema),login);
router.post('/refresh-token',refresh);
router.post('/logout',logout);
router.post('/forgot-password',validate(forgotPasswordSchema),forgotPasswordController);
router.post('/reset-password/:token',validate(resetPasswordSchema),resetPasswordController);

export default router;

