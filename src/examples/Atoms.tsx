import {atom, useRecoilState, useRecoilValue} from 'recoil'

const darkModeAtom = atom({
    key: 'darkMode',
    default: false,
})

const Switch = () => {
    const [darkMode, setDarkMode] = useRecoilState(darkModeAtom)

    return (
        <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => {
                setDarkMode(e.currentTarget.checked)
            }}
        />
    )
}

const Button = () => {
    const darkMode = useRecoilValue(darkModeAtom)

    return (
        <button style={{backgroundColor: darkMode ? 'black' : 'white', color: darkMode ? 'white' : 'black'}}>
            Button
        </button>
    )
}

const Atoms = () => {
    return (
        <div>
            <div>
                <Switch />
            </div>
            <div>
                <Button />
            </div>
        </div>
    )
}

export default Atoms
