module.exports = function(sequelize, Datatype) {
    let member = sequelize.define('class', {
        id: {
            type: Datatype.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        class: Datatype.STRING
    }, {
        timestamps: false
    });

    return member
}