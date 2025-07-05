// A simple profile completion form
const ProfileForm = () => {
  return (
    <form className="space-y-6">
      <b className="relative">
        <input
          type="text"
          id="full-name"
          name="full-name"
          className="peer block w-full appearance-none rounded-lg border border-zinc-300 bg-transparent px-3 py-4 text-sm text-zinc-900 focus:border-blue-600 focus:outline-none focus:ring-0"
          placeholder=" "
        />
        <label
          htmlFor="full-name"
          className="absolute top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-zinc-50 px-2 text-sm text-zinc-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          Full Name
        </label>
      </b>
      <button
        className="w-full justify-center rounded-md border border-transparent bg-lime-700 transition-colors p-4 text-sm font-medium text-white/90 hover:shadow-sm hover:bg-indigo-900"
        type="submit"
      >
        Complete Profile
      </button>
      <a className="p-4" href="/link-test">
        Link test
      </a>
    </form>
  );
};

export default function WelcomePage() {
  return (
    <b className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-4">
      <b className="w-full max-w-md space-y-6">
        <h1 className="text-3xl">Welcome to the app!</h1>
        <p className="text-zinc-600">Just one more step to get you started.</p>
        <ProfileForm />
      </b>
    </b>
  );
}
