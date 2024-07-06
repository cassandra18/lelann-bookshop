// oauthMiddleware.js

const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if the user exists in your database
        let user = await prisma.user.findUnique({
            where: { email: profile.emails[0].value },
        });

        if (!user) {
            // Create a new user if not exists
            const hashedPassword = await bcrypt.hash('password', 10); // Temporary password for OAuth users
            user = await prisma.user.create({
                data: {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: hashedPassword,
                },
            });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });
        done(null, user);
    } catch (error) {
        done(error);
    }
});

const authenticateGoogle = passport.authenticate('google', { scope: ['profile', 'email'] });

const handleGoogleCallback = async (req, res) => {
    passport.authenticate('google', async (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Google authentication failed' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.redirect(`/?token=${token}`);
    })(req, res);
};

module.exports = {
    authenticateGoogle,
    handleGoogleCallback,
};
