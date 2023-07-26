
    let possibleTitles = [
    "Guess who's back, back again?",
    "Welcome back!",
    "I see you...",
    "Ready to play?",
    "Let's go!",
    "You're back!",
    "42",
    "Cattn here!",
    "Time to play!",
    "Best GBA Emulator!",
    "Best NES Emulator!",
    "Best SNES Emulator!",
    "Best N64 Emulator!",
    "Best DS Emulator!",
    "Wii when!?!??!?"
];

let randomTitle = possibleTitles[Math.floor(Math.random() * possibleTitles.length)];

document.getElementById("randomTitle").innerHTML = randomTitle;
