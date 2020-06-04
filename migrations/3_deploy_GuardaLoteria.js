var GuardaLoteria = artifacts.require("GuardaLoteria")

module.exports = function(deployer) {
    deployer.deploy(GuardaLoteria)
}