import React from 'react'

describe('Use API Hooks Testing', () => {

    afterEach(() => {
        jest.unmock()
    })

    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('Got success result', async () => {
        // preparation
        const mockOnSuccess = jest.fn()
        const configTest = {
            baseUrl: '/pokemon',
            onSuccess: mockOnSuccess
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
        const mockApi = jest.fn().mockResolvedValueOnce({ data: expectedResult })
        const apiMock = jest.mock('../plugins/api', () => ({
            get: mockApi
        }))
        const setStateMock = jest.fn()
        const useStatemock = (useState) => [useState, setStateMock]
        const hookMock = jest.spyOn(React, 'useState').mockImplementationOnce(useStatemock)
        const { useGetApi } = require('./useApi.js')

        // run the function
        const [doRequest] = useGetApi(configTest)
        const result = await doRequest()

        // assert the result
        expect(mockApi).toBeCalled()
        expect(mockOnSuccess).toBeCalled()
        expect(mockOnSuccess).toBeCalledWith(expectedResult)
        expect(result).toBe(expectedResult)

        // remove mock
        apiMock.resetAllMocks()
        hookMock.mockRestore()
    })

    it('got an error', async () => {
        // preparation
        const expectedError = new Error('error server')
        const configHook = {
            baseUrl: '/pokemon'
        }

        // mock
        const mockApi = jest.fn().mockRejectedValueOnce(expectedError)
        const apiMock = jest.mock('../plugins/api', () => ({
            get: mockApi
        }))
        const setErrorMock = jest.fn()
        const useStateMock = () => [expectedError, setErrorMock]
        const hookMock = jest.spyOn(React, 'useState').mockImplementationOnce(useStateMock)
        const { useGetApi } = require('./useApi.js')

        // run the function
        const [doRequest, error] = useGetApi(configHook)
        await doRequest()

        //assertiation
        expect(setErrorMock).toBeCalled()
        expect(error).toBe(expectedError)

        // remove mock
        apiMock.resetAllMocks()
        hookMock.mockRestore()
    })
})