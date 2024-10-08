import axiosInstance from "../axiosConfig";

// Tipagem para o usuário
interface User {
  name: string;
  email: string;
  password: string;
}

// Tipagem para um profissional
interface Professional {
  title: string;
  subheader: string; // Especialidade
  description: string; // Nível de atuação
  address: string;
  phone: string;
}

// Tipagem para a especialidade
interface Specialty {
  id: string;
  name: string;
}

// Tipagem para o nível de expertise
interface LevelOfExpertise {
  id: string;
  name: string;
}

// Função para login
export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post(`/auth/login`, { email, password });
  return response.data;
};

// Função para registrar um usuário
export const postUser = async (data: User) => {
  const response = await axiosInstance.post(`/auth/register`, data);
  return response.data;
};

// Função para registrar um profissional
export const postProfessionals = async (data: Professional) => {
  const response = await axiosInstance.post(`/Professionals`, data);
  return response.data;
};

// Função para obter profissionais
export const getProfessionals = async () => {
  const response = await axiosInstance.get(`/Professionals`);
  return response.data;
};

// Função para obter especialidades
export const getSpecialties = async (): Promise<Specialty[]> => {
  const response = await axiosInstance.get(`/specialties`);
  return response.data;
};

// Função para obter níveis de expertise
export const getLevelsofexpertise = async () => {
  const response = await axiosInstance.get(`/levelsofexpertise`);
  return response.data;
};

// Função para enviar foto de um profissional
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

// Função para obter foto de um profissional
export const getPhoto = async (professionalId: string) => {
  const response = await axiosInstance.get(
    `/Professionals/${professionalId}/photo`
  );
  return response.data;
};

// Função para atualizar um profissional
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

// Função para deletar um profissional
export const deleteProfessional = async (id: string) => {
  const response = await axiosInstance.delete(`/Professionals/${id}`);
  return response;
};
