const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000; // Puerto en el que se ejecutará el servidor


// Habilitar CORS para todas las solicitudes
app.use(cors());

// Middleware para procesar datos JSON
app.use(bodyParser.json());

// Habilitar middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());


/********************* API PARA CONSULTAR REGISTROS **********************/
    // Ruta para servir el archivo JSON
    app.get('/nodeServer/api/registros', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        const filePath = path.join(__dirname, 'data', 'Horas.json');

        // Leer el archivo JSON
        fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON:', err);
            res.status(500).json({ error: 'Error al leer el archivo JSON' });
            return;
        }

        // Enviar el contenido del archivo JSON como respuesta
        res.json(JSON.parse(data));
        });
    });
/**************************************************************************/






/********************* API PARA MODIFICAR REGISTROS **********************/
    // Ruta para actualizar un registro existente
    app.put('/nodeServer/api/registro/:id', (req, res) => {
        const id = req.params.id;
        console.log(id)
        // Leer el archivo JSON
        fs.readFile('./data/Horas.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error interno del servidor');
                return;
            }

            // Convertir el contenido del archivo JSON a un objeto JavaScript
            const registros = JSON.parse(data);
            // console.log(registros.registro)
            // Buscar el registro con el ID proporcionado y actualizar sus datos
            const index = registros.registro.findIndex(registro => parseInt(registro.ID) == parseInt(id));
            // console.log(index)
            if (index !== -1) {
                registros.registro[index] = req.body;
                console.log(registros.registro[index])

                // Escribir los registros actualizados en el archivo JSON
                fs.writeFile('./data/Horas.json', JSON.stringify(registros), (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Error interno del servidor');
                        return;
                    }

                    res.send(registros.registro[index]);
                });
            } else {
                res.status(404).send('Registro no encontrado');
            }
        });
    });
/**************************************************************************/




/********************* API PARA CREAR REGISTROS **********************/
    // Ruta para agregar un nuevo registro
    app.post('/nodeServer/api/registro', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');

        // Leer el archivo JSON
        fs.readFile('./data/Horas.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error interno del servidor');
                return;
            }
            
            // Convertir el contenido del archivo JSON a un objeto JavaScript
            const registros = JSON.parse(data);
            // console.log(registros);

            // Agregar el nuevo registro enviado en el cuerpo de la solicitud
            console.log(req.body);
            
            
            registros.registro.push(req.body);

            // Escribir los registros actualizados en el archivo JSON
            fs.writeFile('./data/Horas.json', JSON.stringify(registros), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error interno del servidor');
                    return;
                }
                console.log('TODO BIEN')
                res.send(JSON.stringify(registros));
            });
        });
    });
/**************************************************************************/



/********************* API PARA BORRAR REGISTROS **********************/
    // Ruta para eliminar un registro existente
    app.delete('/nodeServer/api/registro/:id', (req, res) => {
        const id = req.params.id;

        // Leer el archivo JSON
        fs.readFile('./data/Horas.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error interno del servidor');
                return;
            }

            // Convertir el contenido del archivo JSON a un objeto JavaScript
            const registros = JSON.parse(data);

            // Filtrar los registros para excluir el que tiene el ID proporcionado
            registros.registro = registros.registro.filter(registro => parseInt(registro.ID) !== parseInt(id));

            // Escribir los registros actualizados en el archivo JSON
            fs.writeFile('./data/Horas.json', JSON.stringify(registros), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error interno del servidor');
                    return;
                }

                res.send(registros.registro);
            });
        });
    });
/**************************************************************************/































/********************* API PARA CONSULTAR REGISTROS **********************/
    // Ruta para servir el archivo JSON
    app.get('/nodeServer/api/incidencias', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        const filePath = path.join(__dirname, 'data', 'incidencias.json');

        // Leer el archivo JSON
        fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON:', err);
            res.status(500).json({ error: 'Error al leer el archivo JSON' });
            return;
        }

        // Enviar el contenido del archivo JSON como respuesta
        res.json(JSON.parse(data));
        });
    });
/**************************************************************************/






/********************* API PARA MODIFICAR REGISTROS **********************/
    // Ruta para actualizar un registro existente
    app.put('/nodeServer/api/incidencias/:id', (req, res) => {
        const id = req.params.id;
        console.log(id)
        // Leer el archivo JSON
        fs.readFile('./data/incidencias.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error interno del servidor');
                return;
            }

            // Convertir el contenido del archivo JSON a un objeto JavaScript
            const registros = JSON.parse(data);
            // console.log(registros.Incidencias)
            // Buscar el registro con el ID proporcionado y actualizar sus datos
            const index = registros.Incidencias.findIndex(incidencia => parseInt(incidencia.ID) == parseInt(id));
            // console.log(index)
            if (index !== -1) {
                registros.Incidencias[index] = req.body;
                console.log(registros.Incidencias[index])

                // Escribir los registros actualizados en el archivo JSON
                fs.writeFile('./data/incidencias.json', JSON.stringify(registros), (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Error interno del servidor');
                        return;
                    }

                    res.send(registros.Incidencias[index]);
                });
            } else {
                res.status(404).send('Registro no encontrado');
            }
        });
    });
/**************************************************************************/




/********************* API PARA CREAR REGISTROS **********************/
    // Ruta para agregar un nuevo registro
    app.post('/nodeServer/api/incidencias', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');

        // Leer el archivo JSON
        fs.readFile('./data/incidencias.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error interno del servidor');
                return;
            }
            
            // Convertir el contenido del archivo JSON a un objeto JavaScript
            const registros = JSON.parse(data);
            // console.log(registros);

            // Agregar el nuevo registro enviado en el cuerpo de la solicitud
            console.log(req.body);
            
            
            registros.Incidencias.push(req.body);

            // Escribir los registros actualizados en el archivo JSON
            fs.writeFile('./data/incidencias.json', JSON.stringify(registros), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error interno del servidor');
                    return;
                }
                console.log('TODO BIEN')
                res.send(JSON.stringify(registros));
            });
        });
    });
/**************************************************************************/



/********************* API PARA BORRAR REGISTROS **********************/
    // Ruta para eliminar un registro existente
    app.delete('/nodeServer/api/incidencias/:id', (req, res) => {
        const id = req.params.id;

        // Leer el archivo JSON
        fs.readFile('./data/incidencias.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error interno del servidor');
                return;
            }

            // Convertir el contenido del archivo JSON a un objeto JavaScript
            const registros = JSON.parse(data);

            // Filtrar los registros para excluir el que tiene el ID proporcionado
            registros.Incidencias = registros.Incidencias.filter(incidencia => parseInt(incidencia.ID) !== parseInt(id));

            // Escribir los registros actualizados en el archivo JSON
            fs.writeFile('./data/incidencias.json', JSON.stringify(registros), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error interno del servidor');
                    return;
                }

                res.send(registros.Incidencias);
            });
        });
    });
/**************************************************************************/

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
