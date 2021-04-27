
import './App.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


function App() {
  

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className='app__dropdown'>
            <Select variant='outlined' value='123' >

              {/* Loop through the countries and then show dropdown list of them */}


            <MenuItem value='worldwide'>Worldwide</MenuItem>
            <MenuItem value='worldwide'>Worldwide</MenuItem>
            <MenuItem value='worldwide'>Worldwide</MenuItem>
           </Select> 
        </FormControl>
      </div>
    </div>
  );
}

export default App;
