import { TransactionsService } from '../transactions/transactions.service';
export declare class PaymentsService {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    createPixPayment(amount?: number): Promise<any>;
}
