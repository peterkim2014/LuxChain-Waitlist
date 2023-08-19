from flask_app import app
from flask import render_template, redirect, request, session, flash, jsonify, get_flashed_messages, url_for
from flask_app.config.mysqlconnection import MySQLConnection
from flask_app.models.user import User
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

@app.route("/")
def homepage():
    user_agent = request.headers.get('User-Agent')
    user_agent = user_agent.lower()

    if is_mobile(user_agent):
        return render_template('mobile.home.html')
    elif "linux" in user_agent:
        return render_template("home_page.html")
    else:
        return render_template("home_page.html")

@app.route("/mobile_app_preview")
def mobile_home_preview():
    user_agent = request.headers.get('User-Agent')
    user_agent = user_agent.lower()

    if is_mobile(user_agent):
        return render_template('mobile.home.preview.html')
    elif "linux" in user_agent:
        return render_template("home_page.html")
    else:
        return render_template("home_page.html")
    
@app.route("/mobile_join_waitlist")
def mobile_home_waitlist():
    user_agent = request.headers.get('User-Agent')
    user_agent = user_agent.lower()

    if is_mobile(user_agent):
        return render_template('mobile.home.waitlist.html')
    elif "linux" in user_agent:
        return render_template("home_page.html")
    else:
        return render_template("home_page.html")
    
@app.route("/join_waitlist", methods=["POST"])
def post_waitlist():
    clear_flashed_messages()
    data = {
        "first_name": request.form["first_name"],
        "last_name": request.form["last_name"],
        "email": request.form["email"],
    }
    email_data = {
        "first_name": request.form["first_name"],
        "last_name": request.form["last_name"],
        "email": request.form["email"],
    }

    if User.validate_registration(data):
        # User.create(data)
        User.email(email_data)
        flash("Thank you for joining the community!", "register")
        return redirect(url_for('homepage') + '#global-waitlist')  # replace 'your_route_name' with the correct route
    else:
        # flash("There were errors during registration", "register")
        return redirect(url_for('homepage') + '#global-waitlist')  # replace 'your_route_name' with the correct route

def clear_flashed_messages():
    session['_flashes'] = []