// import UserProvider from "./components/client/userProvider";
import "./globals.css";
import Nav from "./components/server/Nav";
export const metadata = {
  title: "PrepMaster",
};

export default function RootLayout({ pageProps, children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
      </head>
      <body suppressHydrationWarning={true}>
        <Nav />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
