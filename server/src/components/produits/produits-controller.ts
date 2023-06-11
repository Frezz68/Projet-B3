import {Produit} from "../../entity/Produit";
import {getRepository} from "typeorm";
import { Request, Response } from 'express';

// fonction pour récupérer tous les produits
export async function getProduits (req :Request, res :Response)  {
    // récupère le repository de l'entité Produit
    const produitRepository = getRepository(Produit);
    // récupère tous les produits
    const produits = await produitRepository.find();
    if (!produits) {
        return res.status(404).json({error: 'no produits found'});
    }
    res.send(produits);
}

// fonction pour récupérer un produit par son id
export async function getProduitById (req :Request, res :Response)  {
    // récupère l'id du produit dans l'url
    const id = req.params.id;
    // récupère le repository de l'entité Produit
    const produitRepository = getRepository(Produit);
    // récupère le produit correspondant à l'id
    const produit = await produitRepository.findOne({where: {idProduit: parseInt(id)}});
    // si le produit n'existe pas
    if (!produit) {
        return res.status(404).json({error: 'Produit not found'});
    }
    res.send(produit);
}

// fonction pour créer un produit
export async function createProduit (req :Request, res :Response)  {
    // récupère les données du produit dans le body de la requête
    const {nom, prix, description, quantite, pathToImage} = req.body;
    // si un champ est manquant
    if( !nom || !prix || !description || !quantite || !pathToImage) return res.status(400).json({error: 'Missing nom or prix or description or quantite or pathToImage'});
    // récupère le repository de l'entité Produit
    const produitRepository = getRepository(Produit);
    // crée un nouveau produit
    const newProduit = produitRepository.create({nom: nom, description: description, prix: prix, qteStock: quantite, pathToImage: pathToImage});
    // sauvegarde le produit dans la base de données
    await produitRepository.save(newProduit);
    res.status(201).json({message: 'Produit created'});
}

// fonction pour mettre à jour un produit
export async function updateProduit (req :Request, res :Response)  {
    // récupère l'id du produit dans l'url
    const id = req.params.id;
    // récupère les données du produit dans le body de la requête
    const {nom, prix, description, quantite, pathToImage} = req.body;
    // récupère le repository de l'entité Produit
    const produitRepository = getRepository(Produit);
    // récupère le produit correspondant à l'id
    const produit = await produitRepository.findOne({where: {idProduit: parseInt(id)}});
    // si le produit n'existe pas
    if (!produit) {
        return res.status(404).json({error: 'Produit not found'});
    }
    // met à jour les données du produit
    if (nom !== undefined) produit.nom = nom;
    if (prix !== undefined) produit.prix = prix;
    if (description !== undefined) produit.description = description;
    if (quantite !== undefined) produit.qteStock = quantite;
    if (pathToImage !== undefined) produit.pathToImage = pathToImage;
    // sauvegarde le produit dans la base de données
    await produitRepository.save(produit);
    res.send({message: 'Produit updated'});
}

// fonction pour supprimer un produit
export async function deleteProduit (req :Request, res :Response)  {
    // récupère l'id du produit dans l'url
    const id = req.params.id;
    // récupère le repository de l'entité Produit
    const produitRepository = getRepository(Produit);
    // récupère le produit correspondant à l'id
    const produit = await produitRepository.findOne({where: {idProduit: parseInt(id)}});
    // si le produit n'existe pas
    if (!produit) {
        return res.status(404).json({error: 'Produit not found'});
    }
    // supprime le produit de la base de données
    await produitRepository.delete(id);
    res.send({message: 'Produit deleted'});
}