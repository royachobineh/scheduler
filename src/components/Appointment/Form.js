
import React, { useState } from "react";

import Button from "components/Button.js";
import InterviewerList from "components/InterviewerList.js"

export default function Form(props) {
  const [name, setName] = useState(props.name || "")
  const [error, setError] = useState("")
  const [interviewer, setInterviewer] = useState(props.value || null)

  const handleInput = (event) => {
    setName(event.target.value)
  }

  const reset = () => {
    setName("")
    setInterviewer(null)
    setError("")
  }

  const validate = () => {
    if(name === ""){
      setError("Student name cannot be blank")
      return
    }

    props.save(name, interviewer)
    setError("")
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={handleInput}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => {reset(); props.onCancel()}} danger>Cancel</Button>
          <Button onClick={() => validate()} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}


