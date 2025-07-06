import { Injectable } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly transactionsService: TransactionsService) {}

  async createPixPayment(amount: number = 1000): Promise<any> {
    // Mock do gateway de pagamento PIX
    // Em um cenário real, aqui seria feita a integração com um gateway real
    
    // Usando um QR Code real em base64 (será substituído pelo frontend)
    const mockQrCodeBase64 = '/qr-code-pix.png'; // Caminho para a imagem real
    
    // Simulando um código PIX "copia e cola"
    const mockPixCode = '00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426614174000520400005303986540510.005802BR5913CONNECT DIGITAL6009SAO PAULO62070503***63041D3D';

    const paymentId = Math.random().toString(36).substr(2, 9);
    const status = 'pending';
    const createdAt = new Date().toISOString();

    // Preparar dados para o webhook simulado
    const webhookData = {
      id: paymentId,
      type: 'transaction',
      objectId: paymentId,
      url: 'https://test.com/webhook-simulado',
      data: {
        id: paymentId,
        amount: amount,
        refundedAmount: 0,
        companyId: 1,
        installments: 1,
        paymentMethod: 'pix',
        status: status,
        postbackUrl: null,
        metadata: null,
        traceable: false,
        secureId: 'a4594817-be48-4a23-81aa-4bb01f95fe78',
        secureUrl: 'https://link.compra.com.br/pagar/a4594817-be48-4a23-81aa-4bb01f95fe78',
        createdAt: createdAt,
        updatedAt: createdAt,
        paidAt: null,
        ip: '127.0.0.1',
        externalRef: null,
        customer: {
          id: 1,
          externalRef: null,
          name: 'Cliente PIX',
          email: 'cliente@pix.com',
          phone: '11987654321',
          birthdate: null,
          createdAt: createdAt,
          document: {
            number: '12345678900',
            type: 'cpf',
          },
          address: {
            street: 'Rua Exemplo',
            streetNumber: '123',
            complement: null,
            zipCode: '01000000',
            neighborhood: 'Centro',
            city: 'Sao Paulo',
            state: 'SP',
            country: 'BR',
          },
        },
        card: null,
        items: [
          {
            externalRef: null,
            title: 'Pagamento PIX',
            unitPrice: amount,
            quantity: 1,
            tangible: false,
          },
        ],
        splits: [],
        fee: {
          fixedAmount: 0,
          spreadPercentage: 0,
          estimatedFee: 0,
          netAmount: amount,
        },
      },
    };

    // Registrar a transação no banco de dados via TransactionsService
    await this.transactionsService.createTransaction(webhookData);

    return {
      qr_code_image_base64: mockQrCodeBase64,
      qr_code_copy_paste: mockPixCode,
      payment_id: paymentId,
      amount: amount / 100, // Retornar o valor em reais para o frontend
      status: status,
      created_at: createdAt,
    };
  }
}

