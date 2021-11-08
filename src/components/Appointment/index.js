import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from  "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";




import useVisualMode from 'hooks/useVisualMode';

const SAVING = "SAVING";
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview, "create")
    .then(() =>{
      transition(SHOW)
    })
    .catch((err) => {
      transition(ERROR_SAVE, true)
    })
  }

   function destroy(){
     transition(DELETING, true);
     props.cancelInterview(props.id)
     .then(() => {
       transition(EMPTY)
     })
     .catch((err) => {
      transition(ERROR_DELETE, true)
    })
     
   }

   function edit(name, interviewer){
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview, "edit")
    .then(() =>{
      transition(SHOW)
    })
    .catch((err) => {
      transition(ERROR_SAVE, true)
    })
   }


  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === SHOW && props.interview && <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={() => transition(EDIT)} onDelete={() => transition(CONFIRM)}/>}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} save={save} onCancel={back} />}
      {mode === SAVING && <Status message="SAVING" />}
      {mode === CONFIRM && <Confirm message="Are you sure?" onCancel={back} onConfirm={destroy}/>}
      {mode === DELETING && <Status message="DELETING" />}
      {mode === EDIT && <Form interviewers={props.interviewers} save={edit} onCancel={back} name={props.interview.student} interviewer={props.interview.interviewer}/>}
      {mode === ERROR_SAVE && <Error message="Could not save the interview" onClose={back}/>}
      {mode === ERROR_DELETE && <Error message="Could not delete the interview" onClose={back}/>}
    </article>
  );
} 