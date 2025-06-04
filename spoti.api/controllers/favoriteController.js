import favoriteModel from "../models/favoriteModel.js";

export default class FavoriteController {
    async getAllFavorites(req, res) {
        try {
            const favorites = await favoriteModel.getAllFavorites();
            res.status(200).json(favorites);
        } catch (error) {
            console.error('Error fetching favorites:', error.stack || error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    async getFavoriteById(req, res) {
        const { id } = req.params;
        try {
            const favorite = await favoriteModel.getFavoriteById(id);
            if (!favorite) {
                return res.status(404).json({ error: 'Favorito no encontrado' });
            }
            res.status(200).json(favorite);
        } catch (error) {
            console.error('Error al obtener favorito por ID:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    async createFavorite(req, res) {
        const userId = req?.user?.id;
        const { items } = req.body;

        if (!userId) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'La lista de favoritos es inválida o está vacía' });
        }

        try {
            const newFavorite = await favoriteModel.createFavorite({ user_id: userId, items });
            res.status(201).json(newFavorite);
        } catch (error) {
            console.error('Error al crear favorito:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    async updateFavorite(req, res) {
        const { id } = req.params;
        const { user_id, items } = req.body;

        if (!user_id || !items) {
            return res.status(400).json({ error: 'Faltan campos requeridos para actualizar el favorito' });
        }

        try {
            const updated = await favoriteModel.updateFavorite(id, { user_id, items });
            res.status(200).json(updated);
        } catch (error) {
            console.error('Error al actualizar favorito:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}
