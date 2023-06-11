import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    OneToOne,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable
} from 'typeorm';
import {Client} from "./Client";
import {User} from "./User";
import {Produit} from "./Produit";
import {FactureProduit} from "./FactureProduit";

// entité Facture
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

    @OneToMany(() => FactureProduit, (factureProduit) => factureProduit.facture)
    produits: FactureProduit[];

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