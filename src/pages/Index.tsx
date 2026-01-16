import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface MixTransaction {
  id: string;
  amount: string;
  status: 'pending' | 'mixing' | 'completed';
  timestamp: string;
}

export default function Index() {
  const [activeSection, setActiveSection] = useState<'home' | 'mixer' | 'history' | 'faq' | 'support'>('home');
  const [btcAmount, setBtcAmount] = useState('');
  const [receivingAddress, setReceivingAddress] = useState('');
  const [feePercentage, setFeePercentage] = useState([1.5]);
  const [delayHours, setDelayHours] = useState([2]);

  const mockHistory: MixTransaction[] = [
    { id: '7f4a...b2c9', amount: '0.5 BTC', status: 'completed', timestamp: '2026-01-15 14:30' },
    { id: '3e8d...a1f4', amount: '1.2 BTC', status: 'mixing', timestamp: '2026-01-16 09:15' },
    { id: '9c2b...d7e6', amount: '0.3 BTC', status: 'pending', timestamp: '2026-01-16 11:45' },
  ];

  const faqItems = [
    {
      question: 'Как работает миксер?',
      answer: 'Миксер объединяет ваши монеты с другими пользователями, разбивает на случайные части и отправляет на новые адреса с задержкой, что делает невозможным отслеживание.'
    },
    {
      question: 'Безопасно ли это?',
      answer: 'Мы не храним логи транзакций, используем Tor-сеть и автоматически удаляем все данные после завершения миксинга.'
    },
    {
      question: 'Какие комиссии?',
      answer: 'Гибкая система: от 0.5% до 5%. Более высокая комиссия обеспечивает дополнительную анонимность через большее количество промежуточных адресов.'
    },
    {
      question: 'Сколько времени занимает процесс?',
      answer: 'От 1 до 72 часов в зависимости от выбранной задержки. Рекомендуем 6-24 часа для оптимального баланса скорости и анонимности.'
    }
  ];

  const renderHome = () => (
    <div className="space-y-24 py-24">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-block">
          <Icon name="Shield" size={64} className="mx-auto mb-6" />
        </div>
        <h1 className="text-6xl font-light tracking-tight">CryptoMixer</h1>
        <p className="text-2xl text-muted-foreground font-light">
          Максимальная анонимность ваших криптовалютных транзакций
        </p>
        <Button 
          size="lg" 
          className="mt-8 px-12 py-6 text-lg"
          onClick={() => setActiveSection('mixer')}
        >
          Начать миксинг
        </Button>
      </div>

      <Separator />

      <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
        <Card className="p-8 space-y-4 border-border hover:border-primary transition-colors">
          <Icon name="Lock" size={32} />
          <h3 className="text-xl font-medium">Полная конфиденциальность</h3>
          <p className="text-muted-foreground">Нулевые логи, Tor-интеграция, автоматическое удаление данных</p>
        </Card>
        <Card className="p-8 space-y-4 border-border hover:border-primary transition-colors">
          <Icon name="Gauge" size={32} />
          <h3 className="text-xl font-medium">Гибкие настройки</h3>
          <p className="text-muted-foreground">Выбирайте комиссию и скорость под ваши требования</p>
        </Card>
        <Card className="p-8 space-y-4 border-border hover:border-primary transition-colors">
          <Icon name="Zap" size={32} />
          <h3 className="text-xl font-medium">Быстрая обработка</h3>
          <p className="text-muted-foreground">От 1 часа, без регистрации и верификации</p>
        </Card>
      </div>
    </div>
  );

  const renderMixer = () => (
    <div className="max-w-2xl mx-auto space-y-8 py-12">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-light">Настройка миксинга</h2>
        <p className="text-muted-foreground">Укажите параметры транзакции</p>
      </div>

      <Card className="p-8 space-y-8 border-border">
        <div className="space-y-3">
          <label className="text-sm font-medium">Сумма BTC</label>
          <Input 
            placeholder="0.00000000" 
            value={btcAmount}
            onChange={(e) => setBtcAmount(e.target.value)}
            className="text-lg"
          />
          <p className="text-xs text-muted-foreground">Минимум: 0.001 BTC</p>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Адрес получателя</label>
          <Input 
            placeholder="bc1q..." 
            value={receivingAddress}
            onChange={(e) => setReceivingAddress(e.target.value)}
            className="font-mono text-sm"
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Комиссия</label>
            <span className="text-sm font-mono">{feePercentage[0]}%</span>
          </div>
          <Slider 
            value={feePercentage}
            onValueChange={setFeePercentage}
            min={0.5}
            max={5}
            step={0.1}
            className="py-4"
          />
          <p className="text-xs text-muted-foreground">Более высокая комиссия = больше промежуточных адресов</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Задержка</label>
            <span className="text-sm font-mono">{delayHours[0]}ч</span>
          </div>
          <Slider 
            value={delayHours}
            onValueChange={setDelayHours}
            min={1}
            max={72}
            step={1}
            className="py-4"
          />
          <p className="text-xs text-muted-foreground">Рекомендуем 6-24 часа для лучшей анонимности</p>
        </div>

        <Separator />

        <div className="bg-muted p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Сумма отправки:</span>
            <span className="font-mono">{btcAmount || '0.00000000'} BTC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Комиссия ({feePercentage[0]}%):</span>
            <span className="font-mono">
              {btcAmount ? (parseFloat(btcAmount) * feePercentage[0] / 100).toFixed(8) : '0.00000000'} BTC
            </span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium">
            <span>Вы получите:</span>
            <span className="font-mono">
              {btcAmount ? (parseFloat(btcAmount) * (1 - feePercentage[0] / 100)).toFixed(8) : '0.00000000'} BTC
            </span>
          </div>
        </div>

        <Button size="lg" className="w-full text-base">
          Создать миксинг
        </Button>
      </Card>
    </div>
  );

  const renderHistory = () => (
    <div className="max-w-4xl mx-auto space-y-8 py-12">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-light">История операций</h2>
        <p className="text-muted-foreground">Последние миксинг-транзакции</p>
      </div>

      <Card className="border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="font-medium">ID транзакции</TableHead>
              <TableHead className="font-medium">Сумма</TableHead>
              <TableHead className="font-medium">Статус</TableHead>
              <TableHead className="font-medium">Время</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockHistory.map((tx) => (
              <TableRow key={tx.id} className="border-border">
                <TableCell className="font-mono text-sm">{tx.id}</TableCell>
                <TableCell className="font-mono">{tx.amount}</TableCell>
                <TableCell>
                  <Badge 
                    variant={tx.status === 'completed' ? 'default' : 'secondary'}
                    className="font-normal"
                  >
                    {tx.status === 'completed' ? 'Завершено' : tx.status === 'mixing' ? 'В процессе' : 'Ожидание'}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{tx.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  const renderFAQ = () => (
    <div className="max-w-3xl mx-auto space-y-8 py-12">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-light">Частые вопросы</h2>
        <p className="text-muted-foreground">Всё о безопасности и процессе</p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {faqItems.map((item, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="border border-border px-6 data-[state=open]:border-primary transition-colors"
          >
            <AccordionTrigger className="text-left font-medium hover:no-underline py-6">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );

  const renderSupport = () => (
    <div className="max-w-2xl mx-auto space-y-8 py-12">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-light">Поддержка</h2>
        <p className="text-muted-foreground">Свяжитесь с нами анонимно</p>
      </div>

      <Card className="p-8 space-y-6 border-border">
        <div className="space-y-3">
          <label className="text-sm font-medium">ID транзакции (опционально)</label>
          <Input placeholder="7f4a...b2c9" className="font-mono" />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Сообщение</label>
          <Textarea 
            placeholder="Опишите вашу проблему..."
            className="min-h-[200px] resize-none"
          />
        </div>

        <div className="bg-muted p-4 text-sm text-muted-foreground">
          <Icon name="Info" size={16} className="inline mr-2" />
          Мы отвечаем в течение 24 часов. Используйте Tor для максимальной анонимности.
        </div>

        <Button size="lg" className="w-full">
          Отправить
        </Button>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setActiveSection('home')}
            >
              <Icon name="Shield" size={24} />
              <span className="text-xl font-light tracking-wide">CryptoMixer</span>
            </div>
            
            <div className="flex gap-8">
              {(['home', 'mixer', 'history', 'faq', 'support'] as const).map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === section 
                      ? 'text-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {section === 'home' ? 'Главная' : 
                   section === 'mixer' ? 'Миксер' :
                   section === 'history' ? 'История' :
                   section === 'faq' ? 'FAQ' :
                   'Поддержка'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6">
        {activeSection === 'home' && renderHome()}
        {activeSection === 'mixer' && renderMixer()}
        {activeSection === 'history' && renderHistory()}
        {activeSection === 'faq' && renderFAQ()}
        {activeSection === 'support' && renderSupport()}
      </main>

      <footer className="border-t border-border mt-24">
        <div className="container mx-auto px-6 py-12 text-center text-sm text-muted-foreground">
          <p>CryptoMixer © 2026 — Максимальная анонимность ваших транзакций</p>
          <p className="mt-2">Используйте Tor Browser для дополнительной безопасности</p>
        </div>
      </footer>
    </div>
  );
}
