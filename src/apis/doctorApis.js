import axiosInstance from "./AxiosInstance";

export const doctorAllUrl = '/doctor/getAll';
export const doctorUrl = '/doctor';


export function fetchAllDoctors() {
    return axiosInstance.get(doctorAllUrl);
}

export function fetchDoctorById(id) {
    return axiosInstance.get(`${doctorUrl}/${id}`);
}

