import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  icon: string;
}

const cryptos: Crypto[] = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", icon: "Bitcoin" },
  { id: "eth", name: "Ethereum", symbol: "ETH", icon: "Coins" },
  { id: "usdt", name: "Tether", symbol: "USDT", icon: "DollarSign" },
  { id: "bnb", name: "Binance Coin", symbol: "BNB", icon: "Gem" },
  { id: "xrp", name: "Ripple", symbol: "XRP", icon: "Waves" },
];

const COMMISSION_RATE = 0.2;

export function CryptoMixer() {
  const { isAuthenticated, login } = useAuth();
  const [fromCrypto, setFromCrypto] = useState<string>("");
  const [toCrypto, setToCrypto] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const calculateReceiveAmount = () => {
    if (!amount || isNaN(Number(amount))) return "0";
    const numAmount = Number(amount);
    const commission = numAmount * COMMISSION_RATE;
    const finalAmount = numAmount - commission;
    return finalAmount.toFixed(8);
  };

  const calculateCommission = () => {
    if (!amount || isNaN(Number(amount))) return "0";
    return (Number(amount) * COMMISSION_RATE).toFixed(8);
  };

  const handleSwap = () => {
    const temp = fromCrypto;
    setFromCrypto(toCrypto);
    setToCrypto(temp);
  };

  const handleMix = () => {
    if (!fromCrypto || !toCrypto || !amount || !address) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }

    alert(`Обмен запущен:\n${amount} ${fromCrypto.toUpperCase()} → ${calculateReceiveAmount()} ${toCrypto.toUpperCase()}\nКомиссия: ${calculateCommission()} ${fromCrypto.toUpperCase()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Icon name="Shuffle" size={28} className="text-primary" />
            <CardTitle className="text-3xl font-bold">Крипто Миксер</CardTitle>
          </div>
          <CardDescription className="text-base">
            Анонимный обмен криптовалют с комиссией 20%
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="from-crypto">Отдаёте</Label>
              <Select value={fromCrypto} onValueChange={setFromCrypto}>
                <SelectTrigger id="from-crypto">
                  <SelectValue placeholder="Выберите валюту" />
                </SelectTrigger>
                <SelectContent>
                  {cryptos.map((crypto) => (
                    <SelectItem key={crypto.id} value={crypto.id}>
                      <div className="flex items-center gap-2">
                        <Icon name={crypto.icon as any} size={18} />
                        <span>{crypto.name} ({crypto.symbol})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Сумма</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00000000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.00000001"
                min="0"
              />
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSwap}
                className="rounded-full"
                disabled={!fromCrypto && !toCrypto}
              >
                <Icon name="ArrowDownUp" size={20} />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-crypto">Получаете</Label>
              <Select value={toCrypto} onValueChange={setToCrypto}>
                <SelectTrigger id="to-crypto">
                  <SelectValue placeholder="Выберите валюту" />
                </SelectTrigger>
                <SelectContent>
                  {cryptos.map((crypto) => (
                    <SelectItem key={crypto.id} value={crypto.id}>
                      <div className="flex items-center gap-2">
                        <Icon name={crypto.icon as any} size={18} />
                        <span>{crypto.name} ({crypto.symbol})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Адрес кошелька получателя</Label>
              <Input
                id="address"
                type="text"
                placeholder="Введите адрес кошелька"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          {amount && fromCrypto && toCrypto && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-muted rounded-lg p-4 space-y-2"
            >
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Комиссия (20%):</span>
                <span className="font-semibold">{calculateCommission()} {fromCrypto.toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Вы получите:</span>
                <span className="font-bold text-lg text-primary">
                  {calculateReceiveAmount()} {toCrypto.toUpperCase()}
                </span>
              </div>
            </motion.div>
          )}

          <Button
            onClick={handleMix}
            className="w-full h-12 text-lg font-semibold"
            size="lg"
            disabled={!fromCrypto || !toCrypto || !amount || !address}
          >
            <Icon name="Shuffle" size={20} className="mr-2" />
            Обменять
          </Button>

          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>🔒 Полная анонимность и безопасность транзакций</p>
            <p>⚡ Мгновенная обработка и отправка средств</p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={authModalOpen} onOpenChange={setAuthModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Icon name="Lock" size={28} className="text-primary" />
              Авторизация
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              Войдите через Telegram для использования миксера
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Icon name="Shield" size={20} className="text-green-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Безопасная авторизация</p>
                  <p className="text-xs text-muted-foreground">Мы не храним ваши данные</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Zap" size={20} className="text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Мгновенный доступ</p>
                  <p className="text-xs text-muted-foreground">Один клик для входа</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="UserCheck" size={20} className="text-blue-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Защита транзакций</p>
                  <p className="text-xs text-muted-foreground">Только для авторизованных</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                login({ name: "Пользователь Telegram", username: "@cryptouser" });
                setAuthModalOpen(false);
              }}
              className="w-full h-12 text-base font-semibold bg-[#0088cc] hover:bg-[#0077b3]"
              size="lg"
            >
              <Icon name="MessageCircle" size={22} className="mr-2" />
              Войти через Telegram
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Нажимая кнопку, вы соглашаетесь с условиями использования
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}