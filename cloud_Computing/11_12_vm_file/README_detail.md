# Two Virtual Machine File Sharing

<!-- Default Machine Password in Virtual Machine is Shree -->

1. Create a NAT network in which 2 virtual machine can communicate.
2. Go to Settings -> Network -> Attach to -> NAT Network
3. Start the virtual machine and check the IP address of both the machines.
4. Install the following packages in both the machines:
   - `sudo apt-get install net-tools`
   - `sudo apt-get install openssh-server`
5. ufw firewall should be configured in both the machines.
   - `sudo ufw default allow outgoing`
   - `sudo ufw app list` OpenSSH should be in the list.
   - `sudo ufw allow ssh`
   - `sudo ufw allow OpenSSH`
   - `sudo ufw allow 22`
   - `sudo ufw enable`
   - `sudo ufw status`
   - `sudo ufw allow from 203.0.113.4`
6. Check the IP address of both the machines using `ifconfig` command.

## SCP (Secure Copy Protocol)

1. If we want to copy a file from a local machine to a remote machine:
   - `scp [file_name]  remoteuser@remotehost:/remote/directory`
2. If we want to copy a file from remote machine to our local machine.
   - `scp remoteuser@remotehost:/remote/directory [file_name]`

## Options in SCP Commands

1. -P port: Specifies the port to connect on the remote host.
2. -p Preserves modification times, access times, and modes from the original file.
3. -q Disables the progress meter.
4. -r Recursively copy entire directories.
5. -s Name of program to use for the encrypted connection. The program must understand ssh(1) options.

## To List the files in a directory

1. ssh user@host ls -l /some/directory
   - `ssh john@192.168.0.100 ls /home/user/documents`
