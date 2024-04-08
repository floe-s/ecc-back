function turnoHorarioModel(sequelize, DataTypes) {
    const alias = 'Turno_horario';

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

    const Turno_horario = sequelize.define(alias, cols, config);

    // RELACIONES
    Turno_horario.associate = function(models) {
        Turno_horario.hasMany(models.Comision, {
            as: 'comisiones',
            foreignKey: 'Turno_horario_id'
        });
    };

    return Turno_horario;
}

module.exports = turnoHorarioModel;