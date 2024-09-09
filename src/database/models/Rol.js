function Rol(sequelize, DataTypes) {
    const alias = 'Rol';

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

    const Rol = sequelize.define(alias, cols, config);

    // RELACIONES    
    Rol.associate = function(models) {
        if(models.Usuario){

            Rol.hasMany(models.Usuario, {
                as: 'usuarios',
                foreignKey: 'Rol_id'
            });
        }
    };

    return Rol;
}

export default Rol;