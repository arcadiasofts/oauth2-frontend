import ProfileManager from "@/features/profile/components/ProfileManager";

export default function ProfilePage() {
  return (
    <main className="flex items-center justify-center h-full">
      <div className="w-1/2">
        <ProfileManager />
      </div>
    </main>
  );
}
