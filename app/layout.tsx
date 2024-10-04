import type { Metadata } from "next";
// import { Roboto } from "next/font/google";
import localFont from "next/font/local"
import "./globals.scss";
import StoreProvider from "@/src/app/store/StoreProvider";
import Navbar from "@/src/widgets/navbar";
import Bottom from "@/src/widgets/bottom";
import { Suspense } from "react";
import { LoadingScreen } from "@/src/shared/components/loadingScreen/LoadingScreen";

// const roboto = Roboto({ subsets: ["latin"], weight: ['300','400', '500', '700', '900'] });
const  roboto2 = localFont({src: [
  {path: '../src/shared/fonts/Roboto-Light.ttf', weight: '300'},
  {path: '../src/shared/fonts/Roboto-Regular.ttf', weight: '400'},
  {path: '../src/shared/fonts/Roboto-Medium.ttf', weight: '500'}, 
  {path: '../src/shared/fonts/Roboto-Bold.ttf', weight: '700'}, 
  {path: '../src/shared/fonts/Roboto-Black.ttf', weight: '900'}, 
]})

export const metadata: Metadata = {
  title: 'АО "ПФК Тверьпромавтоматика"',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  
  return (


    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
        <body className={roboto2.className}>
          <StoreProvider>
            <Suspense fallback={<LoadingScreen />}>
              {/* <LoadingLink /> */}
                <Navbar />
                  <div className="content">
                      {children}
                  </div>
                <Bottom />
            </Suspense>
            </StoreProvider>
        </body>
    </html>
  );
}