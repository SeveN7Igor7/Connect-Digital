import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('pix')
  @HttpCode(HttpStatus.OK)
  async createPixPayment(@Body() body: { amount?: number }) {
    try {
      const amount = body.amount ? body.amount * 100 : 1000; // Converter para centavos
      const pixData = await this.paymentsService.createPixPayment(amount);
      return {
        success: true,
        data: pixData,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error creating PIX payment',
        error: error.message,
      };
    }
  }
}

