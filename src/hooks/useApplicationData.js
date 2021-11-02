import { useState, useEffect } from "react";
import axios from "axios";




export function useApplicationData(){

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
  const setDay = (day) => {
    setState({...state, day});
  };
  
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      });
  }, [])


  const updateSpots = (requestType) => {
    const dayIndex = state.days.findIndex(day => day.name === state.day);
    const days = state.days;
    if (requestType === "create") {
      days[dayIndex].spots -= 1
    } else {
      days[dayIndex].spots += 1
    }
    // setState({ ...state, days}) 
    return days;
  }

  const bookInterview = (id, interview) => {
    
    console.log(id, interview);
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      const days = updateSpots("create")
      console.log("This ===============", days);
      setState({
        ...state,
        appointments,
        days
      });
    })

  }

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      const days = updateSpots();
      setState({
        ...state,
        appointments,
        days
      });


    })

  }

 return { state, setDay, bookInterview, cancelInterview }
}