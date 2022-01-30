import React, {useState} from "react";
import Path from "../apis/Path"


export const Create_venue_form = (props) => {
    const [venueName, setVenueName] = useState("");
    const [countryName, setCountryName] = useState("")
    const [cityName, setCityName] = useState("")
    const [capacity, setCapacity] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Path.post("/venues/", {
                venue_name: venueName,
                city_name: cityName,
                country_name: countryName,
                capacity: capacity,
            });
        } catch(err) {
            console.log(err);
        }
    }
  return (<div className="mb-4">
        <form action="">
            <div className="form-row">
                <div className="col">
                    <input value = {venueName} onChange = {e => setVenueName(e.target.value)} type="text" className="form-control" placeholder="Venue Name"/>
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <input value = {countryName} onChange = {e => setCountryName(e.target.value)} type="text" className="form-control" placeholder="Country Name"/>
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <input value = {cityName} onChange = {e => setCityName(e.target.value)} type="text" className="form-control" placeholder="City Name"/>
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <input value = {capacity} onChange = {e => setCapacity(e.target.value)} type="number" className="form-control" placeholder="Capacity"/>
                </div>
            </div>
            <div className="form-row">
                <center><button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button></center>
                </div>
        </form>
  </div>);
};

export default Create_venue_form;
