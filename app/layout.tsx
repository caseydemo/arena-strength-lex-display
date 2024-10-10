import 'bootstrap/dist/css/bootstrap.css'
import { gql } from "@apollo/client";
import { getClient } from "@faustwp/experimental-app-router";
import "@/faust.config.js";
import { FaustProvider } from "@faustwp/experimental-app-router/ssr";
import { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactForm from './components/contact-form/Form';
import Map from './components/map/Map';
import BootstrapClient from "./components/BootstrapClient";
import "./wordpress-styles.ts";
import "./styles/global.css";

// faust block support - currently this doesn't seem to work with app router
import { WordPressBlocksProvider } from '@faustwp/blocks';
import blocks from '../wp-blocks';



export const metadata: Metadata = {
    title: "Arena Strength & Performance",
    description: "Lexington Kentucky\'s premier weight training gym.",
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
                    {/* THIS DONT WORK
                        <WordPressBlocksProvider
                        config={{
                        blocks,
                        theme: null
                        }}> */}
                        
                        <Header />
                        {children}
                        <ContactForm />                    
                        <Map />
                        <Footer />
                        <BootstrapClient />


                    {/* 
                    THIS DONT WORK
                    </WordPressBlocksProvider> 
                    */}
                </FaustProvider>
            </body>
        </html>
    );
}
