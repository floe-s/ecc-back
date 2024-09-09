function Comision(sequelize, DataTypes) {
    const alias = 'Comision';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numero_comision: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cantidad_vacantes: {
            type: DataTypes.INTEGER,
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
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fecha_finalizacion: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Administrador_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Profesor_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Curso_db_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Turno_horario_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    const config = {
        camelCase: false,
        timestamps: false,
        freezeTableName: true
    };

    const Comision = sequelize.define(alias, cols, config);

    // RELACIONES
    Comision.associate = function (models) {
        if (models.Usuario && models.Curso && models.Turno_horario) {
            Comision.belongsTo(models.Usuario, {
                as: 'administrador',
                foreignKey: 'Administrador_id'
            });
            Comision.belongsTo(models.Usuario, {
                as: 'profesor',
                foreignKey: 'Profesor_id'
            });
            Comision.belongsTo(models.Curso, {
                as: 'curso',
                foreignKey: 'Curso_db_id'
            });
            Comision.belongsTo(models.Turno_horario, {
                as: 'turnoHorario',
                foreignKey: 'Turno_horario_id'
            });
        }
    };

    return Comision;
}

export default Comision;
