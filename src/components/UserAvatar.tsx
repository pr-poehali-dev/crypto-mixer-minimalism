import { useState } from "react";
import { AvatarWithName } from "@/components/ui/avatar-with-name";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/icon";

export function UserAvatar() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleAvatarClick = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <div onClick={handleAvatarClick} className="cursor-pointer">
          <AvatarWithName name="Гость" direction="bottom" size="md" />
        </div>
        <AuthModal
          open={authModalOpen}
          onOpenChange={setAuthModalOpen}
          onAuth={login}
        />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <AvatarWithName
            name={user.name}
            src={user.photo}
            direction="bottom"
            size="md"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.username}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          <Icon name="LogOut" size={16} className="mr-2" />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
