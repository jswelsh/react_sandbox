// If you don't want to use TypeScript you can delete this file!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Box, Typography } from "@material-ui/core"

/* type DataProps = {
  site: {
    buildTime: string
  }
} */

const Products/* : React.FC<PageProps<DataProps>>  */= (/* { data, path } */) => (
  <Layout>
    <SEO title="Products" />
    <Box style={{background:"#00F08E", height:"400px"}}>
    </Box>
    <Typography variant='h1'>Products</Typography>
    <Typography variant='h1'>Products</Typography>
    <Typography variant='h1'>Products</Typography>
    <Typography variant='h1'>Products</Typography>

    <Typography variant='h1'>Products</Typography>
    <Typography variant='h1'>Products</Typography>
    <Typography variant='h1'>Products</Typography>

    <Typography variant='h1'>Products</Typography>
    <Typography variant='h1'>Products</Typography>
    <Typography variant='h1'>Products</Typography>

    <Typography variant='h1'>Products</Typography>
    <Typography variant='h1'>Products</Typography>
    <Typography variant='h1'>Products</Typography>

  </Layout>
)

export default Products
