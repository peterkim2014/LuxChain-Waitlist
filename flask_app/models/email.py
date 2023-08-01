import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_app.models.info import email, app_password, username

msg_text = """
    Dear {customer},

        Thank you for joining the waitlist.
        New updates will be available soon.

    Best regards,
    LuxChain
"""

class Email:

    @staticmethod
    def send_mail(text, subject, to_emails=None, from_email=None):
        assert isinstance(to_emails, list)

        msg = MIMEMultipart("alternative")
        msg["From"] = from_email
        msg["To"] = " ,".join(to_emails)
        msg["Subject"] = subject

        text_body = MIMEText(text, "plain")
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
        msg = msg_text.format(customer=my_customer)
        return msg