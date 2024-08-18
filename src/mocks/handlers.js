import {http, HttpResponse} from 'msw'
import inspectionList from './data/inspectionList.json'
import questionList from './data/inspectionQuestions.json'

export const handlers = [
    http.post('/api/v1/upload', async ({request}) => {
        const requestBody = await request.json()
        console.log(requestBody)
        const result = requestBody?.files?.map((item) => {
            return {
                id: Date.now(),
            }
        })
        return HttpResponse.json(result);
    }),
    http.post('/galvatron/api/v1/workday/search/das', async () => {
        return HttpResponse.json(inspectionList);
    }),

    http.get('/galvatron/api/v1/workday/inspection', async (req, res, ctx) => {
        const url = new URL(req?.request?.url);
        const workdayId = url.searchParams.get('workday_id');

        const inspection = inspectionList?.data.filter(
            (item) => item.id === workdayId
        );

        return HttpResponse.json(inspection);
    }),

    http.get('/galvatron/api/v1/inspection/SPPG_PREMISES', async () => {
        return HttpResponse.json(questionList);
    }),
]
