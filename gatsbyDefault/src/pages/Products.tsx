// If you don't want to use TypeScript you can delete this file!
import React, { useEffect, useRef, useState } from "react"
import { PageProps, Link, useStaticQuery, graphql } from "gatsby"
import { makeStyles } from '@material-ui/core/styles';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Box, Container, Divider, Paper, Typography } from "@material-ui/core"
// import Image from "../components/image"
import Img from "gatsby-image"

const useStyles = makeStyles((theme) => ({
}));
function useOnScreen(ref) {

  const [isIntersecting, setIntersecting] = useState(false)

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting)
  )

  useEffect(() => {
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [])

  return isIntersecting
}
export const query = graphql`
query {
      placeholderImage: file(relativePath: { eq: "016.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1080) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `

const Products = () => {
  const ref = useRef()
  const classes = useStyles();
  const data = useStaticQuery(query)
/*   const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `) */
  const onScreen = useOnScreen(ref)
  const allowedProps = { ref }
  return (
  <Layout test={onScreen}>
    <SEO title="Products" />
    <Box {...allowedProps } style={{background:"#00af69",paddingTop:"40px", height:"300px", display:"flex",flexDirection:'column'/* , justifyContent:'center' */, alignItems:'center'}}>
      <Container maxWidth="lg" component="main">
        <Typography variant='subtitle1'>Tech solutions  </Typography>
        <Divider/>
        <Typography variant='h1' align="center">LO·FI</Typography>
      </Container>
    </Box>
      <Container component="main" maxWidth="lg" style={{transform: "translate(0px, -120px)"}} /* className={classes.heroContent} */>
        <Img fluid={data?.placeholderImage?.childImageSharp?.fluid} />
      </Container>
    <Typography variant='h1'>Products</Typography>
    <Typography variant='h1'>Products</Typography>
    <Typography
      variant='h1'
      >
      {/* intersectionRatio: {ref} */}

    </Typography>

    <Typography variant='h1'>Products</Typography>
    <Typography variant='h1'>Products</Typography>
    <Typography variant='h1'>Products</Typography>



    <Typography variant='h1'>Products</Typography>
    <Typography variant='h1'>Products</Typography>
      <div className="Section-item" id="secondItem"></div>
    <Typography variant='h1'>Products</Typography>

    <Typography variant='h1'>Products</Typography>
    <Typography variant='h1'>Products</Typography>
    <Typography variant='h1'>Products</Typography>

  </Layout>
  )
}
export default Products
