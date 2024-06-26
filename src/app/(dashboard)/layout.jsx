import { Inter } from "next/font/google";
import "../globals.css";
import HomeLayout from "@/components/layout/home/HomeLayout";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({children}) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HomeLayout>
        {children}
        </HomeLayout>
      </body>
    </html>
  )
}

export default RootLayout
