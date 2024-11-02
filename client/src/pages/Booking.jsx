import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'flowbite/dist/flowbite.css';
import axios from 'axios';
import Card from '../components/Card';

const localizer = momentLocalizer(moment);

const Booking = () => {
    const [appointments, setAppointments] = useState([]);
    const [locations, setLocations] = useState([]);
    const [providers, setProviders] = useState([]);
    const [disciplines, setDisciplines] = useState([]);
    const [treatments, setTreatments] = useState([]);
  
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [selectedDiscipline, setSelectedDiscipline] = useState(null);
    const [selectedTreatment, setSelectedTreatment] = useState(null);
  
    const [appointmentTime, setAppointmentTime] = useState(null);
  
    // Fetch dropdown data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch locations, providers, disciplines, and treatments
                const locationResponse = await axios.post(`http://localhost:8000/graphql`, {
                    data: {
                        query: `
                            query {
                                locations {
                                    id
                                    name
                                }
                            }
                        `
                    }
                });
                setLocations(locationResponse.data.data.locations);
  
                // Fetch other data (providers, disciplines, treatments) similarly
                // Make sure to write appropriate GraphQL queries for each
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
  
        fetchData();
    }, []);
  
    // Function to handle time slot selection
    const handleSelectSlot = (slotInfo) => {
        setAppointmentTime(slotInfo.start);
        alert(`You selected: ${slotInfo.start} to ${slotInfo.end}`);
    };
  
    // Function to create an appointment
    const createAppointment = async () => {
        if (!selectedLocation || !selectedProvider || !selectedDiscipline || !selectedTreatment || !appointmentTime) {
            alert('Please select all fields and a time slot before creating an appointment.');
            return;
        }
  
        try {
            const response = await axios.post('http://localhost:8000/graphql', {
                data: {
                    query: `
                        mutation {
                            addAppointment(
                                providerId: "${selectedProvider.id}",
                                treatmentId: "${selectedTreatment.id}",
                                disciplineId: "${selectedDiscipline.id}",
                                locationId: "${selectedLocation.id}",
                                startTime: "${appointmentTime.toISOString()}",
                                endTime: "${new Date(appointmentTime.getTime() + 60 * 60 * 1000).toISOString()}"
                            ) {
                                id
                                startTime
                                endTime
                            }
                        }
                    `
                }
            });
  
            // Update the appointments list with the new appointment
            const newAppointment = response.data.data.addAppointment;
            setAppointments((prevAppointments) => [
                ...prevAppointments,
                {
                    title: 'New Appointment',
                    start: new Date(newAppointment.startTime),
                    end: new Date(newAppointment.endTime),
                    id: newAppointment.id
                }
            ]);
            alert('Appointment created successfully!');
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Failed to create appointment. Please try again.');
        }
    };
  
      return (
          <div className="flex h-screen p-4 text-black">
              {/* Left side: Dropdowns */}
              <div className="w-1/4 h-3/4 pr-4 space-y-4">
                  <Card title='Location' description='123 Address St' url='/location' />
                  <Card title='Provider' description='Kenneth Ly' url='/provider' />
                  <Card title='Discipline' description='Message Therapy' url='/discipline'/>
                  <Card title='Treatment' description='First time assessment' url='/treatment'/>
              </div>
  
              {/* Right side: Calendar */}
              <div className="w-3/4 h-3/4">
                  <p className='text-2xl mb-3'>Appointment</p>
                  <Calendar
                      localizer={localizer}
                      events={appointments}
                      startAccessor="start"
                      endAccessor="end"
                      selectable
                      onSelectSlot={handleSelectSlot}
                      style={{ height: '100%' }}
                  />
              </div>
          </div>
      );
  };
  
  export default Booking;