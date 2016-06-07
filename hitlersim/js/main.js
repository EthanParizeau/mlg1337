/* Variables */

var clicks = 0; //Total clicks
var coins = 0; //Total coins
var followers = 0; //Total followers
var kills = 0; //Total kills
var coinsPerSec = 0; //Coins per second
var coinsPerClick = 1; //Coins per click
var followsPerSec = 0; //Followers per second
var killsPerSec = 0; //Kills per second

var timer = setInterval(function() { passiveUpgradeCheck(); updateUI(); update(); }, 1000); //Update timers
var saveTimer = setInterval(function() { saveGame() }, 300000); //Save game timer

/* Functions */

//onload function
$(window).load(function(){
    //Will either load normal or worksafe mode.
    getWorkSafeMode(); //Get worksafe mode
});

//Button click function
$(document).ready(function(){
    $("#mainbtn").click(function() {
        coins += coinsPerClick; //Coins + coins per click
        clicks++; //Increment clicks
        updateUI(); //Update ui
    });
});

//Settings click function
$(document).ready(function(){
    $(".buttons #settingsicon").click(function() {
        $("#statsContent").slideUp();
        $("#aboutContent").slideUp();
        $("#settingsContent").slideToggle("slow");
        $("#settingsicon").tooltip('hide');
    });
});

//Stats click function
$(document).ready(function()
{
    $(".buttons #staticon").click(function(){
        $("#settingsContent").slideUp();
        $("#aboutContent").slideUp();
        $("#statsContent").slideToggle("slow");
        $("#staticon").tooltip('hide');

        $("#statsContent #Clicks").text("Clicks: " + clicks);
    });

    $("#statsContent").mouseleave(function()
    {
        $("#statsContent").slideUp();
    });
});

//About click function
$(document).ready(function()
{
    $(".buttons #abouticon").click(function () {
        $("#settingsContent").slideUp();
        $("#statsContent").slideUp();
        $("#aboutContent").slideToggle("slow");
        $("#abouticon").tooltip('hide');
    });
});

//Worksafe mode event
$(document).ready(function()
{
    $('#worksafeon').click(function()
    {
        localStorage.setItem("WorkSafeMode", "true"); //Set worksafe mode to true
        getWorkSafeMode(); //Get worksafe mode
    });

    $('#worksafeoff').click(function()
    {
        localStorage.setItem("WorkSafeMode", "false"); //Set worksafe mode to false
        getWorkSafeMode(); //Get worksafe mode
    });
});

//Submit bug button
$(document).ready(function()
{
    $("#bugSubmit").click(function()
    {
        var bugStr = $("#bug").val();

        if(bugStr != "")
        {
            $.post("reportBug.php",
                {
                    bug: bugStr
                });

            toastr["success"]("Thank you for submiting a bug :)", "Thank You!"); //Alert that the bug was submited
        }
        else
        {
            toastr["warning"]("You should fill in the text box first ;)"); //Alert user that the textbox is empty
        }
    });
});

/* Upgrades */
//Base upgrade object that all upgrades will be created
function baseUpgrade(id, name, desc, own, cost, mods)
{
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.own = own;
    this.cost = cost;
    this.mods = mods;
}

/* Passives */
//Base passive object that all passives will be created
function basePassive(id, name, desc, own, cost, mods)
{
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.own = own;
    this.cost = cost;
    this.mods = mods;
}


//Object for the mods that upgrades and passives will have
function Mods(perClick, coinsPerSec, killsPerSec, followsPerSec)
{
    this.perClick = perClick;
    this.coinsPerSec = coinsPerSec;
    this.killsPerSec = killsPerSec;
    this.followsPerSec = followsPerSec;
}

/* Upgrade objects */

/* Debug Upgrades */

var debugUpgrade1 = new baseUpgrade("debug1", "debug upgrade", "debug upgrade", 0, 0, { perClick: 20, coinsPerSec: 10, killsPerSec: 50, followsPerSec: 0 });
var debugUpgrade2 = new baseUpgrade("debug2", "debug upgrade 2", "debug upgrade 2", 2, 2, { perClick: 20, coinsPerSec: 10, killsPerSec: 50, followsPerSec: 0 });
var leetdebug = new baseUpgrade("1337debug", "1337debug", "1337debug", 0, 1337, { perClick: 1337, coinsPerSec: 1337, killsPerSec: 1337, followsPerSec: 1337 });

/* Real Upgrades */

var upgrade1 = new baseUpgrade(1, "upgrade1", "The first upgrade ever added", 0, 10, { perClick: 1, coinsPerSec: 0, killsPerSec: 0, followsPerSec: 0 });
var upgrade2 = new baseUpgrade(2, "upgrade2", "upgrade 2", 0, 20, { perClick: 0, coinsPerSec: 1, killsPerSec: 0, followsPerSec: 0 });

/* Passives */
var passive1 = new basePassive(1, "passive1", "The first passive", false, 100, { perClick: 0, coinsPerSec: 0, killsPerSec: 10, followsPerSec: 0 });

/* Array of upgrades */

var allUpgrades = [upgrade1, upgrade2];
var allPassives = [passive1];
var allDebugUpgrades = [debugUpgrade1, debugUpgrade2, leetdebug];

//Calculate all the combined mods TODO: comment
function calcAllMods()
{
    coinsPerClick = 1;
    coinsPerSec = 0;
    killsPerSec = 0;
    followsPerSec = 0;
    allUpgrades.forEach(function (upgrade)
    {
        if(upgrade.own >= 1)
        {
            coinsPerClick += upgrade.mods.perClick * upgrade.own;
            coinsPerSec += upgrade.mods.coinsPerSec * upgrade.own;
            killsPerSec += upgrade.mods.killsPerSec * upgrade.own;
            followsPerSec += upgrade.mods.followsPerSec * upgrade.own;
        }
    });

    allPassives.forEach(function (passive)
    {
        if(passive.own == true)
        {
            killsPerSec += passive.mods.killsPerSec;
            followsPerSec += passive.mods.followsPerSec;
        }
    });
    updateUI();
}

//Function to get an upgrade
function getUpgrade(upgrade)
{
    var upgradeId = upgrade.getAttribute("data-upgrade-num"); //Get the id of the upgrade
    allUpgrades.forEach(function(upgrade)
    {
        if(upgrade.id == upgradeId) //Get upgrade from id
        {
            if(coins >= upgrade.cost) //If you have enough for the upgrade
            {
                coins -= upgrade.cost; //Subtract the cost of the upgrade
                upgrade.own++; //Increment the value of own
                $("#ownNum-1-" + upgradeId).text("You own: " + upgrade.own); //Update the ui own for the upgrade
                calcAllMods();//Calculate the modifiers from the upgrade
                upgrade.cost = upgrade.cost * 2; //Update the price of the upgrade
                $("#cost-1-" + upgradeId).text("Cost: " + upgrade.cost + " coins!"); //Upgrade the ui cost for the upgrade
                updateUI(); //Update the ui right after so there isn't a pause
            }
            else
            {
                toastr["warning"]("{name}, you don't have enough coins!", "Not enough coins!"); //Alert the user that they don't have enough coins
            }
        }
    });
}

//Function to get passive upgrade TODO: comment
function getPassiveUpgrade(id)
{
    allPassives.forEach(function (passive)
    {
        if(passive.id = id)
        {
            passive.own = true;
            calcAllMods();
            $("#passive-" + passive.id).css("background-color", "red");
            updateUI();
        }
    });
}

//Update the ui of the upgrades
function updateUpgrades() //TODO: comment
{
    allUpgrades.forEach(function(upgrade)
    {
        var id = upgrade.id;
        $("#ownNum-1-" + id).text("You own: " + upgrade.own);
        $("#cost-1-" + id).text("Cost: " + upgrade.cost * upgrade.own + " coins!");
    });

    allPassives.forEach(function (passive)
    {
        var id = passive.id;
        $("#passive-" + id).css("background-color", "red");
    });
}

//UpdateUI TODO: comment
function updateUI()
{
    $("#Coins").text("Coins: " + coins);
    $("#CoinsPerClick").text("Coins/click: " + coinsPerClick);
    $("#CoinsPerSec").text("Coins/s: " + coinsPerSec);
    $("#Followers").text("Followers: " + followers);
    $("#FollowersPerSec").text("Followers/s: " + followsPerSec);
    $("#Killed").text("Killed: " + kills);
    $("#KilledPerSec").text("Kills/s: " + killsPerSec);
}

//Check for passive upgrades
function passiveUpgradeCheck()
{
    allPassives.forEach(function (passive)
    {
        if(kills >= passive.cost)
        {
            getPassiveUpgrade(passive.id);
        }
    })
}

//Update persec variables
function update()
{
    coins += coinsPerSec; //Add coinsPerSec
    kills += killsPerSec; //Add killsPerSec
    followers += followsPerSec; //Add follwersPerSec
}

//Save object
function save(totalClicks, totalCoins, totalFollowers, totalKills, upgrade1_Own, upgrade2_Own, passive1_Own)
{
    this.totalClicks = clicks;
    this.totalCoins = coins;
    this.totalFollowers = followers;
    this.totalKills = kills;
    this.upgrade1_Own = upgrade1.own;
    this.upgrade2_Own = upgrade2.own;
    this.passive1_Own = passive1.own;
}

//Save game
function saveGame()
{
    var gamesave = new save(); //Create the game save
    gamesave = JSON.stringify(gamesave); //Convert the save into a JSON string
    gamesave = sjcl.encrypt("password", gamesave); //Encrypt the save
    localStorage.setItem("data", gamesave); //Store the encrypted game save in local storage
    toastr["success"]("Game saved!"); //Alert
}

//Load game
function loadGame()
{
    var data = localStorage.getItem("data"); //Get save
    data = sjcl.decrypt("password", data); //Decrypt save
    data = JSON.parse(data); //Parse save to JSON
    clicks = data.totalClicks;
    coins = data.totalCoins;
    followers = data.totalFollowers;
    kills = data.totalKills;
    upgrade1.own = data.upgrade1_Own;
    upgrade2.own = data.upgrade2_Own;
    passive1.own = data.passive1_Own;
    calcAllMods(); //Calculate all mods
    updateUpgrades(); //Update upgrades ui
    updateUI(); //Update UI
}

//Worksafe mode TODO: comment finish
function getWorkSafeMode()
{
    if(localStorage.getItem("WorkSafeMode") === null)
    {
        localStorage.setItem("WorkSafeMode", "false"); //If the key doesn't exist, create it and set it to false
        $('#worksafeoff').removeClass('btn-default').addClass('btn-primary');  //Set state to true
        $('#worksafeon').removeClass('btn-primary').addClass('btn-default'); //Set state to true
        toastr["info"]("Work safe mode!", "You can enable work safe mode in the settings!");
    }

    if(localStorage.getItem("WorkSafeMode") == "true")
    {
        //Enable worksafe mode
        $('#worksafeon').removeClass('btn-default').addClass('btn-primary');
        $('#worksafeoff').removeClass('btn-primary').addClass('btn-default');
        toastr["info"]("Work Safe mode enabled!");
    }

    if(localStorage.getItem("WorkSafeMode") == "false")
    {
        //Disable worksafe mode
        $('#worksafeon').removeClass('btn-primary').addClass('btn-default');
        $('#worksafeoff').removeClass('btn-default').addClass('btn-primary');
        toastr["info"]("Work Safe mode disabled!");
    }

}
