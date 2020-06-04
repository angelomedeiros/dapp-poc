const Election = artifacts.require("Election")

contract("Election", (accounts) =>  {
    it ("initializes with two candidates", async () => {
        const election = await Election.deployed()
        const countCandidates = await election.candidatesCount()
        assert.equal(countCandidates, 2)
    })

    it ("initializes the candidateOne with the correct values", async () => {
        const election = await Election.deployed()
        const candidateOne = await election.candidates(1);
        assert.equal(candidateOne.id, 1, "contains the correct id")
        assert.equal(candidateOne.name, "Candidate 1", "contains the correct name")
        assert.equal(candidateOne.voteCount, 0, "contains the correct votes count")
    })

    it ("initializes the candidateTwo with the correct values", async () => {
        const election = await Election.deployed()
        const candidateTwo = await election.candidates(2);
        assert.equal(candidateTwo.id, 2, "contains the correct id")
        assert.equal(candidateTwo.name, "Candidate 2", "contains the correct name")
        assert.equal(candidateTwo.voteCount, 0, "contains the correct votes count")
    })
})