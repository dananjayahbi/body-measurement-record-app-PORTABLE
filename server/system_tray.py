import pystray
from pystray import MenuItem as item
from PIL import Image, ImageDraw
import subprocess
import os
import time

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

# ✅ Function to forcefully stop all Node.js processes
def stop_server(icon, item):
    global server_process
    if server_process:
        print("🛑 Stopping server...")

        # ✅ Force kill ALL Node.js processes
        os.system("taskkill /F /IM node.exe")

        time.sleep(1)  # ✅ Allow time for cleanup

        server_process = None  # ✅ Reset process tracker

    print("✅ Server stopped!")
    icon.stop()  # ✅ Close system tray properly

# Define tray menu
menu = (item("Stop Server", stop_server),)

# Create system tray icon
icon = pystray.Icon("NextJS Server", create_icon(), "Server Running", menu)
start_server()
icon.run()
