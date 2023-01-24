import {
    pool
} from '../db.js'
import {
    Md5
} from 'ts-md5'

export const getUsuarios = async (req, res) => {

    try {
        const [rows] = await pool.query("SELECT * FROM USUARIO")
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrio un usuario"
        })
    }

}

export const getUsuario = async (req, res) => {

    try {
        const {
            id
        } = req.params

        const [rows] = await pool.query("SELECT * FROM USUARIO WHERE id = ?", [id])

        if (rows.length <= 0) return res.status(404).json({
            message: 'Usuario no encontrado'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrio un error"
        })
    }
}

export const createUsuario = async (req, res) => {

    try {
        const {
            nombre,
            apellido,
            username,
            password,
            fecha_creacion,
            telefono,
            email,
            direccion,
            id_session,
            rut,
            fecha_nacimiento
        } = req.body

        const passMd5 = Md5.hashStr(password)
        console.log(passMd5)

        const [rows] = await pool.query("INSERT INTO usuario (nombre, apellido, username, password,fecha_creacion, telefono, email, direccion, id_session, rut, fecha_nacimiento) VALUES ( ?, ? , ? , ?, STR_TO_DATE(?,'%d/%m/%Y %H:%i:%s') ,?, ? , ? , ?, ? ,STR_TO_DATE(?,'%d/%m/%Y %H:%i:%s') )",
            [nombre, apellido, username, passMd5, fecha_creacion, telefono, email, direccion, id_session, rut, fecha_nacimiento])

        res.json({
            id: rows.insertId,
            nombre,
            apellido,

        });
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrio un error"
        })
    }
}


export const updateUsuario = async (req, res) => {

    try {
        const {
            id
        } = req.params
        const {
            nombre,
            apellido
        } = req.body

        const [rows] = await pool.query("UPDATE USUARIO SET nombre = ? , apellido = ? WHERE id = ?", [nombre, apellido, id])

        if (rows.affectedRows <= 0) return res.status(404).json({
            message: 'Usuario no encontrado'
        })

        res.json({
            id,
            nombre,
            apellido,
            message: "Usuario Actualizado"

        })

    } catch (error) {
        return res.status(500).json({
            message: "Ocurrio un error"
        })
    }
}

export const deleteUsuario = async (req, res) => {

    try {
        const {
            id
        } = req.params
        const [rows] = await pool.query(" DELETE FROM USUARIO WHERE id = ?", [id])

        if (rows.affectedRows <= 0) return res.status(404).json({
            message: 'Usuario no encontrado'
        })

        res.send('Usuario Eliminado')
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrio un error"
        })
    }

}