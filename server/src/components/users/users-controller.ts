import {User} from "../../entity/User";
import {getRepository} from "typeorm";
import argon2, { hash } from 'argon2';
import { generateToken} from "../../middleware/auth";
import { Request, Response } from 'express';

// fonction pour se connecter
export async function login (req :Request, res :Response)  {
    // récupère les données du produit dans le body de la requête
    const {login , password} = req.body;
    // si un champ est manquant
    if( !login || !password) return res.status(400).json({error: 'Missing login or password'});
    // récupère le repository de l'entité User
    const userRepository = getRepository(User);
    // récupère l'utilisateur correspondant au login
    const user = await userRepository.findOne({where: {login: login}})
    // si l'utilisateur n'existe pas
    if (!user) {
        return res.status(401).json({error: 'User or password is incorrect'});
    }
    // vérifie que le mot de passe est correct
    const validPassword = await argon2.verify(user.password, password);
    // si le mot de passe est incorrect
    if (!validPassword) {
        return res.status(401).json({error: 'User or password is incorrect'});
    }
    // génère un token
    const token = generateToken({userId: user.id});
    // envoie le token
    res.send({ token: token});
}

// fonction pour créer un utilisateur
export async function register (req :Request, res :Response)  {
    // récupère les données du produit dans le body de la requête
    const {login, password} = req.body;
    // si un champ est manquant
    if( !login || !password) return res.status(400).json({error: 'Missing login or password'});
    // récupère le repository de l'entité User
    const userRepository = getRepository(User);
    // vérifie que l'utilisateur n'existe pas déjà
    const newUser = userRepository.create({login: login, password: await hash(password)});
    // sauvegarde l'utilisateur
    await userRepository.save(newUser);
    res.status(201).json({message: 'User created'});
}

// fonction pour récupérer un utilisateur par son id
export async function getUserById (req :Request, res :Response)  {
    // récupère l'id dans les paramètres de la requête
    const id = req.params.id;
    // récupère le repository de l'entité User
    const userRepository = getRepository(User);
    // récupère l'utilisateur correspondant à l'id
    const user = await userRepository.createQueryBuilder('user').select(['user.id', 'user.login']).where("id = :id", {id: id}).getOne();
    // si l'utilisateur n'existe pas
    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }
    // envoie l'utilisateur
    res.send(user);
}

// fonction pour récupérer tous les utilisateurs
export async function getUsers (req :Request, res :Response)  {
    // récupère le repository de l'entité User
    const userRepository = getRepository(User);
    // récupère tous les utilisateurs
    const users = await userRepository.createQueryBuilder('user').select(['user.id', 'user.login']).getMany();
    // si aucun utilisateur n'est trouvé
    if (!users) {
        return res.status(404).json({error: 'no users found'});
    }
    // envoie les utilisateurs
    res.send(users);
}

// fonction pour supprimer un utilisateur
export async function deleteUser (req :Request, res :Response)  {
    // récupère l'id dans les paramètres de la requête
    const id = req.params.id;
    // récupère le repository de l'entité User
    const userRepository = getRepository(User);
    // récupère l'utilisateur correspondant à l'id
    const user = await userRepository.findOne({where: {id: parseInt(id)}});
    // si l'utilisateur n'existe pas
    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }
    // supprime l'utilisateur
    await userRepository.delete(id);
    // envoie un message de confirmation
    res.send({message: 'User deleted'});
}

// fonction pour etendre la session d'un utilisateur
export async function extendSession (req :Request, res :Response)  {
    // récupère le token dans le header de la requête
    const authHeader = req.headers.authorization;
    // si le token n'est pas présent
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }
    // récupère le repository de l'entité User
    const token = generateToken({userId: null});
    // envoie le token
    res.send({ token: token});
}