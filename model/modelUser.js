module.exports = function(sequelize, Datatype) {
    let member = sequelize.define('member', {
        id: {
            type: Datatype.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        member_number : Datatype.STRING,
        member_name: Datatype.STRING,
        member_class: Datatype.STRING,
        member_date_of_birth: Datatype.STRING,
        member_adress: Datatype.STRING
    });

    return member
}