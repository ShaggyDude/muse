// A simple profile completion form
const ProfileForm = () => {
  return (
    <form className="space-y-4">
      <div>
        <label
          htmlFor="full-name"
          className="block text-sm font-medium text-zinc-700"
        >
          Full Name
        </label>
        <input
          type="text"
          id="full-name"
          name="full-name"
          className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
      >
        Complete Profile
      </button>
    </form>
  );
};

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-bold">Welcome to the Tree of Life!</h1>
        <p className="text-zinc-600">
          Just one more step to get you started.
        </p>
        <div className="pt-4">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}