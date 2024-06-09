class Sound {
    #place;
    #capture;
    #invalid;
    #grab;
    constructor() {
        this.#place = new Audio("place.mp3");

        this.#capture = new Audio("capture.mp3");
        this.#capture.volume = 0.8;

        this.#invalid = new Audio("invalid.mp3");
        this.#invalid.volume = 0.7;

        this.#grab = new Audio("grab.mp3");
        this.#grab.volume = 0.3;
    }

    place() {
        this.#place.currentTime = 0;
        this.#place.play();
    }
    capture() {
        this.#capture.currentTime = 0;
        this.#capture.play();
    }
    invalid() {
        this.#invalid.currentTime = 0;
        this.#invalid.play();
    }
    grab() {
        this.#grab.currentTime = 0;
        this.#grab.play();
    }
}

export const sound = new Sound();
