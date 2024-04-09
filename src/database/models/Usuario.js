function usuarioModel(sequelize, DataTypes) {
    const alias = 'Usuario';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        clave: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        telefono: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        imagen: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fecha_eliminacion: {
            type: DataTypes.DATE,
            allowNull: true
        },
        Rol_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Tematica_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Administrador_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    };

    const config = {
        camelCase: false,
        timestamps: false,
        freezeTableName: true
    };

    const Usuario = sequelize.define(alias, cols, config);

    // RELACIONES
    Usuario.associate = function(models) {
        Usuario.belongsTo(models.Rol, {
            as: 'rol',
            foreignKey: 'Rol_id'
        });
        Usuario.belongsTo(models.Tematica, {
            as: 'tematica',
            foreignKey: 'Tematica_id'
        });
        Usuario.belongsTo(models.Usuario, {
            as: 'administrador',
            foreignKey: 'Administrador_id'
        });
    };

    return Usuario;
}

module.exports = usuarioModel;