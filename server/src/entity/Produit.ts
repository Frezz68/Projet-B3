import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany} from 'typeorm';
import {Facture} from "./Facture";
import {FactureProduit} from "./FactureProduit";

@Entity()
export class Produit {
    @PrimaryGeneratedColumn()
    idProduit: number;

    @Column()
    nom: string;

    @Column()
    description: string;

    @Column()
    qteStock: number;

    @Column({ type :"text"})
    pathToImage: string;

    @Column()
    prix: number;

    @OneToMany(() => FactureProduit, (factureProduit) => factureProduit.produit)
    factures: FactureProduit[];
}