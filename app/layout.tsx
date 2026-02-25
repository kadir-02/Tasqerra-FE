import "./globals.css";
import ReduxProviderWrapper from "@/redux/ReduxProviderWrapper";

export const metadata = {
  title: "Tasqerra",
  description: "Task management app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProviderWrapper>
          {children}
        </ReduxProviderWrapper>
      </body>
    </html>
  );
}
