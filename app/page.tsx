import { getClient } from '@faustwp/experimental-app-router';
import { gql } from '@apollo/client';
import Link from 'next/link';

// local docker devving: https://www.youtube.com/watch?v=mi8kpAgHYFo&ab_channel=MaksimIvanov

export default async function Home() {
  let client = await getClient();

  const { data } = await client.query({
    query: gql`
      query GetPosts {
        posts {
          nodes {
            id
            title
            uri
            slug
          }
        }
      }
    `,
  });

  return (
    <main>
      <h2>Posts fart poop</h2>
      <ul>
        {data.posts.nodes.map((post) => (
          <li>
            <Link href={`/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
