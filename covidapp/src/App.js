import './App.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useEffect, useState } from 'react';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// https://disease.sh/v3/covid-19/countries

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})

  // this use effect accounts for tthe worldwide info

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
     .then(response => response.json())
    .then((data) => {
       setCountryInfo(data)
    })
  }, [])
   

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
  
  const onCountryChange = async (event) => {
    const countryCode = event.target.value
    //to display the info card deetails when country is selected
    setCountry(countryCode)

    const url = 
      countryCode === 'worldwide'
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url) 
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode)
       // all the data from the country response 
       setCountryInfo(data)
    }) 

    console.log(countryInfo)
   
  }


  return (
    <div className="app">

     <div className="app__left">
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
            <InfoBox title='Coranavirus Cases' cases={countryInfo.todayCases} total={countryInfo.cases} />
            <InfoBox title='Recovered' cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
            <InfoBox title='Deaths' cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        <Map/>
     </div>

      <div className='app__right'> 
          <Card>
            <CardContent>
               <h3>Live Cases by Country</h3>
                {/* table */}
               <h3>Worldwide New cases</h3>
               {/* graph */}
            </CardContent>
          </Card>
      </div>
      
    </div>
  );
}

export default App;
