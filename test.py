import time

# Mock functions for hardware operations
class Pin:
    OUT = "out"
    def __init__(self, pin, mode=None):
        self.pin = pin
        self.mode = mode
        self.state = 0

    def value(self, val=None):
        if val is not None:
            self.state = val
        return self.state

class ADC:
    def __init__(self, pin):
        self.pin = pin

    def read_u16(self):
        # Return a dummy value for testing
        return 500

class PWM:
    def __init__(self, pin):
        self.pin = pin

    def duty_u16(self, value):
        print(f"Set PWM on pin {self.pin.pin} to {value}")

# Pin definitions
RS = Pin(37)
RW = Pin(36)
EN = Pin(35)
DS4 = Pin(33)
DS5 = Pin(32)
DS6 = Pin(31)
DS7 = Pin(30)

LineSensorEN = Pin(39)
LS1 = ADC(Pin(36))  # A3
LS2 = ADC(Pin(35))  # A2
LS3 = ADC(Pin(34))  # A1

IRProxyEN = Pin(6)
IR1 = ADC(Pin(33))  # A4
IR2 = ADC(Pin(32))  # A5
IR3 = ADC(Pin(31))  # A6
IR4 = ADC(Pin(30))  # A7
IR5 = ADC(Pin(29))  # A8

L_Speed = PWM(Pin(46))
L_Forward = Pin(23, Pin.OUT)
L_Back = Pin(22, Pin.OUT)
R_Speed = PWM(Pin(45))
R_Forward = Pin(24, Pin.OUT)
R_Back = Pin(25, Pin.OUT)

# Mock LCD functions
def lcd_init():
    print("LCD Initialized")

def lcd_print(line1, line2):
    print(f"LCD Line 1: {line1}")
    print(f"LCD Line 2: {line2}")

# Motor control functions
def left_forward():
    L_Forward.value(1)
    L_Back.value(0)
    print("Left motor forward")

def left_reverse():
    L_Forward.value(0)
    L_Back.value(1)
    print("Left motor reverse")

def left_stop():
    L_Forward.value(0)
    L_Back.value(0)
    print("Left motor stop")

def right_forward():
    R_Forward.value(1)
    R_Back.value(0)
    print("Right motor forward")

def right_reverse():
    R_Forward.value(0)
    R_Back.value(1)
    print("Right motor reverse")

def right_stop():
    R_Forward.value(0)
    R_Back.value(0)
    print("Right motor stop")

def forward(a, b):
    L_Speed.duty_u16(int(a * 65535 / 100))
    R_Speed.duty_u16(int(b * 65535 / 100))
    left_forward()
    right_forward()

def reverse(a, b):
    L_Speed.duty_u16(int(a * 65535 / 100))
    R_Speed.duty_u16(int(b * 65535 / 100))
    left_reverse()
    right_reverse()

def stop():
    left_stop()
    right_stop()

def left_turn(a):
    L_Speed.duty_u16(int(a * 65535 / 100))
    R_Speed.duty_u16(int(a * 65535 / 100))
    left_reverse()
    right_forward()

def right_turn(a):
    L_Speed.duty_u16(int(a * 65535 / 100))
    R_Speed.duty_u16(int(a * 65535 / 100))
    right_reverse()
    left_forward()

# Setup
lcd_init()
RW.value(0)
LineSensorEN.value(0)
IRProxyEN.value(0)

while True:
    LS_Left = LS1.read_u16()
    LS_Center = LS2.read_u16()
    LS_Right = LS3.read_u16()

    lcd_print(f"LS1  LS2  LS3", f"{LS_Left}  {LS_Center}  {LS_Right}")

    if LS_Center < 350 or LS_Left < 350 or LS_Right < 350:
        if LS_Left < 350:
            forward(50, 150)
        elif LS_Right < 350:
            forward(150, 50)
        elif LS_Left > 350 and LS_Right > 350:
            forward(150, 150)
    else:
        stop()

    time.sleep(0.05)
