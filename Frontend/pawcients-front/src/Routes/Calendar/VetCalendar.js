import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import SideNavbarWorker from 'Routes/Worker/SideNavbarWorker';
import { fetchProfile } from "fetches/Global/getProfile";
import { useState, useEffect, useCallback } from 'react';
import 'css/calendar/calendar.scss';
import { getClients } from "fetches/Worker/Clients/FetchGetClients";
import { useLocation } from 'react-router-dom'
import { getVetAppointments } from 'fetches/Worker/Appointments/FetchGetVetAppointments';
import { getMascotsByClient } from 'fetches/Worker/Mascots/FetchGetMascotsByClient'
import { addAppointment } from 'fetches/Worker/Appointments/FetchAddAppointment';
import { ConfirmationPopup } from "Routes/Common/PopUp";
import { deleteAppointment } from 'fetches/Worker/Appointments/FetchDeleteAppointment';
import { updateAppoitment } from 'fetches/Worker/Appointments/FetchUpdateAppointment';

const VetCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [addEvent, setAddEvent] = useState(false);
    const [viewEvent, setViewEvent] = useState(false);
    const [addEventButton, setAddEventButton] = useState(false);
    const [events, setEvents] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [clients, setClients] = useState([]);
    const [mascots, setMascots] = useState([]);
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedMascot, setSelectedMascot] = useState("");
    //const [worker, setWorker] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState({});
    const allowedHours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '16:00', '17:00', '18:00', '19:00'];
    const [availableHours, setAvailableHours] = useState(allowedHours);
    const location = useLocation();
    const localizer = momentLocalizer(moment);
    const minTime = new Date();
    minTime.setHours(8, 0, 0);
    const maxTime = new Date();
    maxTime.setHours(20, 0, 0);

    const getAppointments = useCallback(async () => {
        try {
            const data = await fetchProfile();
            setProfileData(data);
            const eventsData = await getVetAppointments(data.id);
            setEvents(formatDate(eventsData.calendarAppointments));

        } catch (error) {

        }
    }, []);

    useEffect(() => {
        getAppointments();
        obtainClientsAndFirstMascot();
    }, [getAppointments])


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

    useEffect(() => {
        setAvailableAppointments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate]);


    const obtainClientsAndFirstMascot = async () => {
        const clientsData = await getClients();
        setClients(clientsData);
        if (clientsData.length > 0) {
            setSelectedClient(clientsData[0].client.id);
        }
        const mascotsData = await getMascotsByClient(clientsData[0].client.id);
        setMascots(mascotsData.mascots);
        if (mascotsData.mascots.length > 0) {
            setSelectedMascot(mascotsData.mascots[0].id);
        }
    };



    const handleDateSelect = date => {
        setSelectedDate(date);
    };

    function setAvailableAppointments() {
        var scheduledHours = [];
        setAvailableHours(allowedHours);
        const dayEvents = events.filter(event => {
            return event.startDate.toDateString() === selectedDate.toDateString();
        });

        if (dayEvents.length !== 0) {
            for (var i = 0; i < dayEvents.length; i++) {
                const date = new Date(dayEvents[i].startDate)
                const formattedDate = date.getHours().toString().padStart(2, '0') + ":" + (date.getMinutes() === 0 ? "00" : date.getMinutes());
                scheduledHours.push(formattedDate);
            }
            setAvailableHours(allowedHours.filter(event => !scheduledHours.includes(event)));
            scheduledHours = [];
        }
    }

    const handleView = view => {
        if (view === 'day') {
            setAddEventButton(true);

        } else {
            setAddEventButton(false);
        }
        setSelectedEvent(null);
    }

    const handleEventSelect = event => {
        setSelectedEvent(event);
        setViewEvent(true);
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
                setErrorMessage("Could not add event successfully");
                throw new Error("Mascot empty");
            }
            const response = await addAppointment(selectedClient, selectedMascot, profileData.id, type, fullDateStart, fullDateEnd, profileData.id)
            if (response.status === 200) {
                setAddEvent(false);
                getAppointments();
                setAvailableHours(allowedHours.filter(event => event !== startTime));
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

    const handleEventInfo = () => {
        setViewEvent(!viewEvent);
        setEditMode(false);
    };


    const changeEditMode = () => {
        setEditMode(!editMode);
    };

    function setTime(time) {
        const date = new Date(time);
        return date.getHours().toString().padStart(2, '0') + ":" + (date.getMinutes() === 0 ? "00" : date.getMinutes());
    }

    //Delete Pop up 

    const handleDeleteClick = (e) => {
        e.preventDefault();
        setIsPopupOpen((prevState) => ({
            ...prevState,
            [selectedEvent.appointmentId]: true,
        }));
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setIsPopupOpen((prevState) => ({
            ...prevState,
            [selectedEvent.appointmentId]: false,
        }));
    };

    const handleConfirm = async (e) => {
        e.preventDefault();
        try {
            const response = await deleteAppointment(profileData.id, selectedEvent.appointmentId);
            setSelectedEvent(null)
            if (response.status === 200) {
                setIsPopupOpen((prevState) => ({
                    ...prevState,
                    [selectedEvent.appointmentId]: false,
                }));
                setViewEvent(false);
                getAppointments();
            } else {
            }
        } catch (error) {
        }
    };

    //Edit

    const handleEditEvent = async (e) => {
        e.preventDefault();
        const typeEdited = e.target.typeEdited.value;
        const startTimeEdited = e.target.startTimeEdited.value;

        const [startHours, startMinutes] = startTimeEdited.split(':');

        const fullDateStart = new Date(selectedDate);
        fullDateStart.setHours(startHours);
        fullDateStart.setMinutes(startMinutes);

        const fullDateEnd = new Date(selectedDate);
        const endHours = Number(startHours) + 1
        fullDateEnd.setHours(endHours);
        fullDateEnd.setMinutes(startMinutes);
        const response = await updateAppoitment(fullDateStart, fullDateEnd, typeEdited, selectedEvent.appointmentId)
        if (response.status === 200) {
            getAppointments();
            setEditMode(false);
            setAvailableAppointments();
        }
    };

    return (
        <div className="dashboard">
            <SideNavbarWorker />
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
                    {viewEvent && (
                        <div className="event-info">
                            <div className="modal">
                                <div className="modal-content" id="event-info-section">
                                    <div className='close-icon' onClick={handleEventInfo}>
                                        <i className='material-icons'>close</i>
                                    </div>
                                    <h2>{selectedEvent.title}</h2>
                                    <form className="clasic-form" onSubmit={handleEditEvent} method="put">
                                        {!editMode
                                            ?
                                            <p>{selectedEvent.type}</p>
                                            :
                                            <div className='clasic-form'>
                                                <label htmlFor="typeEdited">Appointment type</label>
                                                <select name="typeEdited" id="typeEdited">
                                                    <option value="Checkup">Checkup</option>
                                                    <option value="Vaccine">Vaccine</option>
                                                    <option value="Surgery">Surgery</option>
                                                    <option value="Cures">Cures</option>
                                                </select>
                                            </div>
                                        }
                                        {!editMode
                                            ?
                                            <div>
                                                <p><span>Start time: </span> {setTime(selectedEvent.startDate)}</p>
                                                <p><span>End time: </span> {setTime(selectedEvent.endDate)}</p>
                                            </div>
                                            :
                                            <div className='clasic-form'>
                                                <label htmlFor='startTimeEdited'>Start Time: </label>
                                                <select className='select-time' id="startTimeEdited" >
                                                    {availableHours.map(option => (
                                                        <option key={option} value={option} >{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        }
                                        {!editMode
                                            ?
                                            <div className='buttons'>
                                                <button className='clasic-button' onClick={changeEditMode}>Edit</button>
                                                <button className='clasic-button' id="cancel-button" onClick={(e) => handleDeleteClick(e)}>Delete</button>
                                                {isPopupOpen[selectedEvent.appointmentId] && (
                                                    <div>
                                                        <ConfirmationPopup
                                                            onCancel={(e) => handleCancel(e)}
                                                            onConfirm={(e) => handleConfirm(e)}
                                                            item="appointment"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            :
                                            <div className='buttons'>
                                                <button className='clasic-button' type="submit">Apply</button>
                                                <button className='clasic-button' id="cancel-button" onClick={changeEditMode}>Cancel</button>
                                            </div>
                                        }
                                    </form>



                                </div>
                            </div>
                        </div>
                    )}
                    {addEventButton && (
                        <div className='event-button'>
                            <button className="clasic-button" onClick={openModal}>Add appointment</button>
                        </div>
                    )}
                    {addEvent && (
                        <section className="creation-section">
                            <div className="modal" id="event-modal">
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
                                        <label htmlFor='startTime'>Time</label>
                                        <select className='select-time' id="startTime" >
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

export default VetCalendar;