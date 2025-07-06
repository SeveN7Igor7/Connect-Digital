import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  externalId: string; // Alterado de number para string

  @Column()
  amount: number;

  @Column({ default: 0 })
  refundedAmount: number;

  @Column()
  companyId: number;

  @Column()
  installments: number;

  @Column()
  paymentMethod: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  postbackUrl: string;

  @Column('json', { nullable: true })
  metadata: any;

  @Column({ default: false })
  traceable: boolean;

  @Column()
  secureId: string;

  @Column()
  secureUrl: string;

  @Column({ nullable: true })
  ip: string;

  @Column({ nullable: true })
  externalRef: string;

  @Column({ type: "timestamp", nullable: true })
  paidAt: Date | null;

  // Customer fields
  @Column()
  customerId: number;

  @Column({ nullable: true })
  customerExternalRef: string;

  @Column()
  customerName: string;

  @Column()
  customerEmail: string;

  @Column()
  customerPhone: string;

  @Column({ type: "timestamp", nullable: true })
  customerBirthdate: Date | null;

  @Column()
  customerDocumentNumber: string;

  @Column()
  customerDocumentType: string;

  // Address fields
  @Column()
  addressStreet: string;

  @Column()
  addressStreetNumber: string;

  @Column({ nullable: true })
  addressComplement: string;

  @Column()
  addressZipCode: string;

  @Column()
  addressNeighborhood: string;

  @Column()
  addressCity: string;

  @Column()
  addressState: string;

  @Column()
  addressCountry: string;

  // Card fields
  @Column({ nullable: true })
  cardId: number;

  @Column({ nullable: true })
  cardBrand: string;

  @Column({ nullable: true })
  cardHolderName: string;

  @Column({ nullable: true })
  cardLastDigits: string;

  @Column({ nullable: true })
  cardExpirationMonth: number;

  @Column({ nullable: true })
  cardExpirationYear: number;

  @Column({ nullable: true, default: false })
  cardReusable: boolean;

  // Items (storing as JSON for simplicity)
  @Column('json')
  items: any[];

  // Splits (storing as JSON for simplicity)
  @Column('json')
  splits: any[];

  // Fee fields
  @Column({ nullable: true })
  feeFixedAmount: number;

  @Column({ nullable: true })
  feeSpreadPercentage: number;

  @Column({ nullable: true })
  feeEstimatedFee: number;

  @Column({ nullable: true })
  feeNetAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}


