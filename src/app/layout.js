import "./globals.css";
import { Inter, Poppins } from 'next/font/google';
import AnimatedNavbar from "./components/Navbar";
import Footer from "./components/Homepage/Footer";
import SmoothScroll from "./SmoothScroll";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // Add the weights you need
  variable: '--font-poppins',
  display: 'swap',
});
export const metadata = {
  title: "Mimaansa",
  description: "Indias Best Export Partner That Specialise in Apparel, Homefurnishings, and Lifestyle Accessories",
  keywords: "Mimaansa, Export, Partner, Apparel, Homefurnishings, Lifestyle Accessories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        {/* <SmoothScroll> */}
        <AnimatedNavbar />
        {children}
        <div className="fixed bottom-6 right-6 z-50 cursor-pointer">
          <Link href={'https://wa.me/+919910924032'}>
            <Image
              src="/whatsappicon.png"
              alt="Whatsapp"
              width={60}
              height={60}
              className="drop-shadow-lg w-12 h-12 "
            />
          </Link>
        </div>

        <Footer />
        {/* </SmoothScroll> */}
      </body>
    </html>
  );
}
