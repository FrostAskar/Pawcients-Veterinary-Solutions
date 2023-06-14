import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import SideNavbarWorker from 'Routes/Worker/SideNavbarWorker';
import SideNavbarClient from 'Routes/Client/SideNavbarClient';
import { fetchProfile } from "fetches/Global/getProfile";
import { useState, useEffect } from 'react';
import 'css/calendar/calendar.scss';
import { getClients } from "fetches/Worker/Clients/FetchGetClients";
import { useLocation } from 'react-router-dom'
import { getAllAppointments } from 'fetches/Worker/Appointments/FetchGetAllAppointments';
import { getMascotsByClient } from 'fetches/Worker/Mascots/FetchGetMascotsByClient'
import { addAppointment } from 'fetches/Worker/Appointments/FetchAddAppointment';

const localizer = momentLocalizer(moment);

const minTime = new Date();
minTime.setHours(8, 0, 0);

const maxTime = new Date();
maxTime.setHours(20, 0, 0);

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [addEvent, setAddEvent] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [displayButton, setDisplayButton] = useState(false)
    const [events, setEvents] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [clients, setClients] = useState([]);
    const [mascots, setMascots] = useState([]);
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedMascot, setSelectedMascot] = useState("");
    //const [worker, setWorker] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const location = useLocation();

    useEffect(() => {
        const getAppointments = async () => {
            try {
                const profileData = await fetchProfile();
                setProfileData(profileData);

                const eventsData = await getAllAppointments(profileData.id);
                setEvents(formatDate(eventsData));
            } catch (error) {
                setErrorMessage("Error en la conexión con el servidor");
            }
        };

        getAppointments();
        obtainClients();

    }, [events])



    useEffect(() => {
        if (location.state != null) {
            setSelectedClient(location.state.userID)
        }
        if (selectedClient) {
            const getMascots = async () => {
                const mascotsData = await getMascotsByClient(selectedClient);
                setMascots(mascotsData.mascots);
                if (mascotsData.mascots.length > 0) {
                    setSelectedMascot(mascotsData.mascots[0].id); 
                  }
            };
            getMascots();
        } else {
            setMascots([]);
            setSelectedMascot("")
        }
    }, [selectedClient, location]);


    const obtainClients = async () => {
        const clientsData = await getClients();
        setClients(clientsData);
    };

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

    const formatDate = (eventsData) => {
        eventsData.forEach((event) => {
            event.startDate = new Date(event.startDate);
            event.endDate = new Date(event.endDate);
        })
        return eventsData;
    }



    const handleAddEvent = async (e) => {
        e.preventDefault();
        const type = e.target.type.value;
        const startTime = e.target.startTime.value;

        const [startHours, startMinutes] = startTime.split(':');

        const fullDateStart = new Date(selectedDate);
        fullDateStart.setHours(startHours);
        fullDateStart.setMinutes(startMinutes);

        const fullDateEnd = new Date(selectedDate);
        const endHours = Number(startHours) + 1
        fullDateEnd.setHours(endHours);
        fullDateEnd.setMinutes(startMinutes);

        try {
            if (selectedMascot === "") {
                console.log(selectedMascot, selectedClient, profileData.id, type, fullDateStart, fullDateEnd);
                setErrorMessage("Could not add event successfully");
                throw new Error("Mascot empty");
            }
            const response = await addAppointment(selectedClient, selectedMascot, profileData.id, type, fullDateStart, fullDateEnd, profileData.id)
            if (response != null) {

                setAddEvent(false);
            }
        } catch (e) {
            //setErrorMessage("Error en la conexión con el servidor");
        }
    };


    const openModal = () => {
        setAddEvent(true);
    };

    const closeModal = () => {
        setAddEvent(false);
    };

    const changeEditMode = () => {
        setEditMode(!editMode);
    };

    function setTime(time) {
        const date = new Date(time);
        return date.getHours() + ":" + (date.getMinutes() === 0 ? "00" : date.getMinutes());
    }


    const allowedHours = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00',
        '13:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'];

    return (
        <div className="dashboard">
            {((profileData?.type === "vet") || (profileData?.type === "aux") || (profileData?.type === "admin")) ? (
                <SideNavbarWorker />
            ) : (
                <SideNavbarClient />
            )}
            <div className='dashboard-page'>

                <h1 className="calendar-title"> My Calendar</h1>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="startDate"
                    endAccessor="endDate"
                    selectable
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

                                {!editMode
                                    ?
                                    <p>{selectedEvent.type}</p>
                                    :
                                    <div className='clasic-form'>
                                        <label htmlFor="type">Appointment type</label>
                                        <select name="type" id="type">
                                            <option value="vaccine">Vaccine</option>
                                            <option value="checkup">Checkup</option>
                                            <option value="surgery">Surgery</option>
                                            <option value="cures">Cures</option>
                                        </select>
                                    </div>
                                }
                                {!editMode
                                    ?
                                    <div>
                                        <p><span>Start date: </span> {setTime(selectedEvent.startDate)}</p>
                                        <p><span>End date: </span> {setTime(selectedEvent.endDate)}</p>
                                    </div>
                                    :
                                    <div className='clasic-form'>
                                        <label htmlFor='startTime'>Start Time: </label>
                                        <select className='select-time' id="startTime" >
                                            {allowedHours.map(option => (
                                                <option key={option} value={option} >{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                }
                                {!editMode
                                    ?
                                    <div className='buttons'>
                                        <button className='clasic-button' onClick={changeEditMode}>Edit</button>
                                        <button className='clasic-button' id="cancel-button">Delete</button>
                                    </div>
                                    :
                                    <div className='buttons'>
                                        <button className='clasic-button'>Apply</button>
                                        <button className='clasic-button' id="cancel-button" onClick={changeEditMode}>Cancel</button>
                                    </div>
                                }


                            </div>
                        </div>
                    </div>
                )}
                {displayButton && (
                    <div className='event-button'>
                        <button className="clasic-button" onClick={openModal}>Add appointment</button>
                    </div>
                )}
            </div>
            {addEvent && (
                <section className="creation-section">
                    <div className="modal">
                        <div className="modal-content">
                            <h1>Create appointment</h1>
                            <form className="clasic-form" onSubmit={handleAddEvent} method="post">
                                <label htmlFor="client">Client</label>
                                <select name="clients" id="clients" value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} required>
                                    {clients.map((client, index) => (
                                        <option key={index} value={client.client.id}>
                                            {client.client.name} {client.client.surname}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="mascot">Mascot</label>
                                <select name="mascots" id="mascots" value={selectedMascot} onChange={(e) => setSelectedMascot(e.target.value)} required>
                                    {mascots.map((mascot, index) => (
                                        <option key={index} value={mascot.id}>
                                            {mascot.name}
                                        </option>
                                    ))}
                                </select>

                                <label htmlFor="type">Appointment type</label>
                                <select name="type" id="type">
                                    <option value="Vaccine">Vaccine</option>
                                    <option value="Checkup">Checkup</option>
                                    <option value="Surgery">Surgery</option>
                                    <option value="Cures">Cures</option>
                                </select>
                                <label htmlFor='startTime'>Start Time</label>
                                <select className='select-time' id="startTime" >
                                    {allowedHours.map(option => (
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


    )
}

export default CalendarPage;