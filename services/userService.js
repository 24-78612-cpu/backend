import * as userModel from '../models/userModel.js';
import validator from 'validator';
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);

class ValidationError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const doesUserExist = async (email) => {
    const existing = await userModel.findUserByEmail(email);

    return existing[0];
};

const hashPassword = async (password) => {
    const salt = randomBytes(16);
    const hash = await scrypt(password, salt, 64);
    return `${salt.toString('hex')}:${hash.toString('hex')}`;
};

const passwordMatches = async (password, storedPassword) => {
    const [saltHex, hashHex] = storedPassword.split(':');
    if (!saltHex || !hashHex || !/^[a-f0-9]+$/i.test(saltHex) || !/^[a-f0-9]+$/i.test(hashHex)) {
        return false;
    }

    const salt = Buffer.from(saltHex, 'hex');
    const expectedHash = Buffer.from(hashHex, 'hex');
    const actualHash = await scrypt(password, salt, expectedHash.length);
    return timingSafeEqual(expectedHash, actualHash);
};

export const createAccount = async (user) => {
    if (!user.name || !user.email || !user.password) {
        throw new ValidationError('Name, email and password are required.', 400);
    }

    if (!validator.isEmail(user.email)) {
        throw new ValidationError('Improper email format.', 400);
    }

    if (!validator.isStrongPassword(user.password)) {
        throw new ValidationError('Password is not strong enough.', 400);
    }

    if (await doesUserExist(user.email)) {
        throw new ValidationError('An account with that email already exists.', 409);
    }

    const passwordHash = await hashPassword(user.password);
    const result = await userModel.insert(user.name, user.email, passwordHash);
    if (!result) {
        throw new Error('Unable to create an account. Please try again later.');
    }

    return 'Account created successfully!';
};

export const login = async (user) => {
    if (!user.email || !user.password) {
        throw new ValidationError('Email and password are required.', 400);
    }

    const existing = await doesUserExist(user.email);
    if (!existing || !(await passwordMatches(user.password, existing.password))) {
        throw new ValidationError('Invalid email or password.', 401);
    }

    return 'Login successful.';
};
