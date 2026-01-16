import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { motion } from "framer-motion";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuth: (userData: { name: string; username: string; photo?: string }) => void;
}

export function AuthModal({ open, onOpenChange, onAuth }: AuthModalProps) {
  const handleTelegramAuth = () => {
    const mockUser = {
      name: "Пользователь Telegram",
      username: "@cryptouser",
      photo: undefined,
    };
    onAuth(mockUser);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 pt-4"
        >
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
            onClick={handleTelegramAuth}
            className="w-full h-12 text-base font-semibold bg-[#0088cc] hover:bg-[#0077b3]"
            size="lg"
          >
            <Icon name="MessageCircle" size={22} className="mr-2" />
            Войти через Telegram
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Нажимая кнопку, вы соглашаетесь с условиями использования
          </p>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
