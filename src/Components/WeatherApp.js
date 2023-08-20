import React,{useState} from "react";



const WeatherApp = ()=> {

    let date = new Date();
    let month = date.getMonth();

    console.log("Date: " + date)
    console.log("Month: " + month)

    const [lat,setLat] = useState();
    const [long,setLong] = useState();

    const [hemisphere,setHemisphere] = useState("");
    const [season,setSeason] = useState("");

    function getPosition(){

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                console.log("Latitude:" + position.coords.latitude);
                console.log("Longitude:" + position.coords.longitude);

                setLat(position.coords.latitude);
                setLong(position.coords.longitude)


                getHemisphere(position.coords.latitude);

                if(position.coords.latitude > 0){
                    getSeason("Northern Hemisphere");
                } else if(position.coords.latitude < 0){
                    getSeason("Southern Hemisphere");
                }
            })
        }

       

    }


    function  getHemisphere(lat){
        if(lat > 0){
            setHemisphere("Northern Hemisphere");
        } else if(lat < 0){
            setHemisphere("Southern Hemisphere");
        } else{
            setHemisphere("Equator");
        }
    }



    function getSeason(hemisphere){
        if((hemisphere == "Northern Hemisphere" && month >=7 && month <=9) || (hemisphere == "Southern Hemisphere" && (month ==1 || month ==2 || month ==3 || month==11 || month==12)) ){
            setSeason("Summer")
        } else if((hemisphere == "Southern Hemisphere" && month >=7 && month <=9) || (hemisphere == "Northern Hemisphere" && (month ==1 || month ==2 || month ==3 || month==11 || month==12))){
            setSeason("Winter")
        }                                                   
    }


return(

    <div className="weather-app">

        <button onClick={getPosition}>Click Me</button>
        {
            lat && (
               <div>
                 <h1>Latitude: {lat}</h1>
                 <h1>Longitude: {long}</h1>
                 <h1>Hemisphere: {hemisphere}</h1>
                 <h1>Season: {season}</h1>
               </div>
            )
        }

    </div>

)

}

export default WeatherApp;