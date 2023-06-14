import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import SideNavbarClient from 'Routes/Client/SideNavbarClient';
import { useState, useEffect, useCallback } from 'react';
import { getAllAppointments } from 'fetches/Client/Appointments/FetchGetAllAppoinments';
import { fetchProfile } from "fetches/Global/getProfile";
import 'css/calendar/calendar.scss';
import 'css/global/global.scss';

const ClientCalendar = () => {
    const [profileData, setProfileData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [addEventButton, setAddEventButton] = useState(false);
    const [addEventModal, setAddEventModal] = useState(false);
    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    //const [workers, setWorkers] = useState([]);
    const minTime = new Date();
    minTime.setHours(8, 0, 0);

    const maxTime = new Date();
    maxTime.setHours(20, 0, 0);

    const getAppointments = useCallback(async () => {

        try {
            const data = await fetchProfile();
            setProfileData(data);
            const eventsData = await getAllAppointments(data.id);
            setEvents(formatDate(eventsData));

        } catch (error) {
            setErrorMessage("Error en la conexión con el servidor");
        }
    }, []);


    useEffect(() => {
        getAppointments();
    }, [getAppointments])

    const formatDate = (eventsData) => {
        eventsData.forEach((event) => {
            event.startDate = new Date(event.startDate);
            event.endDate = new Date(event.endDate);
        })
        return eventsData;
    }

    const handleEventSelect = event => {
        setSelectedEvent(event);
    };

    const handleDateSelect = date => {
        setSelectedDate(date);
    };

    const handleView = view => {
        if (view === 'day') {
            setAddEventButton(true);

        } else {
            setAddEventButton(false);
        }
        setSelectedEvent(null);
    }

    const openModal = () => {
        setAddEventModal(true);
    };

    const closeModal = () => {
        setAddEventModal(false);
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
    }

    const handleDeleteClick = (e) => {
    }

    function setTime(time) {
        const date = new Date(time);
        return date.getHours().toString().padStart(2, '0') + ":" + (date.getMinutes() === 0 ? "00" : date.getMinutes());
    }

    return (
        <div className="dashboard">
            <SideNavbarClient />
            <div className='dashboard-page'>
                <div className='dashboard-content'>
                    <h1 className="calendar-title"> My Calendar</h1>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        selectable
                        startAccessor="startDate"
                        endAccessor="endDate"
                        onSelectEvent={handleEventSelect}
                        onNavigate={handleDateSelect}
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
                                    <p>{selectedEvent.type}</p>
                                    <div>
                                        <p><span>Start date: </span> {setTime(selectedEvent.startDate)}</p>
                                        <p><span>End date: </span> {setTime(selectedEvent.endDate)}</p>
                                    </div>
                                    <div className='buttons'>
                                        <button className='clasic-button' id="cancel-button" onClick={(e) => handleDeleteClick(e)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {addEventButton && (
                        <div className='event-button'>
                            <button className="clasic-button" onClick={openModal}>Add appointment</button>
                        </div>
                    )}
                    {addEventModal && (
                        <section className="creation-section">
                            <div className="modal" id="event-modal">
                                <div className="modal-content">
                                    <h1>Create appointment</h1>
                                    <form className="clasic-form" onSubmit={handleAddEvent} method="post">
                                        <button className="clasic-button" type="submit">Create</button>
                                        <button className="clasic-button" id="cancel-button" type="button" onClick={closeModal}>Cancel</button>
                                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                                    </form>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )

}

export default ClientCalendar;