import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Provider as JotaiProvider } from "jotai";

import { TRPCReactProvider } from "~/trpc/react";
import { Button } from "~/components/ui";
import { kalamFont } from "~/fonts/kalam";

export const metadata: Metadata = {
  title: "Image Insight",
  description: "Get instantly feeback on your pictures!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${kalamFont.variable} dark`}
    >
      <body>
        <JotaiProvider>
          <header className="fixed top-4 w-full text-center">
            <h1 className="font-kalam text-3xl">Image Insider</h1>
            <p className="mt-2">Get instantly feeback on your pictures!</p>
          </header>
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <footer className="absolute bottom-4 w-full text-center">
            <span>Made with ❤️ by</span>{" "}
            <Button variant="link" asChild className="p-0">
              <a
                href="https://github.com/alexandredev3"
                referrerPolicy="no-referrer"
                target="_blank"
              >
                Alexandre Costa
              </a>
            </Button>
          </footer>
        </JotaiProvider>
      </body>
    </html>
  );
}
