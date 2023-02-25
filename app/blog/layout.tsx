import { Metadata } from "next";
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
    title: 'Blog Posts',
    description: 'All blog posts',
}

const inter = Inter({
    subsets: ['latin']
})

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}