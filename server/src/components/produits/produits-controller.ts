import {Produit} from "../../entity/Produit";
import {getRepository} from "typeorm";
import { Request, Response } from 'express';

export async function getProduits (req :Request, res :Response)  {
    const produitRepository = getRepository(Produit);
    const produits = await produitRepository.find();
    if (!produits) {
        return res.status(404).json({error: 'no produits found'});
    }
    res.send(produits);
}

export async function getProduitById (req :Request, res :Response)  {
    const id = req.params.id;
    const produitRepository = getRepository(Produit);
    const produit = await produitRepository.findOne({where: {idProduit: parseInt(id)}});
    if (!produit) {
        return res.status(404).json({error: 'Produit not found'});
    }
    res.send(produit);
}

export async function createProduit (req :Request, res :Response)  {
    const {nom, prix, description, quantite, pathToImage} = req.body;
    if( !nom || !prix || !description || !quantite || !pathToImage) return res.status(400).json({error: 'Missing nom or prix or description or quantite or pathToImage'});
    const produitRepository = getRepository(Produit);
    const newProduit = produitRepository.create({nom: nom, description: description, prix: prix, qteStock: quantite, pathToImage: pathToImage});
    await produitRepository.save(newProduit);
    res.status(201).json({message: 'Produit created'});
}
export async function updateProduit (req :Request, res :Response)  {
    const id = req.params.id;
    const {nom, prix, description, quantite, pathToImage} = req.body;
    const produitRepository = getRepository(Produit);
    const produit = await produitRepository.findOne({where: {idProduit: parseInt(id)}});

    if (!produit) {
        return res.status(404).json({error: 'Produit not found'});
    }
    if (nom !== undefined) produit.nom = nom;
    if (prix !== undefined) produit.prix = prix;
    if (description !== undefined) produit.description = description;
    if (quantite !== undefined) produit.qteStock = quantite;
    if (pathToImage !== undefined) produit.pathToImage = pathToImage;

    await produitRepository.save(produit);
    res.send({message: 'Produit updated'});
}

export async function deleteProduit (req :Request, res :Response)  {
    const id = req.params.id;
    const produitRepository = getRepository(Produit);
    const produit = await produitRepository.findOne({where: {idProduit: parseInt(id)}});
    if (!produit) {
        return res.status(404).json({error: 'Produit not found'});
    }
    await produitRepository.delete(id);
    res.send({message: 'Produit deleted'});
}