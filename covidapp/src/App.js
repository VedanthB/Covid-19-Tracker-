import './App.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useEffect, useState } from 'react';
import InfoBox from './components/InfoBox';

// https://disease.sh/v3/covid-19/countries

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')


  useEffect(() => {
      // async -> send a requesst, wait for it, do something(get the countries and map them tin the list)
      const getContriesData = async () => {
         await fetch('https://disease.sh/v3/covid-19/countries')
          .then((response) => response.json())
          .then((data) => {
               const countries = data.map((country) => (
                 {
                 name: country.country,
                 value: country.countryInfo.iso2
               }
               ))
               setCountries(countries)
           }
           )
      }
      getContriesData();
  }, []) 
  
  const onCountryChange =  (event) => {
    const countryCode = event.target.value

    setCountry(countryCode)
  }


  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className='app__dropdown'>
            <Select 
             variant='outlined' 
             value={country} 
             onChange={onCountryChange}
             >

            {/* Loop through the countries and then show dropdown list of them */}
            <MenuItem className='app__dropdownH' value='worldwide'>Worldwide</MenuItem>
             { 
               countries.map((country) => 
                  <MenuItem value={country.value} > {country.name} </MenuItem> )
             }   
           
           </Select> 
        </FormControl>
      </div>
       

      <div className="app__box">
        <InfoBox title='Coranavirus Cases' cases={1234} total={2345} />
        <InfoBox title='Recovered' cases={123344} total={454333} />
        <InfoBox title='Deaths' cases={34543} total={455543} />
      </div>

    </div>
  );
}

export default App;
