// A simple dashboard component
const UserInfo = ({ name }: { name: string }) => {
  return (
    <div className="rounded-md bg-white p-6 shadow">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <p className="mt-4 text-zinc-700">Welcome, {name}!</p>
    </div>
  );
};

// A simple confirmation message component
const ConfirmationMessage = ({ message }: { message: string }) => {
  return (
    <div className="rounded-md bg-green-100 p-4">
      <p className="text-sm font-medium text-green-800">{message}</p>
    </div>
  );
};

export default function DashboardPage() {
  // This would come from session/auth state in a real app
  const userName = "Test User";

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <ConfirmationMessage message="Your profile is all set up!" />
        <UserInfo name={userName} />
      </div>
    </div>
  );
}