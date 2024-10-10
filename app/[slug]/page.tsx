import { getAuthClient, getClient } from "@faustwp/experimental-app-router";
import { gql } from "@apollo/client";
import { hasPreviewProps } from "./hasPreviewProps";
import { PleaseLogin } from "@/components/please-login";

export default async function Page(props) {
    const isPreview = hasPreviewProps(props);
    const id = isPreview ? props.searchParams.p : props.params.slug;

    
    // Build auth for request
    const username = process.env.WP_USERNAME;
    const appPassword = process.env.WP_APP_PASSWORD;
    const token = Buffer.from(`${username}:${appPassword}`).toString("base64");
    
    // Get client - we are rolling our own auth here
    let client = await getClient();


    if (!client) {
        return <PleaseLogin />;
    }

    const { data } = await client.query({
        query: gql`
            query GetContentNode(
                $id: ID!
                $idType: ContentNodeIdTypeEnum!
                $asPreview: Boolean!
            ) {
                contentNode(id: $id, idType: $idType, asPreview: $asPreview) {
                    ... on NodeWithTitle {
                        title
                    }
                    ... on NodeWithContentEditor {
                        content
                    }
                    date
                }
            }
        `,
        variables: {
            id,
            idType: isPreview ? "DATABASE_ID" : "URI",
            asPreview: true,
        },
        fetchPolicy: "no-cache", // Don't cache graphql requests
        context: {
            headers: {
                Authorization: `Basic ${token}`,
            },
            fetchOptions: {
                cache: "no-store", // Don't cache fetch requests
            },
        },
    });

    return (
        <main>            
            <div
                dangerouslySetInnerHTML={{
                    __html: data?.contentNode?.content ?? "",
                }}
            />
        </main>
    );
}
