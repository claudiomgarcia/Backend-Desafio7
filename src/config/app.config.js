import express from 'express'
import passport from 'passport'
import initializePassport from './passport.config.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import { create } from 'express-handlebars'
import { __dirname } from '../utils.js'
import customHelpers from '../views/helpers/customHelpers.js'


export function appConfig(app) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static(__dirname + '/public'))

    const handlebars = create({ helpers: customHelpers })
    app.engine('handlebars', handlebars.engine)
    app.set('views', __dirname + '/views')
    app.set('view engine', 'handlebars')
}

export function passportConfig(app) {
    initializePassport()
    app.use(passport.initialize())
    app.use(passport.session())
}

export function sessionConfig(app) {
    app.use(session({
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
            ttl: 500
        }),
        secret: "53cr37k3Y",
        resave: false,
        saveUninitialized: false
    }))
}