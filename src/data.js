import {useState} from 'react';

function Data(){
    const [user,setUser] = useState(null);
    const getData=()=>{
        //calling an api with fetch function [www.randomuser.me]
        fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then(data=>{
                console.log(data);
                // store
                setUser(data.results[0]);
            })
    }
    return(
        <div>
            <button onClick={getData}>Fetch data</button>
            {user ? <p>{user.name.first}{user.name.last} - {user.email}</p> :<p>user not found</p>}
        </div>
    )
}

export default Data;