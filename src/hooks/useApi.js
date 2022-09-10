import { useState } from 'react'

import api from '../plugins/api'

export const useGetApi = ({ baseUrl, queryParamsCollection, onSuccess }) => {
    const [error, setError] = useState(null)
    const doRequest = async () => {
        let queries = ''
        if (queryParamsCollection) {
            queries = queryParamsCollection.length <= 0 ? '' : queryParamsCollection.join('&')
        }

        try {
            const response = await api.get(baseUrl + '?' + queries)
            if (onSuccess) onSuccess(response.data)
            return response.data
        } catch (error) {
            setError(error)
        }
    }

    return [doRequest, error]
}