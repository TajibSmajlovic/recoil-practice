import {Container, Heading, Text} from '@chakra-ui/layout'
import {Button} from '@chakra-ui/react'
import {Select} from '@chakra-ui/select'
import React, {Suspense, useState} from 'react'
import {atomFamily, selectorFamily, useRecoilValue, useSetRecoilState} from 'recoil'
import {getWeather} from './fakeAPI'

/*
const userIdState = atom<number | undefined>({
    key: 'userId',
    default: undefined,
})
*/

const userState = selectorFamily<any, number>({
    key: 'user',
    get: (userId) => async () => {
        const userData = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then((res) => res.json())

        return userData
    },
})

const weatherRequestIdState = atomFamily({
    key: 'weatherRequestId',
    default: 0,
})

const useRefetchWeather = (userId: number) => {
    const setRequestId = useSetRecoilState(weatherRequestIdState(userId))

    return () => setRequestId((id) => id + 1)
}

const weatherState = selectorFamily({
    key: 'weather',
    get:
        (userId: number) =>
        async ({get}) => {
            get(weatherRequestIdState(userId))

            const user = get(userState(userId))
            const weather = await getWeather(user.city)

            return weather
        },
})

const UserWeather = ({id}: {id: number}) => {
    const user = useRecoilValue(userState(id))
    const weather = useRecoilValue(weatherState(id))
    const refetch = useRefetchWeather(id)

    return (
        <>
            <Text>
                <b>Weather for {user.address.city}</b> {weather}
            </Text>
            <Button onClick={refetch}>Refetch</Button>
        </>
    )
}

const UserData = ({id}: {id: number}) => {
    const user = useRecoilValue(userState(id))

    return (
        <div>
            <Heading as="h2" size="md" mb={1}>
                User data:
            </Heading>
            <Text>
                <b>Name:</b> {user.name}
            </Text>

            <Suspense fallback={<div>Loading Weather...</div>}>
                <UserWeather id={id} />
            </Suspense>
        </div>
    )
}

export const Async = () => {
    const [userId, setUserId] = useState<number | undefined>(undefined)

    return (
        <Container py={10}>
            <Heading as="h1" mb={4}>
                View Profile
            </Heading>
            <Heading as="h2" size="md" mb={1}>
                Choose a user:
            </Heading>
            <Select
                placeholder="Choose a user"
                mb={4}
                value={userId}
                onChange={(event) => {
                    const value = event.target.value
                    setUserId(value ? parseInt(value) : undefined)
                }}
            >
                <option value="1">User 1</option>
                <option value="2">User 2</option>
                <option value="3">User 3</option>
            </Select>
            {userId && (
                <Suspense fallback={<div>Loading...</div>}>
                    <UserData id={userId} />
                </Suspense>
            )}
        </Container>
    )
}
