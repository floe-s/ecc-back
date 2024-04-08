function tipoCursoModel(sequelize, DataTypes) {
    const alias = 'Tipo_curso';

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

    const Tipo_curso = sequelize.define(alias, cols, config);

    // RELACIONES
    Tipo_curso.associate = function(models) {
        Tipo_curso.hasMany(models.Curso, {
            as: 'cursos',
            foreignKey: 'Tipo_curso_id'
        });
    };

    return Tipo_curso;
}

module.exports = tipoCursoModel;
