import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import SideNavbarWorker from 'Routes/Worker/SideNavbarWorker';
import { useState } from 'react';

const localizer = momentLocalizer(moment);

const eventsArray = [
    {
        title: 'Event 1',
        description: 'Event 1 Description',
        start: new Date(2023, 5, 1, 19, 30),
        end: new Date(2023, 5, 1, 21, 30)
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
    const [events, setEvents] = useState(eventsArray)

    const handleDateSelect = date => {
        setSelectedDate(date);
    };

    const handleEventSelect = event => {
        setSelectedEvent(event);
    };

    const handleAddEvent = () => {
        const newEvent = {
            title: 'Event 1',
            description: 'Description',
            start: selectedDate,
            end: selectedDate,
        };

        setEvents([...events, newEvent]);
    };

    console.log(selectedDate);
    console.log(selectedEvent);

    const openModal = event => {
        setSelectedEvent(event);
        setEventModal(true);
    };

    const closeModal = event => {
        setSelectedEvent(null);
        setEventModal(true);
    };

    // const formattedDate = selectedDate.toLocaleDateString('es-ES', {
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric',
    // });

    return (
        <div className="dashboard">
            <SideNavbarWorker> </SideNavbarWorker>
            <div className='dashboard-page'>
                <h1>Calendar</h1>
                {/* <h2>{formattedDate}</h2> */}
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
                    style={{ height: 600 }}
                />
                {selectedEvent && (
                    <div>
                        <h2>{selectedEvent.title}</h2>
                        <p>{selectedEvent.start.toString()}</p>
                        <p>{selectedEvent.end.toString()}</p>
                    </div>
                )}

                <button onClick={handleAddEvent}>Agregar Evento</button>
            </div>

        </div>


    )
}

export default CalendarPage;