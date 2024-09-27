import { getClient } from "@faustwp/experimental-app-router";
import { gql } from "@apollo/client";
import Link from "next/link";

// local docker devving: https://www.youtube.com/watch?v=mi8kpAgHYFo&ab_channel=MaksimIvanov

export default async function Home() {
    let client = await getClient();
    const postId = 8; // I am assuming this will always be the same id for the homepage
    const { data } = await client.query({        
        query: gql`
            query getHomepage {
                pages(where: { id: ${postId} }) {
                    nodes {
                        id
                        title
                        content
                        slug
                    }
                }
            }
        `,
    });

    // grab the first page from the query
    const page = data.pages.nodes[0] ?? null;

    return (
        <main>
            {page && page.title ? (
                <>
                    <h1>{page.title}</h1>
                    <section>
                        <div dangerouslySetInnerHTML={{ __html: page.content }} />
                    </section>
                </>
            ) : (
                <p>No page found</p>
            )}            
        </main>
    );
}
