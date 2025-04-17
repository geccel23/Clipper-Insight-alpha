import '@/styles/globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { AppDataProvider } from '@/components/AppDataContext';
import { ToastProvider } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <AppDataProvider>{children}</AppDataProvider>
            </ThemeProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

