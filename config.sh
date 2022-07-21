sed -i 's/\/usr\/libexec\/openssh\/sftp-server/internal-sftp/g' /etc/ssh/sshd_config 
service sshd restart
mv /var/www/html/httpd.conf /etc/httpd/conf/httpd.conf
sed -i 's/expose_php On/expose_php Off/' /etc/php.ini
service httpd restart
