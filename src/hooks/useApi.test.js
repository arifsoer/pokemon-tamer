import React from 'react'
import { useGetApi } from '../hooks/useApi'
import api from '../plugins/api'

jest.mock('../plugins/api')

describe('Use API Hooks Testing', () => {
    it('Got success result', () => {
        // preparation
        let res = null
        const onSuccess = jest.fn()
        const configTest = {
            baseUrl: '/pokemon',
            onSuccess
        }
        const expectedResult = {
            count: 2,
            results: [
                {
                    name: 'poke1',
                    url: 'poke1 url'
                },
                {
                    name: 'poke2',
                    url: 'poke2 url'
                }
            ]
        }
        api.mockResolvedValue({data: expectedResult})
        const setStateMock = jest.fn()
        const useStatemock = (useState) => [useState, setStateMock]
        jest.spyOn(React, 'useState').mockImplementation(useStatemock)

        // run the function
        const [doRequest] = useGetApi(configTest)
        const result = doRequest()

        // assert the result
        expect(api).toHaveBeenCalledTimes(1)
        expect(res).toEqual(expectedResult)
    })
})