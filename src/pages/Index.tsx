import { UserAvatar } from "@/components/UserAvatar";
import { CryptoMixer } from "@/components/CryptoMixer";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="fixed top-6 right-6 z-50">
        <UserAvatar />
      </div>
      
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <CryptoMixer />
      </div>
    </div>
  );
}