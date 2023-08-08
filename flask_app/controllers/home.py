from flask_app import app
from flask import render_template, redirect, request, session, flash, jsonify, get_flashed_messages
from flask_app.config.mysqlconnection import MySQLConnection
from flask_app.models.user import User

@app.route("/")
def homepage():
    return render_template("home_page.html")

@app.route("/join_waitlist", methods=["POST"])
def post_waitlist():
    data = {
        "first_name": request.form["first_name"],
        "last_name": request.form["last_name"],
        "email": request.form["email"],
    }
    email_data = {
        "first_name": request.form["first_name"],
        "email": request.form["email"],
    }

    errors = []
    if User.validate_registration(data):
        User.create(data)
        User.email(email_data)
        return jsonify({"status": "success", "message": "Thank you for joining the waitlist!"})
    else:
        errors.append("Registration failed!")
        return jsonify({"status": "error", "message": "There were errors during registration", "errors": errors})
