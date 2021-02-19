import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Box, Container, Grid, Hidden, makeStyles, Paper, Typography} from '@material-ui/core'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const useStyles = makeStyles((theme) => ({
  heroImage: {
    maxWidth:'520px',
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
    placeholderImage: file(relativePath: { eq: "c1.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 420) {
          ...GatsbyImageSharpFluid
        }
      }
    },
    placeholderImageTwo: file(relativePath: { eq: "c2.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 420) {
          ...GatsbyImageSharpFluid
        }
      }
    },
    placeholderImageThree: file(relativePath: { eq: "c5.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 420) {
          ...GatsbyImageSharpFluid
        }
      }
    },
    placeholderImageFour: file(relativePath: { eq: "c4.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 420) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const CarouselComponent = ({}) => {
  const data = useStaticQuery(query)

  let items = [
    {
      primary: "In the Studio",
      secondary: "sed sollicitudin elit convallis. Cras pharetra mi tristique sapien vestibulum lobortis.",
      image: data?.placeholderImage?.childImageSharp?.fluid
    },{
      primary: "On the Stage",
      secondary: "sed sollicitudin elit convallis. Cras pharetra mi tristique sapien vestibulum lobortis.",
      image: data?.placeholderImageTwo?.childImageSharp?.fluid
    },{
      primary: "On the Go",
      secondary: "sed sollicitudin elit convallis. Cras pharetra mi tristique sapien vestibulum lobortis.",
      image: data?.placeholderImageThree?.childImageSharp?.fluid
    },{
      primary: "In the Gym",
      secondary: "sed sollicitudin elit convallis. Cras pharetra mi tristique sapien vestibulum lobortis.",
      image: data?.placeholderImageFour?.childImageSharp?.fluid
    }
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
      <Carousel interval={5000}>
      {
        items.map( (item, i) => <SingleCarouselItem key={i} image={item.image}primary={item.primary} secondary={item.secondary}/> )
      }
      </Carousel>
    </Hidden>
    <Hidden mdDown>
      <Carousel interval={600000} >
      {
        chunkedItems.map( (items, i) => <DoubleCarouselItem key={i} items={items} /> )
      }
      </Carousel>
    </Hidden>
    </>
  )
}

function Item({image, primary, secondary}) {
  const classes = useStyles();
  return (
    <>
      <Container
        className={classes.heroImage}>
        <Img fluid={image} />
      </Container>
      <Container>
        <Typography variant='h6' style={{marginLeft:'16px', marginTop:'16px'}}>
          {primary}
        </Typography>
        <Typography variant='body1' style={{marginLeft:'16px', marginTop:'16px'}}>
          {secondary}
        </Typography>
      </Container>
      </>
  )
}

const SingleCarouselItem = ({
  image, primary, secondary, key
}) => {
  return (
    <Paper style={{background: 'transparent', display: 'flex'}}>
      <Item key={key} image={image} primary={primary} secondary={secondary} />
      </Paper>

  )
}
const DoubleCarouselItem = ({items}) => {
  return (
    <Paper style={{background: 'transparent', display: 'flex'}}>
      <Item key={items[0].key} image={items[0].image}primary={items[0].primary} secondary={items[0].secondary} />
      <Item key={items[1].key} image={items[1].image}primary={items[1].primary} secondary={items[1].secondary} />
    </Paper>
  )
}

export default CarouselComponent