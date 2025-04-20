from flask import Flask, send_from_directory, send_file
from whitenoise import WhiteNoise
import os

app = Flask(__name__)
app.wsgi_app = WhiteNoise(app.wsgi_app, root='static/')

# Configurações de produção
app.config['ENV'] = 'production'
app.config['DEBUG'] = False
app.config['TESTING'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'sua-chave-secreta-aqui')

@app.route('/')
def home():
    return send_file('index.html')

@app.route('/<path:path>')
def static_proxy(path):
    try:
        return send_file(path)
    except:
        return send_file('index.html')

if __name__ == '__main__':
    port = int(os.getenv("PORT", default=5000))
    app.run(host='0.0.0.0', port=port, debug=False) 