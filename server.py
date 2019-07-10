import eventlet
import socketio
import numpy as np
import json
import serial
from scipy.integrate import odeint

####################################################################################
#                            DEFINIÇÃO SOCKET

sio = socketio.Server()
app = socketio.WSGIApp(sio, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'}
})

@sio.on('connect')
def connect(sid, env):
    print('conectado ', sid)

@sio.on('disconnect')
def disconnect(sid):
    print('desconectado ', sid)

####################################################################################
#                            DEFINIÇÃO SERIAL

ser = serial.Serial("COM6", 115200)

####################################################################################
#                            SIMULADOR DE PROCESSOS

@sio.on('valoresIniciais')
def valoresIniciais(sid, NumString, DenString):

	Num = np.asarray(json.loads(NumString)).astype(np.float)
	Den = np.asarray(json.loads(DenString)).astype(np.float)

	Num = Num/Den[0]
	Den = Den/Den[0]

	na = np.size(Den)
	nb = np.size(Num)

	zero = np.zeros(na-nb-1)
	Num = np.concatenate((zero, Num))

	n = np.size(Den) - 1
	a1 = np.zeros((n,1))
	a2 = np.identity(n)
	a3 = np.delete(a2, n-1, 1)
	A = np.concatenate((a1, a3), 1)
	A = np.delete(A, n-1, 0)
	a4 = np.delete(Den, 0)
	a4 = -a4[::-1]
	a4 = np.asmatrix(a4)
	A = np.concatenate((A, a4), 0)
	B = np.zeros((n-1, 1))
	b1 = [[1]]
	B = np.concatenate((B, b1), 0)
	B = np.squeeze(np.asarray(B))
	C = Num[::-1]
	x0 = np.zeros((1,n))

	print('enviando')
	sio.emit('respostaValoresIniciais', {'A':json.dumps(A.tolist()),'B':json.dumps(B.tolist()),'C':json.dumps(C.tolist()),'x0':json.dumps(x0.tolist()),'n':n})
	#sio.emit('respostaValoresIniciais', data=(json.dumps(A.tolist()), json.dumps(B.tolist()), json.dumps(C.tolist()), json.dumps(x0.tolist()), n))


def odeAxBu(x, t, u, A, B):
	batata = np.matmul(A, x) + np.multiply(B,u)
	return batata

@sio.on('calculoODE')
def valoresIniciais(sid, entrada, tempoAlvo, escala, A, B, C, x0, t_tend, u_tend, y_tend):

	t = escala * np.linspace(t_tend[-1], tempoAlvo, 4)

	x0 = np.squeeze(np.asarray(x0))
	x = x0

	x = odeint(odeAxBu, x0, t, args=(entrada, A, B))
	aux = np.ndarray.tolist(np.linspace(0, 3-1, 3))
	x0 = np.transpose(np.delete(x,aux,0))

	y = np.matmul(C,x0)

	concT = [t[-1]/escala]
	t_tend = np.concatenate((t_tend, concT))

	concU = [entrada]
	u_tend = np.concatenate((u_tend, concU))

	concY = y
	y_tend = np.concatenate((y_tend, concY))

	sio.emit('respostaODE', {'t':json.dumps(t.tolist()),'t_tend':json.dumps(t_tend.tolist()),'u_tend':json.dumps(u_tend.tolist()),'y_tend':json.dumps(y_tend.tolist()),'x0':json.dumps(x0.tolist())})

####################################################################################
#                        COMUNICAÇÃO SERIAL

@sio.on('escreverSaida')
def escreverSaida(sid, saida, valor):
	#data = (str(saida)+':'+str(valor)+'$')
	data = (str(valor)+'$')
	ser.write(data.encode())
	print('enviando', data)

####################################################################################

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 2003)), app)