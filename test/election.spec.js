const Election = artifacts.require("Election")

contract("Election", (accounts) =>  {
    it ("initializes with two candidates", async () => {
        const election = await Election.deployed()
        const countCandidates = await election.candidatesCount()
        assert.equal(countCandidates, 2)
    })
})