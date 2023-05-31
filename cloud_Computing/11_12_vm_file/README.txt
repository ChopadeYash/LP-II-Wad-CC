ip address of the machine
    ifconfig

To install net tools:
    1. sudo apt install net-tools
   remove net-tools:
    1. sudo apt-get remove net-tools

To give sudo access to the system:
    1. sudo adduser <username> sudo
  remove sudo access :
    1. sudo deluser <username> sudo


Scp file commands:

    1. scp <file_name.extension> <reciever_username>@<reciever_ipAddress>:home/tuts/FOSSLINUX

                                                                    address where the file is to be transferred

    Multiple files:
    2. scp Hello1 Hello2 Hello3 tuts@192.168.83.132:/home/tuts/FOSSLINUX

    Directory Transfer:
    3. scp -r FOSSTUTS tuts@192.168.83.132:/home/tuts/FOSSLINUX

    Display all the files from the system:
    4. ssh vboxuser@192.68.10.8: "ls"
