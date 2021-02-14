// If you don't want to use TypeScript you can delete this file!
import React, { useEffect, useRef, useState } from "react"
import { PageProps, Link, graphql } from "gatsby"
import { makeStyles } from '@material-ui/core/styles';

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Box, Container, Divider, Typography } from "@material-ui/core"

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

const Products/* : React.FC<PageProps<DataProps>>  */= (/* { data, path } */) => {
  const ref = useRef()
  const classes = useStyles();

  const onScreen = useOnScreen(ref)
  const allowedProps = { ref }
  return (
  <Layout test={onScreen}>
    <SEO title="Products" />
    <Box {...allowedProps } style={{background:"#00F08E", height:"400px", display:"flex", alignItems:'center'}}>
      <Container maxWidth="sm" component="main" /* className={classes.heroContent} */>
        <Typography variant='subtitle1'>Tech solutions</Typography>
        <Divider/>
        <Typography variant='h1' align="center">LO·FI</Typography>
      </Container>

    </Box>
    {/* {onScreen && "I'm on screen!"} */}
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
