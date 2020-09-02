import React, { useEffect, useState } from 'react'
import Firebase, { storage } from '../Firebase'
import {useParams, useHistory} from 'react-router-dom';



export default function CreateEvent() {
    const { id } = useParams();
    const  history  = useHistory();
    const [state, setState] = useState({
       id : id,
       name : '',
       email: '',
       phone: ''
    });
    const submitForm = e => {
        const eventRef = Firebase.database().ref(`events/${state.id}/users`);
        const event = state;
        eventRef.push(event);
        alert("registered successfully!");
        history.push('/')
    }
    const setValue = e => {
        setState({ ...state, [e.target.name]: e.target.value });

    }

    return (
        <section>
            <h2>Register Event</h2>
            <div className="createEventFields">
                <input type="text" placeholder="Name" name="name" className="ceTitle" onChange={setValue} />
                <input type="email" placeholder="email" name="email" className="ceDate" onChange={setValue} />
                <input type="phone" placeholder="phone" name="phone" className="ceTime" onChange={setValue} />
            </div>
            <button className="newm" onClick={() => submitForm()}>Register</button>
        </section>
    );
}