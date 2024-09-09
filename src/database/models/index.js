import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import process from 'process';
import { fileURLToPath } from 'url';
import config from '../config/config.js';

// Obtener el nombre del archivo y el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

const envConfig = config[env];

// Configuración de Sequelize
let sequelize;
if (envConfig.use_env_variable) {
    sequelize = new Sequelize(process.env[envConfig.use_env_variable], envConfig);
} else {
    sequelize = new Sequelize(envConfig.database, envConfig.username, envConfig.password, envConfig);
}

// Obtener los archivos de modelos
const modelFiles = fs
    .readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js');

// Función para cargar los modelos
async function loadModels() {
    for (const file of modelFiles) {
        const modelPath = path.join(__dirname, file);
        // Convertir el path a una URL file:// válida
        const modelURL = new URL(`file://${path.resolve(modelPath)}`);
        const { default: model } = await import(modelURL.href);
        db[model.name] = model(sequelize, Sequelize.DataTypes);
    }

    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
}

// Cargar los modelos y exportar
await loadModels();

export default db;
