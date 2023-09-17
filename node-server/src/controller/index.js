import axios from "axios";

const HOST = process.env.HOST || "http://localhost";
const URL = `${HOST}:8080/tomcat`;

export const register = async (req, res) => {
  let data = req.body;

  let config = {
    method: "post",
    url: `${URL}/register`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const api = await axios.request(config);
    return res.status(api.status).json(api.data);
  } catch (error) {
    console.log(error);
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data.message });
    }
    return res.json({ error: error.message });
  }
};

export const login = async (req, res) => {
  let data = req.body;

  let config = {
    method: "post",
    url: `${URL}/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const api = await axios.request(config);
    return res.status(api.status).json(api.data);
  } catch (error) {
    console.log(error);
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data.message });
    }
    return res.json({ error: error.message });
  }
};

export const getPhysicians = async (req, res) => {
  let config = {
    method: "get",
    url: `${URL}/physicians`,
  };

  try {
    const api = await axios.request(config);
    console.log(api);
    return res.status(api.status).json(api.data);
  } catch (error) {
    console.log(error);
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data.message });
    }
    return res.json({ error: error.message });
  }
};

export const getPharmacists = async (req, res) => {
  let config = {
    method: "get",
    url: `${URL}/pharmacists`,
  };

  try {
    const api = await axios.request(config);
    console.log(api);
    return res.status(api.status).json(api.data);
  } catch (error) {
    console.log(error);
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data.message });
    }
    return res.json({ error: error.message });
  }
};

export const giveConsultation = async (req, res) => {
  const token = req.token;
  let data = JSON.stringify({
    patientUsername: req.body.patientUsername,
    disease: req.body.disease,
  });

  let config = {
    method: "post",
    url: `${URL}/physician/giveConsultation`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  try {
    const api = await axios.request(config);
    return res.status(api.status).json(api.data);
  } catch (error) {
    console.log(error);
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data.message });
    }
    return res.json({ error: error.message });
  }
};

export const givePrescription = async (req, res) => {
  const token = req.token;
  let data = req.body;

  let config = {
    method: "post",
    url: `${URL}/pharmacist/givePrescription`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  try {
    const api = await axios.request(config);
    return res.status(api.status).json(api.data);
  } catch (error) {
    console.log(error);
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data.message });
    }
    return res.json({ error: error.message });
  }
};

export const addMedicine = async (req, res) => {
  const token = req.token;
  let data = req.body;

  let config = {
    method: "post",
    url: `${URL}/pharmacist/addMedicine`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  try {
    const api = await axios.request(config);
    return res.status(api.status).json(api.data);
  } catch (error) {
    console.log(error);
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data.message });
    }
    return res.json({ error: error.message });
  }
};

export const getMedicines = async (req, res) => {
  const token = req.token;

  let config = {
    method: "get",
    url: `${URL}/medicines`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const api = await axios.request(config);
    return res.status(api.status).json(api.data);
  } catch (error) {
    console.log(error);
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data.message });
    }
    return res.json({ error: error.message });
  }
};

export const selectPhysician = async (req, res) => {
  let data = req.body;
  let token = req.token;

  let config = {
    method: "post",
    url: `${URL}/patient/choosePhysician`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  try {
    const api = await axios.request(config);
    return res.status(api.status).json(api.data);
  } catch (error) {
    console.log(error);
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data.message });
    }
    return res.json({ error: error.message });
  }
};

export const selectPharmacist = async (req, res) => {
  let data = req.body;
  let token = req.token;

  let config = {
    method: "post",
    url: `${URL}/patient/choosePharmacist`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  try {
    const api = await axios.request(config);
    return res.status(api.status).json(api.data);
  } catch (error) {
    console.log(error);
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data.message });
    }
    return res.json({ error: error.message });
  }
};

export const getPharmacistPatients = async (req, res) => {
  const token = req.token;

  let config = {
    method: "get",
    url: `${URL}/pharmacist/getPatients`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const api = await axios.request(config);
    return res.status(api.status).json(api.data);
  } catch (error) {
    console.log(error);
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data.message });
    }
    return res.json({ error: error.message });
  }
};

export const getPhysicianPatients = async (req, res) => {
  const token = req.token;

  let config = {
    method: "get",
    url: `${URL}/physician/getPatients`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const api = await axios.request(config);
    return res.status(api.status).json(api.data);
  } catch (error) {
    console.log(error);
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data.message });
    }
    return res.json({ error: error.message });
  }
};

export const getPatient = async (req, res) => {
  const token = req.token;

  let config = {
    method: "get",
    url: `${URL}/patient/get`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const api = await axios.request(config);
    return res.status(api.status).json(api.data);
  } catch (error) {
    console.log(error);
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data.message });
    }
    return res.json({ error: error.message });
  }
};
