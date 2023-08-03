import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_app.models.info import email, app_password, username

old_msg_text = """
<html>
    <head>
    </head>
    <body>
        <div class="email" style="height: 80vh; background: url('emailBackground.png'); background-size: cover; background-repeat: no-repeat;">

            <p class="email-header" style="height: 12%; width: 100%; text-align: end; direction: rtl; text-align: end;">Ticket #{number}</p>

            <div class="email-body" style="height: 88%; width: 90%; margin-top: 5%;">
                <p>Congratulations! You are now on the waitlist for LuxChain Wallet Application! Stay tuned for more announcements & updates on the release date.</p>

                <p>LuxChain is a user-friendly application designed to streamline the transaction process, promoting the adoption and growth of blockchain technology. Especially valuable during economic uncertainty, LuxChain ensures users a high degree of privacy and trust. The application provides a decentralized platform for safe and efficient transactions, transforming the way people purchase items.</p>

                <p>Have any questions about the application? Please visit the website, www.luxchain.io, and fill out the form under contact us!</p>
                <p>Our best, <br>LuxChain Team</p>

            </div>
        </div>
    </body>
</html>
"""


msg_text = """
<html>
    <head>
    </head>
    <body>
        <table class="email" style="height: 80vh; background: url('emailBackground.png'); background-size: cover; background-repeat: no-repeat;">
        <tr>
            <td>
                <p class="email-header" style="height: 12%; width: 100%; text-align: end; direction: rtl; text-align: end;">Ticket #{number}</p>
            </td>
        </tr>


                <tr>Congratulations! You are now on the waitlist for LuxChain Wallet Application! Stay tuned for more announcements & updates on the release date.</tr>

                <tr>LuxChain is a user-friendly application designed to streamline the transaction process, promoting the adoption and growth of blockchain technology. Especially valuable during economic uncertainty, LuxChain ensures users a high degree of privacy and trust. The application provides a decentralized platform for safe and efficient transactions, transforming the way people purchase items.</tr>

                <tr>Have any questions about the application? Please visit the website, www.luxchain.io, and fill out the form under contact us!</tr>
                <tr>Our best, <br>LuxChain Team</tr>

        </table>
    </body>
</html>
"""

class Email:

    @staticmethod
    def send_mail(text, subject, to_emails=None, from_email=None):
        assert isinstance(to_emails, list)

        msg = MIMEMultipart("alternative")
        msg["From"] = from_email
        msg["To"] = " ,".join(to_emails)
        msg["Subject"] = subject

        text_body = MIMEText(text, "html")
        msg.attach(text_body)

        msg_str = msg.as_string()
        # login smtp server
        server = smtplib.SMTP(host="smtp.gmail.com", port=587)
        server.ehlo()
        server.starttls()
        print(username, email, app_password)
        server.login(username, app_password)
        print("logged in")
        server.sendmail(from_email, to_emails, msg_str)

        server.quit()

    @staticmethod
    def send(customer, to_email=None):
        # assert to_email != None
        my_msg = Email.format_text(my_customer=customer)
        subject = "LuxChain waitlist confirmation"
        try:
            print(email)
            Email.send_mail(text=my_msg, subject=subject, to_emails=[to_email], from_email=email)
            sent = True
        except:
            sent = False

        print(sent)
        return sent

    
    @staticmethod
    def format_text(my_customer):
        msg = msg_text.format(number=my_customer)
        return msg