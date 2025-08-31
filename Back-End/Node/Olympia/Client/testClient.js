const axios = require("axios");

const creatEvent = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/events/create",
      body
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }

  const eventBody = {
    name: "Concert de Zaho de Sagazane",
    date: "2025-08-29",
    seats: {
      orchestre: 1600,
      mezzanine: 800,
    },
  };
};
creatEvent(eventBody);

const getEventsForADate = async (date) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/events?date=${date}`
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};
getEventsForADate("2025-08-29");

const getEventInfos = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/events/${id}`);
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};
getEventInfos(`68b043c6257201d3e892818e`);

const bookATicket = async (body) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/tickets/create`,
      body
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};

const body = {
  eventId: "68b043c6257201d3e892818e",
  email: "musaab@example.com",
  username: "Musaab Akhlaq",
  category: "orchestre",
  seats: 2,
  date: new Date(),
};

bookATicket(body);

const getUserTicket = async (email) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/tickets/${email}`,
      console.log(response.data)
    );
  } catch (error) {
    console.log(error.message);
  }
};

getUserTicket(`musaab@example.com`);

const updateEvent = async (body, params) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/events/${params}`,
      body
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};
const updateEventBody = {
  name: "Concert de Zaho de Sagazan (édition 2)",
  date: "2025-09-15",
  seats: {
    orchestre: 1500,
    mezzanine: 800,
  },
};
const params = "68b04489257201d3e892819b";

updateEvent(updateEventBody, params);

const deleteEventAndHisTickets = async (params) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/events/${params}`
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};

deleteEventAndHisTickets(`68b04489257201d3e892819b`);

const deleteTicketAndUpdateEvent = async (params) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/tickets/${params}`
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};

deleteTicketAndUpdateEvent();
