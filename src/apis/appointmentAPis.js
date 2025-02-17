import axiosInstance from "./AxiosInstance";

export const bookAppoiontmentUrl = '/appointment/book';

export const getAllAppointsByUserIdUrl = '/appointment/get-details';
export const cancleAppointmentUrl = 'appointment/cancle';

export function bookAppoiontment(data) {
    return axiosInstance.post(bookAppoiontmentUrl, data);
}

export function getAllAppointsByUserId(data) {
    return axiosInstance.get(getAllAppointsByUserIdUrl, { params: data });
}

export function cancleAppointment(data) {
    return axiosInstance.post(cancleAppointmentUrl, data);
}