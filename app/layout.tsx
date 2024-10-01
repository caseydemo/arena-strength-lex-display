import { gql } from "@apollo/client";
import { getClient } from "@faustwp/experimental-app-router";
import Link from "next/link";
import "@/faust.config.js";
import { FaustProvider } from "@faustwp/experimental-app-router/ssr";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Arena Strength & Performance",
    description: "Lexington Kentucky\'s premier weight training gym.",
    robots: {
        index: "index",
        follow: "follow",
    },
};

export default async function RootLayout({ children }) {
    const client = await getClient();

    const { data } = await client.query({
        query: gql`
            query GetLayout {
                generalSettings {
                    title
                    description
                }
                primaryMenuItems: menuItems(where: { location: PRIMARY }) {
                    nodes {
                        id
                        label
                        uri
                    }
                }
                footerMenuItems: menuItems(where: { location: FOOTER }) {
                    nodes {
                        id
                        label
                        uri
                    }
                }
            }
        `,
    });

    return (
        <html lang='en'>
            <body>
                <FaustProvider>
                    <header></header>
                    {children}
                </FaustProvider>
            </body>
        </html>
    );
}
