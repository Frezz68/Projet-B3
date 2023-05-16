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
    const {idClient, refProduits, idUser} = req.body;
    if( !idClient || !refProduits || !idUser) return res.status(400).json({error: 'Missing idClient or idProduit or idUser'});
    const factureRepository = getRepository(Facture);
    const currentDate = new Date();
    const newFacture = factureRepository.create({Client: idClient, refProduit: refProduits, dateEmmission: currentDate, lastModif:currentDate, creeePar: idUser, modifieePar: idUser});
    await factureRepository.save(newFacture);
    res.status(201).json({message: 'Facture created'});
}

export async function updateFacture (req :Request, res :Response)  {
    const id = req.params.id;
    const {refProduits, payee, idUser} = req.body;
    const factureRepository = getRepository(Facture);
    const facture = await factureRepository.findOne({where: {idFacture: parseInt(id)}});
    if (!facture) {
        return res.status(404).json({error: 'Facture not found'});
    }
    if (refProduits !== undefined) facture.refProduit = refProduits;
    if (payee !== undefined) facture.payee = payee;
    if (payee === true) facture.datePaiement = new Date();
    else facture.datePaiement = null;
    facture.lastModif = new Date();
    facture.modifieePar = idUser;

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
