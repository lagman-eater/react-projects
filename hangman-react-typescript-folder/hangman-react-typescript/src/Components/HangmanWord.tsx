type HangmanProps = {
    letters: string[]
    word: string
    reveal?: boolean 
}

export function HangmanWord({ letters, word, reveal = false}: HangmanProps) {
    return <div
        style={{
            display: "flex",
            gap: ".25em",
            fontSize: "6rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "monospace",
        }}>
        {word.split('').map((letter, index) => (
            <span
                style={{ borderBottom: '.1em solid #000' }} key={index}>
                    <span style={{visibility: letters.includes(letter) || reveal ? 'visible' : 'hidden',color: !letters.includes(letter) && reveal ? 'red' : '#000'}}>{letter}</span>
            </span>
        ))}
    </div>
}