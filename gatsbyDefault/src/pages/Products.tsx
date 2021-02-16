// If you don't want to use TypeScript you can delete this file!
import React, { useEffect, useRef, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { makeStyles } from '@material-ui/core/styles';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Box, Container, Divider, Grid, Grow, List, ListItem, ListItemText, Slide, Typography } from "@material-ui/core"
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
    paddingTop: theme.spacing(4),
    // transform: "translate(0px, -120px)",
    transform: "translate(0px, -100px)",
    [theme.breakpoints.up('sm')]: {
      // transform: "translate(0px, -180px)",
      transform: "translate(0px, -160px)",
      paddingTop: theme.spacing(6),
    },
    [theme.breakpoints.up('md')]: {
      // transform: "translate(0px, -310px)",
      transform: "translate(0px, -290px)",
      paddingTop: theme.spacing(8),
    }
  },
  productsList: {
    overflow: 'hidden',
    display:'flex',
    alignItems:'center',  
    padding:theme.spacing(2),
    flexDirection:'column',
    // maxWidth: 1000
  },
  productsTitle: {
    padding:'16px',
    display: 'inline-block',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(6),
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '6rem',
      paddingBottom: theme.spacing(8),
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
    // borderBottom:'solid 15px #00af69',
  },
  Primary: {
    color:'#00af69'
  },
  Divider: {
    background: '#00af69'
  },
  productItem: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      maxWidth: '520px'
    }
  },
  ListItem: {
    minWidth:'300px',
    maxWidth: '1200px',
    display:'flex',
    flexDirection:'column',
  },
  fromLeft: {
    [theme.breakpoints.up('md')]: {
      flexDirection:'row',
    }
  },
  fromRight: {
    [theme.breakpoints.up('md')]: {
      flexDirection:'row-reverse',
    }
  },
  productTitle: {
    '&:first-letter': {
      fontSize: '200%',
      color: '#00af69'
    },
  },
  productDescription: {
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
/* const ProductSubTitle = ({direction, primaryText}) => {
  const [isVisible, setVisible] = useState(false);
  const classes = useStyles();

  const options = {
    rootMargin: '100px 0px 100px 0px',
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
  <div ref={domRef} style={{minHeight:'300px', padding:64}}>
    <Slide direction={direction} in={isVisible} mountOnEnter timeout={800} >
      <Typography
        variant='h3'
        style={{textTransform: 'uppercase', display:'inline'}}
        children={primaryText}
      />
    </Slide>
    <Divider className={classes.Divider} />
  </div>
  )
}
 */






const ProductSubTitle = ({emphasis = false, direction, primaryText, secondaryText = null, domRef}) => {
  const [isVisible, setVisible] = useState(false);
  const [isVisibleDelay, setVisibleDelay] = useState(false);

  const classes = useStyles();

  const options = {
    rootMargin: '100px 0px 100px 0px',
    threshold: 1
  }
  // const domRef = useRef();
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
    <Slide
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
    </Slide>
    {/* <Slide */}
    <Grow
/*       direction={direction} */
      in={isVisibleDelay}
      mountOnEnter
      timeout={900}
      >
      <div >
        {secondaryText && <Typography
          className={emphasis ? classes.Primary : null }
          variant='h3'
          style={{textTransform: 'uppercase', display:'inline', paddingLeft:'16px'}}
          children={secondaryText}
        />}
      </div>
      </Grow>
    {/* </Slide> */}
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
    rootMargin: '-200px 0px -200px 0px',
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
  <div ref={domRef} style={{minHeight:'500px'}}>
    <Slide direction={direction} in={isVisible} mountOnEnter timeout={800} >
    <ListItem className={clsx(direction === 'right' ? classes.fromRight : classes.fromLeft, classes.ListItem)} key='456789'>
      <Container
        maxWidth="sm"
        children={image}
        />
      <ListItemText
        primary={
          <Typography
            variant='h3'
            className={classes.productTitle}
            children={title}/>
        }
        className={classes.productItem}
        secondary={
          <Typography
            component="span"
            variant="body2"
            color="textPrimary"
          >
            {description}
          </Typography>
        }
      />
    </ListItem>
  </Slide>
  </div>

  );
};

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
    <div className={classes.productSection}>
      <Box style={{display:'flex', flexDirection: 'column'}}>
        <div ref={ref} style={{ padding: '0px 64px 32px 64px'}}>
          <ProductSubTitle
            emphasis={false}
            direction={'left'}
            primaryText={'manufactured'}
            domRef={ref}/>
          <Divider /* className={classes.Divider}  *//>
          <ProductSubTitle
            emphasis={true}
            direction={'left'}
            primaryText={'to '}
            secondaryText={' last'}
            domRef={ref}/>
          <Divider /* className={classes.Divider} */ />
        </div>
      </Box>
    <div style={{margin: '0px 64px 250px 64px'}}>
      <Typography
        variant='h5'
        style={{display:'inline'}}
        children={`
        The real world is a complex place, 
        which is why all of 
        `}
        />
      <Typography
        variant='h5'
        style={{display:'inline', borderBottom:'solid 5px #00af69'}}
        children={`
          our products are overbuilt.
        `}
        />
      <Typography
        variant='h5'
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
  </div>
      {/* <div className={classes.underline}></div> */}
        <Typography
          variant="h3"
          className={classes.productsTitle}
          children="Our Products"/>
    <List className={classes.productsList}>
      <ProductItem
        direction={'left'}
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
        direction={'right'}
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
        direction={'left'}
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
        direction={'right'}
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
        direction={'left'}
        title={'Deltron 0'}
        description={`
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
          enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat.`}
        image={
          <Img fluid={data?.placeholderImageTwo?.childImageSharp?.fluid} />
        }
      />
    </List>
    </div>
  </Layout>
  )
}
export default Products
