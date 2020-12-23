( async function(){

    const {Sequelize, DataTypes} = require('sequelize');
    const sequelize = new Sequelize('elbi-library', 'root', '', {
        host: 'localhost',
        dialect: 'mysql',
        logging: false
    });
    let Foo = await sequelize.define('foo', {name: DataTypes.STRING});
    let Bar = await sequelize.define('bar', {name: DataTypes.STRING});
    // await tabelClass.hasMany(tabelUser);
    // await tabelUser.belongsTo(tabelClass);
    await Foo.hasOne(Bar)
    await Bar.belongsTo(Foo);
    await sequelize.sync({force: true})
    
    const foo = await Foo.create({ name: 'the-foo' });
    const bar1 = await Bar.create({ name: 'some-bar' });
    const bar2 = await Bar.create({ name: 'another-bar' });
    console.log(await foo.getBar()); // null
    await foo.setBar(bar1);
})()