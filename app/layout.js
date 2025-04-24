// DO NOT add "use client" here
import './globals.css';
import ThemeSettings from '@/components/Settings'; // Client component

export const metadata = {
  title: 'Feedback Collector',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-white dark:bg-black text-black dark:text-white min-h-screen flex flex-col">
        <ThemeSettings /> {/* Gear icon & settings */}
        {children}
        <footer className="fixed bottom-0 left-0 w-full text-center p-4 text-sm text-gray-500 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700 opacity-80">
          <p>Made by SHIVAKUMAR NYAMAGOUD • Feedback Collector © 2025</p>
        </footer>
      </body>
    </html>
  );
}
