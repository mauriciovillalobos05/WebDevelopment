import userModel from "../models/userModel.js";

export default class UserController {
    async getAll(_req, res) {
        console.log("get all")
        try {
            const users = await userModel.getAll();
            return res.status(200).json({ users });

        } catch (error) {
            console.error("Error en getAll:", error.message);
            return res.status(500).send("Error al obtener los usuarios");
        }
    };
}