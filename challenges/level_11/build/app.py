from flask import Flask, render_template, request

app = Flask(__name__)
                                        
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/test_form', methods=['POST'])
def test_form():
    try:
        a = request.form['a']
        b = request.form['b']
    except Exception as e:
        app.logger.warning("Missing request parameters")
        return render_template("index.html", result="Enter both the numbers")
    
    if not a.isnumeric() or not b.isnumeric():
        app.logger.warning("Entered non numeric characters")
        return render_template("index.html", result="Only numbers allowed!")

    res = check_overflow(a, b)
    return render_template('index.html', result=res)

def evaluate(val):
    val = int(val)
    val = val % 4294967296
    if val > 2147483647:
        val = val - 4294967296
    return val

def check_overflow(a, b):
    if a < 0 or b < 0:
        return("Hehe! You can't trick me, Only postive numbers allowed!")

    a = evaluate(a)
    b = evaluate(b)
    sum = evaluate(a + b)

    if sum > 0:
        return("Sensors are high on coolant. REPAIR ASAP!")
    else:
        return(f"System repair initiated. Here is your reward: {flag}")