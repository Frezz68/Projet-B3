import {User} from "../../entity/User";
import {getRepository} from "typeorm";
import argon2, { hash } from 'argon2';
import { generateToken} from "../../middleware/auth";
import { Request, Response } from 'express';

export async function login (req :Request, res :Response)  {
    const {login , password} = req.body;
    if( !login || !password) return res.status(400).json({error: 'Missing login or password'});
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({where: {login: login}})
    if (!user) {
        return res.status(401).json({error: 'User or password is incorrect'});
    }
    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
        return res.status(401).json({error: 'User or password is incorrect'});
    }
    const token = generateToken({userId: user.id});
    res.send({ token: token});
}

export async function register (req :Request, res :Response)  {
    const {login, password} = req.body;
    if( !login || !password) return res.status(400).json({error: 'Missing login or password'});
    const userRepository = getRepository(User);
    const newUser = userRepository.create({login: login, password: await hash(password)});
    await userRepository.save(newUser);
    res.status(201).json({message: 'User created'});
}

export async function getUserById (req :Request, res :Response)  {
    const id = req.params.id;
    const userRepository = getRepository(User);
    const user = await userRepository.createQueryBuilder('user').select(['user.id', 'user.login']).where("id = :id", {id: id}).getOne();
    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }
    res.send(user);
}

export async function getUsers (req :Request, res :Response)  {
    const userRepository = getRepository(User);
    const users = await userRepository.createQueryBuilder('user').select(['user.id', 'user.login']).getMany();
    if (!users) {
        return res.status(404).json({error: 'no users found'});
    }
    res.send(users);
}

export async function deleteUser (req :Request, res :Response)  {
    const id = req.params.id;
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({where: {id: parseInt(id)}});
    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }
    await userRepository.delete(id);
    res.send({message: 'User deleted'});
}
