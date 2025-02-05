import axiosInstance from "./AxiosInstance";

export const patientUser = '/patient';
export const doctorUser = '/doctor';
export const registerApiUrl = '/register';
export const loginApiUrl = '/login';

const patientRegisterUrl = '/patient/register';
const patientLoginUrl = '/patient/login';
const doctorRegisterUrl = '/doctor/register';
const doctorLoginUrl = '/doctor/login';

export function patientRegisterRequest(data) {
    return axiosInstance.post(patientRegisterUrl, data);
}

export function patientLoginRequest(data) {
    return axiosInstance.post(patientLoginUrl, data);
}

export function doctorRegisterRequest(data) {
    return axiosInstance.post(doctorRegisterUrl, data);
}

export function doctorLoginRequest(data) {
    return axiosInstance.post(doctorLoginUrl, data);
}