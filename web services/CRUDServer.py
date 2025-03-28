from flask import Flask, request, jsonify
from flask_cors import CORS
import pymssql

app = Flask(__name__)
CORS(app)

# Database configuration
server = "localhost"
port = 1433
database = "master"
username = "sa"
password = "YourPassword123!"

# Database connection function
def get_connection():
    return pymssql.connect(server=server, port=port, user=username, password=password, database=database)

#metodos GET para usuario
@app.route('/usuario', methods=['GET'])
def get_usuarios():
    conn = get_connection()
    cursor = conn.cursor(as_dict=True)
    cursor.execute('SELECT * FROM Usuario')
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)
@app.route('/usuario/<int:id>', methods=['GET'])
def get_one_usuario(id):
    conn = get_connection()
    cursor = conn.cursor(as_dict=True)
    cursor.execute('SELECT * FROM Usuario WHERE id = %s', (id,))
    data = cursor.fetchone()
    conn.close()
    if data:
        return jsonify(data)
    else:
        return jsonify({'mensaje': 'Registro no encontrado'}), 404

#metodos GET para boleto
@app.route('/boleto', methods=['GET'])
def get_boletos():
    conn = get_connection()
    cursor = conn.cursor(as_dict=True)
    cursor.execute('SELECT * FROM Boleto')
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)
@app.route('/boleto/<int:id>', methods=['GET'])
def get_one_boleto(id):
    conn = get_connection()
    cursor = conn.cursor(as_dict=True)
    cursor.execute('SELECT * FROM Boleto WHERE id = %s', (id,))
    data = cursor.fetchone()
    conn.close()
    if data:
        return jsonify(data)
    else:
        return jsonify({'mensaje': 'Registro no encontrado'}), 404

#metodo GET para evento
@app.route('/evento', methods=['GET'])
def get_eventos():
    conn = get_connection()
    cursor = conn.cursor(as_dict=True)
    cursor.execute('SELECT * FROM Evento')
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)
@app.route('/evento/<int:id>', methods=['GET'])
def get_one_evento(id):
    conn = get_connection()
    cursor = conn.cursor(as_dict=True)
    cursor.execute('SELECT * FROM Evento WHERE id = %s', (id,))
    data = cursor.fetchone()
    conn.close()
    if data:
        return jsonify(data)
    else:
        return jsonify({'mensaje': 'Registro no encontrado'}), 404

#metodos GET para imagen
@app.route('/imagen', methods=['GET'])
def get_imagenes():
    conn = get_connection()
    cursor = conn.cursor(as_dict=True)
    cursor.execute('SELECT * FROM Imagen')
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)

@app.route('/imagen/<int:id>', methods=['GET'])
def get_one_imagen(id):
    conn = get_connection()
    cursor = conn.cursor(as_dict=True)
    cursor.execute('SELECT * FROM Imagen WHERE id = %s', (id,))
    data = cursor.fetchone()
    conn.close()
    if data:
        return jsonify(data)
    else:
        return jsonify({'mensaje': 'Registro no encontrado'}), 404

#metodos GET para Casilla
@app.route('/casilla', methods=['GET'])
def get_casillas():
    conn = get_connection()
    cursor = conn.cursor(as_dict=True)
    cursor.execute('SELECT * FROM Casilla')
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)

@app.route('/casilla/<int:id>', methods=['GET'])
def get_one_casilla(id):
    conn = get_connection()
    cursor = conn.cursor(as_dict=True)
    cursor.execute('SELECT * FROM Casilla WHERE id = %s', (id,))
    data = cursor.fetchone()
    conn.close()
    if data:
        return jsonify(data)
    else:
        return jsonify({'mensaje': 'Registro no encontrado'}), 404

#metodos GET para pregunta
@app.route('/pregunta', methods=['GET'])
def get_preguntas():
    conn = get_connection()
    cursor = conn.cursor(as_dict=True)
    cursor.execute('SELECT * FROM Pregunta')
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)

@app.route('/pregunta/<int:id>', methods=['GET'])
def get_one_pregunta(id):
    conn = get_connection()
    cursor = conn.cursor(as_dict=True)
    cursor.execute('SELECT * FROM Pregunta WHERE id = %s', (id,))
    data = cursor.fetchone()
    conn.close()
    if data:
        return jsonify(data)
    else:
        return jsonify({'mensaje': 'Registro no encontrado'}), 404

#metodos GET para IntentoCorrecto
@app.route('/intentoCorrecto', methods=['GET'])
def get_intentos_correctos():
    conn = get_connection()
    cursor = conn.cursor(as_dict=True)
    cursor.execute('SELECT * FROM IntentoCorrecto')
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)

@app.route('/intentoCorrecto/<int:id>', methods=['GET'])
def get_one_intento_correcto(id):
    conn = get_connection()
    cursor = conn.cursor(as_dict=True)
    cursor.execute('SELECT * FROM IntentoCorrecto WHERE id = %s', (id,))
    data = cursor.fetchone()
    conn.close()
    if data:
        return jsonify(data)
    else:
        return jsonify({'mensaje': 'Registro no encontrado'}), 404

#metodos GET para intento incorrecto
@app.route('/intentoIncorrecto', methods=['GET'])
def get_intento_incorrecto():
    conn = get_connection()
    cursor = conn.cursor(as_dict=True)
    cursor.execute('SELECT * FROM IntentoIncorrecto')
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)

@app.route('/intentoIncorrecto/<int:id>', methods=['GET'])
def get_one_intento_incorrecto(id):
    conn = get_connection()
    cursor = conn.cursor(as_dict=True)
    cursor.execute('SELECT * FROM IntentoIncorrecto WHERE id = %s', (id,))
    data = cursor.fetchone()
    conn.close()
    if data:
        return jsonify(data)
    else:
        return jsonify({'mensaje': 'Registro no encontrado'}), 404


@app.route('/test', methods=['POST'])
def create():
    data = request.json
    id = data['id']
    name = data['name']
    email = data['email']
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO Test (id, name, email) VALUES (%s,%s, %s)', (id, name, email))
    conn.commit()
    conn.close()
    return jsonify({'mensaje': 'Registro creado'}), 201

@app.route('/test/<int:id>', methods=['PUT'])
def update(id):
    data = request.json
    name = data['name']
    email = data['email']
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('UPDATE Test SET name = %s, email = %s WHERE id = %s', (name, email, id))
    conn.commit()
    conn.close()
    return jsonify({'mensaje': 'Registro actualizado'})

@app.route('/test/<int:id>', methods=['DELETE'])
def delete(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM Test WHERE id = %s', (id,))
    conn.commit()
    conn.close()
    return jsonify({'mensaje': 'Registro borrado'})

if __name__ == '__main__':
    app.run(debug=True, port=2025)
