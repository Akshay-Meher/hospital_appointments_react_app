import axiosInstance from "./AxiosInstance";

const doctorALL = '/doctor/getAll'

export function fetchAllDoctors() {
    return axiosInstance.get(doctorALL);
}