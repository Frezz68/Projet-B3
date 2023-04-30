import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne} from 'typeorm';
import {Client} from "./Client";
@Entity()
export class Facture {
    @PrimaryGeneratedColumn()
    idFacture: number;

    @Column()
    dateEmmission: Date;

    @Column()
    Payee: boolean;

    @Column()
    datePaiement: Date;

    @Column('json')
    refProduit: JSON;

    @ManyToOne(() => Client, (client) => client.factures)
    Client: Client;
}