module.exports = (sequelize,DataTypes)=>{
    const Hashtag = sequelize.define('hashtag',{
        content: {
            type: DataTypes.STRING(51),
            allowNull: true,
        }
    },{
        timestamps: true,
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Movie,{ through: 'MovieHashtag' });
    }
    return Hashtag;
} 