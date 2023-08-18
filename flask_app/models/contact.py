from flask_app.config.mysqlconnection import MySQLConnection
from flask import flash
import re
from flask_app.models.contact_email import Contact_Email

EMAIL_REGEX = re.compile(r"^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$" )

class Contact:

    dB = "lux_waitlist"

    def __init__(self, data):
        self.id = data["id"]
        self.name = data["name"]
        self.email = data["email"]
        self.header = data["header"]
        self.description = data["description"]

    @classmethod
    def save(cls, data):
        query = """
            INSERT INTO contacts (name, email, header, description) VALUES (%(name)s, %(email)s, %(header)s, %(description)s);
        """
        result = MySQLConnection(cls.dB).query_db(query, data)

    @classmethod
    def create(cls, data):
        cls.save(data)
        return data
    
    @classmethod
    def contact_email(cls, data):
        send_email = [data["email"], "customersupport@luxorawallet.io"]
        Contact_Email.contact_send(data["name"], to_email=send_email, data=data)
        return 

    @staticmethod
    def validate_contact(data):
        is_valid = True

        if not data["name"]:
            flash("Please fill in Name", "contact")
            is_valid = False
        if not data["header"]:
            flash("Please fill in header", "contact")
            is_valid = False
        if not data["description"]:
            flash("Please fill in description", "contact")
            is_valid = False
        if not EMAIL_REGEX.match(data["email"]):
            flash("Invalid Email Address", "contact")
            is_valid = False

        return is_valid