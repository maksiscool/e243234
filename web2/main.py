import flask
import json
import sqlite3

db = sqlite3.connect("scores.db")
c = db.cursor()
c.execute("""CREATE TABLE IF NOT EXISTS score (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username VARCHAR(20),
          score INT
          
)""")
db.close()



app = flask.Flask(__name__)
@app.route('/endpoint',methods=['GET'])
def ok():
    
    
    db = sqlite3.connect("scores.db")
    db.row_factory = sqlite3.Row
    c = db.cursor()
    c.execute("""SELECT username, score FROM score""")
    data = c.fetchall()
    db.close()

    return flask.jsonify({"body": [[row['username'],row['score']] for row in data]})

@app.route('/submit', methods=["POST"])
def lol2():

    data = flask.request.get_json()

    print(data.get("user"),int(data.get("score")))

    db = sqlite3.connect("scores.db")

    c = db.cursor()

    c.execute("""INSERT INTO score (username, score) VALUES (?,?) """, (data.get("user"),int(data.get("score")),))

    db.commit()
    db.close()
    return "100"

@app.route('/')
def ebat():
    return flask.render_template('main.html')






if __name__ == "__main__":
    app.run(debug=True)