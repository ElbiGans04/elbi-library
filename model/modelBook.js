module.exports = function(sequelize, Datatype) {
    let book = sequelize.define('book', {
        id: {
            type: Datatype.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        book_image: Datatype.BLOB('long'),
        book_judul : Datatype.STRING,
        book_peluncuran: Datatype.STRING,
        book_pengarang: Datatype.STRING,
        book_penerbit: Datatype.STRING,
        book_tebalHalaman: Datatype.STRING,
        book_isbn: Datatype.STRING,
    });

    return book
}