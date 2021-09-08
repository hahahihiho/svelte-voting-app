<script>
import PollStore from '../stores/PollStore';
import Button from '../shared/Button.svelte';
import Card from '../shared/Card.svelte'
import {tweened} from 'svelte/motion'

export let poll;
$: totalVotes = poll.votesA+poll.votesB;

$: percentA = Math.floor(poll.votesA*100/totalVotes)||0;
$: percentB = Math.floor(poll.votesB*100/totalVotes)||0;

const tweenedA = tweened(0);
const tweenedB = tweened(0);

$: tweenedA.set(percentA);
$: tweenedB.set(percentB);

const handleVote = (option,id) =>{
    PollStore.update(polls => {
        let upvotedPoll = polls.find(poll => poll.id===id)
        if(option === 'a'){
            upvotedPoll.votesA++;
        }
        else if(option === 'b'){
            upvotedPoll.votesB++;
        }
        return polls;
    })
}
const handleDelete = (id) => {
    PollStore.update(polls => {
        return polls.filter(poll => poll.id !== id);
    })
}

</script>
<Card>
    <div class="poll">
        <h3> {poll.question} </h3>
        <p>Total Votes : {totalVotes}</p>
        <div class="answer" on:click={()=>handleVote("a",poll.id)}>
            <div class="percent percent-a" style="width:{$tweenedA}%"></div>
            <span>{poll.answerA} ({poll.votesA})</span>
        </div>
        <div class="answer" on:click={()=>handleVote("b",poll.id)}>
            <div class="percent percent-b" style="width:{$tweenedB}%" ></div>
            <span>{poll.answerB} ({poll.votesB})</span>
        </div>
        <div class="delete">
            <Button flat={true} on:click={() => handleDelete(poll.id)}> Delete </Button>
        </div>
    </div>
</Card>


<style>
    h3{
        margin: 0 auto;
        color: gray;
    }
    p{
        margin-top: 6px;
        font-size: 14px;
        color: #aaa;
        margin-bottom: 30px;
    }
    .answer{
        background: #f1f1f1;
        cursor: pointer;
        margin: 20px auto;
        position: relative;
    }
    .answer:hover{
        opacity : 0.6;
    }
    span{
        display: inline-block;
        padding: 10px 20px;
    }
    .percent {
        height: 100%;
        position: absolute;
        box-sizing: border-box;
    }
    .percent-a{
        border-left: 4px solid rgba(217,27,66,1);
        background: rgba(217,27,66,0.2);
    }
    .percent-b{
        border-left: 4px solid rgba(69,196,150,1);
        background: rgba(69,196,150,0.2);
    }
</style>