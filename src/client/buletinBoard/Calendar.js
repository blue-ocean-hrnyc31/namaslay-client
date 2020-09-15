import React from "react";
import Event from "./Event.js";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../stylesheets/events.scss";
import axios from "axios";
import NewEventModal from "./NewEventModal.js";
//sample data
import data from "./data.js";
const localizer = momentLocalizer(moment);

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      events: data,
      selectedEvent: {},
    };
    this.setModalShow = this.setModalShow.bind(this);
  }

  convertDate(date) {
    return moment.utc(date).toDate();
  }

  componentDidMount() {
    // axios
    //   .get("http://localhost:3000/events")
    //   .then(({ data }) => {
    //     console.log(data);
    //     this.setState({
    //       events: data,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log("error getting events: ", err);
    //   });
  }

  setModalShow(bool) {
    this.setState({ modalIsOpen: bool });
  }

  render() {
    return (
      <>
        <div className="calendar">
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.events}
            onSelectEvent={(selected) =>
              this.setState({ selectedEvent: selected })
            }
          />
          <button className="add-event" onClick={() => this.setModalShow(true)}>
            New Event
          </button>
          <NewEventModal
            show={this.state.modalIsOpen}
            onHide={() => this.setModalShow(false)}
          />
        </div>
        <div className="event-container">
          <Event selectedEvent={this.state.selectedEvent} />
        </div>
      </>
    );
  }
}

export default Events;