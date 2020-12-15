module.exports = function(sequelize, Datatype) {
    let book = sequelize.define('book', {
        id: {
            type: Datatype.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        book_image: Datatype.BLOB('long'),
        book_title : Datatype.STRING,
        book_launching: Datatype.STRING,
        book_author: Datatype.STRING,
        book_publisher: Datatype.STRING,
        book_page_thickness: Datatype.STRING,
        book_isbn: Datatype.STRING,
    });

    return book
}