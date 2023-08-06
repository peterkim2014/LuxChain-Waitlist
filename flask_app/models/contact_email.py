import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_app.models.info import email, app_password, username

contact_msg_text = """
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <table class="email" width="98.75%" height="30%" valign="top" cellpadding="0" cellspacing="0" border="0">

                <td width="800" height="807.5" background="https://i.imgur.com/oSGPUFl.png">
                
                <p class="email-header" style="height: 2.5%; width: 90%; text-align: end; margin: 0; margin-bottom: 7.5%">Ticket #{customer}</p>

                <h2 style="text-align: start; width: 75%; height: 5%; padding-left: 12.5%; margin: 0;">Name:</h2>
                <p style="text-align: start; width: 75%; height: 5%; padding-left: 12.5%;">{customer}!</p>
                
                <h2 style="text-align: start; width: 75%; height: 5%; padding-left: 12.5%;">Header:</h2>
                <p style="text-align: start; width: 75%; height: 5%; padding-left: 12.5%;">{contact_header}</p>

                <h2 style="text-align: start; width: 75%; height: 5%; padding-left: 12.5%;">Description:</h2>
                <p style="text-align: start; width: 75%; height: 5%; padding-left: 12.5%;">{description}</p>

                <table cellpadding="0" cellspacing="0" border="0" margin="auto" padding-bottom="5%" >
                    <tr>
                        <p style="text-align: start; width: 75%; height: 20%; padding-left: 12.5%; padding-top: 1%;">We will get back to you with your question answered! If there are any more questions or concerns, please feel free to visit the website, www.luxchain.io</p>
                        
                        <p style="text-align: start; width: 40%; height: 10%; padding-left: 12.5%; padding-top: 1%;">Our best, <br>LuxChain Team</p>
                    </tr>
                </table>
                
                </td>

        </table>
    </body>
</html>
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