module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define('user',{
        email: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        nick: {
            type: DataTypes.STRING(12),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        info: {
            type: DataTypes.STRING(150),
            allowNull: true,
        }
    },{
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    User.associate = (db) => {
        db.User.hasMany(db.Comment);
    }
    return User;
}