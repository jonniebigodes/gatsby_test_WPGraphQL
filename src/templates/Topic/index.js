import React from "react"
import { graphql, Link } from "gatsby"

const Topic = ({ data }) => {
  //console.log("[debug] topic data: ", data)
  const { postBySlug, stockImage } = data
  const { posts } = postBySlug
  const { edges } = posts

  return (
    <div style={{ margin: "0.85rem" }}>
      {edges.map(item => {
        return (
          <div key={item.node.id}>
            <h1>{item.node.title}</h1>
            <img
              src={
                item.node.featuredImage !== null
                  ? item.node.featuredImage.altText
                  : stockImage.childImageSharp.fluid.src
              }
              alt={
                item.node.featuredImage !== null
                  ? item.node.featuredImage.altText
                  : `random text`
              }
            />
            <div dangerouslySetInnerHTML={{ __html: item.node.excerpt }} />
            <Link to={`/${item.node.slug}/`}>{item.node.slug}</Link>
            <hr />
            <h5>
              Created By:{item.node.author.name} in {item.node.date}
            </h5>
          </div>
        )
      })}
    </div>
  )
}

export const query = graphql`
  query($tag: String!) {
    postBySlug: wpgraphql {
      posts(where: { tag: $tag }) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          cursor
          node {
            id
            title
            slug
            date
            excerpt
            author {
              id
              name
            }
            featuredImage {
              id
              sourceUrl
              slug
            }
          }
        }
      }
    }
    stockImage: file(relativePath: { eq: "gatsby-icon.png" }) {
      childImageSharp {
        fluid {
          src
          srcSet
        }
      }
    }
  }
`

export default Topic
/* 
export const query = graphql`
  query($tag: String) {
    wpcms {
      posts(where: { tag: $tag }) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          cursor
          node {
            id
            title
            slug
            date
            excerpt
            author {
              id
              name
            }
            featuredImage {
              id
              sourceUrl
              slug
            }
          }
        }
      }
    }
  }
`
 */
