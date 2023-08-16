from flask_app import app
from flask import render_template, redirect, request, session, flash
from flask_app.config.mysqlconnection import MySQLConnection
import re

def is_mobile(user_agent):
    # Regular expressions for common mobile device strings
    mobile_patterns = [
        "iphone", "ipod", "ipad", "android", "blackberry",
        "windows phone", "nokia", "samsung", "mobile", "linux"
    ]
    for pattern in mobile_patterns:
        if re.search(pattern, user_agent):
            print(f"Detected mobile device: {user_agent}")
            return True
    print(f"Not a mobile device: {user_agent}")
    return False

@app.route("/about")
def aboutpage():
    user_agent = request.headers.get('User-Agent')
    user_agent = user_agent.lower()

    if is_mobile(user_agent):
        return render_template('mobile.about.html')
    else:
        return render_template("about_page.html")

@app.route("/about_info")
def aboutinfo():
    user_agent = request.headers.get('User-Agent')
    user_agent = user_agent.lower()

    if is_mobile(user_agent):
        return render_template('mobile.about.info.html')
    else:
        return render_template("about_page.html")


