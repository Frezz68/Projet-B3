import {Facture} from "../../entity/Facture";
import {getRepository} from "typeorm";
import { Request, Response } from 'express';
import {Produit} from "../../entity/Produit";
import {FactureProduit} from "../../entity/FactureProduit";

// interface ProduitRef
interface ProduitRef{
    id: number;
    quantite: number;
}

// fonction pour récupérer toutes les factures
export async function getFactures (req :Request, res :Response)  {
    // récupère le repository de l'entité Facture
    const factureRepository = getRepository(Facture);
    // récupère toutes les factures avec les clients associés et les produits associés
    const factures = await factureRepository
        .createQueryBuilder('facture')
        .leftJoinAndSelect('facture.Client', 'client')
        .leftJoin('facture.modifieePar', 'modifieePar')
        .leftJoin('facture.creeePar', 'creeePar')
        .leftJoin('facture.produits', 'factureProduits')
        .leftJoin('factureProduits.produit', 'produits')
        .addSelect(['modifieePar.id','modifieePar.login', "creeePar.id", "creeePar.login","factureProduits.quantite", "produits"])
        .getMany();
    // si aucune facture n'est trouvée
    if (!factures) {
        return res.status(404).json({error: 'no factures found'});
    }
    res.send(factures);
}

// fonction pour récupérer une facture par son id
export async function getFactureById (req :Request, res :Response)  {
    // récupère l'id de la facture dans l'url
    const id = req.params.id;
    // récupère le repository de l'entité Facture
    const factureRepository = getRepository(Facture);
    // récupère la facture correspondant à l'id avec le client associé et les produits associés
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
    // si aucune facture n'est trouvée
    if (!facture) {
        return res.status(404).json({error: 'Facture not found'});
    }
    res.send(facture);
}

// fonction pour créer une facture
export async function createFacture (req :Request, res :Response)  {
    // récupère les données de la facture dans le body de la requête
    const {idClient, refProduits , idUser} = req.body;
    // si les données ne sont pas présentes
    if( !idClient || !refProduits || !idUser) return res.status(400).json({error: 'Missing idClient or idProduit or idUser'});
    // récupère le repository de l'entité Facture
    const factureRepository = getRepository(Facture);
    // récupère le repository de l'entité FactureProduit
    const factureProduitRepository = getRepository(FactureProduit);
    // récupère le repository de l'entité Produit
    const produitRepository = getRepository(Produit);
    // récupère la date actuelle
    const currentDate = new Date();
    // crée une nouvelle facture
    const newFacture = factureRepository.create({Client: idClient, dateEmmission: currentDate, lastModif:currentDate, creeePar: idUser, modifieePar: idUser});
    // sauvegarde la facture
    await factureRepository.save(newFacture);
    // pour chaque produit de la facture
    for (const produit of refProduits) {
        // crée une nouvelle factureProduit
        const newFactureProduit = factureProduitRepository.create({facture: newFacture, produitId: produit.id, quantite: produit.qte});
        // sauvegarde le produit
        await factureProduitRepository.save(newFactureProduit);
        // récupère le produit correspondant à l'id
        const produitToUpdate = await produitRepository.findOne({where: {idProduit: produit.id}});
        // si le produit n'est pas trouvé
        if (!produitToUpdate) {
            return res.status(404).json({error: 'Produit not found'});
        }
        // met à jour la quantité en stock du produit
        produitToUpdate.qteStock = produitToUpdate.qteStock - produit.qte;
        // sauvegarde le produit
        await produitRepository.save(produitToUpdate);
    }
    res.status(201).json({message: 'Facture created'});
}

// fonction pour mettre à jour une facture
export async function updateFacture (req :Request, res :Response)  {
    // récupère l'id de la facture dans l'url
    const id = req.params.id;
    // récupère les données de la facture dans le body de la requête
    const {payee, idUser} = req.body;
    // recupère le repository de l'entité Facture
    const factureRepository = getRepository(Facture);
    // récupère la facture correspondant à l'id
    const facture = await factureRepository.findOne({where: {idFacture: parseInt(id)}});
    // si la facture n'est pas trouvée
    if (!facture) {
        return res.status(404).json({error: 'Facture not found'});
    }
    // met à jour la facture
    if (payee !== undefined) facture.payee = payee;
    if (payee === true) facture.datePaiement = new Date();
    else facture.datePaiement = null;
    facture.lastModif = new Date();
    facture.modifieePar = idUser;
    // sauvegarde la facture
    await factureRepository.save(facture);
    res.send({message: 'Facture updated'});
}

// fonction pour supprimer une facture
export async function deleteFacture (req :Request, res :Response)  {
    // récupère l'id de la facture dans l'url
    const id = req.params.id;
    // récupère le repository de l'entité Facture
    const factureRepository = getRepository(Facture);
    // récupère le repository de l'entité FactureProduit
    const factureProduitRepository = getRepository(FactureProduit);
    // récupère le repository de l'entité Produit
    const produitRepository = getRepository(Produit);
    // récupère la facture correspondant à l'id
    const facture = await factureRepository.findOne({where: {idFacture: parseInt(id)}});
    // récupère les factureProduits correspondant à la facture
    const factureProduits = await factureProduitRepository.find({where: {facture: facture}});
    // si la facture n'est pas trouvée
    if (!facture) {
        return res.status(404).json({error: 'Facture not found'});
    }
    // pour chaque factureProduit
    for (const factureProduit of factureProduits) {
        // récupère le produit correspondant à l'id
        const produit = await produitRepository.findOne({where: {idProduit: factureProduit.produitId}});
        // si le produit existe
        if (produit) {
            // met à jour la quantité en stock du produit
            await produitRepository.update(produit.idProduit, {qteStock: produit.qteStock + factureProduit.quantite});
        }
        // supprime le factureProduit
        await factureProduitRepository.delete(factureProduit);
    }
    // supprime la facture
    await factureRepository.delete(id);
    res.send({message: 'Facture deleted'});
}

// fonction pour ajouter un produit à une facture
export async function addProduitToFacture (req :Request,res :Response){
    // récupère l'id de la facture dans l'url
    const idFacture = req.params.id;
    // récupère le repository de l'entité FactureProduit
    const factureProduitRepository = getRepository(FactureProduit);
    // récupère le repository de l'entité Facture
    const factureRepository = getRepository(Facture);
    // récupère la facture correspondant à l'id
    const facture = await factureRepository.findOne({where: {idFacture: parseInt(idFacture)}});
    // recupère les données du produit dans le body de la requête
    const produits = req.body;
    // pour chaque produit
    for (const produit of produits) {
        // crée un nouveau factureProduit
        const newFactureProduit = factureProduitRepository.create({facture: facture, produitId: produit.id, quantite: produit.quantite});
        // sauvegarde le nouveau factureProduit
        await factureProduitRepository.save(newFactureProduit);
    }
    res.status(201).json({message: 'Produits added to facture'});
}

// fonction pour supprimer un produit d'une facture
export async function deleteProduitFromFacture (req :Request,res :Response){
    // récupère l'id de la facture dans l'url
    const { id, idProduit } = req.params;
    // récupère le repository de l'entité FactureProduit
    const factureProduitRepository = getRepository(FactureProduit);
    // récupère le factureProduit correspondant à l'id de la facture et à l'id du produit
    const factureProduit = await factureProduitRepository.findOne({where: {factureId: parseInt(id), produitId: parseInt(idProduit)}});
    // si le factureProduit n'est pas trouvé
    if (!factureProduit) {
        return res.status(404).json({error: 'FactureProduit not found'});
    }
    // supprime le factureProduit
    await factureProduitRepository.delete(factureProduit);
    res.send({message: 'FactureProduit deleted'});
}

// fonction pour mettre à jour un produit d'une facture
export async function updateProduitFromFacture (req :Request,res :Response){
    // récupère l'id de la facture dans l'url
    const { id, idProduit } = req.params;
    // récupère le repository de l'entité FactureProduit
    const factureProduitRepository = getRepository(FactureProduit);
    // récupère le factureProduit correspondant à l'id de la facture et à l'id du produit
    const factureProduit = await factureProduitRepository.findOne({where: {factureId: parseInt(id), produitId: parseInt(idProduit)}});
    // si le factureProduit n'est pas trouvé
    if (!factureProduit) {
        return res.status(404).json({error: 'FactureProduit not found'});
    }
    // récupère les données du produit dans le body de la requête
    const {quantite} = req.body;
    // met à jour le factureProduit
    if (quantite !== undefined) factureProduit.quantite = quantite;
    // sauvegarde le factureProduit
    await factureProduitRepository.save(factureProduit);
    res.send({message: 'FactureProduit updated'});
}
