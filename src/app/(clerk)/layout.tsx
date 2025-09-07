export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div>{children}</div>
    </main>
  );
}
