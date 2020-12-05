/* import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { 
  List,
  ListItem,
  Card,
  CardHeader,
  Grid,
} from '@material-ui/core/';



const useStyles = makeStyles(() => ({
  Display:{
    // border: 'solid',
    color:'#009868'},
  Card: {
    // borderRadius: 12,
    margin:'auto',
    minWidth:200,
    maxWidth:300,},
  Button:{
    border:'solid',
    borderColor: 'black',
    borderTopWidth: 'thin',
    borderBottomWidth: 'thin',
    borderLeftWidth: 'thin',
    borderRightWidth: 'thin',},
  List:{
    padding:0,
    color:'#009868'
  }
}));

interface IReducerFunc {(
  state: {
    result: 0
  }): any
}
// use this to rebuild to types
// https://www.sumologic.com/blog/react-hook-typescript/
let reducer : IReducerFunc

const ALL_CLEAR = 'ALL_CLEAR'
//need to set these types!!!!!!!!!!!!!
reducer = (state) => {

//const reducer = (state:any, action:any) => {
  switch (action.type) {
    case 'EVALUATE':
      
    case 'RESET':
      
    case 'BACKSPACE':
  
    default:
      return state
  }
}

let evaluate = ({expression}) => {
  return expression ? eval(expression) : 0
}
let reset = () => {0}

let backspace({expression}) => {
  return expression.slice(0, -1)
}

const Calculator = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, {
      value: 0,
    })3
  const Display = () => {
    return state.num2 || state.operand ? state.operand + state.num2 : 0
    }
  return (
    <Card className={classes.Card}>
      <CardHeader
      className={classes.Display}
      titleTypographyProps={{ align: 'right',variant: "h3" }}
      subheader= {state.num1 }
      subheaderTypographyProps={{ align: 'right',variant: "h3" }}
      title={<Display/>}
      />
      <List className={classes.List}>
      <Grid container
        direction="row"
        justify="center"
        alignItems="center">
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'CLEAR', payload:undefined})}>C</ListItem></Grid>
        <Grid item xs={6}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: ALL_CLEAR, payload:undefined})}>AC</ListItem></Grid>
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_OPERAND', payload: '/'})}>/</ListItem></Grid        >
        
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '7'})}>7</ListItem></Grid>
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '8'})}>8</ListItem></Grid>
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '9'})}>9</ListItem></Grid>
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_OPERAND', payload: '*'})}>x</ListItem></Grid>

        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '4'})}>4</ListItem></Grid>
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '5'})}>5</ListItem></Grid>
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '6'})}>6</ListItem></Grid>
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_OPERAND', payload: '+'})}>+</ListItem></Grid>

        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '1'})}>1</ListItem></Grid>
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '2'})}>2</ListItem></Grid>
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '3'})}>3</ListItem></Grid>
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_OPERAND', payload: '-'})}>-</ListItem></Grid>

        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '0'})}>0</ListItem></Grid>
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '.'})}>.</ListItem></Grid>
        <Grid item xs={6}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_RESULT', payload:undefined})}>=</ListItem></Grid>
      </Grid>
      </List>
    </Card>
  );
};

export { Calculator }
 */
