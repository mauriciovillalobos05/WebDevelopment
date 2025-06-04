import { Router } from "express";
import FavoriteController from "../controllers/favoriteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const favoriteRouter = Router();
const controller = new FavoriteController();

favoriteRouter.get('/', authMiddleware, (req, res) => controller.getAllFavorites(req, res));
favoriteRouter.get('/:id', authMiddleware, (req, res) => controller.getFavoriteById(req, res));
favoriteRouter.post('/', authMiddleware, (req, res) => controller.createFavorite(req, res));
favoriteRouter.put('/:id', authMiddleware, (req, res) => controller.updateFavorite(req, res));

export default favoriteRouter;