import { getClient } from "@faustwp/experimental-app-router";
import { gql } from "@apollo/client";
import setMetaData from "../lib/setMetaData";
export let metadata = {
    openGraph: {},
    robots: {}
};

// local docker devving: https://www.youtube.com/watch?v=mi8kpAgHYFo&ab_channel=MaksimIvanov

export default async function Home() {
    let client = await getClient();
    let page = null;
    const postId = 104; // I am assuming this will always be the same id for the homepage
    let schemaString = "";    
    try {
        const { data } = await client.query({
            query: gql`
            query getHomepage {
                pages(where: { id: ${postId} }) {                    
                    nodes {
                        id
                        title
                        content
                        seo {
                            canonical
                            title
                            metaDesc
                            focuskw
                            metaRobotsNoindex
                            metaRobotsNofollow
                            opengraphAuthor
                            opengraphDescription
                            opengraphTitle
                            opengraphDescription
                            opengraphImage {
                                altText
                                sourceUrl
                                srcSet
                            }
                            opengraphUrl
                            opengraphSiteName
                            opengraphPublishedTime
                            opengraphModifiedTime
                            twitterTitle
                            twitterDescription
                            twitterImage {
                                altText
                                sourceUrl
                                srcSet
                            }
                            breadcrumbs {
                                url
                                text
                            }
                            cornerstone
                            schema {
                                pageType
                                articleType
                                raw
                            }
                            readingTime
                        }                        
                    }
                    
                }
            }
        `,
        });
        page = data.pages.nodes[0] ?? null;        

        
        const schema = page.seo.schema;
        schemaString = '<script type="application/ld+json">' + JSON.stringify(schema) + '</script>';

    } catch (error) {
        console.log(error);
    }

    return (
        <main>
            {page && page.title ? (
                <>
                    <div dangerouslySetInnerHTML={{ __html: schemaString }} />
                    <h1 style={{display: "none"}} >{page.title}</h1>
                    <section>
                        <div
                            dangerouslySetInnerHTML={{ __html: page.content }}
                        />
                    </section>
                </>
            ) : (
                <p>No page found</p>
            )}
        </main>
    );
}
