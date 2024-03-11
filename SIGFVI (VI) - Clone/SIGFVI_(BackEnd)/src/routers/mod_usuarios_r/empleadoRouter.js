const express = require("express");
const usuarioController = require("../../controllers/mod_usuarios_c/empleadoController"); // Corregido de 'datosContoller' a 'datosController'
const rutaUsuarios = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Obtiene la lista de todos los usuarios con cierto cargo.
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *       500:
 *         description: Error al obtener usuarios
 */
rutaUsuarios.get("/usuario_empleado", usuarioController.obtenerUsuarios);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Obtiene un usuario específico por su ID.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener el usuario
 */
rutaUsuarios.get("/usuario_empleado/:id", usuarioController.obtenerUsuarioPorId);

/**
 * @swagger
 * /crear:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario con la información proporcionada.
 *     tags: [Usuarios]
 *     requestBody:
 *       description: Datos del nuevo usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Llave primaria del número de identificación del usuario.
 *               tipoid:
 *                 type: number
 *                 description: Llave primaria auxiliar compuesta con el tipo de identificación.
 *               name1:
 *                 type: string
 *                 description: Primer nombre del usuario.
 *               name2:
 *                 type: string
 *                 description: Segundo nombre del usuario.
 *               lastname1:
 *                 type: string
 *                 description: Primer apellido del usuario.
 *               lastname2:
 *                 type: string
 *                 description: Segundo apellido del usuario.
 *               cel:
 *                 type: string
 *                 description: Número de contacto del usuario.
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               contrasena:
 *                 type: string
 *                 description: Contraseña de ingreso al sistema del usuario.
 *             example:
 *               id: "123456789"
 *               tipoid: 1
 *               name1: "John"
 *               name2: "Doe"
 *               lastname1: "Smith"
 *               lastname2: "Jones"
 *               cel: "1234567890"
 *               email: "john.doe@example.com"
 *               contrasena: "securePassword123"
 *     responses:
 *       200:
 *         description: Usuario creado correctamente
 *       500:
 *         description: Error al crear el usuario
 */
rutaUsuarios.post("/usuario_empleado", usuarioController.crearUsuario);


/**
 /**
 * @swagger
 * /actualizar/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     description: Actualiza la información de un usuario existente por su ID.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Nuevos datos del usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name1:
 *                 type: string
 *                 description: Nuevo primer nombre del usuario.
 *               name2:
 *                 type: string
 *                 description: Nuevo segundo nombre del usuario.
 *               lastname1:
 *                 type: string
 *                 description: Nuevo primer apellido del usuario.
 *               lastname2:
 *                 type: string
 *                 description: Nuevo segundo apellido del usuario.
 *               cel:
 *                 type: string
 *                 description: Nuevo número de contacto del usuario.
 *               email:
 *                 type: string
 *                 description: Nuevo correo electrónico del usuario.
 *               contrasena:
 *                 type: string
 *                 description: Nueva contraseña de ingreso al sistema del usuario.
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       500:
 *         description: Error al actualizar el usuario
 */
rutaUsuarios.put("/usuario_empleado/:id", usuarioController.actualizarUsuario);


/**
 * @swagger
 * /eliminar/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     description: Elimina un usuario existente por su ID.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       500:
 *         description: Error al eliminar el usuario
 */
rutaUsuarios.delete("/usuario_empleado/:id", usuarioController.eliminarUsuario);

rutaUsuarios.put("/cambioestadoempleado/:id", usuarioController.cambioEstadoEmpleado);

module.exports = rutaUsuarios;