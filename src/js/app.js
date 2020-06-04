App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Election.json", function(election) {
      App.contracts.Election = TruffleContract(election);
      App.contracts.Election.setProvider(App.web3Provider);
      return App.render();
    });
  },

  render: async function() {
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    const instance = await App.contracts.Election.deployed()
    const candidatesCount = await instance.candidatesCount();

    var candidatesResults = $("#candidatesResults");
    candidatesResults.empty();

    for (var i = 1; i <= candidatesCount; i++) {
      const candidate = await instance.candidates(i)
      
      var id = candidate[0];
      var name = candidate[1];
      var voteCount = candidate[2];

      var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
      candidatesResults.append(candidateTemplate);
    }

    loader.hide();
    content.show();
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});