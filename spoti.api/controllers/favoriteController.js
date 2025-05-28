import favoriteModel from "../models/favoriteModel.js";

export default class FavoriteController {
    async getAllFavorites(req, res) {
        try {
            const favorites = await favoriteModel.getAllFavorites();
            console.log('Fetched favorites:', favorites);
            res.status(200).json(favorites);
        } catch (error) {
            console.error('Error fetching favorites:', error.stack || error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getFavoriteById(req, res) {
        const { id } = req.params;
        console.log("params", req.params);
        try {
            const favorite = await favoriteModel.getFavoriteById(id);
            if (!favorite) {
                return res.status(404).json({ error: 'Favorite not found' });
            }
            res.status(200).json(favorite);
        } catch (error) {
            console.error('Error fetching favorite by ID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async createFavorite(req, res) {
        const favoriteData = req.body;
        console.log(req.body);
        try {
        const newFavorite = await favoriteModel.createFavorite(favoriteData);
        res.status(201).json(newFavorite);
        } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateFavorite(req, res) {
        const { id } = req.params;
        const favoriteData = req.body;
        try {
            const updateFavorite = await favoriteModel.updateFavorite(id, favoriteData);
            res.status(200).json(updateFavorite);
        } catch (error) {
        console.error('Error fetching favorite:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}