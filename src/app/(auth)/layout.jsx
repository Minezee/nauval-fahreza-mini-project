import { Inter } from "next/font/google";
import "../globals.css"

const inter = Inter({ subsets: ["latin"] });

const AuthLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

export default AuthLayout
