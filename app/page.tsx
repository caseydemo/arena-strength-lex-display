import { getClient } from "@faustwp/experimental-app-router";
import { gql } from "@apollo/client";
import setMetaData from "./lib/setMetaData";
export let metadata = {
    openGraph: {},
    robots: {}
};
import parse from "html-react-parser";

// local docker devving: https://www.youtube.com/watch?v=mi8kpAgHYFo&ab_channel=MaksimIvanov

export default async function Home() {
    let client = await getClient();
    let page = null;
    const postId = 8; // I am assuming this will always be the same id for the homepage
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
                            fullHead
                        }
                        author {
                            node {
                                seo {
                                    metaDesc
                                    metaRobotsNofollow
                                    metaRobotsNoindex
                                    title
                                    social {
                                        youTube
                                        wikipedia
                                        twitter
                                        soundCloud
                                        pinterest
                                        mySpace
                                        linkedIn
                                        instagram
                                        facebook
                                    }
                                }
                            }
                        }
                    }
                    
                }
            }
        `,
        });
        page = data.pages.nodes[0] ?? null;

        setMetaData(page.seo);
        
        // add ALL of the seo fields to the metadata object
        metadata.robots = {
            index: page.seo.metaRobotsNoindex,
            follow: page.seo.metaRobotsNofollow,        
        }
        
        
        metadata.openGraph = {
            title: page.seo.opengraphTitle,
            description: page.seo.opengraphDescription,
            url: page.seo.opengraphUrl,
            siteName: page.seo.opengraphSiteName,
            type: 'website',            
            images: [
                {
                    url: page.seo.opengraphImage ? page.seo.opengraphImage.sourceUrl : '',
                    width: 800,
                    height: 600,
                },
            ],
            locale: "en_US",
        };

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
                    <h1>{page.title}</h1>
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
