import { Grid, Slide, Fade, Typography, Grow, Divider } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import clsx from  'clsx'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  BrandCaptionPrimary: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '2.125rem',
      fontWeight: '400',
      lineHeight: '1.235',
      letterSpacing: '0.00735em'
    }
  },
  Primary: {
    color:'#00af69'
  },
  Divider: {
    background: '#00af69'
  },
}));

export const HeroTextItem = ({emphasis = false, direction, primaryText, secondaryText, domRef}) => {
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
      {primaryText
      && <Slide
          direction={direction}
          in={isVisible}
          mountOnEnter
          timeout={1000}
          >
          <div>
            <Fade timeout={1500} in={isVisible}>
              <div>
                <Typography
                  variant='h3'
                  className={classes.BrandCaptionPrimary}
                  style={{textTransform: 'uppercase', display:'inline'}}
                  children={primaryText}
                />
              </div>
            </Fade>
          </div>
        </Slide>
      }
      <Grow
        in={isVisibleDelay}
        mountOnEnter
        timeout={900}
        >
        <div >
          {secondaryText && <Typography
            className={clsx(emphasis ? classes.Primary : null, classes.BrandCaptionPrimary) }
            variant='h3'
            style={{textTransform: 'uppercase', display:'inline', paddingLeft: primaryText ? '16px' : '0px'}}
            children={secondaryText}
          />}
        </div>
      </Grow>
      <Slide
        direction={direction}
        in={isVisible}
        mountOnEnter
        timeout={900}
        >
        <div>
          <Divider className={classes.Divider} />
        </div>
      </Slide>
    </Grid>
  )
}

export default HeroTextItem