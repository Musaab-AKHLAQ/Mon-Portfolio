const axios = require("axios");

const getAllTasks = async () => {
  try {
    const response = await axios.get("http://localhost:3000/todos");
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};

const createTask = async (body) => {
  try {
    const response = await axios.post("http://localhost:3000/todos", body);
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};

const updateTask = async (body) => {
  try {
    const response = await axios.put(`http://localhost:3000/todos/${body.id}`, {
      name: body.name,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/todos/${id}`);
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};

const displayTask = async (name) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/todos/by-name?name=${name}`
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};

(async () => {
  await createTask({ name: "Faire a manger" });
  await updateTask({
    id: "68a8a5f1053154def50d8047",
    name: "nettoyer la table",
  });
  await getAllTasks();
  await deleteTask("68a8a5f1053154def50d8047");
  await displayTask("Faire du sport");
})();
