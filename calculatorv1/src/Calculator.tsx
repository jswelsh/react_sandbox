import React, { useReducer } from 'react';
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
/* interface IStateProps {
    operand: string
    value: number
    num1: number
    num2: string
    num3: string
} */
interface IReducerFunc {(
  state: {
    operand: string
    value: number
    num1: number
    num2: string
    num3: string
  },
  action: {
    payload: string | undefined
    type: string
  } 
  ): any
}
// use this to rebuild to types
// https://www.sumologic.com/blog/react-hook-typescript/
let reducer : IReducerFunc

const ALL_CLEAR = 'ALL_CLEAR'
//need to set these types!!!!!!!!!!!!!
reducer = (state, action) => {

//const reducer = (state:any, action:any) => {
  switch (action.type) {
    case 'SET_OPERAND':
      if (!state.num1) {
        return {
          ...state,
          num1: state.num2,
          operand: action.payload, num2: ''}}
      if(!state.num2) {
        return {
          ...state,
          operand: action.payload}}
      if(state.num1 && state.operand) {
        return {
          ...state,
          value: eval(state.value+state.operand+state.num2), 
          operand: action.payload}}
      return {
        ...state,
        value: eval(state.num1+state.operand+state.num2), 
        num2: '',
        operand: action.payload,
        num1: eval(state.num1+state.operand+state.num2)}

    case 'SET_NUMBER':
      if (state.num2 === '' && action.payload==='.') {
        return {
          ...state,
          num2: '0'+action.payload }
      } else if (state.num2 === '') {
        return {
          ...state,
          num2: action.payload }
      } else {
        if (action.payload === '.' && state.num2.includes('.')){
          return state
        } else {
        return {
          ...state,
          num2: state.num2 + action.payload }
        }
      }
      
    case 'SET_RESULT':
      if (state.operand && state.num2) {
        return {
          ...state, 
          value: eval(
            state.num1+state.operand+state.num2), 
          num2: '', 
          num1: eval(
            state.num1+state.operand+state.num2), 
          num3 : state.num2}
      } else if (state.operand && state.value) {
        return {
          ...state, 
          value: eval(
            state.value+state.operand+state.num3)}
      } else {
        return state
      }
  
    case 'CLEAR':  
      if (state.num2.length === 2 && state.num2.includes('0.')) {
        return {...state, num2: ''}
      } else if (state.num2.length>1) {
        return {...state, num2: state.num2.slice(0, -1)}
      } else {
        return {...state, num2: ''}}

    case 'ALL_CLEAR':
      return {
        value: 0,
        operand: '',
        num1: 0,
        num2: ''
      }
      
    default:
      return state
  }
}


const Calculator = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, {
      value: 0,
      operand: '',
      num1: 0,
      num2: '',
      num3: ''
    })
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
        {/* row */}
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '7'})}>7</ListItem></Grid>
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '8'})}>8</ListItem></Grid>
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '9'})}>9</ListItem></Grid>
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_OPERAND', payload: '*'})}>x</ListItem></Grid>
        {/* row */}
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '4'})}>4</ListItem></Grid>
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '5'})}>5</ListItem></Grid>
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '6'})}>6</ListItem></Grid>
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_OPERAND', payload: '+'})}>+</ListItem></Grid>
        {/* row */}
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '1'})}>1</ListItem></Grid>
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '2'})}>2</ListItem></Grid>
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '3'})}>3</ListItem></Grid>
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_OPERAND', payload: '-'})}>-</ListItem></Grid>
        {/* row */}
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '0'})}>0</ListItem></Grid>
        <Grid item xs={3}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_NUMBER', payload: '.'})}>.</ListItem></Grid>
        <Grid item xs={6}> <ListItem className={classes.Button} button color='primary' onClick={() => dispatch({ type: 'SET_RESULT', payload:undefined})}>=</ListItem></Grid>
      </Grid>
      </List>
    </Card>
  );
};

export { Calculator }
