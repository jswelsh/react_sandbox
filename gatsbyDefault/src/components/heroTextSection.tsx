import { Grid, Slide, Fade, Typography, Grow, Divider, Box } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react'
import clsx from  'clsx'
import { makeStyles } from '@material-ui/core/styles';
import HeroTextItem from './heroTextItem';

const useStyles = makeStyles((theme) => ({
  Divider: {
      background: '#00af69'
    },
  }));

const HeroTextSection = ({first, second}) => {
  const ref = useRef()
  const classes = useStyles()

  return (
      <Box
        style={{
          display:'flex', 
          flexDirection: 'column',
          /* background: 'rgb(0 0 0 / 20%)' */}}>
        <div
          ref={ref}
          style={{
            maxWidth: '550px',
            overflow: 'hidden',
            padding: '0px 64px 32px 0px'}}>
          <HeroTextItem
            emphasis={false}
            direction={first.direction}
            primaryText={first.primaryText}
            secondaryText={first.secondaryText}
            domRef={ref}/>
          <Divider /* className={classes.Divider}  *//>
          <HeroTextItem
            emphasis={true}
            direction={second.direction}
            primaryText={second.primaryText}
            secondaryText={second.secondaryText}
            domRef={ref}/>
          <Divider className={classes.Divider} />
        </div>
      </Box>
  )
}

export default HeroTextSection