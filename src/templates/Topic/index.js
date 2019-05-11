import React from "react"
import { graphql } from "gatsby"

const Topic = ({ data }) => {
  console.log("[debug] topic data: ", data)
  return <h1>soon</h1>
}

export const query = graphql`
  query($tag: String) {
    wpgraphql {
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
