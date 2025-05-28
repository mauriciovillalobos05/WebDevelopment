import { Router } from "express";
import FavoriteController from "../controllers/favoriteController.js";

const favoriteRouter = Router();
const controller = new FavoriteController();

favoriteRouter.get('/', (req, res) => controller.getAllFavorites(req, res));
favoriteRouter.get('/:id', (req, res) => controller.getFavoriteById(req, res));
favoriteRouter.post('/', (req, res) => controller.createFavorite(req, res));
favoriteRouter.put('/:id', (req, res) => controller.updateFavorite(req, res));

export default favoriteRouter;