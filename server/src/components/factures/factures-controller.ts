import {Facture} from "../../entity/Facture";
import {getRepository} from "typeorm";
import { Request, Response } from 'express';
import {Produit} from "../../entity/Produit";
import {FactureProduit} from "../../entity/FactureProduit";

interface ProduitRef{
    id: number;
    quantite: number;
}
export async function getFactures (req :Request, res :Response)  {
    const factureRepository = getRepository(Facture);
    const factures = await factureRepository
        .createQueryBuilder('facture')
        .leftJoinAndSelect('facture.Client', 'client')
        .leftJoin('facture.modifieePar', 'modifieePar')
        .leftJoin('facture.creeePar', 'creeePar')
        .leftJoin('facture.produits', 'factureProduits')
        .leftJoin('factureProduits.produit', 'produits')
        .addSelect(['modifieePar.id','modifieePar.login', "creeePar.id", "creeePar.login","factureProduits.quantite", "produits"])
        .getMany();
    if (!factures) {
        return res.status(404).json({error: 'no factures found'});
    }
    res.send(factures);
}

export async function getFactureById (req :Request, res :Response)  {
    const id = req.params.id;
    const factureRepository = getRepository(Facture);
    const facture = await factureRepository
        .createQueryBuilder('facture')
        .leftJoinAndSelect('facture.Client', 'client')
        .leftJoin('facture.modifieePar', 'modifieePar')
        .leftJoin('facture.creeePar', 'creeePar')
        .leftJoin('facture.produits', 'factureProduits')
        .leftJoin('factureProduits.produit', 'produits')
        .addSelect(['modifieePar.id','modifieePar.login', "creeePar.id", "creeePar.login","factureProduits.quantite", "produits"])
        .where('idFacture = :id', { id: id })
        .getOne();
    if (!facture) {
        return res.status(404).json({error: 'Facture not found'});
    }
    res.send(facture);
}

export async function createFacture (req :Request, res :Response)  {
    const {idClient, refProduits , idUser} = req.body;
    if( !idClient || !refProduits || !idUser) return res.status(400).json({error: 'Missing idClient or idProduit or idUser'});
    const factureRepository = getRepository(Facture);
    const produitRepository = getRepository(Produit);
    const factureProduitRepository = getRepository(FactureProduit);

    const currentDate = new Date();
    const newFacture = factureRepository.create({Client: idClient, dateEmmission: currentDate, lastModif:currentDate, creeePar: idUser, modifieePar: idUser});
    await factureRepository.save(newFacture);
    const produits = await produitRepository.findByIds(refProduits);
    const factureProduits = produits.map(produit => {
        const quantite = refProduits.find((item: ProduitRef) => item.id === produit.idProduit);
        const factureProduit = new FactureProduit();
        factureProduit.facture = newFacture;
        factureProduit.produit = produit;
        factureProduit.quantite = quantite;
        return factureProduit;
    });
    await factureProduitRepository.save(factureProduits);
    res.status(201).json({message: 'Facture created'});
}

export async function updateFacture (req :Request, res :Response)  {
    const id = req.params.id;
    const {payee, idUser} = req.body;
    const factureRepository = getRepository(Facture);
    const facture = await factureRepository.findOne({where: {idFacture: parseInt(id)}});
    if (!facture) {
        return res.status(404).json({error: 'Facture not found'});
    }
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
    const factureProduitRepository = getRepository(FactureProduit);
    const facture = await factureRepository.findOne({where: {idFacture: parseInt(id)}});
    const factureProduits = await factureProduitRepository.find({where: {facture: facture}});
    if (!facture) {
        return res.status(404).json({error: 'Facture not found'});
    }
    factureProduits.forEach(async (factureProduit) => {
        await factureProduitRepository.delete(factureProduit);
    })
    await factureRepository.delete(id);
    res.send({message: 'Facture deleted'});
}

export async function addProduitToFacture (req :Request,res :Response){
    const idFacture = req.params.id;
    const factureProduitRepository = getRepository(FactureProduit);
    const factureRepository = getRepository(Facture);
    const facture = await factureRepository.findOne({where: {idFacture: parseInt(idFacture)}});
    const produits = req.body;
    for (const produit of produits) {
        const newFactureProduit = factureProduitRepository.create({facture: facture, produitId: produit.id, quantite: produit.quantite});
        await factureProduitRepository.save(newFactureProduit);
    }
    res.status(201).json({message: 'Produits added to facture'});
}

export async function deleteProduitFromFacture (req :Request,res :Response){
    const { id, idProduit } = req.params;
    const factureProduitRepository = getRepository(FactureProduit);
    const factureProduit = await factureProduitRepository.findOne({where: {factureId: parseInt(id), produitId: parseInt(idProduit)}});
    if (!factureProduit) {
        return res.status(404).json({error: 'FactureProduit not found'});
    }
    await factureProduitRepository.delete(factureProduit);
    res.send({message: 'FactureProduit deleted'});
}
export async function updateProduitFromFacture (req :Request,res :Response){
    const { id, idProduit } = req.params;
    const factureProduitRepository = getRepository(FactureProduit);
    const factureProduit = await factureProduitRepository.findOne({where: {factureId: parseInt(id), produitId: parseInt(idProduit)}});
    if (!factureProduit) {
        return res.status(404).json({error: 'FactureProduit not found'});
    }
    const {quantite} = req.body;
    if (quantite !== undefined) factureProduit.quantite = quantite;
    await factureProduitRepository.save(factureProduit);
    res.send({message: 'FactureProduit updated'});
}
