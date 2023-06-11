import {getRepository} from "typeorm";
import { Request, Response } from 'express';
import {Client} from "../../entity/Client";

// fonction pour récupérer tous les clients
export async function getClients (req :Request, res :Response)  {
    // récupère le repository de l'entité Client
    const clientRepository = getRepository(Client);
    // récupère tous les clients
    const clients = await clientRepository.find();
    if (!clients) {
        return res.status(404).json({error: 'no clients found'});
    }
    res.send(clients);
}

// fonction pour récupérer un client par son id
export async function getClientById (req :Request, res :Response)  {
    // récupère l'id du client dans l'url
    const id = req.params.id;
    // récupère le repository de l'entité Client
    const clientRepository = getRepository(Client);
    // récupère le client correspondant à l'id
    const client = await clientRepository.findOne({where: {idClient: parseInt(id)}});
    if (!client) {
        return res.status(404).json({error: 'Client not found'});
    }
    res.send(client);
}

// fonction pour créer un client
export async function createClient (req :Request, res :Response)  {
    // récupère les données du client dans le body de la requête
    const {nom, prenom, email, adresse, dateCreation, codePostal, ville, pays, telephone} = req.body;
    // si un champ est manquant
    if( !nom || !prenom || !email || !adresse || !dateCreation || !codePostal || !ville || !pays || !telephone) return res.status(400).json({error: 'Missing fields'});
    // récupère le repository de l'entité Client
    const clientRepository = getRepository(Client);
    // crée un nouveau client
    const newClient = clientRepository.create({nom: nom, prenom: prenom, email: email, adresse: adresse, dateCreation: dateCreation, codePostal: codePostal, ville: ville, pays: pays, telephone: telephone});
    // sauvegarde le nouveau client
    await clientRepository.save(newClient);
    res.status(201).json({message: 'Client created'});
}

// fonction pour modifier un client
export async function updateClient (req :Request, res :Response)  {
    // récupère l'id du client dans l'url
    const id = req.params.id;
    // récupère les données du client dans le body de la requête
    const {nom, prenom, email, adresse, dateCreation, codePostal, ville, pays, telephone} = req.body;
    // si un champ est manquant
    const clientRepository = getRepository(Client);
    // récupère le client correspondant à l'id
    const client = await clientRepository.findOne({where: {idClient: parseInt(id)}});
    // si le client n'existe pas
    if (!client) {
        return res.status(404).json({error: 'Client not found'});
    }
    // modifie le client
    if (nom !== undefined) client.nom = nom;
    if (prenom !== undefined) client.prenom = prenom;
    if (email !== undefined) client.email = email;
    if (adresse !== undefined) client.adresse = adresse;
    if (dateCreation !== undefined) client.dateCreation = dateCreation;
    if (codePostal !== undefined) client.codePostal = codePostal;
    if (ville !== undefined) client.ville = ville;
    if (pays !== undefined) client.pays = pays;
    if (telephone !== undefined) client.telephone = telephone;
    // sauvegarde le client modifié
    await clientRepository.save(client);
    res.send({message: 'Client updated'});
}

// fonction pour supprimer un client
export async function deleteClient (req :Request, res :Response)  {
    // récupère l'id du client dans l'url
    const id = req.params.id;
    // récupère le repository de l'entité Client
    const clientRepository = getRepository(Client);
    // récupère le client correspondant à l'id
    const client = await clientRepository.findOne({where: {idClient: parseInt(id)}});
    // si le client n'existe pas
    if (!client) {
        return res.status(404).json({error: 'Client not found'});
    }
    // supprime le client
    await clientRepository.delete(id);
    res.send({message: 'Client deleted'});
}