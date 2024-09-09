function Asociado(sequelize, DataTypes) {
    const alias = 'Asociado';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Usuario_db_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Academia_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    const config = {
        camelCase: false,
        timestamps: false,
        freezeTableName: true
    };

    const Asociado = sequelize.define(alias, cols, config);

    Asociado.associate = function (models) {
        if (models.Usuario && models.Academia) {

            Asociado.belongsTo(models.Usuario, {
                as: 'usuario',
                foreignKey: 'Usuario_db_id'
            });
            Asociado.belongsTo(models.Academia, {
                as: 'academia',
                foreignKey: 'Academia_id'
            });
        }
    };

    return Asociado;
}

export default Asociado;
