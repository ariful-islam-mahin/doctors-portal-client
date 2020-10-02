import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { useEffect, useState } from 'react';
import DateFnsUtils from "@date-io/date-fns";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";

const Appointment = () => {
    const [date, changeDate] = useState(new Date());
    const [doctorDetail, setDoctorDetail] = useState({});
    const [doctors, setDoctors] = useState([]);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/doctors')
        .then(res => res.json())
        .then(data => setDoctors(data))
    }, []);

    const handleClickOpen = (doctor) => {
        setDoctorDetail(doctor)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        const patient = {
            name : event.target.elements.name.value,
            email : event.target.elements.email.value,
            number : event.target.elements.number.value,
            time : event.target.elements.time.value,
            date : event.target.elements.date.value,
            doctor: doctorDetail.title
        };

        fetch('http://localhost:4000/addPatient', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(patient)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                alert('patient added')
            }
        })

        event.preventDefault();
    }
    // const handleAddDoctor = () => {
    //     fetch('http://localhost:5000/addDoctors', {
    //         method:'POST',
    //         headers: {'Content-type': 'application/json'},
    //         body: JSON.stringify(doctorsFakeData)
    //     })
    //     .then(res => res.json())
    //     .then(data =>  {
    //         alert('added on mongodb')
    //     })
    // }

    return (
        <div>
            {/* <button onClick={handleAddDoctor}>add</button> */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <h1 className='my-4'>Appointment</h1>
            <DatePicker
                autoOk
                orientation="landscape"
                variant="static"
                openTo="date"
                value={date}
                onChange={changeDate}
            />
            </MuiPickersUtilsProvider>
            <h2 className='text-center my-5'>{`Available Appointments on ${date.toDateString('dd/MM/yyyy')}`}</h2>
            <div className='row d-flex justify-content-center align-items-center'>
                {
                    doctors.map(doctor => 
                        <div className='col-sm-4 text-center my-4'>
                            <h4>{doctor.title}</h4>
                            <h5>{doctor.time}</h5>
                            <p>10 SPACES AVAILABLE</p>
                            <Button variant="contained" color="primary" onClick={() => handleClickOpen(doctor)}>
                                BOOK APPOINTMENT
                            </Button>
                        </div>
                    )
                }
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle className='text-center' id="form-dialog-title">{doctorDetail.title}</DialogTitle>
                        <form onSubmit={handleSubmit}>
                            <DialogContent>
                                    <TextField className="form-control my-2" name="name" id="filled-size-small" size="small"
                                    placeholder="Your Name" 
                                    variant="outlined" required/>
                                    <TextField className="form-control my-2" name="email" id="filled-size-small" size="small" placeholder="Your Email"variant="outlined" required/>
                                    <TextField className="form-control my-2" name="number" id="filled-size-small" size="small" placeholder="Phone Number" variant="outlined" required/>
                                    <TextField className="form-control my-2" name="date" id="filled-size-small" size="small" 
                                    defaultValue={date.toDateString('dd/MM/yyyy')} variant="outlined" required/>
                                    <TextField className="form-control my-2" name="time" id="filled-size-small" size="small" 
                                    defaultValue={doctorDetail.time} variant="outlined" required/>
                            </DialogContent>
                            <DialogActions>
                            <Button type='submit' variant="contained" color="primary">SEND</Button>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        </div>
    );
};

export default Appointment;