import axiosInstance from "./AxiosInstance";

export const patientUser = '/patient';
export const doctorUser = '/doctor';
export const registerApiUrl = '/register';
export const loginApiUrl = '/login';

const patientRegisterUrl = '/patient/register';
const patientLoginUrl = '/patient/login';

export function patientRegisterRequest(data) {
    return axiosInstance.post(patientRegisterUrl, data);
}

export function patientLoginRequest(data) {
    return axiosInstance.post(patientLoginUrl, data);
}