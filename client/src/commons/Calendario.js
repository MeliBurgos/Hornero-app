import React from 'react'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

let newDate = new Date()
let date = newDate.toLocaleString('sv').replace(" ","T")
// reemplazar esto por un pedido al back con los eventos de un escritorio en especifico
let F1D13 = {
  events: [{
    title: 'Event1',
    start: '2022-06-27T12:30:00',
    end: '2022-06-27T17:00:00',
    allDay: false
  }, {
    title: 'Event2',
    start: '2022-06-28T10:00:00',
    end: '2022-06-28T12:30:00',
    allDay: false
  }, {
    title: 'Event3',
    start: '2022-06-29T12:30:00',
    allDay: false
  }, {
    title: 'Event4',
    start: '2022-06-30T09:30:00',
    end: '2022-06-30T12:00:00',
    allDay: false
  }, {
        start: '2000-04-24T14:30:00',
        end: date,
        overlap: false,
        display: 'background',
        color: '#808080'
      } 
],
  color: '#bfd732',
  textColor: 'black'

}


export default class Calendario extends React.Component {

  render() {

    return (

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'dayGridMonth,timeGridWeek,timeGridDay',
          right: ''
        }}
        events={F1D13}
        weekends={false}
        initialView="dayGridMonth"
        select={this.handleDateSelect}
        unselect={this.handleUnselect}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '9:00',
          endTime: '18:00',
        }}
          nowIndicator = { true}
          contentHeight = { 400}
          navLinks = { true}
          selectable = { true}
          longPressDelay = { 1000}
          selectOverlap = { false}
          allDaySlot = { false}
          unselectAuto = { false}
          scrollTime = {'09:00:00'}
          scrollTimeReset={false}
            />
    )
}


handleDateSelect = (info) => {
  this.props.setReserve(info)
}

handleUnselect = () => {
  this.props.setReserve({})
}

}