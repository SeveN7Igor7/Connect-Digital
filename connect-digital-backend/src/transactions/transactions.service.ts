import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
  ) {}

  async createTransaction(webhookData: any): Promise<TransactionEntity> {
    const { data } = webhookData;
    
    const transaction = new TransactionEntity();
    
    // Main transaction data
    transaction.externalId = data.id;
    transaction.amount = data.amount;
    transaction.refundedAmount = data.refundedAmount;
    transaction.companyId = data.companyId;
    transaction.installments = data.installments;
    transaction.paymentMethod = data.paymentMethod;
    transaction.status = data.status;
    transaction.postbackUrl = data.postbackUrl;
    transaction.metadata = data.metadata;
    transaction.traceable = data.traceable;
    transaction.secureId = data.secureId;
    transaction.secureUrl = data.secureUrl;
    transaction.ip = data.ip;
    transaction.externalRef = data.externalRef;
    transaction.paidAt = data.paidAt ? new Date(data.paidAt) : null;

    // Customer data
    if (data.customer) {
      transaction.customerId = data.customer.id;
      transaction.customerExternalRef = data.customer.externalRef;
      transaction.customerName = data.customer.name;
      transaction.customerEmail = data.customer.email;
      transaction.customerPhone = data.customer.phone;
      transaction.customerBirthdate = data.customer.birthdate ? new Date(data.customer.birthdate) : null;
      
      if (data.customer.document) {
        transaction.customerDocumentNumber = data.customer.document.number;
        transaction.customerDocumentType = data.customer.document.type;
      }

      if (data.customer.address) {
        transaction.addressStreet = data.customer.address.street;
        transaction.addressStreetNumber = data.customer.address.streetNumber;
        transaction.addressComplement = data.customer.address.complement;
        transaction.addressZipCode = data.customer.address.zipCode;
        transaction.addressNeighborhood = data.customer.address.neighborhood;
        transaction.addressCity = data.customer.address.city;
        transaction.addressState = data.customer.address.state;
        transaction.addressCountry = data.customer.address.country;
      }
    }

    // Card data
    if (data.card) {
      transaction.cardId = data.card.id;
      transaction.cardBrand = data.card.brand;
      transaction.cardHolderName = data.card.holderName;
      transaction.cardLastDigits = data.card.lastDigits;
      transaction.cardExpirationMonth = data.card.expirationMonth;
      transaction.cardExpirationYear = data.card.expirationYear;
      transaction.cardReusable = data.card.reusable;
    }

    // Items and splits
    transaction.items = data.items || [];
    transaction.splits = data.splits || [];

    // Fee data
    if (data.fee) {
      transaction.feeFixedAmount = data.fee.fixedAmount;
      transaction.feeSpreadPercentage = data.fee.spreadPercentage;
      transaction.feeEstimatedFee = data.fee.estimatedFee;
      transaction.feeNetAmount = data.fee.netAmount;
    }

    return this.transactionRepository.save(transaction);
  }

  async findTransactions(filters: any): Promise<TransactionEntity[]> {
    const queryBuilder = this.transactionRepository.createQueryBuilder('transaction');

    // Apply filters dynamically
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        // Handle different field mappings
        let fieldName = key;
        
        // Map common filter names to actual entity fields
        if (key === 'customer') {
          fieldName = 'customerName';
        } else if (key === 'city') {
          fieldName = 'addressCity';
        } else if (key === 'state') {
          fieldName = 'addressState';
        } else if (key === 'email') {
          fieldName = 'customerEmail';
        }

        queryBuilder.andWhere(`transaction.${fieldName} = :${key}`, { [key]: filters[key] });
      }
    });

    return queryBuilder.getMany();
  }

  async findAllTransactions(): Promise<TransactionEntity[]> {
    return this.transactionRepository.find();
  }
}

