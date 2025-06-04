import userModel from "../models/userModel.js";

export default class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await userModel.getAllUsers();
            console.log('Fetched users:', users);
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getUserById(req, res) {
        const { id } = req.params;
        console.log("params", req.params);
        try {
            const user = await userModel.getUserById(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getUserByEmail(req, res) {
        const { mail } = req.params;
        console.log("params", req.params);
        try {
            const user = await userModel.getUserByEmail(mail);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async createUser(req, res) {
        const userData = req.body;
        console.log(req.body);
        try {
        const newUser = await userModel.createUser(userData);
        res.status(201).json(newUser);
        } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const userData = req.body;
        try {
            const updateUser = await userModel.updateUser(id, userData);
            res.status(200).json(updateUser);
        } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}