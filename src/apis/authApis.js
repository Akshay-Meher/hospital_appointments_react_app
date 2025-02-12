import axiosInstance from "./AxiosInstance";

export const patientUser = '/patient';
export const doctorUser = '/doctor';
export const registerApiUrl = '/register';
export const loginApiUrl = '/login';
export const logOutUrl = '/logout';

export const patientRegisterUrl = '/patient/register';
export const patientLoginUrl = '/patient/login';
export const doctorRegisterUrl = '/doctor/register';
export const doctorLoginUrl = '/doctor/login';
export const otpLogin = '/otp-login';
export const loginSendOtpUrl = '/send-otp'
export const verifyLoginOtpUrl = '/verify-otp';

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


export function logOut(role) {
    return axiosInstance.get(logOutUrl)
}


export function sendLoginOtp(data) {
    return axiosInstance.post(`${otpLogin}${loginSendOtpUrl}`, data);
}

export function verifyLoginOtp(data) {
    return axiosInstance.post(`${otpLogin}${verifyLoginOtpUrl}`, data);
}