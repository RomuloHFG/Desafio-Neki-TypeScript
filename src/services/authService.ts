import axiosInstance from "../axiosConfig";


interface User {
  name: string;
  email: string;
  password: string;
}


interface Professional {
  title: string;
  subheader: string;
  description: string; 
  address: string;
  phone: string;
}


interface Specialty {
  id: string;
  name: string;
}


interface LevelOfExpertise {
  id: string;
  name: string;
}


export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post(`/auth/login`, { email, password });
  return response.data;
};


export const postUser = async (data: User) => {
  const response = await axiosInstance.post(`/auth/register`, data);
  return response.data;
};


export const postProfessionals = async (data: Professional) => {
  const response = await axiosInstance.post(`/Professionals`, data);
  return response.data;
};


export const getProfessionals = async () => {
  const response = await axiosInstance.get(`/Professionals`);
  return response.data;
};


export const getSpecialties = async (): Promise<Specialty[]> => {
  const response = await axiosInstance.get(`/specialties`);
  return response.data;
};


export const getLevelsofexpertise = async () => {
  const response = await axiosInstance.get(`/levelsofexpertise`);
  return response.data;
};

export const postPhoto = async (formData: FormData, professionalId: string) => {
  const response = await axiosInstance.post(
    `/Professionals/${professionalId}/photo`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getPhoto = async (professionalId: string) => {
  const response = await axiosInstance.get(
    `/Professionals/${professionalId}/photo`
  );
  return response.data;
};

export const updateProfessional = async (id: string, updatedData: Professional) => {
  const dataToUpdate = {
    name: updatedData.title,
    specialty: {
      id: updatedData.subheader,
    },
    levelOfExpertise: {
      id: updatedData.description,
    },
    address: updatedData.address,
    phone: updatedData.phone,
  };

  const response = await axiosInstance.put(`/Professionals/${id}`, dataToUpdate);
  return response;
};

export const deleteProfessional = async (id: string) => {
  const response = await axiosInstance.delete(`/Professionals/${id}`);
  return response;
};
