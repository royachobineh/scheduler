import React from "react";
import "components/DayListItem";
import DayListItem from "components/DayListItem";

export default function DayList(props){
  const dayList = props.days.map((day) => {
          return(<DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.value}
          setDay={props.onChange}
          ></DayListItem>)
        });
        return(
          <ul>
            {dayList}
          </ul>
        )
}