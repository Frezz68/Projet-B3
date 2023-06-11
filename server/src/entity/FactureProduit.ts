// Entité FactureProduit
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn, JoinColumn} from 'typeorm';
import { Facture } from './Facture';
import { Produit } from './Produit';

// entité FactureProduit
@Entity()
export class FactureProduit {

    @PrimaryColumn()
    factureId: number;

    @PrimaryColumn()
    produitId: number;

    @ManyToOne(() => Facture, (facture) => facture.produits)
    @JoinColumn({ name: 'factureId' })
    facture: Facture;

    @ManyToOne(() => Produit, (produit) => produit.factures)
    @JoinColumn({ name: 'produitId' })
    produit: Produit;

    @Column()
    quantite: number;
}
