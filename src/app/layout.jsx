// import UserProvider from "./components/client/userProvider";
import "./globals.css";
import Nav from "./components/client/Nav";
import { UserProvider } from "@components/client/UserProvider";
export const metadata = {
  title: "PrepMaster",
};

export default function RootLayout({ pageProps, children }) {
  return (
    <html lang="en" data-theme="cupcake">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
      </head>
        <body suppressHydrationWarning={true}>
          <UserProvider >
          <Nav />
          <main>
            {children}
          </main>
          </UserProvider>
        </body>
    </html>
  );
}
