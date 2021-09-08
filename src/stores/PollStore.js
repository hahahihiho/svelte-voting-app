import {writable} from 'svelte/store';

const initial_v = [
    {
        id: 1,
        question: "A or B ???",
        answerA:'A',
        answerB:'B',
        votesA: 9,
        votesB: 10,
    }
]
const PollStore = writable(initial_v);

export default PollStore;