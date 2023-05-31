import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import SideNavbarWorker from 'Routes/Worker/SideNavbarWorker';
//import { fetchClientRegister } from "fetches/FetchClientRegister";
import { useState } from 'react';
//import 'css/calendar/calendar.scss';

const localizer = momentLocalizer(moment);

const eventsArray = [
    {
        title: 'Event 1',
        description: 'Event 1 Description',
        start: new Date(2023, 5, 1, 16, 30),
        end: new Date(2023, 5, 1, 19, 30),
    },
    {
        title: 'Event 2',
        description: 'Event 2 Description',
        start: new Date(2023, 5, 15, 18, 30),
        end: new Date(2023, 5, 15, 19, 30)
    },
]

const minTime = new Date();
minTime.setHours(8, 0, 0);

const maxTime = new Date();
maxTime.setHours(20, 0, 0);

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventModal, setEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [displayButton, setDisplayButton] = useState(false)
    const [events, setEvents] = useState(eventsArray)
    //const [errorMessage, setErrorMessage] = useState("");

    const handleDateSelect = date => {
        setSelectedDate(date);
    };

    const handleView = view => {
        if (view === 'day') {
            setDisplayButton(true);

        } else {
            setDisplayButton(false);
        }
        setSelectedEvent(null);
    }

    const handleEventSelect = event => {
        setSelectedEvent(event);
    };

    const handleAddEvent = async (e) => {
        debugger;
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const startTime = e.target.startTime.value;
        const endTime = e.target.endTime.value;

        // try {
        //     // Fetch para login de cliente
        //     const response = await fetchClientRegister(title, description, time, selectedDate);
        //     if (response.success) {

        //     } else {
        //         // Mensaje de error para cliente
        //         setErrorMessage(response.message);
        //     }
        // } catch (error) {
        //     console.log(error);
        //     setErrorMessage("Error en la conexión con el servidor");
        // }

        const [startHours, startMinutes] = startTime.split(':');

        const fullDateStart = new Date(selectedDate.start);
        fullDateStart.setHours(startHours);
        fullDateStart.setMinutes(startMinutes);

        const [endHours, endMinutes] = endTime.split(':');

        const fullDateEnd = new Date(selectedDate.start);
        fullDateEnd.setHours(endHours);
        fullDateEnd.setMinutes(endMinutes);


        const event = {
            title: title,
            description: description,
            start: fullDateStart,
            end: fullDateEnd,
        }
        setEvents([...events, event]);
        setEventModal(false);

    };

    const openModal = () => {
        setEventModal(true);
    };

    const closeModal = () => {
        setEventModal(false);
    };

    console.log(selectedDate.start);


    // const allowedHours = ['08:00', '08:30','09:00', '09:30', '10:00',, '10:30', '11:00', '11:30', '12:00', '12:30','13:00', 
    // '13:30', '14:00', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'];



    return (
        <div className="dashboard">
            <SideNavbarWorker> </SideNavbarWorker>
            <div className='dashboard-page'>
                <h1 className="calendar-title">Calendar</h1>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    onSelectEvent={handleEventSelect}
                    onSelectSlot={handleDateSelect}
                    min={minTime}
                    max={maxTime}
                    onView={handleView}
                    style={{ height: 600 }}
                />
                {selectedEvent && (
                    <div className="event-info">
                        <div className="section">
                            <div className="section-content">
                                <h2>{selectedEvent.title}</h2>
                                <p>{selectedEvent.description}</p>
                                <p><span>Start date: </span> {selectedEvent.start.toString()}</p>
                                <p><span>End date: </span> {selectedEvent.end.toString()}</p>
                                <div className='buttons'>
                                    <button className='clasic-button'>Edit</button>
                                    <button className='clasic-button' id="cancel-button">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {displayButton && (
                    <div className='event-button'>
                        <button className="clasic-button" onClick={openModal}>Agregar Evento</button>
                    </div>
                )}
            </div>
            {eventModal && (
                <section className="creation-section">
                    <div className="modal">
                        <div className="modal-content">
                            <h1>Create appointment</h1>
                            <form className="clasic-form" onSubmit={handleAddEvent} method="post">
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" id="title" required />
                                <label htmlFor="description">Description</label>
                                <textarea name="description" id="description" required />
                                <label htmlFor="startTime">Start Time</label>
                                <input type="time" name="startTime" id="startTime" required />
                                <label htmlFor="endTime">End Time</label>
                                <input type="time" name="endTime" id="endTime" required />
                                {/* <label htmlFor='startTime'>Start Time</label>
                                <select>
                                    {allowedHours.map(option => (
                                        <option key={option} value={option} >{option}</option>
                                    ))}
                                </select> */}
                                {/* Captcha: */}

                                <button className="clasic-button" type="submit">Create</button>
                                <button className="clasic-button" id="cancel-button" type="button" onClick={closeModal}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </section>

            )}

        </div>


    )
}

export default CalendarPage;