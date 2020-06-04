pragma solidity >=0.4.21 <0.7.0;


contract GuardaLoteria {
    uint256 numeroSorteado;

    function set(uint256 enviado) public {
        numeroSorteado = enviado;
    }

    function get() public view returns (uint256) {
        return numeroSorteado;
    }
}
