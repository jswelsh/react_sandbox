import React, { useState } from 'react';
import './calculator.css';


const Calculator = () => {
/*   const [display, setDisplay] = useState('0')
  const [state.state.expression, setstate.expression] = useState('')
 */
  const [state, setState] = useState({
    display: '0',
    expression: ''
  })

  const numInput = (e) => {
    if(state.expression && state.expression.match(/[0-9\.]$/) && !state.expression.includes("=")){
      if(state.expression.match(/[+\-*\/]/) == null){
        let val = state.expression + e.currentTarget.value;
        setState({
          display: val,
          equation: val
        });
      } else {
        setState({
          display: state.display + e.currentTarget.value,
          equation: state.expression + e.currentTarget.value
        });
      }
    } else if(state.expression && state.expression.match(/[+\-*\/]$/)){
      let val = state.expression + e.currentTarget.value;
      setState({
        display: e.currentTarget.value,
        equation: val
      });
    } else if(state.display && state.display === "0" && e.currentTarget.value !== "0" || state.expression && state.expression.includes("=")) {
      setState({
        display: e.currentTarget.value,
        equation: e.currentTarget.value
      });
    }
  }

  const operInput = (e) => {
    if(state.expression && state.expression.includes("=")){
      let val = state.display;
      val += e.currentTarget.value;
      setState({
        equation: val
      });
    } else {
      if(state.expression != "" && state.expression && state.expression.match(/[*\-\/+]$/) == null){
        let val = state.expression;
        val += e.currentTarget.value;
        setState({
          equation: val
        });
      } else if(state.expression && state.expression.match(/[*\-\/+]$/) != null){
        let val = state.expression;
        val = val.substring(0, (val.length-1));
        val += e.currentTarget.value;
        setState({
          equation: val
        });
      }
    }
  }

  const decInput = (e) => {
    if(state.expression && state.expression == "" || state.expression && state.expression.includes("=")){
      let val = '0.';
      setState({
        display: val,
        equation: val
      });
    } else if(state.expression && state.expression.match(/[+\-*\/]$/)){
      let val = '0.';
      setState({
        display: val,
        equation: state.expression + val
      });
    } else if(state.display && !state.display.includes(".")){
      setState({
        display: state.display + e.currentTarget.value,
        equation: state.expression + e.currentTarget.value
      });
    }
  }

  const clearInput = () => {
    setState({
      display: "0",
      equation: ""
    });
  }

  const calculate = () => {
    if(state.expression && state.expression.includes("=")){
      let val = `${state.display} = ${state.display}`;
      setState({
        equation: val
      });
    } else if(state.expression && state.expression != "" && state.expression.match(/[+\-*\/]/) != null && state.expression.match(/[+\-*\/]$/) == null) {
      let result = Number.isInteger(eval(state.expression)) ? eval(state.expression) : parseFloat(eval(state.expression).toFixed(5));
      let val = state.expression;
      val += ` = ${result}`;
      setState({
        display: result,
        equation: val
      });
    }
  }
    return (
      <div className="container">
        <Display equation={state.expression} display={state.display} />
        <Button id="clear" value="clear" display="AC" class="row-3 col-1" click={clearInput} />
        <Button id="sign" value="+/-" display="±" class="row-3 col-2" />
        <Button id="percent" value="%" display="%" class="row-3 col-3" />
        <Button id="divide" value="/" display="÷" class="oper row-3 col-4" click={operInput} />
        <Button id="seven" value="7" display="7" class="num row-4 col-1" click={numInput} />
        <Button id="eight" value="8" display="8" class="num row-4 col-2" click={numInput} />
        <Button id="nine" value="9" display="9" class="num row-4 col-3" click={numInput} />
        <Button id="multiply" value="*" display="×" class="oper row-4 col-4" click={operInput} />
        <Button id="four" value="4" display="4" class="num row-5 col-1" click={numInput} />
        <Button id="five" value="5" display="5" class="num row-5 col-2" click={numInput} />
        <Button id="six" value="6" display="6" class="num row-5 col-3" click={numInput} />
        <Button id="subtract" value="-" display="−" class="oper row-5 col-4" click={operInput} />
        <Button id="one" value="1" display="1" class="num row-6 col-1" click={numInput} />
        <Button id="two" value="2" display="2" class="num row-6 col-2" click={numInput} />
        <Button id="three" value="3" display="3" class="num row-6 col-3" click={numInput} />
        <Button id="add" value="+" display="+" class="oper row-6 col-4" click={operInput} />
        <Button id="zero" value="0" display="0" class="num row-7 col-1-2" click={numInput} />
        <Button id="decimal" value="." display="." class="num row-7 col-3" click={decInput} />
        <Button id="equals" value="=" display="=" class="oper row-7 col-4" click={calculate} />
      </div>
    );
}

const Display = props => <div id="calc-display" className="row-1-2 col-1-4"><span id="eq">{props.equation}</span><span id="dis">{props.display}</span></div>;

const Button = props => <button type="button" id={props.id} value={props.value} className={props.class} onClick={props.click}>{props.display}</button>;

export  {Calculator};