import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Card,
  Grid,
  List,
  ListItem,
  CardHeader,
  Divider,
  CardContent,
  Paper,
} from '@material-ui/core/';

const useStyles = makeStyles(() => ({
  Test:{
    color:'#009868',
    border:'solid',
    borderRadius: 1,
    
  },
  Display:{
    backgroundColor:'#262626',
    // backgroundColor:'#009868',
    // border:'solid',
    color: 'white',
    background: 'white',
    minHeight: '110px',
/*     borderBottomWidth: 'thick',
    borderTopWidth: 'thin',
    borderLeftWidth: 'thin',
    borderRightWidth: 'thin', */
    flex: 1},
  Card: {
    borderRadius: 6,
    background: '#262626',
    border:'solid',
    color:'#009868',
    margin:'auto',
    maxWidth:350,
    },
  NumbPad:{
    
  },
  Button:{
    justifyContent:'center',
    border:'solid',
    borderColor: 'black', 
    borderTopWidth: 'thin',
    borderBottomWidth: 'thin',
    borderLeftWidth: 'thin',
    borderRightWidth: 'thin',},
  List:{
    padding:0,
    color:'white'
    // color:'#009868'
  }
}));

let reducer = (state, action) => {
  const DEFAULT = {
    expression: '',
    display: '0'
  }
  switch (action.type) {

    case 'NEGATION':
      if(Number.isSafeInteger(state.display)){
        if(Math.sign(state.display)<0){
          return {
            display:(Math.abs(state.display)),
            expression: `${(Math.abs(state.display))}`
          }
        } else {
          return {
            display:(Math.abs(state.display)*-1),
            expression: `${(Math.abs(state.display)*-1)}`
          }
        } 
      } else {
        return DEFAULT
      }
    case 'NUMBER_INPUT':
      if(state.expression.match(/[0-9\.]$/) && !state.expression.includes("=")){
        if(state.expression.match(/[+\-*\/]/) == null){
          let result  = eval(state.expression + action.payload);
          return {
            display: result,
            expression: `${result}`
          };
        } else {
          let result =  parseFloat(eval(state.expression + action.payload).toFixed(5))
          return {
            display: result,
            expression: state.expression + action.payload
          };
        }
      } else if(state.expression.match(/[+\-*\/]$/)){
        let result = Number.isInteger(
          eval(state.expression + action.payload)) ? 
          eval(state.expression+action.payload) : 
          parseFloat(
            eval(state.expression+action.payload).toFixed(5));
            let expression = state.expression + action.payload;
            return {
              display: result,
              expression: expression
            };
          } else if(
            state.display === "0" && action.payload !== "0" ||
            state.expression.includes("=")) {
              console.log('helena')
              let result = eval(action.payload)
              return {
          display: result,
          expression: action.payload
        };
      }

    case 'OPERAND_INPUT':
      //replace operand if clicked consecutively
      if(state.expression.match(/[+\-*\/]$/)) {
        let expression = state.expression.slice(0, -1); 
        expression += action.payload;
        return {
          ...state,
          expression:expression
        }
      }
      if(state.expression.includes("=")) {
        let expression = state.display;
        expression += action.payload;
        return {
          ...state,
          expression: expression
        };
      } else {
        if(
          state.expression != "" && 
          state.expression.match(/[*\-\/+]$/) == null) {
          let result = Number.isInteger(
            eval(state.expression)) ?
              eval(state.expression) :
              parseFloat(eval(state.expression).toFixed(5));
          let expression = state.expression;
          expression += action.payload;
          return {
            display: result,
            expression: expression
          };
        } else if(state.expression.match(/[*\-\/+]$/) != null) {
          let result = Number.isInteger(
            eval(state.expression)) ?
              eval(state.expression) :
              parseFloat(eval(state.expression).toFixed(5));
          let expression = state.expression;
          expression = expression.substring(0, (expression.length-1));
          expression += action.payload;
          return {
            display: result,
            expression: expression
          };
        }
      }

    case 'CLEAR_INPUT':
      return DEFAULT

    case 'BACK_SPACE':
      if(state.expression.length === 0) {
        return DEFAULT
      }
      return {
        ...state,
        expression: state.expression.substring(0, (state.expression.length-1))
      };

    case 'CALCULATE_EXPRESSION':
      if(state.expression.includes("=")) {
        let expression = `${state.display}`;
        return {
          ...state,
          expression: expression
        };
      } else if(
        state.expression != "" && 
        state.expression.match(/[+\-*\/]/) != null && 
        state.expression.match(/[+\-*\/]$/) == null) {
        let result = Number.isInteger(eval(state.expression)) ? 
          eval(state.expression) : 
          parseFloat(eval(state.expression).toFixed(5));
        let expression = state.expression;
        expression += ` = ${result}`;
        return {
          display: result,
          expression: expression
        };
      } else {
        return {
          ...state
        }
      }
    }
  }
const Calculator = () => {
  const classes = useStyles();

  const [state, dispatch] = useReducer(reducer, {
    display: '0',
    expression: ''})

  const Display = () => {
    return (
      <CardHeader
        className={classes.Display} 
        titleTypographyProps={{color:'inherit', align: 'right',variant: "h4", noWrap: 'true'}}
        title={state && state.display ? state.display: null}
        subheader={state && state.expression ? state.expression : null}
        subheaderTypographyProps={{/* color:'primary', */ align: 'right',variant: "h6" }}
      />
    )
    }
    const Button = ({
      size, 
      type, 
      payload, 
      value}) => {
      return (
        <Grid item xs={size}> 
          <ListItem
            className={classes.Button} 
            button 
            divider 
            color='primary' 
            onClick={() => dispatch({ 
              type: type, 
              payload:payload})}
          >{value}
          </ListItem>
        </Grid>
      )}
  return (
    <Card className={classes.Card} >
      <Paper className={classes.Test}>
        <Display />
      </Paper>
 {/*      <CardContent> */}
        <Grid container >{/* calc */}
        <List className={classes.List}>
          <Grid container item>{/* actions  */} 
            <Button size={3} value="clear" type= 'CLEAR_INPUT' payload= '' />
            <Button size={3} value="bs" type= 'BACK_SPACE' payload= '' />
            <Button size={3} value="+/-" type= 'NEGATION' payload= '-' />
            <Button size={3} value="/" type= 'OPERAND_INPUT' payload= '/' />
          </Grid>
          <Grid container item>{/* numbpad */}
            <Button size={3} value="1" type= 'NUMBER_INPUT' payload= '1' />
            <Button size={3} value="2" type= 'NUMBER_INPUT' payload= '2' />
            <Button size={3} value="3" type= 'NUMBER_INPUT' payload= '3' />
            <Button size={3} value="*" type= 'OPERAND_INPUT' payload= '*' />
            <Button size={3} value="4" type= 'NUMBER_INPUT' payload= '4' />
            <Button size={3} value="5" type= 'NUMBER_INPUT' payload= '5' />
            <Button size={3} value="6" type= 'NUMBER_INPUT' payload= '6' />
            <Button size={3} value="-" type= 'OPERAND_INPUT' payload= '-' />
            <Button size={3} value="7" type= 'NUMBER_INPUT' payload= '7' />
            <Button size={3} value="8" type= 'NUMBER_INPUT' payload= '8' />
            <Button size={3} value="9" type= 'NUMBER_INPUT' payload= '9' />
            <Button size={3} value="+" type= 'OPERAND_INPUT' payload= '+' />
            <Button size={3} value="." type= 'OPERAND_INPUT'payload= '.' />
            <Button size={3} value="0" type= 'NUMBER_INPUT' payload= '0' />
            <Button size={6} value="=" type= 'CALCULATE_EXPRESSION' payload='' />
          </Grid>
        </List>
        </Grid>
{/*       </CardContent> */}
    </Card>
  );
}
export  {Calculator};