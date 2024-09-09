function Nivel_curso(sequelize, DataTypes) {
    const alias = 'Nivel_curso';

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

    const Nivel_curso = sequelize.define(alias, cols, config);

    // RELACIONES
    Nivel_curso.associate = function (models) {
        if (models.Curso) {

            Nivel_curso.hasMany(models.Curso, {
                as: 'cursos',
                foreignKey: 'Nivel_curso_id'
            });
        }
    };

    return Nivel_curso;
}

export default Nivel_curso;
