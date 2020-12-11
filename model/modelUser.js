module.exports = function(sequelize, Datatype) {
    let user = sequelize.define('member', {
        id: {
            type: Datatype.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        member_number : Datatype.STRING,
        member_name: Datatype.STRING,
        member_class: Datatype.STRING,
        member_dateOfBirth: Datatype.STRING,
        member_adress: Datatype.STRING
    });

    return user
}