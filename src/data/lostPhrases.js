
export function getLostPhrase(lostLang) {
    const lostPhrases = [
    `${lostLang}, it's been real`,
    `Oh no, not ${lostLang}!`,
    `R.I.P, ${lostLang}`,
    `${lostLang} just left the chat!`,
    `Farewell, dear ${lostLang}`,
    `${lostLang} is history now ~`,
    `Say goodbye to ${lostLang}!`,
    `Oops! ${lostLang} didn’t survive`,
    `We'll miss you, ${lostLang}`,
    ]

    return lostPhrases[Math.floor(Math.random() * lostPhrases.length)]
}
