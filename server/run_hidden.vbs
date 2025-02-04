Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd.exe /c node server.js", 0, False
WshShell.Run "cmd.exe /c pythonw system_tray.py", 0, False