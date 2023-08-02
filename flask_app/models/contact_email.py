import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_app.models.info import email, app_password, username

contact_msg_text = """<html><head><style></style></head><body><div class="email"><p class="email-header">Ticket #{number}</p><div class="email-body"><p>Congratulations! You are now on the waitlist for LuxChain Wallet Application! Stay tuned for more announcements & updates on the release date.</p><p>LuxChain is a user-friendly application designed to streamline the transaction process, promoting the adoption and growth of blockchain technology. Especially valuable during economic uncertainty, LuxChain ensures users a high degree of privacy and trust. The application provides a decentralized platform for safe and efficient transactions, transforming the way people purchase items.</p><p>Have any questions about the application? Please visit the website, www.luxchain.io, and fill out the form under contact us!</p><p>Our best, <br>LuxChain Team</p></div></div></body></html>"""

class Contact_Email:

    @staticmethod
    def contact_send_mail(text, subject, to_emails=None, from_email=None):
        assert isinstance(to_emails, list)
        print(to_emails[0])
        msg = MIMEMultipart("alternative")
        msg["From"] = from_email
        msg["To"] = " ,".join(to_emails[0])
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
        server.sendmail(from_email, to_emails[0], msg_str)

        server.quit()

    @staticmethod
    def contact_send(customer, to_email=None, data=None):
        # assert to_email != None
        my_msg = Contact_Email.contact_format_text(my_customer=customer)
        subject = "LuxChain Inquiry"
        try:
            Contact_Email.contact_send_mail(text=my_msg, subject=subject, to_emails=[to_email], from_email=email)
            sent = True
        except:
            sent = False

        print(sent)
        return sent

    
    @staticmethod
    def contact_format_text(my_customer):
        msg = contact_msg_text.format(number=my_customer)
        return msg