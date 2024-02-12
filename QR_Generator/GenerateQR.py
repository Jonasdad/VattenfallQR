import qrcode
import socket
import sys
import csv


# Find the local IPv4 address on the LAN for the host
def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # doesn't even have to be reachable
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP


# Generate an image of a QR code with the inputStr argument as its data payload
def makeQR(inputStr):
    img = qrcode.make(inputStr)
    return img


# Create a list of IDs from a ids.csv file.
def getList():
    fileName = "ids.csv"
    try:
        file = open(fileName, "r")
    except:
        print(f"{fileName} does not exist. Exiting")
        exit()
    
    data = list(csv.reader(file, delimiter=","))
    return data[0]



# Main function where the magic happens
def main():
    ip = get_ip()
    port = 8080
    deviceIDs = []
    try: 
        arg = sys.argv[1]
        deviceIDs.append(arg)
    except:
        print("No device ID was given. Attempting to find list instead.")
        data = getList()
        deviceIDs.extend(data)



    for deviceID in deviceIDs:
        address = f"http://{ip}:{port}?deviceID={deviceID}"

        print(f"Making QR Code for IP: {address}")
        img = makeQR(address)

        print(f"Saving QR code image: {deviceID}.png")
        type(img)
        img.save(f"{deviceID}.png")



if __name__ == "__main__":
    main()