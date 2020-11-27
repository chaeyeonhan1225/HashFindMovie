module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define("movie", {
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
    director: {
      type: DataTypes.STRING(240),
    },
    actor: {
      type: DataTypes.STRING(240),
    },
    country: {
      type: DataTypes.STRING(12),
    },
    link: {
      type: DataTypes.STRING(240),
    },
    image: {
      type: DataTypes.STRING(300),
    },
    pubDate: {
      type: DataTypes.STRING(150),
    },
  });

  Movie.associate = (db) => {
    db.Movie.hasMany(db.Comment);
    db.Movie.belongsToMany(db.Hashtag, { through: "MovieHashtag" });
    db.Movie.belongsToMany(db.User, { through: "LikeMovie", as: "Likers" });
  };
  return Movie;
};
