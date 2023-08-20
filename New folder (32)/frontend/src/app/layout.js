"use client";

import { Providers } from "./providers";
import { Provider } from "../../context";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AppWithTranslation } from "next-i18next";
import "../../public/pagination.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          <Provider>
            <ToastContainer position="top-center" />
            <Navbar />
            <Footer />
            {children}
          </Provider>
        </Providers>
      </body>
    </html>
  );
}
