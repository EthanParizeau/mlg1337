function User(firstname, firstname2, lastname, age)
{
    this.firstName = firstname;
    this.firstName2 = firstname2;
    this.lastName = lastname;
    this.age = age;
}

var user1 = new User("Ethan", "Sraith", "Parizeau", 16);
var user2 = new User("Ian", "Witherheart", "Chilton", 17);
var user3 = new User("Jacob", "Snoopy", "Decker", 16);

rivets.bind($('#user1'), {user: user1});
rivets.bind($('#user2'), {user: user2});
