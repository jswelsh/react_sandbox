import { Grid, Slide, Fade, Card, CardMedia, CardContent, Typography, makeStyles } from "@material-ui/core";
import React, { useState, useRef, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  productTitle: {
    '&:first-letter': {
      fontSize: '200%',
      color: '#00af69'
    },
  },
  Grid: {
    minHeight:'200px',
    maxWidth: '600px',
    padding:'32px 64px',
    justifyContent:'center'
  }
}));

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
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(domRef.current)
        }
      })
    }, options);
    observer.observe(domRef.current);
    return () => observer.unobserve(domRef.current)// clean up
  }, [])
  return (
    <Grid
      ref={domRef}
      item xs={12} sm={12} md={6} lg={6} xl={6} spacing={3}
      className={classes.Grid}>
      <Slide direction={direction} in={isVisible} mountOnEnter timeout={1200} >
        <div>
          <Fade timeout={1500} in={isVisible}>
            <Card
              style={{
                maxWidth: '500px',
                margin:'auto'
                }}>
              <CardMedia
                children={image}/>
              <CardContent style={{padding:'0px 0px 48px 0px'}}>
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
          </Fade>
        </div>
      </Slide>
    </Grid>
  );
};

export default ProductItem