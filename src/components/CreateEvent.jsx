import React, { useEffect, useState } from 'react'
import Firebase, { storage } from '../Firebase'



export default function CreateEvent() {
    const [state, setState] = useState({
        title: "event",
        date: Date.now(),
        time: '12am',
        venue: '',
        fees: 0,
        description: '',
        image: '',
        loading: false
    });

    const submitForm = e => {
        const eventRef = Firebase.database().ref('events');
        const event = state;
        eventRef.push(event);
        alert("event added successfully!");
    }
    const setValue = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    }
    
    const handleImageAsFile = e => {
        if(e.target.files.length > 0) {

            setState({ ...state, loading: true })
            const image = e.target.files[0]
            console.log(image.name)
            const uploadTask = storage.ref(`/images/${image.name}`).put(image)
            uploadTask.on('state_changed',
                (snapShot) => {
                    console.log(snapShot)
                }, (err) => {
                    console.log(err)
                }, () => {
                    storage.ref('images').child(image.name).getDownloadURL()
                        .then(fireBaseUrl => {
                            setState({ ...state, image: fireBaseUrl, loading: false })
                        });
                });
        }

    }

    return (
        <section>
            <h2>Create Event</h2>
            <div className="createEventFields">
                <input type="text" placeholder="Title" name="title" className="ceTitle" onChange={setValue} />
                <input type="date" placeholder="Date" name="date" className="ceDate" onChange={setValue} />
                <input type="time" placeholder="Time" name="time" className="ceTime" onChange={setValue} />
                <input type="text" placeholder="Venue" name="venue" className="ceVenue" onChange={setValue} />
                <input type="number" placeholder="Fees" name="fees" className="ceFees" onChange={setValue} />
                <textarea type="text" placeholder="Description" name="description" className="ceDesc" onChange={setValue} />

                <div style= {{display: 'flex'}}>
                    <input type="file" name="image" onChange={handleImageAsFile} />{ state.loading ? <div className='loader'></div>: ""}
                </div>
            </div>
            <button className="newm" onClick={() => submitForm()}>Add Event</button>
        </section>
    );
}