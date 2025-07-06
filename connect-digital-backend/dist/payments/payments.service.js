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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const transactions_service_1 = require("../transactions/transactions.service");
let PaymentsService = class PaymentsService {
    transactionsService;
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
    }
    async createPixPayment(amount = 1000) {
        const mockQrCodeBase64 = '/qr-code-pix.png';
        const mockPixCode = '00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426614174000520400005303986540510.005802BR5913CONNECT DIGITAL6009SAO PAULO62070503***63041D3D';
        const paymentId = Math.random().toString(36).substr(2, 9);
        const status = 'pending';
        const createdAt = new Date().toISOString();
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
        await this.transactionsService.createTransaction(webhookData);
        return {
            qr_code_image_base64: mockQrCodeBase64,
            qr_code_copy_paste: mockPixCode,
            payment_id: paymentId,
            amount: amount / 100,
            status: status,
            created_at: createdAt,
        };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map