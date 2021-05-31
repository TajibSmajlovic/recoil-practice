import {atom, useRecoilValue, useSetRecoilState} from 'recoil'
import {EditProperties} from './components/EditProperties'
import {Element, Rectangle} from './components/Rectangle/Rectangle'
import {PageContainer} from './PageContainer'
import {Toolbar} from './Toolbar'

export const selectedElementAtom = atom<number | null>({
    key: 'selectedElement',
    default: null,
})

export type SetElement = (indexToSet: number, newElement: Element) => void

export const elementsStateAtom = atom<number[]>({
    key: 'elements',
    default: [],
})

function Canvas() {
    const setSelectedElement = useSetRecoilState(selectedElementAtom)
    const elements = useRecoilValue(elementsStateAtom)

    return (
        <PageContainer
            onClick={() => {
                setSelectedElement(null)
            }}
        >
            <Toolbar />
            <EditProperties />
            {elements.map((id) => (
                <Rectangle key={id} id={id} />
            ))}
        </PageContainer>
    )
}

export default Canvas
