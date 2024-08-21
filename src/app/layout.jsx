import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PrepMaster",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="#" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PrepMaster</title>
      </head>
      <body className={inter.className}>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
