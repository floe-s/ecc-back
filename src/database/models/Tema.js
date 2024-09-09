function Tema(sequelize, DataTypes) {
    const alias = 'Tema';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numero_tema: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        Modulo_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    const config = {
        camelCase: false,
        timestamps: false,
        freezeTableName: true
    };

    const Tema = sequelize.define(alias, cols, config);

    Tema.associate = function(models) {
        if(models.Modulo){

            Tema.belongsTo(models.Modulo, {
                as: 'modulo',
                foreignKey: 'Modulo_id'
            });
        }
    };

    return Tema;
}

export default Tema;
