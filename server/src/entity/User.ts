import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Facture} from "./Facture";

// entité User
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;

    @OneToMany(() => Facture, (facture) => facture.creeePar)
    factures: Facture[];
}