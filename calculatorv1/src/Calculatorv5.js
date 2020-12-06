import React, { useReducer } from 'react';
import './calculator.css';
import { 
  Card,
  CardHeader,
} from '@material-ui/core/';

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
          let result  = state.expression + action.payload;
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
        return {
          display: action.payload,
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
  const [state, dispatch] = useReducer(reducer, {
    display: '0',
    expression: ''})

  const Display = () => {
    return (
      <CardHeader
        className={"calculator-display"}
        titleTypographyProps={{ align: 'right',variant: "h4", noWrap: 'true'}}
        title={state && state.display ? state.display: null}
        subheader={state && state.expression ? state.expression : null}
        subheaderTypographyProps={{color:'', align: 'right',variant: "h6" }}
      />
    )
    }
    const Button = props => <button type="button" id={props.id} value={props.value} /* className={props.class} */className={`calculator-key ${props.className}`} onClick={props.click}>{props.display}</button>;

  return (
    <>
    <Card>
    <div className="calculator">
      <Display />
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <Button id="clear" value="clear" display="AC" className="key-clear" click ={() => dispatch({ type: 'CLEAR_INPUT', payload: ''})}/>
            <Button id="backspace" value="bs" display="↩" className="backspace" click ={() => dispatch({ type: 'BACK_SPACE', payload: ''})}/>
            <Button id="sign" value="+/-" display="±" className="key-sign" click={() => dispatch({ type: 'NEGATION', payload: '-'})} />
          </div>
          <div className="digit-keys">
            <Button id="zero" value="0" display="0" className="key-0" click={() => dispatch({ type: 'NUMBER_INPUT', payload: '0'})} />
            <Button id="decimal" value="." display="." className="key-dot" click={() => dispatch({ type: 'OPERAND_INPUT', payload: '.'})} />
            <Button id="one" value="1" display="1" className="key-1" click={() => dispatch({ type: 'NUMBER_INPUT', payload: '1'})} />
            <Button id="two" value="2" display="2" className="key-2" click={() => dispatch({ type: 'NUMBER_INPUT', payload: '2'})} />
            <Button id="three" value="3" display="3" className="key-3" click={() => dispatch({ type: 'NUMBER_INPUT', payload: '3'})} />
            <Button id="four" value="4" display="4" className="key-4" click={() => dispatch({ type: 'NUMBER_INPUT', payload: '4'})} />
            <Button id="five" value="5" display="5" className="key-5" click={() => dispatch({ type: 'NUMBER_INPUT', payload: '5'})} />
            <Button id="six" value="6" display="6" className="key-6" click={() => dispatch({ type: 'NUMBER_INPUT', payload: '6'})} />
            <Button id="seven" value="7" display="7" className="key-7" click={() => dispatch({ type: 'NUMBER_INPUT', payload: '7'})} />
            <Button id="eight" value="8" display="8" className="key-8" click={() => dispatch({ type: 'NUMBER_INPUT', payload: '8'})} />
            <Button id="nine" value="9" display="9" className="key-9" click={() => dispatch({ type: 'NUMBER_INPUT', payload: '9'})} />
          </div>
        </div>
        <div className="operator-keys">
          <Button id="divide" value="/" display="÷" className="key-divide" click={() => dispatch({ type: 'OPERAND_INPUT', payload: '/'})} />
          <Button id="multiply" value="*" display="×" className="key-multiply" click={() => dispatch({ type: 'OPERAND_INPUT', payload: '*'})} />
          <Button id="subtract" value="-" display="−" className="key-subtract" click={() => dispatch({ type: 'OPERAND_INPUT', payload: '-'})} />
          <Button id="add" value="+" display="+" className="key-add" click={() => dispatch({ type: 'OPERAND_INPUT', payload: '+'})} />
          <Button id="equals" value="=" display="=" className="key-equals" click={() => dispatch({ type: 'CALCULATE_EXPRESSION', payload: state})} />
        </div>
      </div>
    </div>
    </Card>
    </>
  );
}
export  {Calculator};