from flask_app import app
from flask import render_template, redirect, request, session
from flask_app.config.mysqlconnection import MySQLConnection
from flask_app.models.contact import Contact
import re

def is_mobile(user_agent):
    # Regular expressions for common mobile device strings
    mobile_patterns = [
        "iphone", "ipod", "ipad", "android", "blackberry",
        "windows phone", "nokia", "samsung", "mobile"
    ]
    for pattern in mobile_patterns:
        if re.search(pattern, user_agent):
            print(f"Detected mobile device: {user_agent}")
            return True
    print(f"Not a mobile device: {user_agent}")
    return False

@app.route("/contact")
def contact_page():
    user_agent = request.headers.get('User-Agent')
    user_agent = user_agent.lower()

    if is_mobile(user_agent):
        return render_template('mobile.contact.html')
    else:
        return render_template("contact_page.html")

@app.route("/contact_submit", methods=["POST"])
def submit_info():

    data = {
        "name": request.form["name"],
        "email": request.form["email"],
        "header": request.form["header"],
        "description": request.form["description"]
    }
    print(data)
    if Contact.validate_contact(data):
        # Contact.create(data)
        Contact.contact_email(data)
        return redirect("/contact")
    else:
        return redirect("/contact")