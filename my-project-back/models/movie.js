module.exports = (sequelize,DataTypes) => {
    const Movie = sequelize.define('movie',{
        title: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        subtitle: {
            type: DataTypes.STRING(150),
        },
        genre: {
            type: DataTypes.STRING(150),
        },
        country: {
            type: DataTypes.STRING(12),
        },
        thumbnail: {
            type: DataTypes.STRING(300),
        },
        pubDate: {
            type: DataTypes.STRING(150),
        },
    });

    Movie.associate = (db) => {
        db.Movie.hasMany(db.Comment);
        db.Movie.belongsToMany(db.Hashtag,{ through: 'MovieHashtag' });
        db.Movie.belongsToMany(db.User,{ through: 'LikeMovie', as: 'Likers'});
    }
    return Movie;
}