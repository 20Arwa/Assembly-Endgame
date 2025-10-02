export default function Keyboard(props) {
    // Get Keyboard Capital Letters
    const KeyboardLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)); 

    // Color Letters Red Or Green If Pressed
    function letterColring(letter) {
        if (props.pressedRight.includes(letter)) 
            return "bg-success"
        else if (props.pressedWrong.includes(letter)) 
            return "bg-danger"
    }

    return (   
        <>
        {KeyboardLetters.map(letter => (
        <button
            key={letter}
            className={`p-2 px-3 m-1 rounded text-dark ${letterColring(letter)}`}
            onClick={() => props.checkLetter(letter)}
            disabled={props.gameStatus == "win" ||props.gameStatus == "lost"}
            aria-disabled={props.pressedRight.includes(letter) || props.pressedWrong.includes(letter)}
        >
            {letter}
        </button>
        ))}
        </> 
    )
}