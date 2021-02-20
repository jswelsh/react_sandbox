import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Box, Container, Grid, Hidden, makeStyles, Paper, Typography} from '@material-ui/core'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const useStyles = makeStyles((theme) => ({
  heroImage: {
    maxWidth:'420',
    background:'pink',
    padding:0
  },
  heroText: {
    maxWidth:'1040px',
    background:'pink',
    padding:0
  },
  productTitle: {
    '&:first-letter': {
      fontSize: '200%',
      color: '#00af69'
    },
  },
}));

const query = graphql`
  query {
    c1: file(relativePath: { eq: "c1.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 420) {
          ...GatsbyImageSharpFluid
        }
      }
    },
    c2: file(relativePath: { eq: "c2.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 420) {
          ...GatsbyImageSharpFluid
        }
      }
    },
    c3: file(relativePath: { eq: "c5.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 420) {
          ...GatsbyImageSharpFluid
        }
      }
    },
    c4: file(relativePath: { eq: "c4.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 420) {
          ...GatsbyImageSharpFluid
        }
      }
    },
    b1: file(relativePath: { eq: "b1.png" }) {
      childImageSharp {
        fluid(maxWidth: 420) {
          ...GatsbyImageSharpFluid
        }
      }
    },
    b2: file(relativePath: { eq: "b2.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 420) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
/* ,
    b3: file(relativePath: { eq: "b3.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 420) {
          ...GatsbyImageSharpFluid
        }
      }
    },
    b4: file(relativePath: { eq: "b4.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 420) {
          ...GatsbyImageSharpFluid
        }
      }
    }, */
const CarouselComponent = ({ mode }) => {
  const data = useStaticQuery(query)
  let items = mode === 'toLast'
  ? [
    {
      primary: "In the Studio",
      secondary: "sed sollicitudin elit convallis. Cras pharetra mi tristique sapien vestibulum lobortis.",
      image: data?.c1?.childImageSharp?.fluid
    },{
      primary: "On the Stage",
      secondary: "sed sollicitudin elit convallis. Cras pharetra mi tristique sapien vestibulum lobortis.",
      image: data?.c2?.childImageSharp?.fluid
    },{
      primary: "On the Go",
      secondary: "sed sollicitudin elit convallis. Cras pharetra mi tristique sapien vestibulum lobortis.",
      image: data?.c3?.childImageSharp?.fluid
    },{
      primary: "In the Gym",
      secondary: "sed sollicitudin elit convallis. Cras pharetra mi tristique sapien vestibulum lobortis.",
      image: data?.c4?.childImageSharp?.fluid
    }]
  : [
    {
      primary: "Designed for Professional",
      secondary: "sed sollicitudin elit convallis. Cras pharetra mi tristique sapien vestibulum lobortis.",
      image: data?.b1?.childImageSharp?.fluid
    },{
      primary: "Designed for Everyday",
      secondary: "sed sollicitudin elit convallis. Cras pharetra mi tristique sapien vestibulum lobortis.",
      image: data?.b2?.childImageSharp?.fluid
    },
  ]

const perChunk = 2
const chunkedItems = items.reduce((resultArray, item, index) => { 
  const chunkIndex = Math.floor(index/perChunk)
  if(!resultArray[chunkIndex]) {
    resultArray[chunkIndex] = [] // start a new chunk
  }
  resultArray[chunkIndex].push(item)
  return resultArray
}, [])

  return (
    <>
      <Hidden lgUp>
        <Carousel interval={500000}>
          {items.map( (item, i) => (
            <Paper style={{background: 'transparent', display: 'flex', maxHeight: '420px' }}>
              <Item key={i} image={item.image} primary={item.primary} secondary={item.secondary} />
            </Paper>
          ))}
        </Carousel>
      </Hidden>
      <Hidden mdDown>
        <Carousel interval={5000} >
        {chunkedItems.map( (items, i) =>(
          <Paper style={{background: 'transparent', display: 'flex', maxHeight: '420px'}}>
            {items.map( (item, i) => (
              <Item key={item.key} image={item.image} primary={item.primary} secondary={item.secondary} />
            ))}
          </Paper>
        ))}
        </Carousel>
      </Hidden>
    </>
  )
}

function Item({image, primary, secondary}) {
  const classes = useStyles();
  return (
    <Grid container xs={12}>
      <Grid item xs={4} className={classes.heroImage}>
        <Img fluid={image} />
      </Grid>
      <Grid item xs={8}>
        <Container>
          <Typography variant='h6' style={{marginLeft:'16px', marginTop:'16px'}}>
            {primary}
          </Typography>
          <Typography variant='body1' style={{marginLeft:'16px', marginTop:'16px'}}>
            {secondary}
          </Typography>
        </Container>
      </Grid>
    </Grid>
  )
}

export default CarouselComponent