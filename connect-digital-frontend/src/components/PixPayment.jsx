import { useState } from 'react';
import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Alert, AlertDescription } from '@/components/ui/alert.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Loader2, Copy, CheckCircle, AlertCircle, CreditCard, QrCode, Banknote, ArrowLeft } from 'lucide-react';

const PixPayment = () => {
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState(10.00);

  const handlePixPayment = async () => {
    setLoading(true);
    setError(null);
    setPixData(null);

    try {
      const response = await fetch('http://localhost:3000/payments/pix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount }),
      });

      const data = await response.json();

      if (data.success) {
        setPixData(data.data);
      } else {
        setError(data.message || 'Erro ao gerar pagamento PIX');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (pixData?.qr_code_copy_paste) {
      try {
        await navigator.clipboard.writeText(pixData.qr_code_copy_paste);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Erro ao copiar:', err);
      }
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setAmount(value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header com animação */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Connect Digital</h1>
          <p className="text-gray-600">Sistema de Pagamento PIX Profissional</p>
        </div>

        <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/90 animate-slide-up">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <QrCode className="w-6 h-6 text-blue-600" />
              Pagamento PIX
            </CardTitle>
            <CardDescription className="text-gray-600">
              Rápido, seguro e instantâneo
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {!pixData && !loading && (
              <div className="space-y-6 animate-fade-in">
                {/* Campo de valor */}
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Banknote className="w-4 h-4" />
                    Valor do Pagamento
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      R$
                    </span>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={amount}
                      onChange={handleAmountChange}
                      className="pl-10 text-lg font-semibold border-2 focus:border-blue-500 transition-all duration-200"
                      placeholder="0,00"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Valor total: {formatCurrency(amount)}
                  </p>
                </div>

                {/* Botão de pagamento */}
                <div className="space-y-4">
                  <Button 
                    onClick={handlePixPayment}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    size="lg"
                  >
                    <QrCode className="w-5 h-5 mr-2" />
                    Gerar PIX de {formatCurrency(amount)}
                  </Button>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Seguro
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Instantâneo
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      24h/7dias
                    </div>
                  </div>
                </div>
              </div>
            )}

            {loading && (
              <div className="text-center space-y-6 py-8 animate-pulse">
                <div className="flex justify-center">
                  <div className="relative">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                    <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-blue-200 animate-ping"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-700">Gerando seu PIX...</p>
                  <p className="text-sm text-gray-500">Isso pode levar alguns segundos</p>
                </div>
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="animate-shake border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="font-medium">{error}</AlertDescription>
              </Alert>
            )}

            {pixData && (
              <div className="space-y-6 animate-fade-in">
                {/* Sucesso */}
                <Alert className="border-green-200 bg-green-50 animate-bounce-in">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 font-medium">
                    PIX gerado com sucesso! Escolha uma das opções abaixo para pagar.
                  </AlertDescription>
                </Alert>

                {/* QR Code gerado no front-end */}
                <div className="text-center space-y-4 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border">
                  <h3 className="font-semibold text-gray-800 flex items-center justify-center gap-2">
                    <QrCode className="w-5 h-5" />
                    QR Code PIX
                  </h3>
                  <div className="flex justify-center">
                    <div className="p-4 bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-shadow duration-300">
                      <QRCode 
                        value={pixData.qr_code_copy_paste}
                        size={192}
                        bgColor="#ffffff"
                        fgColor="#000000"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 max-w-xs mx-auto">
                    Abra o app do seu banco e escaneie o código QR para pagar
                  </p>
                </div>

                {/* Código Copia e Cola */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Copy className="w-5 h-5" />
                    Código PIX (Copia e Cola)
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-xs font-mono break-all text-gray-700 leading-relaxed">
                      {pixData.qr_code_copy_paste}
                    </p>
                  </div>
                  <Button 
                    onClick={copyToClipboard}
                    variant="outline"
                    className="w-full border-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                        Copiado!
                      </>
                    ) : (
                      'Copiar código PIX'
                    )}
                  </Button>
                </div>

                {/* Informações do Pagamento */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Detalhes do Pagamento
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-blue-600 font-medium">ID da Transação</p>
                      <p className="text-blue-800 font-mono">{pixData.payment_id}</p>
                    </div>
                    <div>
                      <p className="text-blue-600 font-medium">Valor</p>
                      <p className="text-blue-800 font-bold text-lg">{formatCurrency(pixData.amount)}</p>
                    </div>
                    <div>
                      <p className="text-blue-600 font-medium">Status</p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {pixData.status === 'pending' ? 'Aguardando Pagamento' : pixData.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-blue-600 font-medium">Criado em</p>
                      <p className="text-blue-800">{new Date(pixData.created_at).toLocaleString('pt-BR')}</p>
                    </div>
                  </div>
                </div>

                {/* Botão para novo PIX */}
                <Button 
                  onClick={() => {
                    setPixData(null);
                    setError(null);
                  }}
                  variant="outline"
                  className="w-full border-2 hover:bg-gray-50 transition-all duration-200"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Gerar Novo PIX
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500 animate-fade-in">
          <p>Powered by Connect Digital • Seguro e Confiável</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.9); }
          50% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PixPayment;
