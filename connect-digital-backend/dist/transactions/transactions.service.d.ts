import { Repository } from 'typeorm';
import { TransactionEntity } from '../entities/transaction.entity';
export declare class TransactionsService {
    private transactionRepository;
    constructor(transactionRepository: Repository<TransactionEntity>);
    createTransaction(webhookData: any): Promise<TransactionEntity>;
    findTransactions(filters: any): Promise<TransactionEntity[]>;
    findAllTransactions(): Promise<TransactionEntity[]>;
}
