import { TransactionsService } from './transactions.service';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    receiveWebhook(webhookData: any): Promise<{
        success: boolean;
        message: string;
        transactionId: number;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        transactionId?: undefined;
    }>;
    getTransactions(filters: any): Promise<{
        success: boolean;
        count: any;
        data: any;
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        count?: undefined;
        data?: undefined;
    }>;
}
