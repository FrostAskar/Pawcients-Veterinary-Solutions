import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import SideNavbarWorker from 'Routes/Worker/SideNavbarWorker';
import SideNavbarClient from 'Routes/Client/SideNavbarClient';
import { fetchProfile } from "fetches/Global/getProfile";
import { useState, useEffect } from 'react';
import 'css/calendar/calendar.scss';
import { useLocation } from 'react-router-dom'
import { getAllAppointments } from 'fetches/Worker/Appointments/FetchGetAllAppointments';
import { getMascotsByClient } from 'fetches/Worker/Mascots/FetchGetMascotsByClient'

const localizer = momentLocalizer(moment);

// const eventsArray = [
//     {
//         title: 'Event 1',
//         description: 'Event 1 Description',
//         startDate: new Date(2023, 5, 1, 16, 30),
//         endDate: new Date(2023, 5, 1, 19, 30),
//     },
//     {
//         title: 'Event 2',
//         description: 'Event 2 Description',
//         startDate: new Date(2023, 5, 15, 18, 30),
//         endDate: new Date(2023, 5, 15, 19, 30)
//     },
// ]

const minTime = new Date();
minTime.setHours(8, 0, 0);

const maxTime = new Date();
maxTime.setHours(20, 0, 0);

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventModal, setEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [displayButton, setDisplayButton] = useState(false)
    const [events, setEvents] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [profileData, setProfileData] = useState(null);
    //const [clients, setClients] = useState([]);
    const [mascots, setMascots] = useState([]);
    //const [errorMessage, setErrorMessage] = useState("");

    const location = useLocation();

    useEffect(() => {
        const getAppointments = async () => {
            try {
                const profileData = await fetchProfile();
                setProfileData(profileData);

                const eventsData = await getAllAppointments(profileData.id);
                setEvents(formatDate(eventsData));
            } catch (error) {

            }
        };

        getAppointments();
    }, []);


    const obtainMascots = async () => {
        const mascotsData = await getMascotsByClient(location.state.userID);
        setMascots(mascotsData);
    }

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
        const title = e.target.title.value;
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


        const event = {
            title: title,
            type: type,
            start: fullDateStart,
            end: fullDateEnd,
        }
        setEvents([...events, event]);
        setEventModal(false);

    };

    const openModal = () => {
        setEventModal(true);
        obtainMascots();
    };

    const closeModal = () => {
        setEventModal(false);
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
            {eventModal && (
                <section className="creation-section">
                    <div className="modal">
                        <div className="modal-content">
                            <h1>Create appointment</h1>
                            <form className="clasic-form" onSubmit={handleAddEvent} method="post">
                                <label htmlFor="client">Client</label>
                                <input type="text" name="title" id="title" required />
                                <label htmlFor="mascot">Mascot</label>
                                <select name="mascots" id="mascots">
                                    {mascots.map((mascot, index) => (
                                        <option key={index} value={mascot}>
                                            {mascot}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="type">Appointment type</label>
                                <select name="type" id="type">
                                    <option value="vaccine">Vaccine</option>
                                    <option value="checkup">Checkup</option>
                                    <option value="surgery">Surgery</option>
                                    <option value="cures">Cures</option>
                                </select>
                                <label htmlFor='startTime'>Start Time</label>
                                <select className='select-time' id="startTime" >
                                    {allowedHours.map(option => (
                                        <option key={option} value={option} >{option}</option>
                                    ))}
                                </select>
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