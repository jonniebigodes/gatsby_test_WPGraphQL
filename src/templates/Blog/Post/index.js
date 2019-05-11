import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

/* const Post = props => { */
const Post = ({ data }) => {
  //const post = props.data.wpcms.postBy
  const { wpgraphql } = data
  const { postBy } = wpgraphql

  return (
    // <>
    //   <h1>{post.title}</h1>
    //   <img
    //     style={{ width: "500px", height: "auto" }}
    //     src={post.featuredImage.sourceUrl}
    //     alt={post.featuredImage.altText}
    //   />
    //   <div dangerouslySetInnerHTML={{ __html: post.content }} />
    //   <div>{`Post by ${post.author.firstName} ${post.author.lastName} on ${
    //     post.date
    //   }`}</div>
    // </>
    <>
      <h1>{postBy.title}</h1>
      {postBy.featuredImage !== null ? (
        <img
          style={{ width: "500px", height: "auto" }}
          src={postBy.featuredImage.sourceUrl}
          alt={postBy.featuredImage.altText}
        />
      ) : (
        <h6>no image</h6>
      )}
      <div dangerouslySetInnerHTML={{ __html: postBy.content }} />
      <div>{`Post by ${postBy.author.firstName} ${postBy.author.lastName} on ${
        postBy.date
      }`}</div>
    </>
  )
}

Post.propTypes = {
  // heldrida proptypes data: PropTypes.object.isRequired,
  data: PropTypes.shape({
    wpgraphql: PropTypes.shape({
      postBy: PropTypes.shape({
        id: PropTypes.string,
        content: PropTypes.string,
        postId: PropTypes.number,
        title: PropTypes.string,
        slug: PropTypes.string,
        date: PropTypes.string,
        author: PropTypes.shape({
          id: PropTypes.string,
          firstName: PropTypes.string,
          lastName: PropTypes.string,
        }),
        featuredImage: PropTypes.shape({
          id: PropTypes.string,
          sourceUrl: PropTypes.string,
          slug: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
}

export default Post

export const query = graphql`
  query($slug: String!) {
    wpgraphql {
      postBy(slug: $slug) {
        id
        content
        postId
        title
        slug
        date
        content
        author {
          id
          firstName
          lastName
        }
        featuredImage {
          id
          sourceUrl
          slug
        }
      }
    }
  }
`

/* export const query = graphql`
  query($slug: String) {
    wpcms {
      postBy(slug: $slug) {
        id
        content
        postId
        title
        slug
        date
        content
        author {
          id
          firstName
          lastName
        }
        featuredImage {
          id
          sourceUrl
          slug
        }
      }
    }
  }
` */
