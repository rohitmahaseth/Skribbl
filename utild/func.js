const users = [];

function Join(id, username,){
    const user = {id, username};
    users.push(user);
    return user;
}
function Current(id){
    return users.find(user=>user.id===id)
}
function getUser(){
    return users
}

module.exports={
    Join,
    Current,
    getUser
}



