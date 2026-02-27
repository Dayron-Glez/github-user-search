"use client";
import SearchIcon from "./icons/SearchIcon";

interface Props {
  getUser: (username: string) => Promise<void>;
}

const FormSearchUser = ({ getUser }: Props) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = e.currentTarget.username.value;
    if (!username) return;
    await getUser(username);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card flex gap-3 items-center p-3 rounded-2xl mb-4 transition-all duration-300"
    >
      <span className="min-w-5 ml-2">
        <SearchIcon style={{ fill: "var(--color-accent)" }} />
      </span>
      <input
        name="username"
        type="text"
        placeholder="Search GitHub username..."
        className="h-13 flex-1 py-2 px-2 rounded-xl bg-transparent focus:outline-none text-base"
        style={{
          color: "var(--color-text-primary)",
        }}
      />
      <button
        className="btn-glow rounded-xl py-3 px-6 font-bold text-white text-sm cursor-pointer transition-all duration-300"
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent), var(--color-accent-secondary))",
        }}
      >
        Search
      </button>
    </form>
  );
};

export default FormSearchUser;
