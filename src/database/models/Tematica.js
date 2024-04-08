function tematicaModel(sequelize, DataTypes) {
    const alias = 'Tematica';

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

    const Tematica = sequelize.define(alias, cols, config);

    // RELACIONES
    Tematica.associate = function(models) {
        Tematica.hasMany(models.Curso, {
            as: 'cursos',
            foreignKey: 'Tematica_id'
        });
        Tematica.hasMany(models.Usuario, {
            as: 'usuarios',
            foreignKey: 'Tematica_id'
        });
    };

    return Tematica;
}

module.exports = tematicaModel;
