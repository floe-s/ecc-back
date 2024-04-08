function cursoModel(sequelize, DataTypes) {
    const alias = 'Curso';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT({ length: 'medium' }),
            allowNull: false
        },
        estudiantes: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        lecciones: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        puntuacion: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        imagen: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        img_nivel: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        cantidad_horas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio: {
            type: DataTypes.DECIMAL(30),
            allowNull: false
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fecha_modificacion: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fecha_eliminacion: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Administrador_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Profesor_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Tematica_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Nivel_curso_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Tipo_curso_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    const config = {
        camelCase: false,
        timestamps: false,
        freezeTableName: true
    };

    const Curso = sequelize.define(alias, cols, config);

    // RELACIONES
    Curso.associate = function(models) {
        Curso.belongsTo(models.Usuario, {
            as: 'administrador',
            foreignKey: 'Administrador_id'
        });
        Curso.belongsTo(models.Usuario, {
            as: 'profesor',
            foreignKey: 'Profesor_id'
        });
        Curso.belongsTo(models.Tematica, {
            as: 'tematica',
            foreignKey: 'Tematica_id'
        });
        Curso.belongsTo(models.Nivel_curso, {
            as: 'nivelCurso',
            foreignKey: 'Nivel_curso_id'
        });
        Curso.belongsTo(models.Tipo_curso, {
            as: 'tipoCurso',
            foreignKey: 'Tipo_curso_id'
        });
        Curso.hasMany(models.Comision, {
            as: 'comisiones',
            foreignKey: 'Curso_db_id'
        });
    };

    return Curso;
}

module.exports = cursoModel;
