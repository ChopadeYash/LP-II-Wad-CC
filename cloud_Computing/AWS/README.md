# AWS Create Virtual Machine

## Add this in Advanced Details -> User Data

`#! /bin/bash
yum -y install httpd
systemctl start httpd
systemctl enable httpd
echo "<h1> This is my webpage </h1>" > /var/www/html/index.html`
