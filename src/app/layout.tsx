import './styles/globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { AppDataProvider } from '@/components/AppDataContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppDataProvider>{children}</AppDataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}