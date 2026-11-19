import * as userService from '../services/userService.js';

export const createAccount = async (req, res) => {
    try {
        const result = await userService.createAccount(req.body);
        res.status(201).json({
            success: true,
            message: result
        });
    } catch (e) {
        console.error(e);
        res.status(e.statusCode || 500).json({
            error: e.message || 'Internal Server Error'
        });
    }
};

export const login = async (req, res) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            success: true,
            message: result
        });
    } catch (e) {
        console.error(e);
        res.status(e.statusCode || 500).json({
            error: e.message || 'Internal Server Error'
        });
    }
};