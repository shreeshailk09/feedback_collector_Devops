// app/layout.js
import { Toaster } from 'react-hot-toast';
import './globals.css';
import ThemeSettings from '@/components/Settings'; // Settings button only (no fixed)
import TopNav from '@/components/topNav'; // User navigation

export const metadata = {
  title: 'Feedback Collector',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-white dark:bg-black text-black dark:text-white min-h-screen flex flex-col">
        {/* Fixed top-right nav */}
        <div className="fixed top-4 right-4 z-50 flex space-x-4 items-center">
          <TopNav />
          <ThemeSettings />
        </div>

        {/* Main content */}
        <main className="flex-grow">{children}</main>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        {/* Footer */}
        <footer className="fixed bottom-0 left-0 w-full text-center p-4 text-sm text-gray-500 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700 opacity-80">
          <p>Made by SHIVAKUMAR NYAMAGOUD • Feedback Collector © 2025</p>
        </footer>
      </body>
    </html>
  );
}
