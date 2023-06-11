import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany} from 'typeorm';
import {Facture} from "./Facture";

// entité Client
@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    idClient: number;

    @Column()
    nom: string;

    @Column()
    prenom: string;

    @Column()
    adresse: string;

    @Column()
    codePostal: string;

    @Column()
    ville: string;

    @Column()
    telephone: string;

    @Column()
    email: string;

    @Column()
    dateCreation: Date;

    @Column()
    pays: string;

    @OneToMany(() => Facture, (facture) => facture.Client)
    factures: Facture[];

}