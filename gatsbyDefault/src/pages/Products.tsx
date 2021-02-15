// If you don't want to use TypeScript you can delete this file!
import React, { useEffect, useRef, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { makeStyles } from '@material-ui/core/styles';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Box, Container, Divider, List, ListItem, ListItemText, Slide, Typography } from "@material-ui/core"
import Img from "gatsby-image"

const useStyles = makeStyles((theme) => ({
  heroContent: {
    background: "#00af69",
    display:"flex",
    flexDirection:'column',
    alignItems:'center',
    paddingTop:"40px",
    height:"320px",
    [theme.breakpoints.up('sm')]: {
      height:"380px",
    },
    [theme.breakpoints.up('md')]: {
      height:"500px",
    }
  },
  heroImage: {
    transform: "translate(0px, -120px)",
    [theme.breakpoints.up('sm')]: {
      transform: "translate(0px, -180px)"
    },
    [theme.breakpoints.up('md')]: {
      transform: "translate(0px, -310px)"
    }
  },
  productsList: {
    display:'flex',
    flexDirection:'column',
  },
  fromLeft: {
    // width:'1000px',
    display:'flex',
  },
  fromRight: {
    // width:'1000px',
    display:'flex',
    flexDirection:'row-reverse'
  },
  productItem: {
    width:'800px',
    padding: theme.spacing(2)
  }
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


const query = graphql`
  query {
        placeholderImage: file(relativePath: { eq: "016.jpg" }) {
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

const Products = () => {
  const ref = useRef()
  const refTwo = useRef()
  const classes = useStyles();
  const data = useStaticQuery(query)

  const onScreen = useOnScreen(ref)
  const onScreenTwo = useOnScreen(refTwo)
  const allowedProps = { ref } //Used because of typescript
  console.log(onScreenTwo)
  return (
  <Layout test={onScreen}>
    <SEO title="Products" />
    <Box 
      {...allowedProps }
      className={classes.heroContent}>
      <Container
        maxWidth="lg"
        component="main">
        <Typography
          variant='subtitle1'
          children="Tech solutions"/>
        <Divider/>
        <Typography
          variant='h1'
          align="center"
          children="LO·FI"/>
      </Container>
    </Box>
    <Container
      component="main"
      maxWidth="lg"
      className={classes.heroImage}>
      <Img fluid={data?.placeholderImage?.childImageSharp?.fluid} />
    </Container>
    <List className={classes.productsList}>
      <Slide direction="left" in={onScreenOne} mountOnEnter timeout={800} >
        <ListItem className={classes.fromLeft}>
          <Container
            component="main"
            maxWidth="sm">
            <Img fluid={data?.placeholderImageTwo?.childImageSharp?.fluid} />
          </Container>
          <ListItemText
            primary={
              <Typography
                variant='h3'
                children='Denali 922.00'/>
            }
            className={classes.productItem}
            secondary={
              <Typography
                component="span"
                variant="body2"
                // className={classes.inline}
                color="textPrimary"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
            }
          />
        </ListItem>
      </Slide>
      <ListItem className={classes.fromRight}>
        <Container
          component="main"
          maxWidth="sm"
          >
          <Img fluid={data?.placeholderImageTwo?.childImageSharp?.fluid} />
        </Container>
        <ListItemText
          primary={
            <Typography
              variant='h3'
              children='TMZ-450'/>
          }
          className={classes.productItem}
          secondary={
            <Typography
              component="span"
              variant="body2"
              // className={classes.inline}
              color="textPrimary"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
          }
        />
      </ListItem>
          <div ref={refTwo}></div>
      <Slide direction="left" in={onScreenTwo} mountOnEnter timeout={800} >
        <ListItem className={classes.fromLeft}>
          <Container
            component="main"
            maxWidth="sm">
            <Img fluid={data?.placeholderImageTwo?.childImageSharp?.fluid} />
          </Container>
          <ListItemText
            primary={
              <Typography
                variant='h3'
                children='Obsidian Theto'/>
            }
            className={classes.productItem}
            secondary={
              <Typography
                component="span"
                variant="body2"
                // className={classes.inline}
                color="textPrimary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
            }
            />
        </ListItem>
      </Slide>
    </List>
  </Layout>
  )
}
export default Products
