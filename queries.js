const Pool = require('pg').Pool
const pool = new Pool({
    user: 'test_user',
    host: 'localhost',
    database: 'test_database',
    password: 'qwerty',
    port: 5432,
})

const getUsers = (require, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw  error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const  createUser = (require, response) => {
    const {login, password} = require.body

    pool.query('INSERT INTO users (login, password) VALUES ($1, $2)', [login, password], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('User added with ID: ${result.insertId}')
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { login, password } = request.body

    pool.query('UPDATE users SET login = $1, password = $2 WHERE id = $3',
        [login, password, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}