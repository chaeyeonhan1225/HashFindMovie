module.exports = (sequelize,DataTypes) => {
    const Movie = sequelize.define('movie',{
        title: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        openDt: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        movieCd: {
            type:DataTypes.STRING,
            allowNull: false,
        }
    });

    Movie.associate = (db) => {
        db.Movie.hasMany(db.Comment);
    }
    return Movie;
}