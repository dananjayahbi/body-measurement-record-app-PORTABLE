import pystray
from pystray import MenuItem as item
from PIL import Image, ImageDraw
import subprocess

server_process = None

# Create an icon for the system tray
def create_icon():
    icon_size = (64, 64)
    image = Image.new("RGB", icon_size, (255, 255, 255))
    draw = ImageDraw.Draw(image)
    draw.ellipse((10, 10, 54, 54), fill="blue", outline="black")
    return image

# Function to start the server
def start_server():
    global server_process
    if server_process is None:
        server_process = subprocess.Popen(
            ["node", "server.js"],
            creationflags=subprocess.CREATE_NO_WINDOW
        )

# Function to stop the server
def stop_server(icon, item):
    global server_process
    if server_process:
        server_process.terminate()
        server_process = None
        icon.stop()  # Exit system tray

# Define tray menu
menu = (item("Stop Server", stop_server),)

# Create system tray icon
icon = pystray.Icon("NextJS Server", create_icon(), "Server Running", menu)
start_server()
icon.run()
