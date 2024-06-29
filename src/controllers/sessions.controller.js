import passport from 'passport'

export const register = (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if (err) {
            return res.status(500).json({ status: "error", message: "Error al registrar el usuario: " + err })
        }
        if (!user) {
            return res.status(400).json({ status: "error", message: info.message })
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ status: "error", message: "Error al iniciar sesión: " + err })
            }
            res.json({ status: "success", message: "Usuario registrado", redirectUrl: "/login" })
        })
    })(req, res, next)
}

export const login = (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.status(400).json({ error: info.message })
        }
        req.logIn(user, err => {
            if (err) {
                return next(err)
            }
            try {
                req.session.user = {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    age: user.age,
                    cart: user.cart,
                    role: user.role
                }
                res.json({ redirectUrl: '/products' })
            } catch (err) {
                res.status(500).send('Error al iniciar sesión')
            }
        })
    })(req, res, next)
}

export const githubAuth = passport.authenticate("github", { scope: ["user:email"] })

export const githubCallback = (req, res) => {
    req.session.user = req.user
    res.redirect("/")
}

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) res.status(500).json({ error: 'Error al cerrar sesión' })
        res.redirect('/login')
    })
}

export const getCurrentSession = (req, res) => {
    const session = req.session.user
    if (!session) {
        return res.status(401).json({ error: 'Sesión no iniciada' })
    } else {
        return res.json(session)
    }
}