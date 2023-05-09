import {getRepository} from "typeorm";
import { Request, Response } from 'express';
import {Client} from "../../entity/Client";

export async function getClients (req :Request, res :Response)  {
    const clientRepository = getRepository(Client);
    const clients = await clientRepository.find();
    if (!clients) {
        return res.status(404).json({error: 'no clients found'});
    }
    res.send(clients);
}

export async function getClientById (req :Request, res :Response)  {
    const id = req.params.id;
    const clientRepository = getRepository(Client);
    const client = await clientRepository.findOne({where: {idClient: parseInt(id)}});
    if (!client) {
        return res.status(404).json({error: 'Client not found'});
    }
    res.send(client);
}

export async function createClient (req :Request, res :Response)  {
    const {nom, prenom, email, adresse, dateCreation, codePostal, ville, pays, telephone} = req.body;
    if( !nom || !prenom || !email || !adresse || !dateCreation || !codePostal || !ville || !pays || !telephone) return res.status(400).json({error: 'Missing fields'});
    const clientRepository = getRepository(Client);
    const newClient = clientRepository.create({nom: nom, prenom: prenom, email: email, adresse: adresse, dateCreation: dateCreation, codePostal: codePostal, ville: ville, pays: pays, telephone: telephone});
    await clientRepository.save(newClient);
    res.status(201).json({message: 'Client created'});
}

export async function updateClient (req :Request, res :Response)  {
    const id = req.params.id;
    const {nom, prenom, email, adresse, dateCreation, codePostal, ville, pays, telephone} = req.body;

    const clientRepository = getRepository(Client);
    const client = await clientRepository.findOne({where: {idClient: parseInt(id)}});

    if (!client) {
        return res.status(404).json({error: 'Client not found'});
    }
    if (nom !== undefined) client.nom = nom;
    if (prenom !== undefined) client.prenom = prenom;
    if (email !== undefined) client.email = email;
    if (adresse !== undefined) client.adresse = adresse;
    if (dateCreation !== undefined) client.dateCreation = dateCreation;
    if (codePostal !== undefined) client.codePostal = codePostal;
    if (ville !== undefined) client.ville = ville;
    if (pays !== undefined) client.pays = pays;
    if (telephone !== undefined) client.telephone = telephone;

    await clientRepository.save(client);
    res.send({message: 'Client updated'});
}

export async function deleteClient (req :Request, res :Response)  {
    const id = req.params.id;
    const clientRepository = getRepository(Client);
    const client = await clientRepository.findOne({where: {idClient: parseInt(id)}});
    if (!client) {
        return res.status(404).json({error: 'Client not found'});
    }
    await clientRepository.delete(id);
    res.send({message: 'Client deleted'});
}