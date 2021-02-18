import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

const query = graphql`
  query {
    placeholderImage: file(relativePath: { eq: "016v2.png" }) {
      childImageSharp {
        fluid(maxWidth: 1080) {
          ...GatsbyImageSharpFluid
        }
      }
    },
    placeholderImageTwo: file(relativePath: { eq: "test.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 520) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
` 
const productsList = () => {
  const data = useStaticQuery(query)
  
  return [
    {
      title:'Denali 922.00',
      description:`
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
      enim ad minim veniam, quis nostrud exercitation ullamco laboris 
      nisi ut aliquip ex ea commodo consequat.`,
      image: data?.placeholderImageTwo?.childImageSharp?.fluid
    },
    {
      title: 'TMZ-450',
      description:`
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
      enim ad minim veniam, quis nostrud exercitation ullamco laboris 
      nisi ut aliquip ex ea commodo consequat.`,
      image: data?.placeholderImageTwo?.childImageSharp?.fluid
    },{
      title:'Obsidian Theto',
      description:`
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
      enim ad minim veniam, quis nostrud exercitation ullamco laboris 
      nisi ut aliquip ex ea commodo consequat.`,
      image: data?.placeholderImageTwo?.childImageSharp?.fluid
    },{
      title:'Trinity-U M100',
      description:`
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      enim ad minim veniam, quis nostrud exercitation ullamco laboris 
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
      nisi ut aliquip ex ea commodo consequat.`,
      image: data?.placeholderImageTwo?.childImageSharp?.fluid
    },{
      title:'Deltron 0',
      description:`
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
      enim ad minim veniam, quis nostrud exercitation ullamco laboris 
      nisi ut aliquip ex ea commodo consequat.`,
      image: data?.placeholderImageTwo?.childImageSharp?.fluid
    }
  ]
}

export default productsList