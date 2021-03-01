// If you don't want to use TypeScript you can delete this file!
import React, { useEffect, useRef, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { makeStyles } from '@material-ui/core/styles';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Box, Card, CardContent, CardMedia, Container, Divider, Fade, Grid, Grow, List, ListItem, ListItemText, Slide, Typography } from "@material-ui/core"
import Img from "gatsby-image"
import clsx from  'clsx'
import HeroTextSection from "../components/heroTextSection";
import ProductItem from "../components/productItem";
import productsList from "../data/productsList";
import CarouselComponent from "../components/carouselComponent";

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
  productSection: {
    paddingTop: theme.spacing(10),
    transform: "translate(0px, -100px)",
    [theme.breakpoints.up('sm')]: {
      transform: "translate(0px, -160px)",
      paddingTop: theme.spacing(16),
    },
    [theme.breakpoints.up('md')]: {
      transform: "translate(0px, -290px)",
      paddingTop: theme.spacing(20),
    }
  },
  BrandPillar:{
    margin: '24px 64px',
/*     [theme.breakpoints.up('sm')]: {
      margin: '0px 64px 96px 64px'
    },
    [theme.breakpoints.up('md')]: {
      margin: '0px 64px 128px 64px'
    } */
  },

  productsList: {
    overflow: 'hidden',
    display:'flex',
    justifyContent:'center',
    padding:theme.spacing(2),
    marginTop: theme.spacing(12),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(24),

    },
  },
  productsTitle: {
    padding:'32px 32px 8px 32px',
    // fontSize: '4rem',
    [theme.breakpoints.up('sm')]: {
      // paddingBottom: theme.spacing(6),
    },
    [theme.breakpoints.up('md')]: {
      // fontSize: '6rem',
      // paddingBottom: theme.spacing(8),
    },
  },
  Divider: {
    background: '#00af69'
  },
  productTitle: {
    '&:first-letter': {
      fontSize: '200%',
      color: '#00af69'
    },
  },
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

const Products = () => {
  const classes = useStyles();
  const data = useStaticQuery(query)
  const ref = useRef()
  const onScreen = useOnScreen(ref)

  const allowedProps = { ref } //Used because of typescript
  return (
  <Layout test={onScreen}>
    <SEO title="Products" />
    <Box
      {...allowedProps }
      className={classes.heroContent}>
      <Container
        maxWidth="lg">
        <Typography
          variant='subtitle1'
          children="Audio solutions"/>
        <Divider/>
        <Typography
          variant='h1'
          align="center"
          style={{fontWeight: 500, letterSpacing:'1rem'}}
          children="LO·FI"/>
      </Container>
    </Box>
    <Container
      maxWidth="lg"
      className={classes.heroImage}>
      <Img fluid={data?.placeholderImage?.childImageSharp?.fluid} />
    </Container>
    <Box className={classes.productSection}>
      <Box style={{marginBottom: '256px', padding: '16px 0px', background:'rgba(0, 0, 0, 0.4)'}}>
        <Box className={classes.BrandPillar}>
          <HeroTextSection
            first={{
              direction:'left',
              primaryText:'forged',
              secondaryText: null}}
            second={{
              direction:'left',
              primaryText:'to ',
              secondaryText:' last'}}
          />
          <Typography
            variant='h6'
            style={{display:'inline'}}
            children={`
            The real world is a complex place, 
            which is why all of our products are 
            `}
          />
          <Typography
            variant='h6'
            style={{display:'inline', borderBottom:'solid 5px #00af69'}}
            children={`overbuilt.`}
          />
          <Typography 
            variant='h6'
            style={{display:'inline'}}
            children={`
            Pick up any of 
            our products, and marvel at their weight, heft, and solidity. 
            Even our smallest products are made of aluminum and steel. 
            The larger products use high-quality C-core transformers, 
            extensive power supply filtering, and precision low-noise 
            regulation.
            `}
          />
        </Box>
        <CarouselComponent
          mode={'toLast'}
          />
      </Box>

      <Typography
        variant="h3"
        className={classes.productsTitle}
          children="Our Products"/>
          <Divider style={{padding: '3px', margin: '0px 32px'}} className={classes.Divider} />
      <List className={classes.productsList}>
        <Grid
          style={{maxWidth:'1400px'}}
          xs={12}
          container 
          spacing={3}
          justify="center"
          alignItems="center">
          {productsList()
          .map(({
              title,
              description,
              image
            }, index) => (
            <ProductItem
              direction={index % 2 === 0 ? 'right' : 'left'}
              title={title}
              description={description}
              image={<Img fluid={image}
              />}
            />)
          )}
        </Grid>
      </List>
    </Box>
    <Box style={{padding: '16px 0px', background:'rgba(0, 0, 0, 0.4)'}}>
      <Box className={classes.BrandPillar}>
        <HeroTextSection
          first={{
            direction:'left',
            primaryText:'cutting',
            secondaryText: null}}
          second={{
            direction:'left',
            primaryText:'edge',
            secondaryText:' design'}}
          />
        <Typography
          variant='h6'
          style={{display:'inline'}}
          children={`
          Class aptent taciti sociosqu ad litora torquent 
          per conubia nostra, per inceptos himenaeos. Luctus  
          lacus ut 
          `}/>
        <Typography
          variant='h6'
          style={{display:'inline', borderBottom:'solid 5px #00af69'}}
          children={`pharetra`}/>
        <Typography
          variant='h6'
          style={{display:'inline'}}
          children={`
          lacinia quis posuere ut, pulvinar vitae dolor.
          Integer eu nibh at nisi ullamcorper sagittis id 
          vel leo. Integer feugiat faucibus libero, at 
          maximus nisl suscipit posuere.
          `}
        />
      </Box>
      <CarouselComponent mode={'edgeDesign'}/>
    </Box>
  </Layout>
  )
}
export default Products
