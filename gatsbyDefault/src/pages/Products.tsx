// If you don't want to use TypeScript you can delete this file!
import React, { useEffect, useRef, useState } from "react"
import { PageProps, Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Box, Typography } from "@material-ui/core"

/* type DataProps = {
  site: {
    buildTime: string
  }
} */
/* const useIntersect = ({root = null, rootMargin, threshold = 0}) => {
  const [entry, updateEntry] = useState({})
  const [node, setNode] = useState(null)
  const observer = useRef(null)

  useEffect(() => {
    if (observer.current) observer.current.disconnect()
    observer.current = new window.IntersectionObserver(
      ([entry]) => updateEntry(entry),
      {
        root,
        rootMargin,
        threshold
      }
    )
    const { current:currentObserver} = observer
    if (node) currentObserver.observe(node)
    return () => currentObserver.disconnect()
  },[node, root, rootMargin, threshold]
  )
  return [setNode, entry]
} */
// const buildThresholdArray = () => Array.from(Array(100).keys(), i => i / 100);

const Products/* : React.FC<PageProps<DataProps>>  */= (/* { data, path } */) => {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry);

        if (entry.isIntersecting) {
          //do your actions here
          console.log('It works!')
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [ref]);

  return (
  <Layout>
    <SEO title="Products" />
    <Box style={{background:"#00F08E", height:"400px"}}>
    </Box>
    <Typography variant='h1'>Products</Typography>
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



    <div className="Section-item" ref={ref} id="secondItem">
        yoooo
      </div>
    <Typography variant='h1'>Products</Typography>
    <Typography variant='h1'>Products</Typography>
    <Typography variant='h1'>Products</Typography>

    <Typography variant='h1'>Products</Typography>
    <Typography variant='h1'>Products</Typography>
    <Typography variant='h1'>Products</Typography>

  </Layout>
  )
}
export default Products
