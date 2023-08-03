import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_app.models.info import email, app_password, username

contact_msg_text = """
    Dear {customer},

        New Ticket,
        {contact_header}
        {description}

        Thank you for your inquiry. You will hear back from us shortly.

    Best regards,
    LuxChain
"""

class Contact_Email:

    @staticmethod
    def contact_send_mail(text, subject, to_emails=None, from_email=None):
        assert isinstance(to_emails, list)
        print(to_emails[0])
        msg = MIMEMultipart("alternative")
        msg["From"] = from_email
        msg["To"] = " ,".join(to_emails[0])
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
        server.sendmail(from_email, to_emails[0], msg_str)

        server.quit()

    @staticmethod
    def contact_send(customer, to_email=None, data=None):
        # assert to_email != None
        my_msg = Contact_Email.contact_format_text(my_customer=customer, contact_header=data["header"], description=data["description"])
        subject = "LuxChain Inquiry"
        try:
            Contact_Email.contact_send_mail(text=my_msg, subject=subject, to_emails=[to_email], from_email=email)
            sent = True
        except:
            sent = False

        print(sent)
        return sent

    
    @staticmethod
    def contact_format_text(my_customer, contact_header, description):
        msg = contact_msg_text.format(customer=my_customer, contact_header=contact_header, description=description)
        return msg