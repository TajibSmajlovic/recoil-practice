import {Icon, IconButton, VStack} from '@chakra-ui/react'
import {Square, Image} from 'react-feather'
import {useRecoilCallback, useRecoilValue} from 'recoil'
import {elementsStateAtom} from './Canvas'
import {defaultElement, elementStateAtom} from './components/Rectangle/Rectangle'
import {getRandomImage} from './util'

export const Toolbar = () => {
    const elements = useRecoilValue(elementsStateAtom)
    const newId = elements.length

    const insertElement = useRecoilCallback(({set}) => (type: 'rectangle' | 'image') => {
        set(elementsStateAtom, (e) => [...e, newId])

        if (type === 'image') {
            set(elementStateAtom(newId), {
                ...defaultElement,
                image: getRandomImage(),
            })
        }
    })

    return (
        <VStack
            position="absolute"
            top="20px"
            left="20px"
            backgroundColor="white"
            padding={2}
            boxShadow="md"
            borderRadius="md"
            spacing={2}
        >
            <IconButton
                onClick={() => {
                    insertElement('rectangle')
                }}
                aria-label="Add rectangle"
                icon={<Icon style={{width: 24, height: 24}} as={Square} />}
            />
            <IconButton
                onClick={() => {
                    insertElement('image')
                }}
                aria-label="Add image"
                icon={<Icon style={{width: 24, height: 24}} as={Image} />}
            />
        </VStack>
    )
}
