import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne, JoinColumn} from 'typeorm';
import {Client} from "./Client";
import {User} from "./User";

@Entity()
export class Facture {
    @PrimaryGeneratedColumn()
    idFacture: number;

    @Column()
    dateEmmission: Date;

    @Column()
    lastModif: Date;

    @Column({ default: false })
    payee: boolean;

    @Column({ nullable: true })
    datePaiement: Date | null;

    @Column('json')
    refProduit: JSON;

    @ManyToOne(() => User, (user) => user.factures,{ nullable: false })
    @JoinColumn({ name: 'creeePar' })
    creeePar: User;

    @ManyToOne(() => User, (user) => user.factures)
    @JoinColumn({ name: 'modifieePar' })
    modifieePar: User;


    @ManyToOne(() => Client, (client) => client.factures,{ nullable: false })
    @JoinColumn({ name: 'idClient' })
    Client: Client;
}