import type { Metadata } from "next";
import "./globals.css";

// export const revalidate = 3600 // revalidate at most every hour
export const revalidate = 0;

export const metadata: Metadata = {
    title: "Who's Hiring?",
    description: "A list of companies that are hiring right now.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
