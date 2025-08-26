import { Rocket } from "lucide-react";
import './globals.css';

export const metadata = {
  title: "Todo App",
  description: "Next.js + Express + Prisma Todo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-white/10">
          <div className="container py-10 flex flex-col items-center gap-3">
            <Rocket className="size-7 text-sky-300" />
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
                <span className="bg-gradient-to-r from-sky-300 to-sky-400 bg-clip-text text-transparent">
                  Todo
                </span>{" "}
                  <span className="bg-gradient-to-r from-violet-400 to-violet-500 bg-clip-text text-transparent">
                    App
                </span>
            </h1>
          </div>
        </header>

        <main className="container py-8">{children}</main>
      </body>
    </html>
  );
}
