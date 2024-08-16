import {http, HttpResponse} from 'msw'

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

]
