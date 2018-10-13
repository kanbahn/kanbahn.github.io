import * as passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import { Router } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../../src-common/entity/User'

const baseURL = process.env.NODE_ENV === 'production' ? 'https://kanbahn.herokuapp.com' : 'http://localhost:3000'

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${baseURL}/api/auth/google/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userRepository = getRepository(User)
        await userRepository.save({ googleId: profile.id })
        done(null, profile)
      } catch (err) {
        done(err)
      }
    }
  ))
} else {
  console.log('GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET not provided, Google login will not work.')
}

const router = Router()

router.get('/api/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile'] }))

router.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (request, response) => {
    response.redirect('/')
  })

router.get('/api/auth/user', (request, response) => {
  response.send({ user: request.user || null })
})

router.get('/api/auth/logout', (request, response) => {
  request.logout()
  response.redirect('/')
})

export default router
