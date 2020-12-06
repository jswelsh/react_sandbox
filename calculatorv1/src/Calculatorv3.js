import React, { useState, useReducer, useEffect } from 'react';
import './calculator.css';
import { 
  Card,
  CardHeader,
} from '@material-ui/core/';

let reducer = (state, action) => {

  switch (action.type) {
    case 'NUMBER_INPUT':
      if(state.expression.match(/[0-9\.]$/) && !state.expression.includes("=")){
        if(state.expression.match(/[+\-*\/]/) == null){
          let val = state.expression + action.payload;

          return {
            display: val,
            expression: val
          };
        } else {
          let result =  parseFloat(eval(state.expression + action.payload).toFixed(5))
          //let val = state.expression + action.payload;
          return {
            display: result,//state.display + '.'+ action.payload,
            expression: state.expression + action.payload
          };
        }
    }     
    /* else if(state.expression.match(/[+\-*\/]$/)){
      let val = state.expression + action.payload;
      return {
        display: action.payload,
        expression: val
      }; */
    
    else if(state.expression.match(/[+\-*\/]$/)){
      let result = Number.isInteger(eval(state.expression+action.payload)) ? eval(state.expression+action.payload) : parseFloat(eval(state.expression+action.payload).toFixed(5));
      let val = state.expression + action.payload;
      return {
        display: result,
        expression: val
      };

    } else if(state.display === "0" && action.payload !== "0" ||state.expression.includes("=")) {
      return {
        display: action.payload,
        expression: action.payload
      };
    }

    case 'OPERAND_INPUT':
      if(state.expression.match(/\.$/)){
        return {
          ...state
        }
      }
      //replace operand if clicked consecutively
      if(state.expression.match(/[+\-*\/]$/)) {
        let val = state.expression.slice(0, -1); 
        val += action.payload;
        return {
          ...state,
          expression:val
        }
      }
      if(state.expression.includes("=")){
        let val = state.display;
        val += action.payload;
        return {
          ...state,
          expression: val
        };
      } else {
        if(state.expression != "" && state.expression.match(/[*\-\/+]$/) == null){
          let result = Number.isInteger(eval(state.expression)) ? eval(state.expression) : parseFloat(eval(state.expression).toFixed(5));
          let val = state.expression;
          val += action.payload;
          return {
            display: result,
            expression: val
          };
        } else if(state.expression.match(/[*\-\/+]$/) != null){
          let result = Number.isInteger(eval(state.expression)) ? eval(state.expression) : parseFloat(eval(state.expression).toFixed(5));
          let val = state.expression;
          val = val.substring(0, (val.length-1));
          val += action.payload;
          return {
            display: result,
            expression: val
          };
        }
        
        /* else if(state.expression.match(/[*\-\/+]$/) != null){
          let val = state.expression;
          val = val.substring(0, (val.length-1));
          val += action.payload;
          return {
            ...state,
            expression: val
          };
        } */
      }
/* 
      if((state.expression.slice(-1)).match(/[+\-*\/]$/) && (state.expression.slice(-1)).match(/[+\-*\/]$/).input) {


*/
/*     case 'OPERAND_INPUT':
      console.log('yooooo')
      if(state.expression.slice(-1).match(/\.$/)){
        console.log('yooooo')
      }
      if(state.expression == "" || state.expression.includes("=")){
        let val = '0.';
        return {
          display: val,
          expression: val
        };
      } else if(state.expression.match(/[+\-*\/]$/)){
        let val = '0.';
        return {
          display: val,
          expression: state.expression + val
        };
      } else if(!state.display.includes(".")){
        return {
          display: state.display + action.payload,
          expression: state.expression + action.payload
        };
      } */
  

    case 'CLEAR_INPUT':
      return {
        display: "0",
        expression: "0"
      };

    case 'CALCULATE_EXPRESSION':
/*   let calculate = () => { */
      if(state.expression.includes("=")){
        let val = `${state.display} = ${state.display}`;
        return {
          expression: val
        };
      } else if(state.expression != "" && state.expression.match(/[+\-*\/]/) != null && state.expression.match(/[+\-*\/]$/) == null) {
        let result = Number.isInteger(eval(state.expression)) ? eval(state.expression) : parseFloat(eval(state.expression).toFixed(5));
        let val = state.expression;
        val += ` = ${result}`;
        return {
          display: result,
          expression: val
        };
      }
    }
  }
const Calculator = () => {
/*   const [display, setDisplay] = useState('0')
  const [state.state.expression, setstate.expression] = useState('')
 */
  const [state, dispatch] = useReducer(reducer, {
    display: '0',
    expression: ''
  })
// const Display = props => <div id="calc-display" className="row-1-2 col-1-4"><span id="eq">{props.expression &&props.expression}</span><span id="dis">{props.display && props.display}</span></div>;

  const Display = () => {
    return (
      <CardHeader
        className={"calculator-display"}
        titleTypographyProps={{ align: 'right',variant: "h3" }}
        // title={state && state.expression ? state.expression : null}
        // subheader={state && state.display ? state.display: null}
        title={state && state.display ? state.display: null}
        subheader={state && state.expression ? state.expression : null}

        subheaderTypographyProps={{color:'', align: 'right',variant: "h6" }}
      />
    )
    // return state.num2 || state.operand ? state.operand + state.num2 : 0
    }
    
    const Button = props => <button type="button" id={props.id} value={props.value} /* className={props.class} */className={`calculator-key ${props.className}`} onClick={props.click}>{props.display}</button>;

  return (
    <>
    <Card>
    <div className="calculator">
      <Display /* expression={state.expression} display={state.display}  *//>
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <Button id="clear" value="clear" display="AC" className="key-clear"/* class="row-3 col-1" */click ={() => dispatch({ type: 'CLEAR_INPUT', payload: ''})}/>
            <Button id="sign" value="+/-" display="±" className="key-sign"/* class="row-3 col-2" */ />
            <Button id="percent" value="%" display="%" className="key-percent"/* class="row-3 col-3"*/ /> 
          </div>
          <div className="digit-keys">
            <Button id="zero" value="0" display="0" className="key-0" /* class="num row-7 col-1-2 "*/ click={() => dispatch({ type: 'NUMBER_INPUT', payload: '0'})} />
            <Button id="decimal" value="." display="." className="key-dot" /* class="num row-7 col-3" */ click={() => dispatch({ type: 'OPERAND_INPUT', payload: '.'})} />
            <Button id="one" value="1" display="1" className="key-1" /* class="num row-6 col-1" */ click={() => dispatch({ type: 'NUMBER_INPUT', payload: '1'})} />
            <Button id="two" value="2" display="2" className="key-2" /* class="num row-6 col-2" */ click={() => dispatch({ type: 'NUMBER_INPUT', payload: '2'})} />
            <Button id="three" value="3" display="3" className="key-3" /* class="num row-6 col-3" */ click={() => dispatch({ type: 'NUMBER_INPUT', payload: '3'})} />
            <Button id="four" value="4" display="4" className="key-4" /* class="num row-5 col-1" */ click={() => dispatch({ type: 'NUMBER_INPUT', payload: '4'})} />
            <Button id="five" value="5" display="5" className="key-5" /* class="num row-5 col-2" */ click={() => dispatch({ type: 'NUMBER_INPUT', payload: '5'})} />
            <Button id="six" value="6" display="6" className="key-6" /* class="num row-5 col-3" */ click={() => dispatch({ type: 'NUMBER_INPUT', payload: '6'})} />
            <Button id="seven" value="7" display="7" className="key-7" /* class="num row-4 col-1" */ click={() => dispatch({ type: 'NUMBER_INPUT', payload: '7'})} />
            <Button id="eight" value="8" display="8" className="key-8" /* class="num row-4 col-2" */ click={() => dispatch({ type: 'NUMBER_INPUT', payload: '8'})} />
            <Button id="nine" value="9" display="9" className="key-9" /* class="num row-4 col-3" */ click={() => dispatch({ type: 'NUMBER_INPUT', payload: '9'})} />
          </div>
        </div>
        <div className="operator-keys">
          <Button id="divide" value="/" display="÷" className="key-divide"/* class="oper row-3 col-4" */ click={() => dispatch({ type: 'OPERAND_INPUT', payload: '/'})} />
          <Button id="multiply" value="*" display="×" className="key-multiply"/* class="oper row-4 col-4" */ click={() => dispatch({ type: 'OPERAND_INPUT', payload: '*'})} />
          <Button id="subtract" value="-" display="−" className="key-subtract"/* class="oper row-5 col-4" */ click={() => dispatch({ type: 'OPERAND_INPUT', payload: '-'})} />
          <Button id="add" value="+" display="+" className="key-add"/* class="oper row-6 col-4" */ click={() => dispatch({ type: 'OPERAND_INPUT', payload: '+'})} />
          <Button id="equals" value="=" display="=" className="key-equals"/* class="oper row-7 col-4" */ click={() => dispatch({ type: 'CALCULATE_EXPRESSION', payload: state})} />
        </div>
      </div>
    </div>
    </Card>
    </>
  );
  
}

// const Display = props => <div id="calc-display" className="row-1-2 col-1-4"><span id="eq">{props.expression &&props.expression}</span><span id="dis">{props.display && props.display}</span></div>;


export  {Calculator};
/* import React, { useState, useReducer, useEffect } from 'react';
import './calculator.css';


let reducer = (state, action) => {

  switch (action.type) {
    case 'NUMBER_INPUT':
      console.log('numberinput', state)
      
      if(state.expression.match(/[0-9\.]$/) && !state.expression.includes("=")){
        if(state.expression.match(/[+\-*\/]/) == null){
          console.log('1')
          let val = state.expression + action.payload;
          return {
            display: val,
            expression: val
          };
        } else {
          console.log('2')
          return {
            display: state.display + action.payload,
            expression: state.expression + action.payload
          };
        }
    } else if(state.expression.match(/[+\-*\/]$/)){
      console.log('3')
      let val = state.expression + action.payload;
      return {
        display: action.payload,
        expression: val
      };
    } else if(state.display === "0" && action.payload !== "0" ||state.expression.includes("=")) {
      console.log('4')
      return {
        display: action.payload,
        expression: action.payload
      };
    }

    case 'OPERAND_INPUT':
      if(state.expression.includes("=")){
        let val = state.display;
        val += action.payload;
        return {
          ...state,
          expression: val
        };
      } else {
        if(state.expression != "" && state.expression.match(/[*\-\/+]$/) == null){
          let val = state.expression;
          val += action.payload;
          return {
            ...state,
            expression: val
          };
        } else if(state.expression.match(/[*\-\/+]$/) != null){
          let val = state.expression;
          val = val.substring(0, (val.length-1));
          val += action.payload;
          return {
            ...state,
            expression: val
          };
        }
      }

    case 'OPERAND_INPUT':
      if(state.expression == "" || state.expression.includes("=")){
        let val = '0.';
        return {
          display: val,
          expression: val
        };
      } else if(state.expression.match(/[+\-*\/]$/)){
        let val = '0.';
        return {
          display: val,
          expression: state.expression + val
        };
      } else if(!state.display.includes(".")){
        return {
          display: state.display + action.payload,
          expression: state.expression + action.payload
        };
      }
  

    case 'CLEAR_INPUT':
      return {
        display: "0",
        expression: ""
      };

    case 'CALCULATE_EXPRESSION':

      console.log('calculate', action.payload)
      if(state.expression.includes("=")){
        let val = `${state.display} = ${state.display}`;
        return {
          expression: val
        };
      } else if(state.expression != "" && state.expression.match(/[+\-*\/]/) != null && state.expression.match(/[+\-*\/]$/) == null) {
        let result = Number.isInteger(eval(state.expression)) ? eval(state.expression) : parseFloat(eval(state.expression).toFixed(5));
        let val = state.expression;
        val += ` = ${result}`;
        return {
          display: result,
          expression: val
        };
      }
    }
  }
const Calculator = () => {
  const [state, dispatch] = useReducer(reducer, {
    display: '0',
    expression: ''
  })

  const Display = () => {
    console.log('display',state)
    return (<div id="calc-display" className="row-1-2 col-1-4"><span id="eq">
      {state && state.expression ? state.expression : null}</span><span id="dis">
      {state && state.display ? state.display: null}</span></div>)
    }
    const Button = props => <button type="button" id={props.id} value={props.value} className={props.class} onClick={props.click}>{props.display}</button>;

  return (
    <div className="container">
      <Display/>
      <Button id="clear" value="clear" display="AC" class="row-3 col-1" click={() => dispatch({ type: 'CLEAR_INPUT', payload: ''})}/>
      <Button id="sign" value="+/-" display="±" class="row-3 col-2" />
      <Button id="percent" value="%" display="%" class="row-3 col-3" />
      <Button id="divide" value="/" display="÷" class="oper row-3 col-4" click={() => dispatch({ type: 'OPERAND_INPUT', payload: '/'})} />
      <Button id="seven" value="7" display="7" class="num row-4 col-1" click={() => dispatch({ type: 'NUMBER_INPUT', payload: '7'})} />
      <Button id="eight" value="8" display="8" class="num row-4 col-2" click={() => dispatch({ type: 'NUMBER_INPUT', payload: '8'})} />
      <Button id="nine" value="9" display="9" class="num row-4 col-3" click={() => dispatch({ type: 'NUMBER_INPUT', payload: '9'})} />
      <Button id="multiply" value="*" display="×" class="oper row-4 col-4" click={() => dispatch({ type: 'OPERAND_INPUT', payload: '*'})} />
      <Button id="four" value="4" display="4" class="num row-5 col-1" click={() => dispatch({ type: 'NUMBER_INPUT', payload: '4'})} />
      <Button id="five" value="5" display="5" class="num row-5 col-2" click={() => dispatch({ type: 'NUMBER_INPUT', payload: '5'})} />
      <Button id="six" value="6" display="6" class="num row-5 col-3" click={() => dispatch({ type: 'NUMBER_INPUT', payload: '6'})} />
      <Button id="subtract" value="-" display="−" class="oper row-5 col-4" click={() => dispatch({ type: 'OPERAND_INPUT', payload: '-'})} />
      <Button id="one" value="1" display="1" class="num row-6 col-1" click={() => dispatch({ type: 'NUMBER_INPUT', payload: '1'})} />
      <Button id="two" value="2" display="2" class="num row-6 col-2" click={() => dispatch({ type: 'NUMBER_INPUT', payload: '2'})} />
      <Button id="three" value="3" display="3" class="num row-6 col-3" click={() => dispatch({ type: 'NUMBER_INPUT', payload: '3'})} />
      <Button id="add" value="+" display="+" class="oper row-6 col-4" click={() => dispatch({ type: 'OPERAND_INPUT', payload: '+'})} />
      <Button id="zero" value="0" display="0" class="num row-7 col-1-2" click={() => dispatch({ type: 'NUMBER_INPUT', payload: '0'})} />
      <Button id="decimal" value="." display="." class="num row-7 col-3" click={() => dispatch({ type: 'OPERAND_INPUT', payload: '.'})} />
      <Button id="equals" value="=" display="=" class="oper row-7 col-4" click={() => dispatch({ type: 'CALCULATE_EXPRESSION', payload: state})} />
    </div>
  );
  
}



export  {Calculator}; */