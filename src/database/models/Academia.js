function academiaModel(sequelize, DataTypes) {
    const alias = 'Academia';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    };

    const config = {
        camelCase: false,
        timestamps: false,
        freezeTableName: true
    };

    const Academia = sequelize.define(alias, cols, config);

    // RELACIONES 
    Academia.associate = (models) => {
        Academia.hasMany(models.Asociado, {
            as: 'asociados',
            foreignKey: 'Academia_id'
        })
    }   
    
    return Academia;
}

module.exports = academiaModel;
