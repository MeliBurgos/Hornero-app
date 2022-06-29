const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: 'horneroapp123@gmail.com',
      pass: 'fxymntnolnovympp'
    }
})

transporter.verify((err, success) => {
    if (err) console.error(err);
    console.log('Mail config is correct');
});


const sendFriendMail = (mail) => {

    const mailOptions = {
        from: `"HorneroApp" <horneroapp123@gmail.com>`,
        to: mail.to,
        subject: `${mail.from} has sent you a message`,
        html:  `<h1 style={{text-height: 11px}}> ${mail.body} </h1>`
    }

    transporter.sendMail(mailOptions);

}

module.exports = { sendFriendMail }