import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_app.models.info import email, app_password, username
import random

msg_text = """
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <span style="opacity: 0">{number}</span>
        <table class="email" width="84.1%" height="50%" valign="top" cellpadding="0" cellspacing="0" border="0" style="word-break: break-word;">
            <tr>
                <td width="750" height="815" background="https://i.imgur.com/EZxrgB9.png">

                <p class="email-header" style="height: 12%; width: 90%; text-align: end; margin-bottom: 22.5%">Ticket #{number}</p>

                <table cellpadding="0" cellspacing="0" border="0" margin="auto" >
                    <tr>
                        <p style="text-align: start; width: 75%; height: 20%; padding-left: 12.5%; padding-top: 5%;">Congratulations {customer}! </p>
                        
                        <p style="text-align: start; width: 75%; height: 20%; padding-left: 12.5%; padding-top: 1%;">You are now on the waitlist for LuxChain Wallet Application! Stay tuned for more announcements & updates on the release date.</p>

                        <p style="text-align: start; width: 75%; height: 20%; padding-left: 12.5%; padding-top: 1%;">LuxChain is a user-friendly application designed to streamline the transaction process, promoting the adoption and growth of blockchain technology. Especially valuable during economic uncertainty, LuxChain ensures users a high degree of privacy and trust. The application provides a decentralized platform for safe and efficient transactions, transforming the way people purchase items.</p>

                        <p style="text-align: start; width: 75%; height: 20%; padding-left: 12.5%; padding-top: 1%;">Have any questions about the application? Please visit the website, www.luxchain.io, and fill out the form under contact us!</p>
                        
                        <p style="text-align: start; width: 40%; height: 10%; padding-left: 12.5%; padding-top: 1%;">Our best, <br>LuxChain Team</p>
                    </tr>
                </table>
                
                </td>
            </tr>
        </table>
        <span style="opacity: 0">{number}</span>
    </body>
</html>
"""


class Email:
    generated_numbers = set()
    @staticmethod
    def generate_unique_number():
        while True:
            unique_number = random.randint(100, 10000000)  # Generate a random number between 100 and 10,000,000
            if unique_number not in Email.generated_numbers:
                Email.generated_numbers.add(unique_number)
                return unique_number

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
        unique_number = Email.generate_unique_number() 
        msg = msg_text.format(number=unique_number, customer=my_customer)
        return msg