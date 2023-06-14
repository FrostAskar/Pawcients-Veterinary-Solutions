import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import SideNavbarClient from 'Routes/Client/SideNavbarClient';
import { useState, useEffect, useCallback } from 'react';
import { getAllAppointments } from 'fetches/Client/Appointments/FetchGetAllAppoinments';
import { getVetAppointments } from 'fetches/Worker/Appointments/FetchGetVetAppointments';
import { addAppointment } from 'fetches/Client/Appointments/FetchAddAppointment';
import { fetchProfile } from "fetches/Global/getProfile";
import { getWorkers } from "fetches/Worker/Staff/FetchGetWorkers";
import { getMascotsByClient } from 'fetches/Worker/Mascots/FetchGetMascotsByClient'
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
    const [workers, setWorkers] = useState([]);
    const [workersEvents, setWorkersEvents] = useState([]);
    const [mascots, setMascots] = useState([]);
    const [selectedVet, setSelectedVet] = useState("");
    const [selectedMascot, setSelectedMascot] = useState("");
    const allowedHours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '16:00', '17:00', '18:00', '19:00'];
    const [availableHours, setAvailableHours] = useState(allowedHours);
    const [selectedTime, setSelectedTime] = useState(availableHours[0]);
    const minTime = new Date();
    minTime.setHours(8, 0, 0);
    const maxTime = new Date();
    maxTime.setHours(20, 0, 0);

    const getAppointments = useCallback(async () => {

        try {
            const data = await fetchProfile();
            setProfileData(data);
            const eventsData = await getAllAppointments(data.id);
            setEvents(formatDate(eventsData.calendarAppointments));
            const mascotData = await getMascotsByClient(data.id);
            setMascots(mascotData.mascots);
            if (mascotData.mascots.length > 0) {
                setSelectedMascot(mascotData.mascots[0].id);
            }

        } catch (error) {
            setErrorMessage("Error en la conexión con el servidor");
        }
    }, []);


    useEffect(() => {
        getAppointments();
        obtainWorkers();
    }, [getAppointments])

    const obtainWorkers = async () => {
        const workerData = await getWorkers();
        setWorkers(workerData);
        if (workerData.length > 0) {
            setSelectedVet(workerData[0].id);
        }
    };
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
        setAvailableAppointments();
    };

    const closeModal = () => {
        setAddEventModal(false);
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        const [startHours, startMinutes] = selectedTime.split(':');

        const fullDateStart = new Date(selectedDate);
        fullDateStart.setHours(startHours);
        fullDateStart.setMinutes(startMinutes);

        const fullDateEnd = new Date(selectedDate);
        const endHours = Number(startHours) + 1
        fullDateEnd.setHours(endHours);
        fullDateEnd.setMinutes(startMinutes);

        try {
            const response = await addAppointment(profileData.id, selectedMascot, selectedVet, "Checkup", fullDateStart, fullDateEnd)
            if (response != null) {
                setAddEventModal(false);
                getAppointments();
                setAvailableHours(allowedHours.filter(event => event !== selectedTime));
            }
        } catch (e) {
            //setErrorMessage("Error en la conexión con el servidor");
        }
    }

    const handleChangeVet = async (e) => {
        e.preventDefault();
        setSelectedVet(e.target.value)
        console.log(selectedVet);
        setAvailableAppointments();
    }

    

    const handleDeleteClick = (e) => {
    }

    function setTime(time) {
        const date = new Date(time);
        return date.getHours().toString().padStart(2, '0') + ":" + (date.getMinutes() === 0 ? "00" : date.getMinutes());
    }

    const setAvailableAppointments =  async() => {
        var scheduledHours = [];
        if (selectedVet) {
            const eventsData = await getVetAppointments(selectedVet);
            setWorkersEvents(formatDate(eventsData));
            setAvailableHours(allowedHours);
            const dayEvents = workersEvents.filter(event => {
                return event.startDate.toDateString() === selectedDate.toDateString();
            });

            if (dayEvents.length !== 0) {
                for (var i = 0; i < dayEvents.length; i++) {
                    const date = new Date(dayEvents[i].startDate)
                    const formattedDate = date.getHours().toString().padStart(2, '0') + ":" + (date.getMinutes() === 0 ? "00" : date.getMinutes());
                    scheduledHours.push(formattedDate);
                }
                setAvailableHours(allowedHours.filter(event => !scheduledHours.includes(event)));
                setSelectedTime(availableHours[0]);
                scheduledHours = [];
            }
        }

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
                                        <p><span>Start time: </span> {setTime(selectedEvent.startDate)}</p>
                                        <p><span>End time: </span> {setTime(selectedEvent.endDate)}</p>
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
                                        <label htmlFor="mascot">Mascot</label>
                                        <select name="mascots" id="mascots" value={selectedMascot} onChange={(e) => setSelectedMascot(e.target.value)} required>
                                            {mascots.map((mascot, index) => (
                                                <option key={index} value={mascot.id}>
                                                    {mascot.name}
                                                </option>
                                            ))}
                                        </select>
                                        <label htmlFor="vets">Vets</label>
                                        <select name="vets" id="vets" value={selectedVet} onChange={(e) => handleChangeVet(e)} required>
                                            {workers.map((worker, index) => (
                                                <option key={index} value={worker.id}>
                                                    {worker.name} {worker.surname}
                                                </option>
                                            ))}
                                        </select>
                                        <label htmlFor='startTime'>Time</label>
                                        <select className='select-time' id="startTime" defaultValue={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} required>
                                            {availableHours.map(option => (
                                                <option key={option} value={option} >{option}</option>
                                            ))}
                                        </select>
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