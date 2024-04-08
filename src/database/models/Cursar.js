function cursarsModel(sequelize, DataTypes) {
    const alias = 'Cursar';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        valoracion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Alumno_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Curso_db_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Comision_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    const config = {
        camelCase: false,
        timestamps: false,
        freezeTableName: true
    };

    const Cursar = sequelize.define(alias, cols, config);

    Cursar.associate = function(models) {
        Cursar.belongsTo(models.Usuario, {
            as: 'alumno',
            foreignKey: 'Alumno_id'
        });
        Cursar.belongsTo(models.Curso, {
            as: 'curso',
            foreignKey: 'Curso_db_id'
        });
        Cursar.belongsTo(models.Comision, {
            as: 'comision',
            foreignKey: 'Comision_id'
        });
    };

    return Cursar;
}

module.exports = cursarsModel;
