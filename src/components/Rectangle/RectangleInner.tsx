import {Box} from '@chakra-ui/react'
import {useEffect} from 'react'
import {selectorFamily, useRecoilValue, useSetRecoilState} from 'recoil'
import {getBorderColor, getImageDimensions} from '../../util'
import {editPropertyState} from '../EditProperties'
import {elementStateAtom} from './Rectangle'

const imageSizeState = selectorFamily({
    key: 'imageSize',
    get: (src: string | undefined) => () => {
        if (!src) return

        return getImageDimensions(src)
    },
})

export const RectangleInner = ({id, selected}: {id: number; selected: boolean}) => {
    const element = useRecoilValue(elementStateAtom(id))
    const imageSize = useRecoilValue(imageSizeState(element.image?.src))
    const setSize = useSetRecoilState(editPropertyState({path: 'style.size', id}))

    useEffect(() => {
        if (!imageSize) return

        setSize(imageSize)
    }, [imageSize, setSize])

    return (
        <Box
            position="absolute"
            border={`1px solid ${getBorderColor(selected)}`}
            transition="0.1s border-color ease-in-out"
            width="100%"
            height="100%"
            display="flex"
            padding="2px"
        >
            <Box
                flex="1"
                border="3px dashed #101010"
                borderRadius="255px 15px 225px 15px/15px 225px 15px 255px"
                backgroundColor="white"
                backgroundSize="cover"
                {...(element.image && {backgroundImage: `url(${element.image.src})`})}
            />
        </Box>
    )
}
