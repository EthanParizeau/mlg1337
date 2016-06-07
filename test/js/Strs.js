/*** Strings for worksafe and normal mode ***/
/*

Strs
    upgrade1


 */
function Strs(test, test2)
{

}

var Strs2 = {

};

var upgrade = {
    up: upgrade1
};

var upgrade1 = {
    name: { normal: "name-normal", worksafe: "name-worksafe"},
    desc: { normal: "desc-normal", worksafe: "desc-worksafe"}
};

function test(test1, test2, test3)
{
    this.test1 = test1;
    this.test2 = test2;
    this.test3 = test3;
}

function test(test1, test2, test3)
{
    this.test1 = test1;
    this.test2 = test2;
    this.test3 = test3;
}


var newtest1 = new test("1", "2", "3");
var newtest2 = new test(1, 2, 3);
