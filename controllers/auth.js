const User = require("../models/User");
const SecretCode = require("../models/Code");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const { showError } = require("../helpers/helpers");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const _ = require("lodash");
const expressJWT = require("express-jwt");

exports.register = (req, res) => {
  const { name, lastName, phoneNumber, email, userName, password } = req.body;
  const userInfo = { name, lastName, phoneNumber, email, userName, password };
  const error = validationResult(req);
  if (!error.isEmpty()) {
    showError(error, res);
  } else {
    User.findOne({ email })
      .then((user) => {
        if (user) {
          // if user exist
          return res.status(400).json({
            error: {
              email: "این آدرس ایمیل قبلا استفاده شده است",
            },
          });
        } else {
          User.findOne({ userName }).then((user) => {
            if (user) {
              // if username exist
              return res.status(400).json({
                error: {
                  userName: "این نام کاربری قبلا استفاده شده است",
                },
              });
            } else {
              // create a new user
              const newUser = new User(userInfo);
              newUser
                .save()
                .then((user) => {})
                .catch((err) =>
                  res.status(400).json({
                    error: {
                      notif: "مشکلی پیش آمد ",
                    },
                  })
                );

              // generate a secret hash for email verification
              const hash = crypto
                .createHash("sha1")
                .update(
                  new Date().valueOf().toString() + Math.random().toString()
                )
                .digest("hex");
              const newSecretHash = new SecretCode({
                email,
                code: hash,
              }).save();

              // send an verification email to user
              // initilize mailer
              let transporter = nodeMailer.createTransport({
                service: "gmail",
                auth: {
                  user: process.env.EMAIL_ADDRESS,
                  pass: process.env.EMAIL_PASS,
                },
              });

              // create email data
              const emailData = {
                from: process.env.EMAIL_ADDRESS,
                to: email,
                subject: "فعال سازی اکانت",
                html: `
              <h1>روی لینک زیر کلیک کرده تا اکانت خود را فعال کنید.</h1>
              <p>${process.env.CLIENT_URL}/activate/${hash}/${newUser._id}</p>
              <hr/>
              <p>${process.env.CLIENT_URL}</p>
        `,
              };

              // send the email
              transporter
                .sendMail(emailData)
                .then((info) => {
                  return res.status(200).json({
                    // message: "فرستاده شده است " + email + " ایمیلی به آدرس",
                    message: " ایمیلی به آدرس " + email + " فرستاده شده است ",
                  });
                })
                .catch((err) => {
                  User.findOneAndDelete({ _id: newUser._id }).then(
                    (success) => {
                      return res.status(400).json({
                        error: {
                          notif: "مشکلی پیش آمد دوباره امتحان کنید",
                        },
                      });
                    }
                  );
                });
            }
          });
        }
      })
      .catch((err) =>
        res.status(400).json({
          error: {
            notif: "مشکلی پیش آمد ",
          },
        })
      );
  }
};

exports.activate = (req, res) => {
  const { hash, userId } = req.body;
  if (hash && userId) {
    User.findOne({ _id: userId })
      .then((user) => {
        if (user) {
          SecretCode.findOne({ code: hash })
            .then((code) => {
              if (code && code.email === user.email) {
                User.findOneAndUpdate(
                  { _id: userId },
                  {
                    $set: {
                      active: true,
                    },
                  },
                  { new: true }
                )
                  .then((user) => {
                    const token = jwt.sign(
                      {
                        _id: user._id,
                        name: user.name,
                        lastName: user.lastName,
                        role: user.role,
                      },
                      process.env.LOGIN_SECRET,
                      {
                        expiresIn: "1h",
                      }
                    );

                    const { _id, name, lastName, role, email } = user;
                    return res.json({
                      token,
                      user: { _id, name, lastName, role, email },
                      message:
                        "تبریک! اکانت شما فعال شد. \n از خرید خود لذت ببرید",
                    });
                  })
                  .catch((err) => {
                    res.status(400).json({
                      error: "مشکلی پیش آمد. لطفا دوباره امتحان کنید.",
                    });
                  });
              } else {
                return res.status(401).json({
                  error: "این لینک از کار افتاده است. دوباره تلاش کنید.",
                });
              }
            })
            .catch((err) =>
              res.status(400).json({
                error: "این لینک از کار افتاده است. دوباره تلاش کنید.",
              })
            );
        } else {
          return res.status(400).json({ error: "مشکلی پیش آمد." });
        }
      })
      .catch((err) => res.status(400).json({ error: "مشکلی پیش آمد." }));
  } else {
    return res.status(400).json({
      error: "مشکلی پیش آمد. لطفا دوباره امتحان کنید.",
    });
  }
};

exports.resendActivationEmail = (req, res) => {
  const { hash, userId } = req.body;

  if (hash && userId) {
    SecretCode.findOne({ code: hash })
      .then((code) => {
        if (!code) {
          User.findOne({ _id: userId })
            .then((user) => {
              if (user) {
                // generate a secret hash for email verification
                const hash = crypto
                  .createHash("sha1")
                  .update(
                    new Date().valueOf().toString() + Math.random().toString()
                  )
                  .digest("hex");
                const newSecretHash = new SecretCode({
                  email: user.email,
                  code: hash,
                }).save();

                // send an verification email to user
                // initilize mailer
                let transporter = nodeMailer.createTransport({
                  service: "gmail",
                  auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASS,
                  },
                });

                // create email data
                const emailData = {
                  from: process.env.EMAIL_ADDRESS,
                  to: user.email,
                  subject: "فعال سازی اکانت",
                  html: `
              <h1>روی لینک زیر کلیک کرده تا اکانت خود را فعال کنید.</h1>
              <p>${process.env.CLIENT_URL}/activate/${hash}/${user._id}</p>
              <hr/>
              <p>${process.env.CLIENT_URL}</p>
            `,
                };

                // send the email
                transporter
                  .sendMail(emailData)
                  .then((info) => {
                    return res.status(200).json({
                      message:
                        "فرستاده شده است " + user.email + " ایمیلی به آدرس",
                    });
                  })
                  .catch((err) => {
                    res
                      .status(400)
                      .json({ error: "مشکلی پیش آمد دوباره امتحان کنید" });
                  });
              } else {
                return res.status(400).json({
                  error: "مشکلی پیش آمد. لطفا دوباره امتحان کنید.",
                });
              }
            })
            .catch((err) =>
              res
                .status(401)
                .json({ error: "مشکلی پیش آمد دوباره امتحان کنید" })
            );
        } else {
          return res.status(400).json({
            error: "مشکلی پیش آمد. لطفا دوباره امتحان کنید.",
          });
        }
      })
      .catch((err) => console.log("x"));
  } else {
    return res.status(400).json({
      error: "مشکلی پیش آمد. لطفا دوباره امتحان کنید.",
    });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const error = validationResult(req);
  if (!error.isEmpty()) {
    showError(error, res);
  } else {
    User.findOne({ email })
      .then((user) => {
        if (user) {
          if (!user.authenticate(password)) {
            return res.status(400).json({
              error: {
                password: "ایمیل و رمز عبور مطابقت ندارند.",
              },
            });
          }

          if (!user.active) {
            return res.status(400).json({
              error: {
                message:
                  "اکانت شما غیر فعال است. لطفا به آدرس ایمیل خود مراجعه کرده و اکانت خود را فعال نمایید.",
              },
              sendActivationEmail: true,
            });
          }

          const token = jwt.sign(
            {
              _id: user._id,
              name: user.name,
              lastName: user.lastName,
              role: user.role,
            },
            process.env.LOGIN_SECRET,
            {
              expiresIn: "1h",
            }
          );

          const { _id, name, lastName, email, role } = user;

          return res.json({
            token,
            user: {
              _id,
              name,
              lastName,
              email,
              role,
            },
          });
        } else {
          return res.status(404).json({
            error: {
              email: "شما هنوز با این آدرس ثبت نام نکرده اید.",
            },
          });
        }
      })
      .catch((err) =>
        res.status(404).json({
          error: {
            message: "مشکلی به وجود آمد لطفا دوباره تلاش کنید.",
          },
        })
      );
  }
};

exports.forgetPassword = (req, res) => {
  const { email } = req.body;

  const error = validationResult(req);
  if (!error.isEmpty()) {
    showError(error, res);
  } else {
    User.findOne({ email })
      .then((user) => {
        if (user) {
          // generate token for reseting password
          const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET, {
            expiresIn: "10m",
          });

          // send an verification email to user
          // initilize mailer
          let transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL_ADDRESS,
              pass: process.env.EMAIL_PASS,
            },
          });

          // create email data
          const emailData = {
            from: process.env.EMAIL_ADDRESS,
            to: user.email,
            subject: "لینک بازیابی رمز عبور",
            html: `
              <h1>روی لینک زیر کلیک کرده تا رمز عبور خود را تغییر دهید.</h1>
              <p>${process.env.CLIENT_URL}/password/reset/${token}</p>
              <hr/>
              <p>${process.env.CLIENT_URL}</p>
        `,
          };

          return user.updateOne(
            { resetPasswordLink: token },
            (err, success) => {
              if (err) {
                return res.status(404).json({
                  error: {
                    notif: "مشکلی پیش آمد. لطفا دوباره امتحان کنید. ",
                  },
                });
              } else {
                transporter
                  .sendMail(emailData)
                  .then((info) => {
                    return res.status(200).json({
                      message:
                        " فرستاده شده است " + user.email + " ایمیلی به آدرس ",
                    });
                  })
                  .catch((err) => {
                    res.status(400).json({
                      error: {
                        notif: "مشکلی پیش آمد دوباره امتحان کنید",
                      },
                    });
                  });
              }
            }
          );
        } else {
          return res.status(404).json({
            error: {
              email: "اکانتی با این آدرس وجود ندارد.",
            },
          });
        }
      })
      .catch((err) =>
        res.status(404).json({
          error: {
            notif: "مشکلی پیش آمد دوباره امتحان کنید",
          },
        })
      );
  }
};

exports.resetPassword = (req, res) => {
  const { newPassword, token } = req.body;

  const error = validationResult(req);
  if (!error.isEmpty()) {
    showError(error, res);
  } else {
    jwt.verify(token, process.env.JWT_RESET, (err, decoded) => {
      if (err) {
        return res.status(400).json({
          error: {
            notif: "این لینک منقضی شده است. لطفا دوباره تلاش کنید.",
          },
        });
      }

      User.findOne({ resetPasswordLink: token })
        .then((user) => {
          if (user) {
            const updatedFields = {
              resetPasswordLink: "",
              password: newPassword,
            };

            user = _.extend(user, updatedFields);

            user
              .save()
              .then((success) => {
                return res.json({ message: "رمز عبور شما تغییر کرد." });
              })
              .catch((err) =>
                res.status(404).json({
                  error: {
                    notif: "مشکلی به وجود آمد. لطفا دوباره تلاش کنید.",
                  },
                })
              );
          } else {
            return res.status(404).json({
              error: {
                notif: "این لینک منقضی شده است. لطفا دوباره تلاش کنید.",
              },
            });
          }
        })
        .catch((err) =>
          res.status(404).json({
            error: {
              notif: "مشکلی به وجود آمد. لطفا دوباره تلاش کنید.",
            },
          })
        );
    });
  }
};

exports.requireSignin = expressJWT({
  secret: process.env.LOGIN_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  const user = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!user) {
    return res.status(401).json({
      error: {
        notif: "دسترسی ممکن نیست",
      },
    });
  }

  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(401).json({
      error: {
        notif: "دسترسی ممکن نیست",
      },
    });
  }

  next();
};
