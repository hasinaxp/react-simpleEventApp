import React, { useEffect, useState, useRef } from 'react'
import Firebase from '../Firebase'
import {Link} from 'react-router-dom'


export default function ListEvent() {

    const [state, setState] = useState({filter: '', events: []});
    const filterField = useRef();

    useEffect(() => {
        const eventsRef = Firebase.database().ref('events');
        eventsRef.on('value', (snapshot) => {
            let evs = snapshot.val();
            let newState = [];
            for (let ev in evs) {
                newState.push({
                    id: ev, ...evs[ev]
                });
            }
            const fltr = String(filterField.current.value).toLowerCase();
            if(!(fltr === '' || fltr === undefined || fltr === null)){

                let filteredData = newState.filter(val => {
                    let has = false;
                    if(val.hasOwnProperty('users')){
                        console.log(val.users)
                        for(let u in val.users) {
                            console.log(val.users[u])
                    
                            if(String(val.users[u].email).toLowerCase().match(fltr) ||
                             String(val.users[u].name).toLowerCase().match(fltr)) {
                                has = true;
                                break;
                            }
                        }
                    };
                    return has;
                });
                setState({...state, events: filteredData});
            }else {
                setState({...state, events :newState});
            }

        });
    },[state.filter]);


    return (
        <React.Fragment>

				
            <h2>Events List</h2>
            <section className ="bar">
                <input type="text" placeholder="search user" ref={filterField} onChange={e =>{setState({...state, filter: e.target.value});}}/>
                <Link to="/create" className="newm" style={{margin: 4}}>Add Event</Link>
            </section>
            <div className="container">
                {
                    state.events.map(event => < div className='card' key={event.id}>
                        <div className="ciPlaceholder">
                        {event.iamge !== '' ? <img className="cardImage" src={event.image}></img> : ""}
                        </div>
                        <div className="text">
                            <h1>{event.title}</h1>
                            <h2>{event.venue}-{event.date}({event.time})</h2>
                            <p>{event.description}</p>
                        </div>
                        <Link to={"/register/" + event.id} className="newm">Register</Link>
                    </div>)
                }
            </div>
            
        </React.Fragment>
    );
}