module.exports = (sequelize,DataTypes) => {
    const Comment = sequelize.define('comment',{
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },{
        timestamps: true,
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Movie);
    }
    return Comment;
}