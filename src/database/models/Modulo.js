function Modulo(sequelize, DataTypes) {
    const alias = 'Modulo';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numero_modulos: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT({ length: 'medium' }),
            allowNull: false
        },
        Curso_db_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    const config = {
        camelCase: false,
        timestamps: false,
        freezeTableName: true
    };

    const Modulo = sequelize.define(alias, cols, config);

    // RELACIONES
    Modulo.associate = function (models) {
        if (models.Curso) {
            Modulo.belongsTo(models.Curso, {
                as: 'curso',
                foreignKey: 'Curso_db_id'
            });
        }
        if (models.Tema) {
            Modulo.hasMany(models.Tema, {
                as: 'Tema',
                foreignKey: 'Modulo_id'
            });
        }
    };

    return Modulo;
}

export default Modulo;
