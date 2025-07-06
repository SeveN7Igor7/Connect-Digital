"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("../entities/transaction.entity");
let TransactionsService = class TransactionsService {
    transactionRepository;
    constructor(transactionRepository) {
        this.transactionRepository = transactionRepository;
    }
    async createTransaction(webhookData) {
        const { data } = webhookData;
        const transaction = new transaction_entity_1.TransactionEntity();
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
        if (data.card) {
            transaction.cardId = data.card.id;
            transaction.cardBrand = data.card.brand;
            transaction.cardHolderName = data.card.holderName;
            transaction.cardLastDigits = data.card.lastDigits;
            transaction.cardExpirationMonth = data.card.expirationMonth;
            transaction.cardExpirationYear = data.card.expirationYear;
            transaction.cardReusable = data.card.reusable;
        }
        transaction.items = data.items || [];
        transaction.splits = data.splits || [];
        if (data.fee) {
            transaction.feeFixedAmount = data.fee.fixedAmount;
            transaction.feeSpreadPercentage = data.fee.spreadPercentage;
            transaction.feeEstimatedFee = data.fee.estimatedFee;
            transaction.feeNetAmount = data.fee.netAmount;
        }
        return this.transactionRepository.save(transaction);
    }
    async findTransactions(filters) {
        const queryBuilder = this.transactionRepository.createQueryBuilder('transaction');
        Object.keys(filters).forEach((key) => {
            if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
                let fieldName = key;
                if (key === 'customer') {
                    fieldName = 'customerName';
                }
                else if (key === 'city') {
                    fieldName = 'addressCity';
                }
                else if (key === 'state') {
                    fieldName = 'addressState';
                }
                else if (key === 'email') {
                    fieldName = 'customerEmail';
                }
                queryBuilder.andWhere(`transaction.${fieldName} = :${key}`, { [key]: filters[key] });
            }
        });
        return queryBuilder.getMany();
    }
    async findAllTransactions() {
        return this.transactionRepository.find();
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.TransactionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map