import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [
    {
        title: 'Event 1',
        start: new Date(2023, 5, 1),
        end: new Date(2023, 5, 1)
    },
    {
        title: 'Event 2',
        start: new Date(2023, 5, 15),
        end: new Date(2023, 5, 16)
    },
]

const CalendarPage = () => {
    return (
        <Calendar 
        localizer={localizer}
        events={events}
        startAccesor="start"
        endAccesor="end"
        style={{ height: 500 }}
        ></Calendar>
    )
}

export default CalendarPage;