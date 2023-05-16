import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}