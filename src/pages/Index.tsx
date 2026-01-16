import { AvatarWithName } from "@/components/ui/avatar-with-name";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-6 right-6">
        <AvatarWithName 
          name="Гость"
          direction="bottom"
          size="md"
        />
      </div>
    </div>
  );
}
