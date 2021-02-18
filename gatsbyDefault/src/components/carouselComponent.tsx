import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Container, Grid, Hidden, makeStyles, Paper, Typography} from '@material-ui/core'
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
    }
]

  return (
    <>
    <Hidden mdDown>
      <Carousel interval={600000}>
      {
        items.map( (item, i) => <SingleCarouselItem key={i} image={item.image} /> )
      }
      </Carousel>
    </Hidden>
    <Hidden lgUp>
      <Carousel interval={600000}>
      {
        items.map( (item, i) => <SingleCarouselItem key={i} image={item.image} /> )
      }
      </Carousel>
    </Hidden>
    </>
  )
}

const SingleCarouselItem = (props) => {
  return (
    <Item key={props.key} image={props.image} />
  )
}
function Item({image}) {
  const classes = useStyles();
  return (
    <Paper style={{background: '#00af69', display: 'flex'}}>
      <Grid container >
        <Grid item xs={4} lg={5}>
          <Container
            className={classes.heroImage}>
            <Img fluid={image} />
          </Container>
        </Grid>
        <Grid item xs={8} lg={7}>
          <Typography variant='h6' style={{marginLeft:'16px', marginTop:'16px'}}>
            In the Studio
          </Typography>
          <Typography variant='body1' style={{marginLeft:'16px', marginTop:'16px'}}>
            Sed sollicitudin elit convallis. Cras pharetra mi tristique sapien vestibulum lobortis.
          </Typography>
        </Grid>
      </Grid>
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