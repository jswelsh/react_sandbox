// If you don't want to use TypeScript you can delete this file!
import React, { useEffect, useRef, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { makeStyles } from '@material-ui/core/styles';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Box, Card, CardContent, CardMedia, Container, Divider, Grid, Grow, List, ListItem, ListItemText, Slide, Typography } from "@material-ui/core"
import Img from "gatsby-image"
import clsx from  'clsx'

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
  heroImageOverlay: {
    zIndex:1,
    alignSelf: 'flex-start'
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
    margin: ' 0px 32px 64px 32px',
    [theme.breakpoints.up('sm')]: {
      margin: '0px 64px 96px 64px'
    },
    [theme.breakpoints.up('md')]: {
      margin: '0px 64px 128px 64px'
    }
  },
  productsList: {
    overflow: 'hidden',
    display:'flex',
    justifyContent:'center',  
    padding:theme.spacing(2),
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
  underline: {
    position:'absolute',
    zIndex: -5,
    background:'#00af69',
    height: '16px',
    width: '280px',
    transform: 'translate(16px, 57px)',
    [theme.breakpoints.up('md')]: {
      width: '565px',
      height: '32px',
      transform: 'translate(16px, 100px)',
    }
  },
  Primary: {
    color:'#00af69'
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

const ProductSubTitle = ({emphasis = false, direction, primaryText = null, secondaryText = null, domRef}) => {
  const [isVisible, setVisible] = useState(false);
  const [isVisibleDelay, setVisibleDelay] = useState(false);

  const classes = useStyles();

  const options = {
    rootMargin: '100px 0px 100px 0px',
    threshold: 1
  }
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry.isIntersecting);
        if (entry.isIntersecting) {
          setVisible(true)
          setTimeout(()=> setVisibleDelay(true), 700)
          observer.unobserve(domRef.current);
        }
      })
    }, options);
    observer.observe(domRef.current);
    return () => observer.unobserve(domRef.current)// clean up
  }, []);

  return (
  <Grid
    container
    direction="row">
    {primaryText && <Slide
      direction={direction}
      in={isVisible}
      mountOnEnter
      timeout={1000}
      >
      <div>
        <Typography
          variant='h3'
          style={{textTransform: 'uppercase', display:'inline'}}
          children={primaryText}
        />
      </div>
    </Slide>}
    <Grow
      in={isVisibleDelay}
      mountOnEnter
      timeout={900}
      >
      <div >
        {secondaryText && <Typography
          className={emphasis ? classes.Primary : null }
          variant='h3'
          style={{textTransform: 'uppercase', display:'inline', paddingLeft: primaryText ? '16px' : '0px'}}
          children={secondaryText}
        />}
      </div>
      </Grow>
  </Grid>
  )
}


const ProductItem = ({
  direction,
  title,
  description,
  image
}) => {
  const classes = useStyles();

  const [isVisible, setVisible] = useState(false);
  const options = {
    rootMargin: '-100px 0px -100px 0px',
    threshold: 1
  }
  const domRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry.isIntersecting);
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(domRef.current);
        }
      })
    }, options);
    observer.observe(domRef.current);
    return () => observer.unobserve(domRef.current)// clean up
  }, []);
  return (
    <Grid
      ref={domRef}
      item
      xs={12}
      sm={12}
      md={6}
      lg={6}
      xl={6}
      spacing={3}
      style={{minHeight:'200px', maxWidth: '600px', padding:'32px 64px', justifyContent:'center'}}>
      <Slide direction={direction} in={isVisible} mountOnEnter timeout={1200} >
        <Card style={{maxWidth: '500px'}}>
          <CardMedia>
            {image}
          </CardMedia>
          <CardContent>
            <Typography
              variant='h3'
              className={classes.productTitle}
              children={title}/>
            <Typography
              component="span"
              variant="body2"
              color="textPrimary"
              children={description}/>
          </CardContent>
        </Card>
      </Slide>
    </Grid>
  );
};

const Products = () => {
  const classes = useStyles();
  const data = useStaticQuery(query)

  const ref = useRef()
  const refTwo = useRef()
  const refThree = useRef()

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
    {/* <Box style={{
        display:'flex', 
        flexDirection: 'column',
        background: 'rgb(0 0 0 / 20%)'
        }}> */}
      <Box
      style={{display:'flex', flexDirection: 'column'}}
      >
        <div ref={refTwo} style={{ padding: '0px 64px 32px 64px'}}>
          <ProductSubTitle
            emphasis={false}
            direction={'left'}
            primaryText={'forged'}
            domRef={refTwo}/>
          <Divider /* className={classes.Divider}  *//>
          <ProductSubTitle
            emphasis={true}
            direction={'left'}
            primaryText={'to '}
            secondaryText={' last'}
            domRef={refTwo}/>
          <Divider /* className={classes.Divider} */ />
        </div>
      </Box>
      <Box className={classes.BrandPillar}>
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
      {/* </Box> */}
      {/* <div className={classes.underline}/> */}
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
          <ProductItem
            direction={'right'}
            title={'Denali 922.00'}
            description={`
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
              enim ad minim veniam, quis nostrud exercitation ullamco laboris 
              nisi ut aliquip ex ea commodo consequat.
            `}
            image={
              <Img fluid={data?.placeholderImageTwo?.childImageSharp?.fluid} />
            }
          />
          <ProductItem
            direction={'left'}
            title={'TMZ-450'}
            description={`
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
              enim ad minim veniam, quis nostrud exercitation ullamco laboris 
              nisi ut aliquip ex ea commodo consequat.
            `}
            image={
              <Img fluid={data?.placeholderImageTwo?.childImageSharp?.fluid} />
            }
          />
          <ProductItem
            direction={'right'}
            title={'Obsidian Theto'}
            description={`
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
              enim ad minim veniam, quis nostrud exercitation ullamco laboris 
              nisi ut aliquip ex ea commodo consequat.
            `}
            image={
              <Img fluid={data?.placeholderImageTwo?.childImageSharp?.fluid} />
            }
          />
          <ProductItem
            direction={'left'}
            title={'Trinity-U M100'}
            description={`
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              enim ad minim veniam, quis nostrud exercitation ullamco laboris 
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
              nisi ut aliquip ex ea commodo consequat.`}
            image={
              <Img fluid={data?.placeholderImageTwo?.childImageSharp?.fluid} />
            }
          />
          <ProductItem
            direction={'right'}
            title={'Deltron 0'}
            description={`
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
              enim ad minim veniam, quis nostrud exercitation ullamco laboris 
              nisi ut aliquip ex ea commodo consequat.`}
            image={<Img fluid={data?.placeholderImageTwo?.childImageSharp?.fluid} />}
          />
        </Grid>
      </List>
    </Box>
    <Box style={{
        display:'flex', 
        flexDirection: 'column',
        background: 'rgb(0 0 0 / 20%)'
        }}>
      <div ref={refThree} style={{ padding: '0px 64px 32px 64px'}}>
        <ProductSubTitle
          emphasis={false}
          direction={'left'}
          primaryText={'cutting'}
          domRef={refThree}/>
        <ProductSubTitle
          emphasis={true}
          direction={'left'}
          primaryText={'edge'}
          secondaryText={'design'}
          domRef={refThree}/>
        <Divider /* className={classes.Divider}  *//>
        <Divider /* className={classes.Divider} */ />
      </div>
    </Box>
  </Layout>
  )
}
export default Products
