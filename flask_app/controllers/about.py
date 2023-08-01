from flask_app import app
from flask import render_template, redirect, request, session, flash
from flask_app.config.mysqlconnection import MySQLConnection

@app.route("/about")
def aboutpage():
    return render_template("about_page.html")