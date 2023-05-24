import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pseudo Japanese Card Generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <header className="p-4">
          <h1
            style={{
              fontFamily: "Electroharmonix",
              display: "flex",
              flex: "row",
            }}
          >
            <div
              style={{ textDecorationLine: "line-through", paddingRight: 12 }}
            >
              Japanese
            </div>{" "}
            Card Generator
          </h1>
        </header>
        {children}
      </body>
    </html>
  );
}
