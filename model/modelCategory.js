module.exports = function(sequelize, Datatype) {
    let member = sequelize.define('category', {
        id: {
            type: Datatype.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        category: Datatype.STRING
    }, {
        timestamps: false
    });

    return member
}