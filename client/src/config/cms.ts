import ky from 'ky-universal'
import env from 'config/env'

const API_URL = env.CMS.API_URL
const API_TOKEN = env.CMS.API_TOKEN

export default ky.extend({
    hooks: {
        beforeRequest: [
            (request) => {
                request.headers.set('Authorization', `Bearer ${API_TOKEN}`)
            },
        ],
    },
    prefixUrl: `${API_URL}`,
})
