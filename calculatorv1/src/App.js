import './App.css';
import {Calculator} from './Calculatorv3'
import { 
  Grid
} from '@material-ui/core/';
function App() {
  return (
    <Grid container justify={'center'}>
      <Grid spacing={3} margin={'auto'}>
        <Calculator />
      </Grid>
    </Grid>
  );
}

export default App;
