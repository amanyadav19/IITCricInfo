import React, {useState} from "react";
import Path from "../apis/Path"
import { Button, Modal } from 'react-bootstrap';


export const Create_venue_form = (props) => {
    const [venueName, setVenueName] = useState("");
    const [countryName, setCountryName] = useState("")
    const [cityName, setCityName] = useState("")
    const [capacity, setCapacity] = useState("")
    const [show, setShow] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Path.post("/venues/", {
                venue_name: venueName,
                city_name: cityName,
                country_name: countryName,
                capacity: capacity,
            });
            setVenueName("");
            setCountryName("");
            setCityName("");
            setCapacity("");
            setShow(true);

        } catch(err) {
            console.log(err);
        }
    }
    const handleClose = () => setShow(false);
  return (<div>
      <br></br>
      <br></br>
      <h3>
          <center>
              Form to Add Venue
          </center>
      </h3>
  <div className="mb-4 text-center">
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
            <br></br>
            <div className="form-row">
                <div className="col">
                <center><button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button></center>
                </div>
            </div>
        </form>
        <Modal show={show} onHide={handleClose}>

        <Modal.Body>Woohoo, new venue added sucessfullly!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
  </div>
  </div>);
};

export default Create_venue_form;
