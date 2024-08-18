import api from "./api";


const getAvailableInspectionList = async () => {
    return api.post("/workday/search/das", {});
}

const getInspection = async (workdayId: any) => {
    return api.get(`/workday/inspection?workday_id=${workdayId}`);
}

const getInspectionQuestion = async () => {
    return api.get(`/inspection/SPPG_PREMISES`);
}

export const inspectionService = {
    getAvailableInspectionList,
    getInspection,
    getInspectionQuestion
}
