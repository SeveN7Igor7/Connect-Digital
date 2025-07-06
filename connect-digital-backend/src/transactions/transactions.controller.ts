import { Controller, Post, Get, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async receiveWebhook(@Body() webhookData: any) {
    try {
      const transaction = await this.transactionsService.createTransaction(webhookData);
      return {
        success: true,
        message: 'Transaction processed successfully',
        transactionId: transaction.id,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error processing transaction',
        error: error.message,
      };
    }
  }

  @Get()
  async getTransactions(@Query() filters: any) {
    try {
      let transactions;
      
      // If no filters provided, return all transactions
      if (Object.keys(filters).length === 0) {
        transactions = await this.transactionsService.findAllTransactions();
      } else {
        transactions = await this.transactionsService.findTransactions(filters);
      }

      return {
        success: true,
        count: transactions.length,
        data: transactions,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error fetching transactions',
        error: error.message,
      };
    }
  }
}

