import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from  "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";



import useVisualMode from 'hooks/useVisualMode';

const SAVING = "SAVING";
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";

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
    props.bookInterview(props.id, interview)
    .then(() =>{
      transition(SHOW)
    });
  }

   function destroy(){
     transition(DELETING);
     props.cancelInterview(props.id)
     .then(() => {
       transition(EMPTY)
     });
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
      {mode === EDIT && <Form interviewers={props.interviewers} save={save} onCancel={back} name={props.interview.student} interviewer={props.interview.interviewer}/>}


    </article>
  );
} 