import {Facture} from "../../entity/Facture";
import {getRepository} from "typeorm";
import { Request, Response } from 'express';

export async function getFactures (req :Request, res :Response)  {
    const factureRepository = getRepository(Facture);
    const factures = await factureRepository.find();
    if (!factures) {
        return res.status(404).json({error: 'no factures found'});
    }
    res.send(factures);
}

export async function getFactureById (req :Request, res :Response)  {
    const id = req.params.id;
    const factureRepository = getRepository(Facture);
    const facture = await factureRepository.findOne({where: {idFacture: parseInt(id)}});
    if (!facture) {
        return res.status(404).json({error: 'Facture not found'});
    }
    res.send(facture);
}

export async function createFacture (req :Request, res :Response)  {
    const {idClient, idProduit, quantite} = req.body;
    if( !idClient || !idProduit || !quantite) return res.status(400).json({error: 'Missing idClient or idProduit or quantite'});
    const factureRepository = getRepository(Facture);
    const newFacture = factureRepository.create({Client: idClient, refProduit: idProduit, dateEmmission: new Date(),});
    await factureRepository.save(newFacture);
    res.status(201).json({message: 'Facture created'});
}

export async function updateFacture (req :Request, res :Response)  {
    const id = req.params.id;
    const {idClient, idProduit, quantite} = req.body;
    if( !idClient || !idProduit || !quantite) return res.status(400).json({error: 'Missing idClient or idProduit or quantite'});
    const factureRepository = getRepository(Facture);
    const facture = await factureRepository.findOne({where: {idFacture: parseInt(id)}});
    if (!facture) {
        return res.status(404).json({error: 'Facture not found'});
    }
    facture.Client = idClient;
    facture.refProduit = idProduit;
    facture.dateEmmission = new Date();
    await factureRepository.save(facture);
    res.send({message: 'Facture updated'});
}

export async function deleteFacture (req :Request, res :Response)  {
    const id = req.params.id;
    const factureRepository = getRepository(Facture);
    const facture = await factureRepository.findOne({where: {idFacture: parseInt(id)}});
    if (!facture) {
        return res.status(404).json({error: 'Facture not found'});
    }
    await factureRepository.delete(id);
    res.send({message: 'Facture deleted'});
}
