from flask_app import app
from flask import render_template, redirect, request, session, flash, jsonify
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
    if User.validate_registration(data):
        User.create(data)
        User.email(email_data)
        # flash("Thank you for joining the community. Confirmation email has been sent!", "register")
        return jsonify(status="success")
    else:
        flash("Please fill in the appropriate information below", "register")
        return jsonify(status="failure")