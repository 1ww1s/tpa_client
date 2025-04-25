import type { Metadata } from "next";
// import { Roboto } from "next/font/google";
import localFont from "next/font/local"
import "./globals.scss";
import StoreProvider from "@/src/app/store/StoreProvider";
import Navbar from "@/src/widgets/navbar";
import Bottom from "@/src/widgets/bottom";
import { Suspense } from "react";
import { LoadingScreen } from "@/src/shared/components/loadingScreen/LoadingScreen";
import logo from '@/public/logo.ico'

// const roboto = Roboto({ subsets: ["latin"], weight: ['300','400', '500', '700', '900'] });
const  roboto2 = localFont({src: [
  {path: '../src/shared/fonts/Roboto-Light.ttf', weight: '300'},
  {path: '../src/shared/fonts/Roboto-Regular.ttf', weight: '400'},
  {path: '../src/shared/fonts/Roboto-Medium.ttf', weight: '500'}, 
  {path: '../src/shared/fonts/Roboto-Bold.ttf', weight: '700'}, 
  {path: '../src/shared/fonts/Roboto-Black.ttf', weight: '900'}, 
]})

export const metadata: Metadata = {
  title: {
    template: '%s | АО "ПФК Тверьпромавтоматика"',
    default: 'АО "ПФК Тверьпромавтоматика"', // a default is required when creating a template
  },
  description: 'АО “ПФК Тверьпромавтоматика” занимается разработкой и производством систем управления и автоматики судовых и стационарных дизель-генераторов, систем управления судовыми главными двигателями, систем ДАУ главными двигателями, щитов автоматики и различного электронного оборудования.'
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
        <link rel="icon" href={logo.src} />
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