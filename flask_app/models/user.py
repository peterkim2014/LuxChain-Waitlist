from flask_app.config.mysqlconnection import MySQLConnection
from flask import flash
import re
from flask_app.models.email import Email

EMAIL_REGEX = re.compile(r"^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$" )

class User:
    
    dB = "lux_waitlist"

    def __init__(self, data):
        self.id = data["id"]
        self.first_name = data["first_name"]
        self.last_name = data["last_name"]
        self.email = data["email"]
        self.ticket = data["ticket"]

    @classmethod
    def save(cls, data):
        query = """
            INSERT INTO users (first_name, last_name, email, ticket) VALUES (%(first_name)s, %(last_name)s, %(email)s, %(ticket)s);
        """
        result = MySQLConnection(cls.dB).query_db(query, data)

    @classmethod
    def create(cls, data):
        cls.save(data)
        return data
    
    @classmethod
    def get_email(cls, email):
        query = """
            SELECT email FROM users WHERE email = %(email)s;
        """
        response = MySQLConnection(cls.dB).query_db(query, {"email": email})
        if response:
            return True
        else:
            return False
    
    @classmethod
    def email(cls, data):
        Email.send(data["first_name"], to_email=data["email"], data=data)
        return 

    @staticmethod
    def validate_registration(data):
        is_valid = True

        if not data["first_name"]:
            flash("Please fill in First Name", "register")
            is_valid = False
        if not data["last_name"]:
            flash("Please fill in Last Name", "register")
            is_valid = False
        if not EMAIL_REGEX.match(data["email"]):
            flash("Invalid Email Address", "register")
            is_valid = False
        # if User.get_email(data["email"]):
        #     flash("You have already joined the waitlist!", "register")
        #     is_valid = False
        
        return is_valid