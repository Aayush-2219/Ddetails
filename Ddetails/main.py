from flask import Flask, request, make_response, render_template

app = Flask(__name__, template_folder="template")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get_details", methods=["POST"])
def get_details():
    os = request.json.get("ops")
    bat = request.json.get("bt")
    bat = str(bat)
    charg = request.json.get("chag")
    ip = request.json.get("ip")
    if charg == True:
        charg = "Charging"
    elif charg == False:
        charg = "Not Charging"
    with open("data/device_details.txt",'a') as d:
        osdet = "OS = "+os
        batdet = "Battery Level = "+bat
        chagdet = "Battery Status = "+charg
        ipdet = "IP address = "+ip

        d.write("{\n"+osdet+"\n"+batdet+"\n"+chagdet+"\n"+ipdet+"\n"+"}\n")
    return "Success", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=8051)