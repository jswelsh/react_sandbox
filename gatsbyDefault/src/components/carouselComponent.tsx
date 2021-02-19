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
        fluid(maxWidth: 520) {
          ...GatsbyImageSharpFluid
        }
      }
    },
    placeholderImageTwo: file(relativePath: { eq: "c2.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 520) {
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
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      image: data?.placeholderImage?.childImageSharp?.fluid
    },{
      name: "Random Name #2",
      description: "Hello World!",
      image: data?.placeholderImageTwo?.childImageSharp?.fluid
    },{
      name: "Random Name #3",
      description: "Probably the most random thing you have ever seen!",
      image: data?.placeholderImage?.childImageSharp?.fluid
    },{
      name: "Random Name #4",
      description: "Hello World!",
      image: data?.placeholderImageTwo?.childImageSharp?.fluid
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
      <Carousel interval={600000}>
      {
        items.map( (item, i) => <SingleCarouselItem key={i} image={item.image} /> )
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

const SingleCarouselItem = (props) => {
  return (
    <Paper style={{background: '#00af69', display: 'flex'}}>
      <Item key={props.key} image={props.image} />
      </Paper>

  )
}
function Item({image}) {
  const classes = useStyles();
  return (
    <>
      <Container
        className={classes.heroImage}>
        <Img fluid={image} />
      </Container>
      <Container>
        <Typography variant='h6' style={{marginLeft:'16px', marginTop:'16px'}}>
          In the Studio
        </Typography>
        <Typography variant='body1' style={{marginLeft:'16px', marginTop:'16px'}}>
          Sed sollicitudin elit convallis. Cras pharetra mi tristique sapien vestibulum lobortis.
        </Typography>
      </Container>
      </>
  )
}
const DoubleCarouselItem = ({items}) => {
  return (
    <Paper style={{background: '#00af69', display: 'flex'}}>
      <Item key={items[0].key} image={items[0].image} />
      <Item key={items[1].key} image={items[1].image} />
      </Paper>
    
  )
}

export default CarouselComponent



{/*       <Container
      className={classes.heroText}>
        <Typography variant="h1" color="initial">
          yoooo
        </Typography>
    </Container>
    <Container
      className={classes.heroImage}>
      <Img fluid={image} />
    </Container> */}
{/*       <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>
      <Button className="CheckButton">
        Check it out!
      </Button> */}