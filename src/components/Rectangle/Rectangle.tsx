import {atomFamily, useRecoilState} from 'recoil'
import {selectedElementAtom} from '../../Canvas'
import {Drag} from '../Drag'
import {RectangleContainer} from './RectangleContainer'
import {RectangleInner} from './RectangleInner'
import {Resize} from '../Resize'
import {Suspense} from 'react'
import {RectangleLoading} from './RectangleLoading'

export type ElementStyle = {
    position: {top: number; left: number}
    size: {width: number; height: number}
}

export type Element = {style: ElementStyle; image?: {id: number; src: string}}

export const defaultElement = {
    style: {
        position: {top: 300, left: 400},
        size: {width: 200, height: 220},
    },
}

export const elementStateAtom = atomFamily<Element, number>({
    key: 'element',
    default: defaultElement,
})

export const Rectangle = ({id}: {id: number}) => {
    const [selectedElement, setSelectedElement] = useRecoilState(selectedElementAtom)
    const [element, setElement] = useRecoilState(elementStateAtom(id))
    const selected = id === selectedElement

    return (
        <RectangleContainer
            position={element.style.position}
            size={element.style.size}
            onSelect={() => {
                setSelectedElement(id)
            }}
        >
            <Resize
                selected={selected}
                position={element.style.position}
                size={element.style.size}
                onResize={(style) => {
                    setElement({...element, style})
                }}
            >
                <Drag
                    position={element.style.position}
                    onDrag={(position) => {
                        setElement({
                            ...element,
                            style: {
                                ...element.style,
                                position,
                            },
                        })
                    }}
                >
                    <div>
                        <Suspense fallback={<RectangleLoading selected={selected} />}>
                            <RectangleInner id={id} selected={selected} />
                        </Suspense>
                    </div>
                </Drag>
            </Resize>
        </RectangleContainer>
    )
}
